import React, { Component } from 'react';
import SignIn from './SignIn';
import Welcome from './Welcome';
import {Container, Row, Col} from 'react-bootstrap';

class LoginPage extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Welcome/>
          </Col>
          <Col>
            <SignIn connect={this.props.connect} loginError={this.props.loginError}/>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default LoginPage;
