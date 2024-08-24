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
                <li className='option'><Link to="/home">Home</Link></li>
                <li className='option'> <Link to="/markets">Markets</Link></li>
                <li className='option'>Buy Crypto</li>
                <li className='option'>My Portfolio</li>
            </ul>
            <button className='sign-in'>Sign in</button>
        </div>
    </>
    )
}

export default Navbar;