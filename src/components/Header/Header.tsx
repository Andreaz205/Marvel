import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <header className='header'>
            <div className='container'>
                <div className='header__content'>
                    <h2><span style={{ color: '#9F0013' }}>Marvel</span> information portal</h2>
                    <div className='header__links'>
                        <Link to="/">
                            <span className='header__links__link'>Characters</span>
                        </Link>
                        /
                        <Link to="comics">
                            <span className='header__links__link'>Comics</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;