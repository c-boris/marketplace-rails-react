import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../utils/atom';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';


function LoginForm() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    // Effectuer la requête fetch vers le backend Strapi pour l'authentification
    try {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password
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
        setError('Identifiants invalides');
      }
    } catch (error) {
      setError('Une erreur s\'est produite');
    }
  };

  return (
    <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleLogin}>
        <h2>Se connecter</h2>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      <NavLink to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign up
            </NavLink>
    </div>
    </div>
  );
}

export default LoginForm;