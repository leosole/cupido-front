import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import axios from 'axios';
import React from "react";

export default class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      name: ''
    };
  }
  onSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }
    
    const options = {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*", 
      },
      body : JSON.stringify(data)
    }

    try{
      axios.post(`https://hayumfy8e2.execute-api.sa-east-1.amazonaws.com/dev/todos/`, options) 
        .then(res => {
          console.log(res)
        }
      )
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
          console.log(error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log(error);
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label> Nome</label>
        <Input type="text" placeholder="Nome do crush" name="name" onChange={this.handleChange} />
        <label> E-mail</label>
        <Input type="email" placeholder="E-mail do crush" name="email" onChange={this.handleChange} />
        <label> Mensagem</label>
        <textarea name="message" onChange={this.handleChange} />
        <Button type="submit">
          Enviar
        </Button>
      </form>
    );  
  }
}

