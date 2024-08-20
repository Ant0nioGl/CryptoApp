import viteLogo from '/vite.svg'
import './Navbar.css'

function Navbar() {
    return (
    <>
        <div class="navbar">
            <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <ul>
                <li className='option'>Home</li>
                <li className='option'>Exchange</li>
                <li className='option'>About</li>
                <li className='option'>Contact</li>
            </ul>
            <button className='sign-in'>Sign in</button>
        </div>
    </>
    )
}

export default Navbar;