import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TaskCard({ taskObj }) {
  return (
    <Card>
      <Card.Header as="h5">{taskObj?.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {taskObj?.description}
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
    dueDate: PropTypes.instanceOf(Date),
    status: PropTypes.bool,
    userId: PropTypes.number,
  }).isRequired,
};
