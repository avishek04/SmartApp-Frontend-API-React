import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = (props) => {
	return (
		<div class='mainDiv'>
			<p>
				This App will detect face in picture. Please enter the link to your image in the text below...
			</p>
			<div class='formDiv'>
				<input type='text' class='textBox' onChange={props.onInputChange} />
				<button 
					class='btn' 
					onClick={props.onPictureSubmit} 
				>
					Detect
				</button>
			</div>
		</div>
	);
}

export default ImageLinkForm;