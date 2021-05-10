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

  render() {
    return (
      <Router>
        <HashRouter>
          <List>
          {this.props.messages.length > 0 ? (
            <div>
              {this.props.messages.map(message => <Link key={message.id} to={"/visu/message?id="+message.id} value={message.id} onClick={() => this.chooseMessage(message.id)} >{message.message.substring(0,10)+'...'}</Link>)}
            </div>
          ) : (
            <div></div>
          )}
          </List>
          <MensagemID msg={this.state.chosen}/>
        </HashRouter>
      </Router>
    )
  };
}

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

function MensagemID({ msg }) {
  return (
    <div>
      <p>{msg.message}</p>
    </div>
  );
}