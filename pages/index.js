import { useState, useEffect } from 'react';
import { checkUser } from '../utils/auth';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../utils/context/authContext';
import TaskCard from '../components/TaskCard';
import { getTasks } from '../api/tasksData';

function Home() {
  const [authUser, setAuthUser] = useState();
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
    getTasks().then(setTasks);
  }, []);

  return (
    <>
      {authUser?.firebaseUid === user?.uid ? (
        <>
          {tasks.map((task) => (
            <TaskCard key={task.id} taskObj={task} />
          ))}
        </>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;
