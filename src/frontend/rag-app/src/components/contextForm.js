import "../App.css";

import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function ContextForm({ placeholder, onFormSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(event, inputValue);
    setInputValue("");
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
        autoComplete="off"
      >
        <Form.Control type="text" id="contextform" placeholder={placeholder} value={inputValue} onChange={handleInputChange} />
      </Form>
    </>
  );
}

export default ContextForm;
