import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import Web3 from 'web3';
import Token from '../build/contracts/Token.json';


class Approve extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spenderAddress: '',
      amount: 0,
      loading: false,
    }
    this.handleChangespenderAddress = this.handleChangespenderAddress.bind(this);
    this.handleChangeSpenderAmount = this.handleChangeSpenderAmount.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
  }
  async approveCall(spenderAddress, Amount){
    
    const web3 = new Web3(window.ethereum);
    const netId = await web3.eth.net.getId()
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[netId].address
    );
    const accounts = await web3.eth.getAccounts();
    if(token !== 'undefined'){
      try{
        await token.methods
        .approve(spenderAddress, Amount)
        .send({
          from: accounts[0]
        });
        this.setState({
          loading: false,
        })
      }catch(e){
        console.log('Error, transfer(): ', e);
        this.setState({
          loading: false,
        })
      }
    }
  }

  handleChangespenderAddress(event) {
    this.setState({
      spenderAddress: event.target.value,
    })
  }

  handleChangeSpenderAmount = (event) => {
    this.setState({
      amount: event.target.value,
    })
  }
  handleApprove = (e) => {
    e.preventDefault()

    
    this.approveCall(this.state.spenderAddress, this.state.amount);
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleApprove}>
        <fieldset disabled={this.state.loading}>
          <Form.Group value = {this.state.spenderAddress} onChange={this.handleChangespenderAddress}>
            <Form.Label>Spender</Form.Label>
            <Form.Control placeholder="0xabs12a" required/>
            <Form.Text className="text-muted">
              Enter Spender's address
            </Form.Text>
          </Form.Group>

          <Form.Group value = {this.state.amount} onChange={this.handleChangeSpenderAmount}>
            <Form.Label>Value</Form.Label>
            <Form.Control placeholder="Token amount" required pattern="[0-9]*" type="number"/>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={this.state.loading}>
            Send
          </Button>
          </fieldset>
        </Form>
      </div>
    )
  }
}

export default Approve
