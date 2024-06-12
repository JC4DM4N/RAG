import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navbar from './components/navbar'
import QueryForm from './components/queryForm'


function App() {
  return (

      <Row>
        <Col xs={3} className="column-container">
            <Navbar />
        </Col>
        <Col xs={9} className="column-container">
            <QueryForm placeholder="enter query" />
        </Col>
      </Row>
  );
}


export default App;


