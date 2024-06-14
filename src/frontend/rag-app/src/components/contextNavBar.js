import Container from "react-bootstrap/Container";
import ContextForm from "./contextForm";
import ContextList from "./contextList";

function ContextNavBar({
  updateActiveContext,
  contextValues,
  setContextValues,
  activeContextValues,
  setActiveContextValues,
}) {
  const onFormSubmit = (event, inputValue) => {
    event.preventDefault();
    if (contextValues.includes(inputValue)) {
      return contextValues;
    } else {
      return setContextValues([...contextValues, inputValue]);
    }
  };

  return (
    <div className="context-nav-bar-container">
      <Container>
        <ContextForm
          placeholder="Enter URL of context article"
          onFormSubmit={onFormSubmit}
        />
      </Container>
      <Container>
        <ContextList
          contextValues={contextValues}
          updateActiveContext={updateActiveContext}
          setContextValues={setContextValues}
          activeContextValues={activeContextValues}
          setActiveContextValues={setActiveContextValues}
        />
      </Container>
    </div>
  );
}

export default ContextNavBar;
