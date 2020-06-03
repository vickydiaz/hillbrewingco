import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, loadUser } from '../../../actions/auth';
import { Link, Redirect } from 'react-router-dom';


const Login = ({ login, loadUser, history, isAuthenticated, user }) => {
    useEffect(() => {  
        if(user !== 'loggedOut') {
           loadUser(); 
        }   
        
    }, [loadUser]);

    useEffect(() => {
        if(isAuthenticated) {
            history.push('/dashboard');
        }
    }, [isAuthenticated])

    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })

    const { name, password } = formData;


    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();

        login(name, password);
    }

    return (
        <Fragment>
            <div className="dash">


                <div className="container auth" style={{width: '50%'}} >
                    <div className="card">
                        <h1><img src="hops-active.png" alt="" style={{height: '50px'}} /><span id="logintitle">Login</span></h1>
                        <br /> <br />
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" name="name" value={name} onChange={onChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name="password" value={password} onChange={onChange} />
                            </div>
                            <br />
                            <button className="btn-black btn-yellow" type="submit"> Log in </button>
                        </form>

                        <p className="text-warning">
                            No Account? <Link to="/register">&nbsp; Register</Link>
                        </p>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { login, loadUser })(Login);
