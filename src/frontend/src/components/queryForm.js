import "../App.css";

import { Form, InputGroup } from "react-bootstrap";
import { VscArrowCircleUp } from "react-icons/vsc";

function QueryForm({ querySubmitHandler, setQueryValue }) {

  const handleInputChange = (event) => {
    setQueryValue(event.target.value);
  };

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
      <Form className="query-form" id="queryform">
        <InputGroup>
          <Form.Control
            type="text"
            id="queryform-text"
            placeholder="Enter query"
            className="query-form-contents"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            autoComplete="off"
          />
          <InputGroup.Text className="query-form-submit-button-container">
            <VscArrowCircleUp
              className="query-form-submit-button"
              id="queryform-submit-button"
              height="3em"
              width="3em"
              onClick={(e) => {
                const element = document.getElementById("queryform-text");
                if (element && element.getAttribute("disabled") !== "true") {
                  handleSubmit(e);
                }
              }}
            />
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </div>
  );
}

export default QueryForm;
