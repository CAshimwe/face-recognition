import React from 'react';

const Rank =({name, entries}) =>{
    return(
    <div className = 'center'>
        <div className='white f3'>
            {`${name} your current count is:` }

        </div>
        <div className='white f5'>
            {entries}
        </div>
    </div>   
    );
    
}
export default Rank;