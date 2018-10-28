import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateUser } from './../reducers/UserReducer';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




class UserInfo extends Component {

  constructor() {
    super();
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount() {
    const { user } = this.props;

    if(!user) {
        return null;
    }

    this.setState(user)
}

componentDidUpdate(prevProps) {
    const { user } = this.props;

    if(prevProps !== this.props) {
        this.setState(user)
    }
}

handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
}

handleSubmit(event) {
    const { onUpdateUser } = this.props;

    event.preventDefault();
    this.confirmPassword();

    onUpdateUser(this.state);
}

confirmPassword() {
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;

    if(password1 === password2) {
       this.setState({ password: 'test' })
    console.log(password1)
    };

  }

render() {
  const { handleChange, handleSubmit } = this;
  const { firstName, lastName, email, userName, password } = this.state;

  return (

    <Fragment>

      <Typography
        variant="h2"
        gutterBottom
        style={{ color: 'dodgerblue' }}
      >
        {`${firstName}'s Account`}
      </Typography>

      <br />
      <br />

      <Typography variant="h4" gutterBottom>Profile</Typography>

      <form onSubmit={ handleSubmit } >

        <Grid container justify="flex-start" spacing={16}>

            <Grid item>
                <TextField
                    required
                    name="firstName"
                    label="first name"
                    margin="normal"
                    variant="filled"
                    value={ firstName }
                    onChange={ handleChange }
                />
            </Grid>

            <Grid item>
                <TextField
                    required
                    name="lastName"
                    label="last name"
                    margin="normal"
                    variant="filled"
                    value={ lastName }
                    onChange={ handleChange }
                />
            </Grid>

        </Grid>

        <TextField
          required  
          name="email"
          label="email"
          margin="normal"
          variant="filled"
          value={ email }
          onChange={ handleChange }
        />

        <br />
        <br />
        <br />
        <br />

        <Typography variant="h4" gutterBottom>Login / Security</Typography>

        <TextField
            required
            name="username"
            label="username"
            margin="normal"
            variant="filled"
            value={ userName }
            onChange={ handleChange }
        />

        <br />
        <br />

        {/* <Typography variant="subtitle1" style={{ color: 'red' }}gutterBottom>Change Password</Typography> */}

        <TextField
            required
            name="password"
            label="password"
            type="password"
            margin="normal"
            variant="filled"
            value={ password }
            onChange={ handleChange }
        />

        {/* <Grid container justify="flex-start" spacing={16}>
        
            <Grid item>
                <TextField
                    // required
                    id="password1"
                    // name="password"
                    label="new password"
                    name="password1"
                    type="password"
                    margin="normal"
                    variant="filled"
                    onChange={ handleChange }
                />
            </Grid>

            <Grid item>
                <TextField
                    // required
                    id="password2"
                    // name="password"
                    label="confirm password"
                    name="password2"
                    type="password"
                    margin="normal"
                    variant="filled"
                    onChange={ handleChange }
                />
            </Grid>

          </Grid> */}

        <br/>
        <br/>

        <Button
            type="submit"
            variant="contained"
            color="primary" 
            // className={classes.button}
        >
            Save
        </Button>

        </form>

        <br/>
        <br/>

      </Fragment>
    )

  }

}


const mapDispatchToProps = dispatch => {
return {
    onUpdateUser: (user) => dispatch(updateUser(user))
  }
}

export default connect(null, mapDispatchToProps)(UserInfo);




