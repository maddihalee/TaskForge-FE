import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
    getTasks().then(setTasks);
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
  }, []);

  return (
    <>
      {authUser?.firebaseUid === user?.uid ? (
        <>
          <div>
            <Link href="/create" passHref>
              <Button
                size="md"
                className="btn-m"
                style={{
                  backgroundColor: 'transparent',
                  color: 'black',
                  border: 'none',
                  fontWeight: 600,
                }}
              >
                Create a Task
              </Button>
            </Link>
            {tasks.map((task) => (
              <TaskCard key={task.id} taskObj={task} />
            ))}
          </div>
        </>
      ) : (
        <RegisterForm user={user} onUpdate={onUpdate} />
      )}
    </>
  );
}

export default Home;
