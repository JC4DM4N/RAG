import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import QueryForm from './queryForm'
import ContextList from './contextList'

function NavBar() {
  const context_values = ["Context Article 1", "Context Article 2"];
  return (
    <>
        <Container>
            <QueryForm placeholder="enter url" />
        </Container>
        <Container>
            <ContextList values={context_values}/>
        </Container>
    </>
  );
}


export default NavBar;