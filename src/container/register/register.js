import React, { Component } from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Logo from '../../component/logo/logo.js'
import { register } from '../../redux/user.redux';

const RadioItem = Radio.RadioItem;
@connect(
	state => state.user,
	{ register }
)
class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			user: '',
			pwd: '',
			repeatpwd: '',
			type: 'genius'
		}
	}
	handleChange(key, value) {
		this.setState({
			[key]: value
		})
	}
	handleRegister() {
		this.props.register(this.state)
	}
	render() {

		return (
			<div>
				{ this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null }
				<Logo></Logo>
				<h2>注册页</h2>
				<List>
					{ this.props.msg ? <p className='error-msg'>{ this.props.msg }</p> : <p></p> }
					<InputItem
						onChange={v => this.handleChange('user', v)}
					>用户名</InputItem>
					<WhiteSpace></WhiteSpace>

					<InputItem
						type='password'
						onChange={v => this.handleChange('pwd', v)}
					>密码</InputItem>
					<WhiteSpace></WhiteSpace>

					<InputItem
						type='password'
						onChange={v => this.handleChange('repeatpwd', v)}
					>确认密码</InputItem>
					<WhiteSpace></WhiteSpace>

					<RadioItem
						checked={ this.state.type === 'genius'}
						onChange={ () => this.handleChange('type', 'genius') }
					>牛人</RadioItem>

					<RadioItem
						checked={ this.state.type === 'boss'}
						onChange={ () => this.handleChange('type', 'boss')}
					>Boss</RadioItem>
				</List>
				<Button type="primary" onClick={() => this.handleRegister()}>注册</Button>
			</div>
		)
	}
}

export default Register