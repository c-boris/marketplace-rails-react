import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";

function ReadProperties() {
  const [user] = useAtom(userAtom);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/properties", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
          console.log(responseData);
        } else {
          setError("Identifiants invalides");
        }
      } catch (error) {
        setError("Une erreur s'est produite");
      }
    }

    fetchData(); // Appelle la fonction fetchData lors du montage du composant
  }, []); // Les crochets vides signifient que cela s'exécute une seule fois, équivalent à componentDidMount

  return (
    <>
      {error && <p>{error}</p>}
      {data && (
        <div className="bg-light dark:bg-dark py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-dprimary sm:text-4xl">
                List of properties
              </h2>
              <p className="mt-6 text-lg leading-8 text-secondary dark:text-dsecondary">
                All you are looking for is here below.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {data.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center gap-x-6">
                    <h2 className="text-base font-semibold leading-7 tracking-tight text-primary dark:text-dprimary">
                      {item.title}
                    </h2>
                    <h2 className="text-sm font-semibold leading-6 text-secondary dark:text-dsecondary">
                      <p>Price: {item.price}</p>
                      <p>City: {item.city}</p>
                      <p>Description: {item.description}</p>
                      <p>User #:{item.user_id}</p>
                    </h2>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default ReadProperties;
