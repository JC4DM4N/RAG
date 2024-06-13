import React, { useState } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

function ContextList({ values }) {

  const [activeItems, setActiveItems] = useState([]);

  const handleClick = (event, value) => {
    event.preventDefault();
    setActiveItems(prevActiveItems => {
      if (prevActiveItems.includes(value)) {
        return prevActiveItems.filter(item => item !== value);
      } else {
        return [...prevActiveItems, value];
      }
    });
  };

  return (
    <ListGroup as="ol">
          {values.map((value, index) => (
            <ListGroup.Item
              key={index}
              as="li"
              active={activeItems.includes(value)}
              onClick={(event) => handleClick(event, value)}
              >
              {value}
            </ListGroup.Item>
          ))}
    </ListGroup>
  );
}

export default ContextList;