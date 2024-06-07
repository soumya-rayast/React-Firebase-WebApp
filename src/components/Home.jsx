import { NavLink } from "react-router-dom"
const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to PhotoStream</h1>
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            You can add Image through this link : 
            <NavLink to="/create">
              Add Image 
            </NavLink>
          </li>
          <li className='nav-item'>
            You can see image :
            <NavLink to="/read" >
              Photos to watch
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
