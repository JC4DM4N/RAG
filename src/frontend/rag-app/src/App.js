import "./App.css";
import { useSessionStorage } from "usehooks-ts";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ContextNavBar from "./components/contextNavBar";
import QueryForm from "./components/queryForm";
import ResponseContainer from "./components/responseContainer";

function App() {
  const [ contextValues, setContextValues ] =
    useSessionStorage("contextValues", []);
  const [
    activeContextValues,
    setActiveContextValues
  ] = useSessionStorage("activeContextItems", []);
  const [containerData, setContainerData] = useState(
    "Container to store query outputs"
  );

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

  const querySubmitHandler = (event) => {
    event.preventDefault();

    setContainerData(
      <div>
        <h3>The current active context items are:</h3>
        {activeContextValues.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
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
        <ResponseContainer containerData={containerData} />
        <QueryForm querySubmitHandler={querySubmitHandler} />
      </Col>
    </Row>
  );
}

export default App;
