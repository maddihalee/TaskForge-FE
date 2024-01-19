import { useState } from 'react';
import { checkUser } from '../utils/auth';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [authUser, setAuthUser] = useState();
  const { user } = useAuth();

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  return (
    <>
      {authUser?.firebaseUid === user?.uid ? (
        <>
        </>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
