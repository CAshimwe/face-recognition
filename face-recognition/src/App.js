import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Signin from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import 'tachyons';
import './App.css';


const particlesOptions = {
  particles: {
    number:{
    value: 100,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}

const initialState  = {
  input:'',
  imageUrl:'',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries:0,
    joined: ''
          }
        }

class App extends Component {

  constructor()
  {
    super()
    this.state= initialState;
                
  }
              

    loadUser =(data)=>{
      this.setState({user:       
        {id: data.id,
        name: data.name,
        email: data.email,
        entries:data.entries,
        joined: data.joined
      }
    })
    }

    calculateFaceLocation = (data)=>{
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const  image = document.getElementById('inputImage');
      const width = Number (image.width);
      const height = Number (image.height) ;
      //we want to return an object, and this object will feed the "box state"
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)

      }
    }
      // filling the box state with the previous values
      displayFaceBox = (box) => {
        this.setState({box:box});
        // console.log(box);
      }
    
    //update the value of the input
    onInputChange = (event)=>{
      this.setState ({input: event.target.value});
    }
    //receiving the image URL and click on the detect button to detect image
    onPictureSubmit=()=>{
        this.setState({imageUrl: this.state.input})
        fetch('https://shrouded-headland-52145.herokuapp.com/imageUrl', {
          method:'post',
          headers:{'Content-Type':'application/json'},
          
          body: JSON.stringify({
              input: this.state.input
            

          }) 
        })
          .then (response => response.json())
          .then(response => {
            if (response){
              fetch('https://shrouded-headland-52145.herokuapp.com/image', {
                method:'put',
                headers:{'Content-Type':'application/json'},
                
                body: JSON.stringify({
                    id: this.state.user.id
                   
        
                }) 
              })
              .then(response => response.json())
              .then(count =>{
                this.setState({user:{
                  entries: count
                }})
              })

              
            }
            this.displayFaceBox(this.calculateFaceLocation(response))
          })
            
          
          .catch(err => console.log(err));
              
          
        }

    onRouteChange=(route)=>{
      if(route === 'signout'){
        this.setState(initialState);
      } else if (route === 'home'){
        this.setState({isSignedIn:true})
      }
      this.setState({route:route});
    }
  
  render(){
    return (
      <div className="App">
      <Particles className="particles"
        params={particlesOptions}
      />

    
    
        <div className = "App">
          <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {/* if condition in order to redirect the user */}
        { this.state.route === 'home'?
          
          <div>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
            onInputChange = {this.onInputChange} 
            onPictureSubmit ={this.onPictureSubmit}
          />
        
          <FaceRecognition 
          box = {this.state.box}
          imageUrl = {this.state.imageUrl}
          />
          </div>
          :(this.state.route === 'signin'
           ? <Signin loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
           :<Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        } 
        </div>
        </div>
    );
    }
  }
  

export default App;