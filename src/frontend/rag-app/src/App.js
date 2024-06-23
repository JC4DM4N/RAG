import "./App.css";
import { useSessionStorage } from "usehooks-ts";
import React, { useState } from "react";
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

  const handlePost = async () => {
    const payload = { context: activeContextValues, query: queryValue };
    const response = await postData(payload);

    setContainerDataResponses([...containerDataResponses, response]);
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
