import React,{ Component } from 'react'
import {Toaster,Intent} from '@blueprintjs/core';
import { app , facebookProvider } from './firebase';
import './register.css';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            c_password:'',
            username:''
        }
    }

    handleForm(e){
        e.preventDefault();
        app.auth().fetchProvidersForEmail(this.state.email)
        .then((providers)=>{
    
            if(providers.length === 0){
                // create user and we don't wanna create it until register
                return app.auth().createUserWithEmailAndPassword(this.state.email,this.state.password);
             }else if(providers.indexOf("password") === -1){
                 // he is used facebook
                 this.toaster.show({ intent: Intent.DANGER , message:"you are used facebook to log in before"})
             }else{
                 // sign user in
                this.toaster.show({ intent: Intent.DANGER , message:"you are already registred , go ahead an log in"})
            }
    
            this.setState({
                email:'',
                password:'',
                c_password:'',
                username:'',
                })
        })
        .then((user)=>{
            if(user){
                this.props.register_now(this.state.email,this.state.password,this.state.username)  
            }
        })
        .catch((error)=>{
            this.toaster.show({ intent: Intent.DANGER , message:error.message})
        })
    }
    handleInput(e){
        const {name,value} = e.target;
        this.setState({ [name]: value });
    }

    render(){
        return(
            <div className='boxRegister'>
            <form action="" method='post' onSubmit={this.handleForm.bind(this)}>
                <input type="text" name='username' value={this.state.username} placeholder='username' onChange={this.handleInput.bind(this)} />
                <input type="email" name="email" value={this.state.email} placeholder='email' onChange={this.handleInput.bind(this)} />
                <input type="password" name='password' value={this.state.password} placeholder='password' onChange={this.handleInput.bind(this)} />
                <input type="password" name='c_password' value={this.state.c_password} placeholder='confirm password' onChange={this.handleInput.bind(this)} />
                <input type="submit" disabled={!this.state.username || !this.state.password || !this.state.c_password || !this.state.email || this.state.password !== this.state.c_password} value='register' className='btn_login_register' />
            </form>
         </div> 
        )
    }

}

export default Register;