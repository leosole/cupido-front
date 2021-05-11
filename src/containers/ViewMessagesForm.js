import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
// import { useForm } from "react-hook-form";
import Listar from "./Listar"
import React from "react";
import axios from 'axios';

export default class ViewMessagesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Seu e-mail',
      messages: [],
    };
  }
  onSubmit = (event) => {
    event.preventDefault();
    console.log(event); 
    try{
      axios.get(`https://hayumfy8e2.execute-api.sa-east-1.amazonaws.com/dev/todos/email/`+this.state.email) 
        .then(res => {
          if(res.data){
            const returned_messages = res.data; 
            this.setState({ messages: returned_messages});
          }
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
    this.setState({email: event.target.value});
  }
  
  render(){
    return (
      <form onSubmit={this.onSubmit}>
        <div className="field">
          <label> E-mail</label>
          <Input 
            type="email" 
            disableUnderline={true}
            required={true}
            // placeholder="Seu e-mail" 
            name="email" onChange={this.handleChange} />
        </div>
        <div className="field">
          <Button 
            type="submit"
            color="secondary"
            variant="contained">
            Enviar
          </Button>
        </div>
        <Listar messages={this.state.messages}/>
        
      </form>
    );
  }
}

// export default ViewMessagesForm;
