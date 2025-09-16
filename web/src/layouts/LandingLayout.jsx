import { Outlet, NavLink } from "react-router";

/** Layout for the landing page (Welcome page, FAQ, About us etc...) */
export default function LandingLayout() {

    return(
        <div>

            <header className="fixed top-0 left-0 w-full bg-neutral-900/80 backdrop-blur-sm z-50">
            <div className="mx-auto max-w-screen-xl px-4 py-4 flex justify-between items-center">
                <a href="/home" className="text-xl font-bold text-neutral-100">Chat</a>

                <nav className="flex items-center gap-6">
                    <a href="/home" className="text-neutral-200 hover:text-white transition-colors">Home</a>
                    <a href="/faq" className="text-neutral-200 hover:text-white transition-colors">FAQ</a>
                    <a href="/contact" className="text-neutral-200 hover:text-white transition-colors">Contact</a>

                    <NavLink to="/" end>
                        <span className="ml-4 inline-block rounded-2xl border border-blue-600 bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
                        Open app
                        </span>
                    </NavLink>
                    
                </nav>
            </div>
            </header>

            <Outlet />

            <footer className="bg-neutral-950 text-neutral-400 py-8 text-center">
                <div className="mb-4">
                    <a href="/home" className="mx-2 hover:text-white">Home</a>
                    <a href="/faq" className="mx-2 hover:text-white">FAQ</a>
                    <a href="/contact" className="mx-2 hover:text-white">Contact</a>
                </div>
                
                <p className="text-sm mb-2">© 2025 All rights reserved.</p>

            </footer>
        </div>
    )
}