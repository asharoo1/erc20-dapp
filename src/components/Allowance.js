import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import Web3 from 'web3'
import Token from '../build/contracts/Token.json'

class Allowance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ownerAddress: '',
      spenderAddress: '',
      loading: false,
    }
    this.handleChangeOwnerAddress = this.handleChangeOwnerAddress.bind(this)
    this.handleChangeSpenderAddress = this.handleChangeSpenderAddress.bind(this)
    this.handleAllowance = this.handleAllowance.bind(this)
  }

  async allowanceCall(ownerAddress, spenderAddress) {
    const web3 = new Web3(window.ethereum)
    const netId = await web3.eth.net.getId()
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[netId].address,
    )
    const accounts = await web3.eth.getAccounts()
    if (token !== 'undefined') {
      try {
        await token.methods.allowance(ownerAddress, spenderAddress).send({
          from: accounts[0],
        });
        this.setState({
          loading: false,
        });
      } catch (e) {
        console.log('Error, allowance(): ', e)
        this.setState({
          loading: false,
        });
      }
    }
  }

  handleChangeOwnerAddress(event) {
    this.setState({
      ownerAddress: event.target.value,
    })
  }

  handleChangeSpenderAddress(event) {
    this.setState({
      spenderAddress: event.target.value,
    })
  }
  handleAllowance = (e) => {
    e.preventDefault()

    this.allowanceCall(this.state.ownerAddress, this.state.spenderAddress)
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleAllowance}>
          <fieldset disabled={this.state.loading}>
            <Form.Group
              value={this.state.ownerAddress}
              onChange={this.handleChangeOwnerAddress}
            >
              <Form.Label>Owner</Form.Label>
              <Form.Control placeholder="0xabs12a" required />
              <Form.Text className="text-muted">
                Enter Owner's address
              </Form.Text>
            </Form.Group>

            <Form.Group
              value={this.state.spenderAddress}
              onChange={this.handleChangeSpenderAddress}
            >
              <Form.Label>Spender</Form.Label>
              <Form.Control placeholder="0xabs12a" required />
              <Form.Text className="text-muted">
                Enter Spender's address
              </Form.Text>
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

export default Allowance
