import React, { useState } from 'react';
import {auth, createUserProfileDocument } from "../firebase/firebase.utils";
import {createUseStyles} from 'react-jss'

const SignUp = () => {
  const classes = useStyles()
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (event) => {
    const onchange = eval(`set${event.target.name}`)
    onchange(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if( password !== confirmPassword ){
      alert("password and confirmPasword not match");
      return;
    }
    try{
      const { user } = await auth.createUserWithEmailAndPassword(email,password)
      await createUserProfileDocument(user, {displayName});
      setDisplayName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }catch (error){
      console.log(error);
    }
  }

  if (auth.currentUser) {
    window.location='/'
  }

  return (
    <div className="signUp">
    <h2 className={classes.title}> Sign Up for Free! </h2>
    <span>Sign Up with your email and passoword </span><br/>

    <form onSubmit={handleSubmit} className="inputSignUp">

      <input className={classes.fields}
        type="text"
        name="DisplayName"
        value={displayName}
        label="Display name"
        onChange={handleChange}
        placeholder="Display Name"
        required
      />

      <input className={classes.fields}
        type="email"
        name="Email"
        value={email}
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input className={classes.fields}
        type="password"
        name="Password"
        value={password}
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <input className={classes.fields}
        type="password"
        name="ConfirmPassword"
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
      >
        Create Account
      </button>
    </form>

  </div>
  )
}

const useStyles = createUseStyles({
  title: {
    color: '#df80ff',
    textAlign: 'left',
    // text-align: 'left',
  },
  fields: {
    border: '2px solid gray',
    borderRadius: '5px',
    maxWidth: "200px",
    width: '80%',
    margin: 'auto',
    marginBottom: '1em',
    textAlign: 'auto',
  }
})


export default SignUp;