import { NavLink } from 'react-router-dom'
// import "./Style/Header.css"
const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id='navbarNav'>
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/create" className="nav-link">
                                Add
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to="/read" className="nav-link">
                                Photos
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
