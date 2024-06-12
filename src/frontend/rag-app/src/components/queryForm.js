import Form from 'react-bootstrap/Form';

function QueryForm({ placeholder }) {
  return (
    <>
      <Form.Control
        type="text"
        id="queryform"
        placeholder={placeholder}
      />
    </>
  );
}

export default QueryForm;