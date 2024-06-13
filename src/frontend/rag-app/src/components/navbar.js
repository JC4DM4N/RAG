import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import QueryForm from './queryForm'
import ContextList from './contextList'

function NavBar() {
  const [contextValues, setContextValues] = useState([]);

  const onFormSubmit = (event, inputValue) => {
    event.preventDefault();
    setContextValues([...contextValues, inputValue]);
  }

  return (
    <>
        <Container>
            <QueryForm placeholder="Enter URL of context article" onFormSubmit={onFormSubmit}/>
        </Container>
        <Container>
            <ContextList values={contextValues}/>
        </Container>
    </>
  );
}


export default NavBar;