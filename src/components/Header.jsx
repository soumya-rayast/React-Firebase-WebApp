import { NavLink } from 'react-router-dom'
const Header = () => {
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <a href="#" className='navbar-brand'>
            Navbar
        </a>
        <div className="collapse navbar-collapse" id='navbarNav'>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/create" className="nav-link">
                        Add
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to="/read" className="nav-link">
                        Read
                    </NavLink>
                </li>
            </ul>
        </div>
    </div>
</nav>
)
}

export default Header
