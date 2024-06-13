import ListGroup from "react-bootstrap/ListGroup";
import { VscChromeClose } from "react-icons/vsc";

function ContextList({
  contextValues,
  updateActiveContext,
  setContextValues,
  activeContextValues,
  setActiveContextValues,
}) {
  const removeButtonClickHandler = (event, value) => {
    event.preventDefault();
    event.stopPropagation();
    setContextValues(
      contextValues.filter(function (e) {
        return e !== value;
      })
    );
    setActiveContextValues(
      activeContextValues.filter(function (e) {
        return e !== value;
      })
    );
  };

  return (
    <ListGroup as="ol">
      {contextValues.map((value, index) => (
        <ListGroup.Item
          key={index}
          as="li"
          active={activeContextValues.includes(value)}
          onClick={(event) => updateActiveContext(event, value)}
          className="context-list-item"
        >
          <div className="context-list-item-text">{value}</div>
          <div className="context-list-item-remove-button">
            <VscChromeClose
              onClick={(event) => removeButtonClickHandler(event, value)}
            />
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ContextList;
