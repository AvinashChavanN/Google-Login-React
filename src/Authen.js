import React, { Component} from 'react'
var firebase = require('firebase');
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);
export default class Authen extends Component {

  signup(event){

    const email = this.refs.email.value;
    const password = this.refs.pass.value;
    console.log(email,password);
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password);

    promise
    .then(user=>{
      var err = "Welcome"+user.email;
      firebase.database().ref('users'+user.uid).set({
        email:user.email
      })
      console.log(user);
      this.setState({err:err});
    });
    promise.catch(e=>{
      var err = e.message;
      console.log(err);
      this.setState({err:err});
    })
  }
  logout(event){

    firebase.auth().signOut();
      var lout = document.getElementById('logout');
      lout.classList.add('hide');
      var lin = document.getElementById('login');
      lin.classList.remove('hide');
  }
  login(event){
    const email = this.refs.email.value;
    const password = this.refs.pass.value;
    console.log(email,password);

      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(email,password);


      promise.then(user=>{
        var lout = document.getElementById('logout');
        lout.classList.remove('hide');
        var lin = document.getElementById('login');
        lin.classList.add('hide');

      });
      promise.catch(e=>{
        var err = e.message;
        console.log(err);
        this.setState({err:err});
      });
  }
  constructor(props){
    super(props);

    this.state = {
      err:''
    };
    this.login=this.login.bind(this);
    this.signup=this.signup.bind(this);
    this.logout=this.logout.bind(this);
  }
  render(){
    return(
      <div>
        <input id ="email" ref="email" type="email" placeholder="Enter your email"/><br/>
        <input id ="pass" ref="pass" type="password" placeholder="Enter your password"/><br/>
        <p>{this.state.err}</p>
        <button id ="login" onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button id ="logout" className ="hide" onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}
