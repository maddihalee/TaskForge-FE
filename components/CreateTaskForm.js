import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getPriorities from '../api/priorityData';

const initialState = {
  title: '',
  description: '',
  dueDate: '',
  status: '',
  priority: '',
};

export default function CreateForm({ taskObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [priorities, setPriorities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getPriorities().then(setPriorities);
    if (taskObj.id) setFormInput(taskObj);
  }, [taskObj]);

  return (
    <Form onSubmit={handleSubmit} className="form">
      <h2 className="text-white mt-5">{taskObj?.id ? 'Update' : 'Create'} Task</h2>

      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="title"
          name="title"
          value={formInput.title}
          onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={formInput.description}
          onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Status" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Status"
          name="status"
          value={formInput.status}
          onChange={({ target }) => setFormInput((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </FloatingLabel>

      <Form.Group className="mb-3" controlId="formGridLevel">
        <Form.Select
          aria-label="Category"
          name="categoryId"
          onChange={handleChange}
          className="mb-3"
          value={taskObj?.priorityId}
        >
          <option value="">Select Priority Level</option>
          {
            priorities.map((priority) => (
              <option
                key={priority.id}
                value={priority.id}
              >
                {priority.name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{taskObj?.id ? 'Update' : 'Create'} Recipe</Button>
    </Form>
  );
}

CreateForm.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.instanceOf(Date),
    status: PropTypes.bool,
    userId: PropTypes.number,
    priorityId: PropTypes.number,
  }).isRequired,
};
