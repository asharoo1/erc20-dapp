import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import Web3 from 'web3'
import Token from '../build/contracts/Token.json'

class TransferFrom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromAddress: '',
      toAddress: '',
      amount: 0,
      loading: false,
    }
    this.handleChangefromAddress = this.handleChangefromAddress.bind(this)
    this.handleChangetoAddress = this.handleChangetoAddress.bind(this)
    this.handleChangeAmount = this.handleChangeAmount.bind(this)
    this.handleTransferFrom = this.handleTransferFrom.bind(this)
  }

  async tranferFromCall(fromAddress, toAddress, Amount) {
    const web3 = new Web3(window.ethereum)
    const netId = await web3.eth.net.getId()
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[netId].address,
    )
    const accounts = await web3.eth.getAccounts()
    if (token !== 'undefined') {
      try {
        await token.methods.transferFrom(fromAddress, toAddress, Amount).send({
          from: accounts[0],
        })

        this.setState({
          loading: false,
        })
      } catch (e) {
        console.log('Error, transferFrom(): ', e)
        this.setState({
          loading: false,
        })
      }
    }
  }

  handleChangefromAddress(event) {
    this.setState({
      fromAddress: event.target.value,
    })
  }

  handleChangetoAddress(event) {
    this.setState({
      toAddress: event.target.value,
    })
  }

  handleChangeAmount(event) {
    this.setState({
      amount: event.target.value,
    })
  }

  handleTransferFrom = (e) => {
    e.preventDefault()

    this.tranferFromCall(
      this.state.fromAddress,
      this.state.toAddress,
      this.state.amount,
    )
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleTransferFrom}>
          <fieldset disabled={this.state.loading}>
            <Form.Group
              value={this.state.fromAddress}
              onChange={this.handleChangefromAddress}
            >
              <Form.Label>From</Form.Label>
              <Form.Control placeholder="0xabs12a" required />
              <Form.Text className="text-muted">Sender's Address</Form.Text>
            </Form.Group>

            <Form.Group
              value={this.state.toAddress}
              onChange={this.handleChangetoAddress}
            >
              <Form.Label>To</Form.Label>
              <Form.Control placeholder="0xabs12a" required />
              <Form.Text className="text-muted">Recepient's Address</Form.Text>
            </Form.Group>

            <Form.Group
              value={this.state.amount}
              onChange={this.handleChangeAmount}
            >
              <Form.Label>Value</Form.Label>
              <Form.Control placeholder="Token amount" required type="number" pattern="[0-9]*"/>
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

export default TransferFrom
