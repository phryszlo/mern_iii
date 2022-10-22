import { useEffect } from 'react';
import { useState } from 'react'
import { signUp } from "../utils/users-service";

function LoginForm({ isLogin, setUser }) {

  const [name, setName] = useState('daren');
  const [email, setEmail] = useState('daren@d.d');
  const [password, setPassword] = useState('123');
  const [confirm, setConfirm] = useState('123');
  const [error, setError] = useState('');

  // useEffect(() => {
  //   setName('daren')
  //   setEmail('daren@d.d')
  //   setPassword('123')
  //   setConfirm('123')
  //   setError('')
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Retrieve state
    // const state = { name, email, password, confirm, error };
    const formData = { name, email, password};
    try {
      console.log(`submit handler`)
      // const  { confirm, error, ...formData } = state;

      console.log(`formData=${JSON.stringify(formData)}`);

      const user = await signUp(formData);

      console.log(user);
      setUser(user.data);
    } catch (error) {
      setError("Sign Up Failed - Try Again");
    }
  }

  // Create a handle change method to keep track of changes inside the form
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmChange = (e) => {
    setConfirm(e.target.value);
  };
  const handleErrorChange = (e) => {
    setError(e.target.value);
  };

  return (
    <div>
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {isLogin && (
            <>
              <label htmlFor='name-field'>name:</label>
              <input
                type="text"
                name="name"
                onChange={(e) => {
                  return handleNameChange(e);
                }}
                value={name ? name : ''}
                required />
            </>
          )}
          <label htmlFor='email-field'>email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              return handleEmailChange(e);
            }}
            value={email ? email : ''}
            required />
          <label htmlFor='password-field'>password:</label>
          <input
            type="password"
            id="password-field"
            onChange={(e) => {
              return handlePasswordChange(e);
            }}
            value={password ? password : ''}
            required />
          {isLogin && (
            <>
              <label htmlFor='confirm-field'>confirm:</label>
              <input
                type="password"
                name="confirm"
                onChange={(e) => {
                  return handleConfirmChange(e);
                }}
                value={confirm ? confirm : ''}
                required />
            </>
          )}
          <button type="submit">
            {!isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  )
}

export default LoginForm