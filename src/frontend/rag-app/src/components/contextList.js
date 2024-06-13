import ListGroup from "react-bootstrap/ListGroup";

function ContextList({ values, updateActiveContext, activeContextItems }) {
  return (
    <ListGroup as="ol">
      {values.map((value, index) => (
        <ListGroup.Item
          key={index}
          as="li"
          active={activeContextItems.includes(value)}
          onClick={(event) => updateActiveContext(event, value)}
        >
          {value}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default ContextList;
