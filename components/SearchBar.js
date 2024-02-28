import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

export default function SearchBar({ query, setQuery, taskObj }) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const filteredTasks = taskObj.filter((task) => task.title.ToLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Tasks..."
        className="search-bar"
      />
      <div className="filteredTasks">
        {filteredTasks.map((filterTask) => <TaskCard taskObj={filterTask} />)}
      </div>
    </>
  );
}

SearchBar.propTypes = {
  taskObj: PropTypes.arrayOf({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.bool,
    due: PropTypes.string,
    userId: PropTypes.number,
    priorityId: PropTypes.number,
  }),
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

SearchBar.defaultProps = {
  taskObj: [],
  query: '',
  setQuery: () => {},
};
