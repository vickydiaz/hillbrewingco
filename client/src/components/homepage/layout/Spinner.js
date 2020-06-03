import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
        <div style={{ height: '700px'}}>
            <img 
                src={spinner}
                style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt="Loading.."
            />
        </div>    
        </Fragment>
    )
}

export default Spinner;