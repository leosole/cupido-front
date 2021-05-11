import './App.css';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Enviar from "./containers/Enviar";
import Visu from "./containers/Visu";
import List from "@material-ui/core/List";
import Header from './containers/Header';

function App() {
  return (
    <HashRouter>
      <Header />
      <div className="App">
        <List className="menu">
              <NavLink to="/" activeClassName="current" exact><li>Enviar</li></NavLink>
              <NavLink to="/visu" activeClassName="current" exact><li>Receber</li></NavLink>
        </List>
        <div className="content">
          <Route exact path="/" component={Enviar}/>
          <Route path="/visu" component={Visu}/>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
