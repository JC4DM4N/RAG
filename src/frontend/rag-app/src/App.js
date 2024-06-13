import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ContextNavBar from './components/contextNavBar'
import QueryForm from './components/queryForm'
import ResponseContainer from './components/responseContainer'

function App() {
  return (
      <Row>
        <Col xs={3} className="column-container">
            <ContextNavBar />;
        </Col>
        <Col xs={9} className="column-container">
            <ResponseContainer />
            <QueryForm />
        </Col>
      </Row>
  );
}

export default App;
