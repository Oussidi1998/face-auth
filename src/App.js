import React,{ Component } from 'react';
import Login from './Components/login';
import Register from './Components/register';
import './App.css';

class App extends Component{

	constructor (props){
		super(props);
		this.state = {
			active:'login',
			isLogged:false,
			mail:'',
			pass:'',
			user:''
		}
	}

	componentDidMount(){
		if(localStorage.getItem('is_Logged')){
			this.setState({
				isLogged:true
			})
		}
	}

	ActiveReval(active) {
		this.setState({
			active:active
		})
	}

	checkLogin(isLoggedIn){
		this.setState({ 
			isLogged:isLoggedIn 
		})
	}
	RegsiterNow(email,password,username){
		this.setState({ 
			active:"login",
			mail:email,
			pass:password,
			user:username
		})
	}

	render(){
		
		let whoIsActive;

		if(this.state.active === "login") 
			whoIsActive = <Login login_state={this.checkLogin.bind(this)} pass={this.state.pass} mail={this.state.mail}  />
		else
			whoIsActive = <Register register_now={this.RegsiterNow.bind(this)} />

		if(this.state.isLogged){
			return(
				<div className='dashboard'>Welcome { (this.state.user !== '' ? this.state.user : this.state.mail) ? (this.state.user !== '' ? this.state.user : this.state.mail) : "in the dashboard" } </div>	
			)
		}else{
			return(
				<div className='boxParent'>
					<button type='button' className={this.state.active === "login" ? 'active AppBtn' : 'AppBtn'} onClick={this.ActiveReval.bind(this,'login')}>LOGIN</button>
					<button type='button' className={this.state.active === "register" ? 'active AppBtn' : 'AppBtn'} onClick={this.ActiveReval.bind(this,'register')}>REGISTER</button>
					<br/>
					{whoIsActive}
				</div>
				)
		}
	}

}

export default App;