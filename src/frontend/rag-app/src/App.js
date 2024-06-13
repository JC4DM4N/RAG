import "./App.css";
import { useSessionStorage } from "usehooks-ts";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ContextNavBar from "./components/contextNavBar";
import QueryForm from "./components/queryForm";
import ResponseContainer from "./components/responseContainer";

function App() {
  // const [activeContextItems, setActiveContextItems] = useSessionStorage("activeContextItems", []);
  // const [containerData, setContainerData] = useSessionStorage(
  //   "containerData",
  //   "Container to store query outputs"
  // );
  const [contextValues, setContextValues, removeContextValues] =
  useSessionStorage("contextValues", []);
  const [activeContextItems, setActiveContextItems, removeActiveContextItems] =
    useSessionStorage("activeContextItems", []);
  const [containerData, setContainerData] = useState("Container to store query outputs");

  const updateActiveContext = (event, value) => {
    event.preventDefault();
    setActiveContextItems((prevActiveItems) => {
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
        {activeContextItems.map((item, index) => (
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
          activeContextItems={activeContextItems}
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
