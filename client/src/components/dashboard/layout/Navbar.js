import React, { Fragment, useEffect } from 'react';
import { url } from '../../../config';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';


const Navbar = ({ logout, history }) => {
    const onLogout = (e) => {
        e.preventDefault();
        
        logout();
    }

    


    return (
        <Fragment>
           <div className="navbar">
                <img src={`${url}/uploads/category-icons/hops-active.png`} alt="" className="dash-logo-img" />
                <a href="#!" className="navBrand">Dashboard</a>
                <ul className="navbar-ul">
                    <li><a href="#!" onClick={onLogout}>LOGOUT</a></li>
                    <li><a href="#!">BEER</a></li>
                    <li><a href="#!">RECIPES</a></li>
                </ul>
            </div>
        </Fragment>
    )
}


export default connect(null, { logout })(Navbar); 


