import MsgCard from './MsgCard'
import React from 'react';
import { BrowserRouter as Router, HashRouter } from "react-router-dom";
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
            <div><br></br>
              <List>
              {this.props.messages.length > 0 ? (
                <div className="recebidas">
                  {this.props.messages.map(message => <MsgCard msg={message} />)}
                </div>
              ) : <div></div>}
              </List>
            </div>
          </div>
        </HashRouter>
      </Router>
    )
  };
}
