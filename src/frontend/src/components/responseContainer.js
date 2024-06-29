import Card from "react-bootstrap/Card";
import Spinner from 'react-bootstrap/Spinner';

function ResponseContainer({ containerDataQuestions, containerDataResponses }) {
  const textDiv = containerDataQuestions.map((value, index) => {
    if (containerDataResponses.length > index) {
      return (
        <div key={index}>
          <div className="response-container-question-text response-container-text-div">
            {value}
          </div>
          <div className="response-container-text-div">
            {containerDataResponses[index]}
          </div>
        </div>
      );
    } else {
      return (
        <div key={index}>
          <div className="response-container-question-text response-container-text-div">
            {value}
          </div>
          <div className="response-container-loading-status">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <> Generating response...</>
          </div>
        </div>
      );
    }
  });

  return (
    <Card className="response-container">
      <Card.Body className="response-container-body" id="response-container-body">
        {textDiv}
      </Card.Body>
    </Card>
  );
}

export default ResponseContainer;
