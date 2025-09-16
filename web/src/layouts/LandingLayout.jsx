import { Outlet } from "react-router";

/** Layout for the landing page (Welcome page, FAQ, About us etc...) */
export default function LandingLayout() {

    return(
        <div>
            <Outlet />
        </div>
    )
}