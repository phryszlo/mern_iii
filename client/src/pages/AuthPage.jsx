import LoginForm from "../components/LoginForm"
import { useState } from 'react';

function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="login-toggle-wrapper">
        <button onClick={() => {
          console.log(`isLogin?: ${isLogin}`)
          setIsLogin(!isLogin)
          }}>
          {!isLogin ? 'already have an account' : 'SIGN UP'}
        </button>
      </div>
      <LoginForm isLogin={isLogin} setUser={setUser} />
    </div>
  )
}

export default AuthPage