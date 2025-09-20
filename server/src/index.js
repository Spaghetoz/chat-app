require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { sequelize } = require('./models');
const initSockets = require('./sockets');

const { socketAuthMiddleware } = require('./middleware/auth.middleware');

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true },
});

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