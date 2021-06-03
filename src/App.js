import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Token from './build/contracts/Token.json';
import Web3 from 'web3';
import { Tab, Row, Nav, Col } from 'react-bootstrap';
import Header from './components/Header'
import Transfer from './components/Transfer'
import TransferFrom from './components/TransferFrom'
import Approve from './components/Approve'
import Allowance from './components/Allowance'
import Details from './components/Details'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      balance: 0,
      tokenAddress: null,
      totalSupply: 0,
      tokenBalance: 0,
      tokenSymbol: 'LNs',
      tokenName: 'Launchnodes',
      
    }
  }
  async componentDidMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }


  // connect the app with the blockchain
  async loadBlockchainData(dispatch) {
    //check if MetaMask exists
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      //load balance

      if (typeof accounts[0] !== 'undefined') {
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({
          account: accounts[0],
          balance: web3.utils.fromWei(balance),
          web3: web3,
        })
      } else {
        window.alert('Please login with Metamask.')
      }

      try {
        const token = new web3.eth.Contract(
          Token.abi,
          Token.networks[netId].address
        )

        const tokenAddress = Token.networks[netId].address;

        
        console.log('Token Address: ', tokenAddress);
        const tokenBalance = await token.methods
          .balanceOf(this.state.account)
          .call();
        
        const totalSupply = await token.methods.totalSupply().call();
        
        
        this.setState({
          
          tokenAddress: tokenAddress,
          token: token,
          tokenBalance: tokenBalance,
          totalSupply: totalSupply,
          
        })
      } catch (e) {
        console.log('Error', e)
        window.alert('Contract not deployed to the current Network')
      }
    }
  }

  render() {
    return (
      <div>
        <Header  account={this.state.account}/>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Transfer</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Transfer From</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Approve</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Allowance</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth">Details</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Transfer />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <TransferFrom/>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Approve/>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <Allowance />
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  <Details
                    tokenName = {this.state.tokenName}
                    tokenSymbol = {this.state.tokenSymbol}
                    totalSupply = {this.state.totalSupply}
                    
                    tokenBalance = {this.state.tokenBalance}
                    account = {this.state.account}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      // asas
    )
  }
}

export default App
