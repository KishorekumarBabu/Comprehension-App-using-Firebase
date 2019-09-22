import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) {
      return <Redirect to={"/user/" + auth.uid} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="create-passage section">
              <div className="card z-depth-0">
                <div className="card-content">
                  <span className="card-title center"> Sign In </span>
                  <form onSubmit={this.handleSubmit} className="white">
                    <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="validate"
                        required
                        aria-required="true"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        className="validate"
                        required
                        aria-required="true"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="input-field">
                      <button className="btn lighten-1 z-depth-0">Login</button>
                      <div className="center red-text">
                        {authError ? <p>{authError}</p> : null}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
