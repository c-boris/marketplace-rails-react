import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function DashboardForm() {
  const [user, setUser] = useAtom(userAtom);
  const [newEmail, setNewEmail] = useState(user.email); // Initialise avec l'e-mail actuel de l'utilisateur
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users/update_profile", {
        method: "PATCH", // Utiliser la méthode PATCH pour la mise à jour des informations
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"), // Assurez-vous d'inclure le jeton d'authentification
        },
        body: JSON.stringify({
          user: {
            email: newEmail,
            password: newPassword,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Mettre à jour les informations de l'utilisateur dans le state global
        setUser({
          isLoggedIn: true,
          email: data.user.email,
          username: data.user.username,
        });

        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error has occurred");
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Edit Account</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="newEmail">New Email address</label>
          <input
            id="newEmail"
            name="newEmail"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
}

export default DashboardForm;


// import { useAtom } from "jotai";
// import { userAtom } from "../../utils/atom";



// import { useAtom } from "jotai";
// import { userAtom } from "../../utils/atom";

// export default function DashboardForm() {
//   const [user] = useAtom(userAtom);

//   return (
//     <section id="dashboard" className="isolate bg-light dark:bg-dark px-6 py-24 sm:py-32 lg:px-8">
//       <div className="mx-auto max-w-2xl">
//     <form>
//       <div className="space-y-12">
//         <div className="border-b border-primary/10 dark:border-dprimary/10 pb-12">
//           <h2 className="text-base font-semibold leading-7 text-primary dark:text-dprimary">Profile</h2>
//           <p className="mt-1 text-sm leading-6 text-secondary dark:text-dsecondary">
//             This information will be displayed publicly so be careful what you share.
//           </p>

//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
//                 Username
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <span className="flex select-none items-center pl-3 text-secondary dark:text-dsecondary sm:text-sm">workcation.com/</span>
//                   <input
//                     type="text"
//                     name="username"
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-primary dark:text-dprimary placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="janesmith"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-primary/10 dark:border-dprimary/10 pb-12">
//           <h2 className="text-base font-semibold leading-7 text-primary dark:text-dprimary">Personal Information</h2>
//           <p className="mt-1 text-sm leading-6 text-secondary dark:text-dsecondary">Use a permanent address where you can receive mail.</p>

//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-4">
//               <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 flex items-center justify-end gap-x-6">
//         <button type="button" className="text-sm font-semibold leading-6 text-primary dark:text-dprimary">
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//     </div>
//     </section>
//   )
// }
