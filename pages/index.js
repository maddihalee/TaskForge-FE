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
  const [completedTasks, setCompletedTasks] = useState([]);
  const { user } = useAuth();

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  const handleTaskComplete = (completedTask) => {
    // Remove the completed task from the list of active tasks
    const updatedTasks = tasks.filter((task) => task.id !== completedTask.id);
    setTasks(updatedTasks);
    // Add the completed task to the list of completed tasks
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, completedTask]);
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
            <h1>Current Tasks</h1>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                taskObj={task}
                onTaskComplete={handleTaskComplete}
              />
            ))}
            <h1>Completed Tasks</h1>
            {completedTasks.map((completedTask) => (
              <TaskCard
                key={completedTask.id}
                taskObj={completedTask}
                priorityObj={completedTask.priority}
                onTaskComplete={handleTaskComplete}
              />
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
