/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getPriorities from '../api/priorityData';
import { createTask, updateTask } from '../api/tasksData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  title: '',
  description: '',
  status: '',
  priority: '',
};

export default function CreateForm({ taskObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [priorities, setPriorities] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskObj.id) {
      updateTask(taskObj).then(router.push('/'));
    } else {
      const payload = { ...formInput, status: false, userId: user[0].id };
      createTask(payload).then(router.push('/'));
    }
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

      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{taskObj?.id ? 'Update' : 'Create'} Task</Button>
    </Form>
  );
}

CreateForm.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.bool,
    due: PropTypes.string,
    userId: PropTypes.number,
    priorityId: PropTypes.number,
  }).isRequired,
};
