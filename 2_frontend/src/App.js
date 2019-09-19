import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UserList from './pages/User/List'
import UserForm from './pages/User/Form'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container, Row, Col } from 'react-bootstrap'


function App() {
  return (

    <BrowserRouter>

      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col style={{minWidth: '20vh'}}>

            <Switch>
              <Route exact path="/" component={ UserList } />
              <Route path="/user/:action(new|edit)/:id?" component={ UserForm } />
            </Switch>

            &nbsp;

          </Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>

    </BrowserRouter>
  );
}

export default App;
