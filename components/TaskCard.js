import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TaskCard({ taskObj, priorityObj }) {
  return (
    <Card className="card">
      <Card.Header as="h5">{taskObj?.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {taskObj?.description}
          <br />
          {taskObj?.due}
          <br />
          {priorityObj?.name}
        </Card.Text>
        <Button variant="primary">Delete</Button>
      </Card.Body>
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
};
