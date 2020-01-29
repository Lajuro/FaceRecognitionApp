import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({image, box}) => {
    return (
        <div className='center'>
            <div className='absolute ma3'>
                <img id='inputImg' src={image} alt="Face Recognition" className='br3' width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;