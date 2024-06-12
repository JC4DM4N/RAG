import ListGroup from 'react-bootstrap/ListGroup';

function ContextList({ values }) {
  return (
    <ListGroup as="ol">
          {values.map((value, index) => (
            <ListGroup.Item key={index} as="li">
              {value}
            </ListGroup.Item>
          ))}
    </ListGroup>
  );
}

export default ContextList;