import React from 'react';
import './ImageForm.css';

const ImageLinkForm =({onInputChange, onPictureSubmit}) =>{

    return(
        <div>
            <p className='center f3'>
                {'Magic Brain for image detection'}
            </p>
            <div className='center'>
                <div className = 'form center pa3 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type = 'text'onChange = {onInputChange}/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue'onClick = {onPictureSubmit}> Detect</button>
                </div>
            </div>
        </div>
    );
}
export default ImageLinkForm;