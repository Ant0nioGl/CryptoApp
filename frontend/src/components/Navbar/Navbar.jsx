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
            <Link to="/home">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </Link>
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                &#9776;
            </div>
            <ul className={isMenuOpen ? 'nav-links open' : 'nav-links'}>
                <Link to="/home"><li className='option'>Home</li></Link>
                <Link to="/markets"><li className='option'>Markets</li></Link>
                <Link to="/buy-crypto"><li className='option'>Buy Crypto</li></Link>
                <Link to="/portfolio"><li className='option'>My Portfolio</li></Link>
                
                {/* Conditionally render the login and register links in the menu when it is open */}
                {isMenuOpen && !isLoggedIn && (
                    <>
                        <Link to="/login"><li className='option'>Log in</li></Link>
                        <Link to="/register"><li className='option'>Sign in</li></Link>
                    </>
                )}
                {isMenuOpen && isLoggedIn && (
                    <li className='option' onClick={handleLogout}>Log out</li>
                )}
            </ul>
            <div className='sign-in'>
                {!isLoggedIn ? (
                    <>
                        <Link to='/login'><button id='login'>Log in</button></Link>
                        <Link to='/register'><button id='sign-in'>Sign in</button></Link>
                    </>
                ) : (
                    <button id='logout' onClick={handleLogout}>Log out</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
