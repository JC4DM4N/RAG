import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navbar from './components/navbar'

function App() {
  return (

      <Row>
        <Col xs={3} className="column-container">
            <Navbar />;
        </Col>
        <Col xs={9} className="column-container">
            <h1>This is where the query and output form will go.</h1>
        </Col>
      </Row>
  );
}


export default App;


