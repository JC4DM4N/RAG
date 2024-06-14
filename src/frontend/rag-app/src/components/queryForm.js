import "../App.css";

import { Form, InputGroup } from "react-bootstrap";

import { VscArrowCircleUp } from "react-icons/vsc";

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
    <div className="query-form-container">
      <Form className="query-form">
        <InputGroup>
          <Form.Control
            type="text"
            id="queryform"
            placeholder="Enter query"
            className="query-form-contents"
            onKeyDown={handleKeyPress}
          />
              <VscArrowCircleUp className="query-form-submit-button"/>
        </InputGroup>
      </Form>
    </div>
  );
}

export default QueryForm;
