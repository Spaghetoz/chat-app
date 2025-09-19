require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { sequelize } = require('./models');
const initSockets = require('./sockets');

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true },
});


const socketAuthMiddleware = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      // TODO show error to client
      return next(new Error('No token'));
    }
    const payload = require('jsonwebtoken').verify(token, process.env.JWT_ACCESS_SECRET);
    socket.user = { public_id: payload.sub };
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
}

// Add auth middleware on all the namespaces
io.use(socketAuthMiddleware);
io.on("new_namespace", (namespace) => {
  namespace.use(socketAuthMiddleware);
});

initSockets(io);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection authenticated');

  if (process.env.NODE_ENV !== 'production') {
    await sequelize.sync(); 
    console.log('✅ Sequelize models synchronized');
  }

  server.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
  } catch (err) {
    console.error('Unable to start server:', err);
    process.exit(1);
  }
})();