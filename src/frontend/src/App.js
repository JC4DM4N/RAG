import "./App.css";
import { useSessionStorage } from "usehooks-ts";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { postData } from "./api";
import ContextNavBar from "./components/contextNavBar";
import QueryForm from "./components/queryForm";
import ResponseContainer from "./components/responseContainer";

function App() {
  const [contextValues, setContextValues] = useSessionStorage(
    "contextValues",
    []
  );
  const [activeContextValues, setActiveContextValues] = useSessionStorage(
    "activeContextItems",
    []
  );
  const [containerDataQuestions, setContainerDataQuestions] = useState([]);
  const [containerDataResponses, setContainerDataResponses] = useState([]);
  const [queryValue, setQueryValue] = useState("");

  const updateActiveContext = (event, value) => {
    event.preventDefault();
    setActiveContextValues((prevActiveItems) => {
      if (prevActiveItems.includes(value)) {
        return prevActiveItems.filter((item) => item !== value);
      } else {
        return [...prevActiveItems, value];
      }
    });
  };

  useEffect(() => {
    var element = document.getElementById("response-container-body");
    element.scrollTop = element.scrollHeight;
  }, [containerDataQuestions, containerDataResponses]);

  const handlePost = async () => {
    const payload = { context: activeContextValues, query: queryValue };
    var form = document.getElementById("queryform");
    var formtext = document.getElementById("queryform-text");
    form.reset();
    formtext.setAttribute("disabled", "true");
    const response = await postData(payload);
    setContainerDataResponses([...containerDataResponses, response]);
    formtext.removeAttribute("disabled", "false");
  };

  const querySubmitHandler = (event) => {
    event.preventDefault();

    setContainerDataQuestions([...containerDataQuestions, queryValue]);
    handlePost();
  };

  return (
    <Row>
      <Col xs={3} className="column-container">
        <ContextNavBar
          updateActiveContext={updateActiveContext}
          contextValues={contextValues}
          setContextValues={setContextValues}
          activeContextValues={activeContextValues}
          setActiveContextValues={setActiveContextValues}
        />
      </Col>
      <Col xs={9} className="column-container">
        <ResponseContainer
          containerDataQuestions={containerDataQuestions}
          containerDataResponses={containerDataResponses}
        />
        <QueryForm
          querySubmitHandler={querySubmitHandler}
          setQueryValue={setQueryValue}
        />
      </Col>
    </Row>
  );
}

export default App;
