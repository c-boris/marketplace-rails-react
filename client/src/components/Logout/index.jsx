import { useAtom } from 'jotai';
import { userAtom } from '../../utils/atom';
import Cookies from 'js-cookie';

function Logout() {
  const [, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    setUser({
      id: '',
      isLoggedIn: false,
      token: '',
    });

    Cookies.remove('token');
    Cookies.remove('id');

  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
}

export default Logout;
