import "../App.css";

import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function ContextForm({ placeholder, onFormSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
    onFormSubmit(event, inputValue);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the Enter key
      handleSubmit(event); // Submit the form
    }
  };

  return (
    <>
      <Form
        className="context-form"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
      >
        <Form.Control type="text" id="contextform" placeholder={placeholder} />
      </Form>
    </>
  );
}

export default ContextForm;
