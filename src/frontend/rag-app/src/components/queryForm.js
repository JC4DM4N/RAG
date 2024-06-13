import "../App.css";

import Form from "react-bootstrap/Form";

function QueryForm({ querySubmitHandler }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    querySubmitHandler(event);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key
      handleSubmit(event); // Submit the form
    }
  };

  return (
    <>
      <Form className="query-form">
        <Form.Control
          type="text"
          id="queryform"
          placeholder="Enter query"
          className="query-form-contents"
          onKeyDown={handleKeyPress}
        />
      </Form>
    </>
  );
}

export default QueryForm;
