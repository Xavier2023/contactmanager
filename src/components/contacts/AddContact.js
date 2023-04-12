import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };
  onSubmit =  async (dispatch, e) => {
    e.preventDefault();
    const {name, email, phone} = this.state
    // Check Fields error
    if( name === '') {
      this.setState({errors: {name: 'Name is requierd'}})
      return;
    } 
    if( email === '') {
      this.setState({errors: {email: 'Email is requierd'}})
      return;
    } 
    if( phone === '') {
      this.setState({errors: {phone: 'Phone No is requierd'}})
      return;
    } 
    const newContact = {
      name,
      email,
      phone
    }
    const res = await axios.post(`https://jsonplaceholder.typicode.com/users`, newContact)
      this.setState(dispatch({type: 'ADD_CONTACT', payload: res.data}))
    

    // Clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    })

    this.props.history.push('/')
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value});

  render() {
    const {name, email, phone, errors} = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value; 
          return (
            <div className='card mb-3'>
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup label='Name' name='name' placeholder='Enter Name...' value={name} onChange={this.onChange} error={errors.name}></TextInputGroup>
                  <TextInputGroup label='Email' name='email'type='email' placeholder='Enter Email...' value={email} onChange={this.onChange} error={errors.email}></TextInputGroup>
                  <TextInputGroup label='Phone No' name='phone' placeholder='Enter Phone No...' value={phone} onChange={this.onChange} error={errors.phone}></TextInputGroup>
                  <input type="submit" value="Add Contact" className='btn btn-light btn-block' />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default AddContact
