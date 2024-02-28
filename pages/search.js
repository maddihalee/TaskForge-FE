import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { getTasks } from '../api/tasksData';

export default function SearchPage() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTasks(query).then((data) => {
      setTasks(data);
    });
  }, [query]);

  return (
    <div>
      <SearchBar tasks={tasks} query={query} setQuery={setQuery} />
    </div>
  );
}
