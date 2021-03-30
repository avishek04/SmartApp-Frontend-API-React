import React, {Component} from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';

const app = new Clarifai.App({
 apiKey: '97d18246d4904f5b9916de2b4484f9a2'
});

const particlesOptions = {
	particles: {
		number: {
			value: 50,
			density: {
				enable: true,
				value_area: 800
			}
		},
		color: {
	            value: "#000000"
	        },
	        line_linked: {
            				color: "#000000"
            			}
	}
}

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: '',
		joined: ''
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	calculateFaceLocation = (data) => {
		const lengthRatio = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			left: lengthRatio.left_col * width,
			right: width - (lengthRatio.right_col * width),
			top: lengthRatio.top_row * height,
			bottom: height - (lengthRatio.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({ box: box});
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	}

	onPictureSubmit = (event) => {
		this.setState({ imageUrl: this.state.input });
		fetch('https://vast-thicket-24685.herokuapp.com/imageurl', {
				  			method: 'post',
				  			headers: { 'Content-Type': 'application/json' },
				  			body: JSON.stringify({
				  				input: this.state.input
				  			})
				  		}).then(response => response.json())
						  .then(response => {
						  	if (response) {
						  		fetch('https://vast-thicket-24685.herokuapp.com/image', {
						  			method: 'put',
						  			headers: { 'Content-Type': 'application/json' },
						  			body: JSON.stringify({
						  				id: this.state.user.id
						  			})
						  		}).then(response => response.json())
						  		  .then(count => {
						  			this.setState(Object.assign(this.state.user, { entries: count }));
						  		}).catch(error => console.log(error));
						  	}
						  	this.displayFaceBox(this.calculateFaceLocation(response));
						  }).catch(error => console.log(error));		  	
	}

	onRouteChange = (route) => {
		if (route === 'signin' || route === 'register') {
			this.setState(initialState);
		}
		else if (route === 'home'){
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	} 

	loadUser = (user) => {
		this.setState({user: {
					id: user.id,
					name: user.name,
					email: user.email,
					entries: user.entries,
					joined: user.joined
				}})
	}
 
	render() {
		return (
			<div className="App">
		      <Particles 
		      	className='particles'
		        params={particlesOptions} 
		      />
		      {	this.state.route === 'signin' ? 
		      	  <div>
			      	  <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
			      	  <Logo />
				      <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
			      </div>
			      : 
			      this.state.route === 'register' ?
			      <div>
			      	  <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
			      	  <Logo />
				      <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
			      </div>
			      :
			      <div>
			      	<Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
			      	<Logo />
				    <Rank name={this.state.user.name} entries={this.state.user.entries} />
				    <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
				    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
			      </div> 
		  	  }
		    </div>
		);
	}
}

export default App;
