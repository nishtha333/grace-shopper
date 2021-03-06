import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Button, TextField, Typography, Paper } from '@material-ui/core';
import { addUser } from '../store';

class RegisterUser extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      address: '',
      error: '',
    };
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleRegistration(event) {
    const {
      firstName,
      lastName,
      userName,
      password,
      email,
      address,
    } = this.state;
    event.preventDefault();
    this.props
      .addUser({ firstName, lastName, userName, password, email, address })
      .then(() => this.props.history.push('/registerSuccess'))
      .catch(error => {
        console.log(error.errors);
        this.setState({ error: error.message });
      });
  }

  render() {
    const {
      firstName,
      lastName,
      userName,
      password,
      email,
      address,
      error,
    } = this.state;
    const { handleChange, handleRegistration } = this;

    const isValidEmail = email => {
      const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
      return regExp.test(String(email));
    };

    return (
      <Grid container justify="center">
        <Grid item xs>
          <div style={{ marginTop: 25, marginBottom: 25, height: '80vh' }}>
            <Grid container justify="center">
              <Grid item>
                <Paper elevation={1}>
                  <form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '30vw',
                      padding: '5vh 5vw 5vh 5vw',
                    }}
                  >
                    <Typography variant="title" style={styles.element}>
                      Create account
                    </Typography>

                    <TextField
                      required
                      id="firstName"
                      label="First Name"
                      variant="outlined"
                      style={styles.element}
                      value={firstName}
                      onChange={handleChange('firstName')}
                    />

                    <TextField
                      required
                      id="lastName"
                      label="Last Name"
                      variant="outlined"
                      style={styles.element}
                      value={lastName}
                      onChange={handleChange('lastName')}
                    />

                    <TextField
                      required
                      id="userName"
                      label="Username"
                      variant="outlined"
                      style={styles.element}
                      value={userName}
                      onChange={handleChange('userName')}
                    />

                    <TextField
                      required
                      id="password"
                      label="Password"
                      variant="outlined"
                      style={styles.element}
                      value={password}
                      type="password"
                      onChange={handleChange('password')}
                    />

                    <TextField
                      required
                      id="email"
                      label="Email"
                      variant="outlined"
                      style={styles.element}
                      value={email}
                      onChange={handleChange('email')}
                      error={email.length > 0 && !isValidEmail(email)}
                    />

                    <TextField
                      required
                      id="address"
                      label="Address"
                      variant="outlined"
                      style={styles.element}
                      value={address}
                      onChange={handleChange('address')}
                    />

                    <Button
                      variant="contained"
                      style={{ width: '10vw', height: '6vh', margin: 10 }}
                      onClick={handleRegistration}
                      disabled={
                        !firstName ||
                        !lastName ||
                        !userName ||
                        !password ||
                        !email ||
                        !address ||
                        !isValidEmail(email)
                      }
                    >
                      Register
                    </Button>

                    <Typography variant="subheading">
                      Already Registered?
                      <Link to="/login">Login Here</Link>
                    </Typography>

                    {error ? (
                      <Typography variant="subheading" style={{ color: 'red' }}>
                        Error processing request. Please try again
                      </Typography>
                    ) : (
                      ''
                    )}
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user)),
  };
};

const styles = {
  element: { margin: 10 },
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterUser);
