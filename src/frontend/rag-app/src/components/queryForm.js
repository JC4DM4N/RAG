import '../App.css'

import Form from 'react-bootstrap/Form';

function QueryForm() {

  return (
    <>
      <Form
        className="query-form"
      >
      <Form.Control
        type="text"
        id="queryform"
        placeholder="Enter query"
        className="query-form-contents"
      />
      </Form>
    </>
  );
}

export default QueryForm;