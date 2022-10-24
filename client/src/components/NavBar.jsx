import { Link } from 'react-router-dom';

function NavBar({ title }) {
  return (
    <div className="nav-bar">
      <Link to="/deepart">deep-art</Link>
    </div>
  )
}

export default NavBar