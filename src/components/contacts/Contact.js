import React, { Component, } from 'react';
import { Consumer } from '../../context';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Contact extends Component {

  state = {
    showContactInfo: false
  };

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({type: 'DELETE_CONTACT', payload: id})
  }
  onShowClick = e => {
    this.setState({showContactInfo: !this.state.showContactInfo})
  }
  render() {
    const { id, name, email, phone} = this.props.contact
    const  {showContactInfo} = this.state
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card card-body mb-3'>
              <h4>
                {name}
                <i onClick={() => this.setState({showContactInfo: !showContactInfo})} className="fas fa-sort-down" style={{cursor: 'pointer', marginLeft: '1rem'}}></i>
                <i className="fas fa-times" style={{color: 'red', float: 'right', cursor: 'pointer'}} onClick={this.onDeleteClick.bind(this, id, dispatch)}></i>
                <Link to={`/contact/edit/${id}`}>
                  <i className="fa fa-pencil-alt" style={{float: 'right', cursor: 'pointer', color: 'black', marginRight: '1rem'}}></i>
                </Link>
      
              </h4>
              {showContactInfo ? (<ul className='list-group'>
                <li className='list-group-item'>Email: {email}</li>
                <li className='list-group-item'>Phone No: {phone}</li>
              </ul>): null}
            </div>
          )
        }}
      </Consumer>


    )
  }
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default Contact;
