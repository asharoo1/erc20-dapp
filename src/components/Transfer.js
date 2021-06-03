import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import Web3 from 'web3'
import Token from '../build/contracts/Token.json'

class Transfer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toAddress: '',
      amount: 0,
      loading: false,
      
    }
    this.handleChangetoAddress = this.handleChangetoAddress.bind(this)
    this.handleChangetoAmount = this.handleChangetoAmount.bind(this)
    this.handleTransfer = this.handleTransfer.bind(this)
  }

  

  async tranferCall(toAddress, Amount) {
    const web3 = new Web3(window.ethereum)
    const netId = await web3.eth.net.getId()
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[netId].address,
    )
    const accounts = await web3.eth.getAccounts();
  
    if (token !== 'undefined') {
      try {
        await token.methods.transfer(toAddress, Amount).send({
          from: accounts[0],
        })
        
        this.setState({
          loading: false,
        })
      } catch (e) {
        console.log('Error, transfer(): ', e);
        this.setState({
          loading: false,
        })
      }
    }
  }

  handleChangetoAddress(event) {
    this.setState({
      toAddress: event.target.value,
    })
  }

  handleChangetoAmount = (event) => {
    
    this.setState({
      amount: event.target.value,
    })
  }
  handleTransfer = (e) => {
    e.preventDefault()
    this.setState({
      loading: true,
    })
    this.tranferCall(this.state.toAddress, this.state.amount)
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleTransfer}>
          <fieldset disabled={this.state.loading}>
            <Form.Group
              type={'text'}
              value={this.state.toAddress}
              onChange={this.handleChangetoAddress}
            >
              <Form.Label>To</Form.Label>
              <Form.Control placeholder="0xabs12a" required />
              <Form.Text className="text-muted">
                Enter Recepient's address
              </Form.Text>
            </Form.Group>

            <Form.Group
              value={this.state.value}
              onChange={this.handleChangetoAmount}
              
            >
              <Form.Label>Value</Form.Label>
              <Form.Control placeholder="Token amount" required pattern="[0-9]*" type="number"/>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={this.state.loading}
            >
              Send
            </Button>
          </fieldset>
        </Form>
      </div>
    )
  }
}

export default Transfer
