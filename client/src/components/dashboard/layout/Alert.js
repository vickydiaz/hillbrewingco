import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alert: { alertMessage, alertType } }) => {

    return (

        alert.Message !== null && (
        <div>
            {alertMessage}
        </div>)
    )
}

const mapStateToProps = state => ({
    alert: state.alert
})

export default connect(mapStateToProps)(Alert);
