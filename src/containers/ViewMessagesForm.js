import Button from '@material-ui/core/Button';
// import Input from "@material-ui/core/Input";
// import { useForm } from "react-hook-form";
import Listar from "./Listar"
import React from "react";
import axios from 'axios';

export default class ViewMessagesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      messages: []
    };
  }
  onSubmit = (event) => {
    console.log(event); 
    if (this.state.email.length > 4){
      axios.get(`https://hayumfy8e2.execute-api.sa-east-1.amazonaws.com/dev/todos/email/`+this.state.email) 
        .then(res => {
          const returned_messages = res.data; 
          this.setState({ messages: returned_messages});
        }
      )
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({email: event.target.value});
  }
  
  render(){
    return (
      <form onSubmit={this.onSubmit}>
        <label> E-mail</label>
        <input type="email" placeholder="Seu e-mail" name="email" onChange={this.handleChange} />
        <Button type="submit">
          Enviar
        </Button>
        <Listar messages={this.state.messages}/>
      </form>
    );
  }
}

// export default ViewMessagesForm;
