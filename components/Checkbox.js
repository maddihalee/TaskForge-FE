import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function CheckBox({ onClick, checked }) {
  return (
    <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check
            type={type}
            id={`default-${type}`}
            label="Completed"
            checked={checked}
            onClick={onClick}
          />
        </div>
      ))}
    </Form>
  );
}

CheckBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
