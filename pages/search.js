import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { getTasks } from '../api/tasksData';
import TaskCard from '../components/TaskCard';

export default function SearchPage() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTasks(query).then((data) => {
      setTasks(data);
    });
  }, [query]);

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div>
        <SearchBar tasks={tasks} query={query} setQuery={setQuery} />
      </div>
      <div className="filteredTasks">
        {filteredTasks?.map((filterTask) => <TaskCard taskObj={filterTask} />)}
      </div>
    </>
  );
}
