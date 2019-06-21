import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContestant } from "../../store/actions/contestantActions";

class CreateContestant extends Component {
  state = {
    content: '',
    firstName:'',
    lastName:'',
    role:''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createContestant(this.state);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Contestants</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="role">Role</label>
            <input type="text" id="role" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="content">Contestants Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      createContestant: (contestant) => dispatch(createContestant(contestant))
    }
}

export default connect(null, mapDispatchToProps)(CreateContestant);
