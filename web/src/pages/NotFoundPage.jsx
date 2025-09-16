import { NavLink } from "react-router";

export default function NotFoundPage() {

    return(
        <div className="grid h-screen place-items-center bg-neutral-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 class="mt-4 text-5xl font-bold tracking-tight text-balance text-white sm:text-7xl">404</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-neutral-400 sm:text-xl/8">Couldn’t find the page you’re looking for, are you lost ?</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">

                <NavLink to="/" end>
                    <a className="rounded-md bg-neutral-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                        Go back home
                    </a>
                </NavLink>
                </div>
            </div> 
        </div>
    )
}