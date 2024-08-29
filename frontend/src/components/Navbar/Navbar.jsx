import { Link } from 'react-router-dom';
import viteLogo from '/vite.svg';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/home');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar">
            <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                &#9776;
            </div>
            <ul className={isMenuOpen ? 'nav-links open' : 'nav-links'}>
                <li className='option'><Link to="/home">Home</Link></li>
                <li className='option'> <Link to="/markets">Markets</Link></li>
                <li className='option'><Link to="/buy-crypto">Buy Crypto</Link></li>
                <li className='option'>My Portfolio</li>
            </ul>
            <div className='sign-in'>
                {!isLoggedIn ? (
                    <>
                        <button id='login'><Link to='/login'>Log in</Link></button>
                        <button id='sign-in'> <Link to='/register'>Sign in</Link></button>
                    </>
                ) : (
                    <button id='logout' onClick={handleLogout}>Log out</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
