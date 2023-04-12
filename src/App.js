import React, { Component } from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Header from './components/layout/Header';
import Test from './components/test/Test';
import { Provider } from './context';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <Provider>
        <HashRouter>
        <div>
          <Header branding="Contact Manager"></Header>
          <div className="container">
            <Switch>
              <Route exact path='/' component={Contacts}></Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/contact/add' component={AddContact}></Route>
              <Route exact path='/contact/edit/:id' component={EditContact}></Route>
              <Route exact path= '/test' component={Test}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </div>
        </HashRouter>
      </Provider>
      
    )
  }
}


export default App;