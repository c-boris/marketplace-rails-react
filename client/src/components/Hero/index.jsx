import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import { Link } from "react-router-dom";

export default function Hero() {
  const [user] = useAtom(userAtom);

  console.log(user);
  return (
    <section id="hero" className="bg-light dark:bg-dark h-screen">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-65">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="flex items-center justify-center h-full">
              <div className="relative rounded-full px-9 py-4 text-2xl leading-9 text-secondary dark:text-dsecondary ring-1 ring-primary/10 hover:ring-primary/20 dark:ring-dprimary/10 dark:hover:ring-dprimary/20 text-center">
                {user.isLoggedIn ? (
                  user.username ? (
                    `Hy ${user.username}`
                  ) : (
                    `Hy ${user.email}`
                  )
                ) : (
                  <>
                    Hy welcome to our marketplace, please login to get a full
                    access to our app!
                    <br />
                    <a href="/signup" className="font-semibold text-accent">
                      Click to sign up!
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary dark:text-dprimary sm:text-6xl py-20">
              Sell your properties easily with us!!!
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary dark:text-dsecondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
              dolores! Minus, repellendus provident optio assumenda nihil, error
              porro qui consequatur consectetur dolor suscipit, aspernatur
              delectus eos reprehenderit quae. Debitis, eum?
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {user.isLoggedIn ? (
                <>
                  <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View my listings
                  </a>
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-primary dark:text-dprimary"
                  >
                    View my profil <span aria-hidden="true">→</span>
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/properties"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Show me properties
                  </Link>
                  <a
                    href="/login"
                    className="text-sm font-semibold leading-6 text-primary dark:text-dprimary"
                  >
                    Create an account <span aria-hidden="true">→</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true">
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div> */}
      </div>
    </section>
  );
}
