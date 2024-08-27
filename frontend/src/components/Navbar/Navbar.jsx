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
            <div className='sign-in'>
                <button id='login'><Link to='/login'>Log in</Link></button>
                <button id='sign-in'> <Link to='/register'>Sign in</Link></button>
            </div>
        </div>
    </>
    )
}

export default Navbar;