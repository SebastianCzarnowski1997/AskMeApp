import { signInWithGoogle, auth } from "../firebase/firebase.utils.js";
import React, { useState } from 'react';
import {createUseStyles} from 'react-jss'


const SingIn =() => {
  const classes = useStyles()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await auth.signInWithEmailAndPassword(email,password);
      setEmail('')
      setPassword('')

    } catch(error){
      console.log(error);
    }
  }
  const handleChange = (event) => {
    const onchange = eval(`set${event.target.name}`)
    onchange(event.target.value)
  }

  if (auth.currentUser) {
    window.location='/'
  }

  return (

  <div className="logIn">
    <h2 className={classes.title}>Sign In</h2>
    <span> Sign in with your email and password </span><br/>
    <form onSubmit = {handleSubmit}>
      <input className={classes.fields}
        name="Email"
        type="email"
        value={email}
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input className={classes.fields}
        name="Password"
        type="password"
        value={password}
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <div>
        <button type="submit" value="Submit Form" > Sign in  </button>
      </div>
    </form>
    <button onClick={signInWithGoogle} value="Submit Form" > Sign in with google </button>

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
export default SingIn;