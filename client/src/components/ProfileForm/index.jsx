import { useAuth } from "../../utils/useAuth";
import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import { toast } from "react-toastify";

export default function ProfileForm() {
  // Utilisez le hook useAuth
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    try {
      // Appelez la fonction updateProfile du hook useAuth
      await updateProfile({ username, email });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      setError("An error occurred while updating the profile");
    }
  };

  return (
    <section id="dashboard" className="isolate bg-light dark:bg-dark px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <form onSubmit={handleUpdateProfile}>
          <div className="space-y-12">
            <div className="border-b border-primary/10 dark:border-dprimary/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-primary dark:text-dprimary">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-secondary dark:text-dsecondary">
                This information will be displayed publicly so be careful what you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-secondary dark:text-dsecondary sm:text-sm">New Username :</span>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-primary dark:text-dprimary placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        // placeholder="janesmith"
                        value={username} // Ajout de la valeur ici
                        onChange={(e) => setUsername(e.target.value)} // Gestion de la modification
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-primary/10 dark:border-dprimary/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-primary dark:text-dprimary">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-secondary dark:text-dsecondary">Use a permanent address where you can receive mail.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={email} // Ajout de la valeur ici
                      onChange={(e) => setEmail(e.target.value)} // Gestion de la modification
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-primary dark:text-dprimary">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
