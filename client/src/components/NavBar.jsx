import React from 'react'

function NavBar({title}) {
  return (
    <div className="nav-bar">{title ? title : 'NavBar'}</div>
  )
}

export default NavBar