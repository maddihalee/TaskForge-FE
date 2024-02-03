import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function CheckBox({ onChange, checked }) {
  return (
    <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check
            type={type}
            id={`default-${type}`}
            label="Completed"
            checked={checked}
            onChange={onChange}
          />
        </div>
      ))}
    </Form>
  );
}

CheckBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
