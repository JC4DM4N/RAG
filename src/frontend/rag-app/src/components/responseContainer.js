import Card from "react-bootstrap/Card";

function ResponseContainer({ containerData }) {
  return (
    <Card className="response-container">
      <Card.Body className="response-container-body">{containerData}</Card.Body>
    </Card>
  );
}

export default ResponseContainer;
