import React from 'react';
import './FaceRecognition.css';
import 'tachyons';

const FaceRecognition = (props) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={props.imageUrl} width='500px' height='auto' />
				<div className='bounding-box' style={{top: props.box.top, bottom: props.box.bottom, left: props.box.left, right: props.box.right}} ></div>
			</div>
		</div>
	);
}

export default FaceRecognition;