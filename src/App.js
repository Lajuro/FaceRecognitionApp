import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '28ca5b334ea6437fab29ed6de82a41a6'
 });

const particleOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_are: 800
        }
      }
    }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImg = document.querySelector("#inputImg");

    const width = Number(inputImg.width);
    const height = Number(inputImg.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(this.state.box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
        response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles 
          params={particleOptions} className='particles'/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition box={this.state.box} image={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
