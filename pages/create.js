import CreateForm from '../components/CreateTaskForm';

export default function CreatePage() {
  const taskObj = {
    title: '',
    description: '',
    dueDate: '',
    status: '',
    priority: '',
  };

  return <CreateForm taskObj={taskObj} />;
}
