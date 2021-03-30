import React from 'react';
import './Rank.css';

const Rank = (props) => {
	return (
		<div class='rankDiv'>
			<div>
				{`Hi ${props.name}, your current count is...`}
			</div>
			<div>
				{ props.entries }
			</div>
		</div>
	);
}

export default Rank;