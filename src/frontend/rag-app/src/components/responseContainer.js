import Card from "react-bootstrap/Card";

function ResponseContainer({ containerData }) {

  const text = containerData.map((value, index) => (
    <div key={index}>{value}</div>
  ));


  return (
    <Card className="response-container">
      <Card.Body className="response-container-body">
        {text}
      </Card.Body>
    </Card>
  );
}

export default ResponseContainer;
