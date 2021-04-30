import React from 'react';
import { Container, Row, Col } from "react-bootstrap"

import Router from 'components/Router';
const App = () => {
  return (

    <Container>
      <Row>
        <Col>
          <Router></Router>
        </Col>
      </Row>
    </Container>
  );
};

export default App