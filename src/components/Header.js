import React, { Component } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';


class Header extends Component {
  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container>
            <h1 style={{textAlign: "center"}}>Welcome to Launchnode's ERC20 Tokens</h1>
            <h2 style={{textAlign: "center"}}>{this.props.account}</h2>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}

export default Header;
