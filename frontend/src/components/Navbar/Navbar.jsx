import { Link } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './Navbar.css'

function Navbar() {
    return (
    <>
        <div className="navbar">
            <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <ul>
                <li className='option'><Link to="/">Home</Link></li>
                <li className='option'>Exchange</li>
                <li className='option'><Link to="/info">Info</Link></li>
                <li className='option'>Contact</li>
            </ul>
            <button className='sign-in'>Sign in</button>
        </div>
    </>
    )
}

export default Navbar;