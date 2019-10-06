import React from 'react';
import {BrowserRouter} from "react-router-dom";
import MainPageContainer from './pages/MainPageContainer';

import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter >
        <Container fluid="true" className="p-0">
          <MainPageContainer />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
