import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { UseAuthContext } from '../hooks/UseAuthContext'

function Navbar({edit}) {

  const { logout } = useLogout()

  const { user } = UseAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className={"Container" + (edit ? " dimmer2" : '')}>
        <div className="container">
            <Link to="/">
                <h2>Note Keeper</h2>
            </Link>
            <nav>
            { user && (
              <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Logout</button>
              </div>
            )}
            {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              </div>
            )}
            </nav>

        </div>
    </header>
  )
}

export default Navbar