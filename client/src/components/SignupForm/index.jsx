import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../utils/atom';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';

function SignupForm() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_Confirmation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', response.headers.get("Authorization"));
        Cookies.set('id', data.user.id);

        setUser({
          isLoggedIn: true,
        });
      } else {
        setError('Error creating account');
      }
    } catch (error) {
      setError('Erreur lors de la création du compte');
    }
  };

  return (
    <>
      <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-light dark:bg-dark">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary dark:text-dprimary">
            Create an account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                Email :
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                Password :
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
                Password confirmation :
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password_confirmation"
                  value={password_confirmation}
                  onChange={(e) => setPassword_Confirmation(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-primary dark:text-dprimary">
            Already a member?{' '}
            <NavLink to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
