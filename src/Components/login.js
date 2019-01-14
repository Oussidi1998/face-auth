import React,{ Component } from 'react';
import {Toaster,Intent} from '@blueprintjs/core';
import { app , facebookProvider } from './firebase';
import './login.css';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:this.props.mail,
            password:this.props.pass,
            redirect:false
        }
    }
    
    refHandlers = {
        toaster: (ref) => this.toaster = ref,
    };

    handleInput(e){
        const {name,value} = e.target;
        this.setState({ [name]: value });
    }

    authWithFacebook(){
       app.auth().signInWithPopup(facebookProvider).then((result,error)=>{
           if(error){
               this.toaster.show({intent: Intent.DANGER ,message:"Unable to sign in with facebook "})
           }else{
               this.setState({ redirect:true })
               this.props.login_state(this.state.redirect)   
               localStorage.setItem("is_Logged",'yes');            
           }
       })
    }

    handleFormLogin(e){
        e.preventDefault();
        app.auth().fetchProvidersForEmail(this.state.email)
        .then((providers)=>{

            if(providers.length === 0){
                // create user and we don't wanna create it until register
               // return app.auth().createUserWithEmailAndPassword(this.state.email,this.state.password);
                this.toaster.show({ intent: Intent.DANGER , message:"please register and then log in"})
            }else if(providers.indexOf("password") === -1){
                // he is used facebook
                this.toaster.show({ intent: Intent.DANGER , message:"Try login with facebook"})
            }else{
                // sign user in
               return app.auth().signInWithEmailAndPassword(this.state.email,this.state.password);
            }

            this.setState({
                email:'',
                password:'',
            })
        })
        .then((user)=>{
            if(user){
                this.setState({ redirect:true })
                this.props.login_state(this.state.redirect)  
                localStorage.setItem("is_Logged",'yes');    
            }
        })
        .catch((error)=>{
            this.toaster.show({ intent: Intent.DANGER , message:error.message})
        })
    }

    render(){

       return(
            <div className='Container'>
                <div className='toaster'>
                <Toaster ref={this.refHandlers.toaster} />
            </div>
            <div className='boxLogin'>
               <button type='button' onClick={this.authWithFacebook.bind(this)}>Login with facebook</button><br/><br/>
               <center className='orLogin'>or login using email and password</center>
               <form action="" onSubmit={this.handleFormLogin.bind(this)}>
               <input type="email" name="email" value={this.state.email} placeholder='email' onChange={this.handleInput.bind(this)} />
                <input type="password" name='password' value={this.state.password} placeholder='password' onChange={this.handleInput.bind(this)} />
                <input type="submit" disabled={!this.state.password || !this.state.email} value='log in' className='btn_login_register' />
               </form>
            </div>    
            </div>      
        )

    }
}

export default Login;