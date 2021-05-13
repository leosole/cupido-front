import React from 'react';
import TodayIcon from '@material-ui/icons/Today';

export default class MsgCard extends React.Component {
    state = {
      open: false,
    };
    
    handleClick = () => {
      if (this.state.open) {
        this.setState({
          open: false,
        });
      } else {
        this.setState({
          open: true,
        });
      }
    };
    render() {
      return (
        <div
          className={"msgcard " + (this.state.open ? "expand" : "")}
          onClick={this.handleClick}
        >
            <div className='msgcontent'>
                <div className={ (this.state.open ? "opened" : "closed")}>
                    <MsgDate msg={this.props.msg}/>
                </div>
                <div className="lower">
                    <MsgBody msg={this.props.msg} />
                </div>
            </div>

        </div>
      );
    }
  }
  function MsgDate({msg}) {
    const present = new Date();
    const date = new Date(msg.createdAt);
    var passed = (present.getTime() - date.getTime())/(1000*60*60*24);
    if(passed<1){
      const minutes = Math.ceil(passed*60);
      const plural = minutes === 1? ' minuto':' minutos';
      return 'Para: '+msg.name+', a '+minutes+plural
    }
    if(passed>=1){
      const days = Math.ceil(passed);
      const plural = days === 1? ' dia':' dias';
      return 'Para: '+msg.name+', a '+days+plural
    } else{
      const hours = Math.ceil(passed*24);
      const plural = hours === 1? ' hora':' horas';
      return 'Para: '+msg.name+', a '+hours+plural
    }
  }

  function MsgBody({ msg }) { 
    const date = new Date(msg.createdAt);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const resultDay = day+'/'+month+'/'+year+', às '+hours+':'+minutes;
    return (
      <div >
        <p>{msg.message}</p>
        <p className="date"><TodayIcon fontSize='inherit'/><i>{resultDay}</i></p>
      </div>
    );
  }
