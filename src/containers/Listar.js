// import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, HashRouter, Link } from "react-router-dom";
import List from "@material-ui/core/List";

export default class Listar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: {},
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
          <div className="dashboard">
            <div>
              <MensagemID msg={this.state.chosen}/>
              <List>
              {this.props.messages.length > 0 ? (
                <div className="recebidas">
                  <p>Mensagens recebidas</p>
                  {this.props.messages.map(message => 
                    <div className="list" >
                      <Link 
                        key={message.id} 
                        to={"/visu?id="+message.id} 
                        value={message.id} 
                        onClick={() => this.chooseMessage(message.id)} >
                          <div className="msg-preview">
                            {message.message.substring(0,10)+'...'}
                          </div>
                          <div className="msg-time">
                            {'enviada '+this.messageDate(message.createdAt)}
                          </div>
                      </Link></div>)}
                </div>
              ) : (
                <div></div>
              )}
              </List>
            </div>
          </div>
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
  const minutes = date.getMinutes();
  const hours = date.getHours();
  var resultDay = '';
  var resultFrom = '';
  var className = 'empty-msg'
  if(day) {
    resultDay = 'Enviada dia '+day+'/'+month+'/'+year+', às '+hours+':'+minutes;
    resultFrom = 'de: Anônimo para: '+msg.name;
    className = 'msg'
  }
  return (
    <div className={className}>
      <p className="data">{resultFrom}</p>
      <p>{msg.message}</p>
      <p className="data"><i>{resultDay}</i></p>
    </div>
  );
}