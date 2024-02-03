import { Card } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from './Checkbox';
import { updateTask } from '../api/tasksData';

export default function TaskCard({ taskObj, priorityObj, onTaskComplete }) {
  const [taskStatus, setTaskStatus] = useState(taskObj.status || false);

  const handleClick = () => {
    const newStatus = !taskStatus;
    setTaskStatus(newStatus);
    updateTask({ ...taskObj, status: newStatus })
      .then((response) => {
        if (response.ok) {
          console.warn('Task status updated successfully.');
          onTaskComplete(taskObj);
        }
      });
  };

  console.warn(taskObj);

  return (
    <Card className="card">
      <Card.Header as="h5">{taskObj?.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {taskObj?.description}
          <br />
          Due: {taskObj?.due}
          <br />
          {priorityObj?.name}
        </Card.Text>
      </Card.Body>
      <CheckBox onChange={handleClick} checked={taskStatus} />
    </Card>
  );
}

TaskCard.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    due: PropTypes.string,
    status: PropTypes.bool,
    userId: PropTypes.number,
  }).isRequired,
  priorityObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onTaskComplete: PropTypes.func.isRequired,
};
