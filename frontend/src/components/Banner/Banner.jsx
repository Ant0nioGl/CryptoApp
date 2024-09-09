import './Banner.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Banner() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleCTAClick = () => {
        if (isLoggedIn) {
            navigate('/markets');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="banner-container">
            <div>
                <h1 data-text="Explore crypto...">Explore <span className='color-text'>crypto</span>...</h1>
                <h2>Start investing today.</h2>
                <button className="cta-button" onClick={handleCTAClick}>
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default Banner;
