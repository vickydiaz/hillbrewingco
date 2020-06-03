import React, { useEffect } from 'react';
import Navbar from './layout/Navbar';
import EditButtons from './layout/EditButtons';
import Main from './layout/Main';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';


const Dashboard = ({ loadUser, auth: { isAuthenticated, token } , history }) => {
    useEffect(() => {  
        setAuthToken(token);
        loadUser();
    }, []);

    return (
        <div className="dash">
            <Navbar />
            <div className="container">
                <EditButtons />
                <Main />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadUser })(Dashboard);