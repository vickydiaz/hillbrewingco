import React, { Fragment } from 'react';
import Navbar from './Navbar';

const Landing = () => {
    return (
        <Fragment>
            <div className="landing-page">
                <Navbar />

                <div className="logo">
                    <h1>Hill <br /> Brewing <br /> Co</h1>
                    <hr className="logo-line" />
                    <p className="est">Est 2019</p>
                </div>
            </div>
        </Fragment>
    )
}

export default Landing;
