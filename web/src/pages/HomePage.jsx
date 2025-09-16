import { NavLink } from "react-router";

export default function HomePage() {

  return(
    <div className="">
      <section className="bg-neutral-900 h-screen lg:grid lg:h-screen lg:place-content-center dark:bg-gray-900">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-prose">
            <h1 className="text-4xl font-bold text-neutral-200 sm:text-5xl dark:text-white">
              Chat & Whiteboard
              <strong className="text-blue-600"> in one place </strong>
            </h1>

            <p className="mt-4 text-base text-pretty text-neutral-400 sm:text-lg/relaxed dark:text-neutral-200">
              Prototype app to chat and collaborate visually with a live whiteboard. 
              Perfect to test ideas, draw, and communicate in real time.
            </p> {/**TODO change text */}

            <div className="mt-4 flex gap-4 sm:mt-6">
              
              {/** TODO fix nested <a> error */}
              <NavLink to="/" end>
                <a
                  className="inline-block rounded border border-blue-600 bg-blue-600 px-5 py-3 font-semibold text-neutral-100 shadow-sm transition-colors hover:bg-blue-700"
                >
                  Start chatting
                </a>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}