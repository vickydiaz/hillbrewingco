import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register, loadUser } from '../../../actions/auth';
import { Link } from 'react-router-dom';

const Register = ({ register, loadUser, history, isAuthenticated }) => {
  useEffect(() => {
    loadUser();

  }, [loadUser]);

  useEffect(() => {
    if(isAuthenticated) {
        history.push('/dashboard');
    }
}, [isAuthenticated])

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password2: ''
  });
  

  const { name, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    register(name, password);
  }

  return (
    <div className="dash">

      <form onSubmit={onSubmit}>
        <div className="container auth" style={{ width: '50%' }}>
          <div className="card">
            <h1><img src="hops-active.png" alt="" style={{ height: '50px' }} /><span id="logintitle">Register</span></h1>
            <br /> <br />
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" value={name} onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" value={password} onChange={onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input id="password2" type="password" name="password2" value={password2} onChange={onChange} />
            </div>

            <br />
            <button className="btn-black btn-yellow" type="submit"> Register </button>


            <p className="text-warning">
              Have An Account? <Link to="/login">&nbsp; Log in</Link>
            </p>

          </div>
        </div></form>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, loadUser })(Register);
