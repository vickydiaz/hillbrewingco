import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ isAuthenticated }) => {
    return (
        <nav className="mobile-hide">
                <Link to="/" className="active">RECIPES</Link>
                <Link to="#!">BEERS</Link>
                <a href="/login"> { isAuthenticated ? 'DASHBOARD' : 'LOGIN' } </a>
        </nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Navbar);
