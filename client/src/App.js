import './App.css';
import './style.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AuthPage from './pages/AuthPage';
import EntityList from './pages/EntityList';
import UsersList from './components/UsersList';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      {user ?
        (<>
          <NavBar user={user} setUser={setUser} title='test title' />
          <div className="content-shell">
            <Routes>
              <Route path="/" element={<EntityList />} />
              <Route path="/entities" element={<EntityList />} />
              <Route path="/users" element={<UsersList />} />
            </Routes>
          </div>
        </>)
        : (<AuthPage setUser={setUser} />)
      }
    </div>
  );
}

export default App;
