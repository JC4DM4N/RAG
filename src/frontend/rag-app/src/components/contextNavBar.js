import { useSessionStorage } from "usehooks-ts";

import Container from "react-bootstrap/Container";
import ContextForm from "./contextForm";
import ContextList from "./contextList";

function ContextNavBar({ updateActiveContext, contextValues, setContextValues, activeContextItems }) {

  const onFormSubmit = (event, inputValue) => {
    event.preventDefault();
    if (contextValues.includes(inputValue)) {
      return contextValues;
    } else {
      return setContextValues([...contextValues, inputValue]);
    }
  };

  return (
    <>
      <Container>
        <ContextForm
          placeholder="Enter URL of context article"
          onFormSubmit={onFormSubmit}
        />
      </Container>
      <Container>
        <ContextList
          values={contextValues}
          updateActiveContext={updateActiveContext}
          activeContextItems={activeContextItems}
        />
      </Container>
    </>
  );
}

export default ContextNavBar;
