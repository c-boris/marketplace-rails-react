import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewProperty() {
  const [user, setUser] = useAtom(userAtom);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property: {
            user_id: user.id,
            title: title,
            price: price,
            city: city,
            description: description,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set("token", response.headers.get("Authorization"));

        navigate("/");
        toast.success("Property created successfully!");
      } else {
        toast.error("Error creating property");
      }
    } catch (error) {
      toast.error("An error occurred during property creation");
    }
  };

  return (
    <>
      <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-light dark:bg-dark">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary dark:text-dprimary">
            Create a new property
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
              >
                Title (*):
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="title"
                  placeholder="5 caracters minimum"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
              >
                Price :
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value, 10) || "")}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
              >
                City :
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Description"
                className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
              >
                Description (*):
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="description"
                  placeholder="15 caracters minimum"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-2 h-40"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProperty;
