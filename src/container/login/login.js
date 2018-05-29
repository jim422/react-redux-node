import React, { Component } from 'react'
import Logo from '../../component/logo/logo.js'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux.js';
import { Redirect } from 'react-router-dom'
@connect(
	state => state.user,
	{ login }
)

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			user: '',
			pwd: ''
		};

		this.register = this.register.bind(this);
		this.handleLogin = this.handleLogin.bind(this)
	}

	register() {
		this.props.history.push('./register')
	}

	handleChange(key, value) {
		this.setState({
			[key]: value
		})
	}

	handleLogin() {
		this.props.login(this.state)
	}

	render() {
		return (
			<div>
				{ this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null }
				<Logo></Logo>
				登陆页
				<WingBlank>
					{ this.props.msg ? <p className='error-msg'>{ this.props.msg }</p> : <p></p> }
					<List>
						<InputItem
							onChange={v => this.handleChange('user', v)}
						>用户名</InputItem>

						<WhiteSpace></WhiteSpace>

						<InputItem
							onChange={v => this.handleChange('pwd', v)}
						>密码</InputItem>
					</List>
					<Button type="primary" onClick={this.handleLogin}>登陆</Button>
					<WhiteSpace></WhiteSpace>
					<Button type="primary" onClick={this.register}>注册</Button>

				</WingBlank>
			</div>
		)
	}
}

export default Login