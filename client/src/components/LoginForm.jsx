import { useEffect } from 'react';
import { useState } from 'react'
import { logIn, signUp } from "../utils/users-service";

function LoginForm({ isLogin, setUser }) {

  const [name, setName] = useState('daren');
  const [email, setEmail] = useState('daren@d.d');
  const [password, setPassword] = useState('123');
  const [confirm, setConfirm] = useState('123');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(`login form islogin?  : ${isLogin}`);
  }, []);

  // 🔸🔸🔸🔸🔸
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const state = { name, email, password, confirm, error };
    const formData = { name, email, password};
    try {
      // const  { confirm, error, ...formData } = state;
      let user = null;
      if (isLogin) {
        user = await logIn(formData)
      }
      else {
        user = await signUp(formData);
      }

      if (user === 401) setError('login unauthorized')
      console.log('user is ', user);
      setUser(user.data);
    } catch (error) {
      setError(`${isLogin ? 'Login' : 'Sign-up'} Failed - Try Again`);
    }
  }

  // 🔸🔸🔸🔸🔸
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
          {!isLogin && (
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
          {!isLogin && (
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
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  )
}

export default LoginForm