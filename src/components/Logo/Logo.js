import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import faceLogo from './faceLogo.png';

const Logo = () => {
	return (
		<div>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 130, width: 130 }} >
			 <div className="Tilt-inner pa4">
			 	<img style={{borderRadius: 3}} alt="" src={ faceLogo } /> 
			 </div>
			</Tilt>
		</div>
)};

export default Logo