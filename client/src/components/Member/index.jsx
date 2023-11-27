import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../utils/atom';
import SignupForm from '../../components/SignupForm';
import LoginForm from '../../components/LoginForm';
// import PostList from './components/PostList';
// import CreatePost from './components/CreatePostButton';
import Logout from '../../components/Logout';
import Cookies from 'js-cookie';

function Member() {
  const [user] = useAtom(userAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (token) {
      setUser({
        id: id,
        isLoggedIn: true,
        token: token,
      });
    }
  }, []);

  return (
    <center>
    <div>
      <h1>Mon application</h1>
      {user.isLoggedIn ? (
        <div>
          <p>Bienvenue, Utilisateur n°{user.id} !</p>
          {/* <PostList />
          <CreatePost /> */}
          <Logout />
        </div>
      ) : (
        <div>
          <SignupForm />
          <LoginForm />
        </div>
      )}
    </div>
    </center>
  );
}

export default Member;
