// import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, HashRouter, Link } from "react-router-dom";
import List from "@material-ui/core/List";

export default class Listar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: {}
    };
  }

  chooseMessage(id) {
    this.props.messages.forEach(msg => {
      if (msg.id === id){
        this.setState({chosen: msg})
      }
    });
  }

  messageDate(sec) {
    const present = new Date();
    const date = new Date(sec);
    var passed = (present.getTime() - date.getTime())/(1000*60*60*24);
    if(passed>1){
      return 'a '+Math.ceil(passed)+' dias'
    } else{
      passed *= 24;
      return 'a '+Math.ceil(passed)+' horas'
    }
  }

  render() {
    return (
      <Router>
        <HashRouter>
          <MensagemID msg={this.state.chosen}/>
          <List>
          {this.props.messages.length > 0 ? (
            <div className="recebidas">
              <p>Mensagens recebidas</p>
              {this.props.messages.map(message => 
                <div className="list">
                  <Link 
                    key={message.id} 
                    to={"/visu?id="+message.id} 
                    value={message.id} 
                    onClick={() => this.chooseMessage(message.id)} >
                      {message.message.substring(0,10)+'... enviada '+this.messageDate(message.createdAt)}
                  </Link></div>)}
            </div>
          ) : (
            <div></div>
          )}
          </List>
          
        </HashRouter>
      </Router>
    )
  };
}

function MensagemID({ msg }) {
  const date = new Date(msg.createdAt);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  var resultDay = '';
  var resultFrom = '';
  var className = ''
  if(day) {
    resultDay = 'Enviada dia '+day+'/'+month+'/'+year;
    resultFrom = 'de: Anônimo para: '+msg.name;
    className = 'msg'
  }
  return (
    <div className={className}>
      <p>{resultFrom}</p>
      <p>{msg.message}</p>
      <p className="data">{resultDay}</p>
    </div>
  );
}