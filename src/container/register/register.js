import React, { Component } from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Logo from '../../component/logo/logo.js'
import { register } from '../../redux/user.redux';

import CommonForm from '../../component/common-form/common-form'

const RadioItem = Radio.RadioItem;
@connect(
	state => state.user,
	{ register }
)
@CommonForm
class Register extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount() {
		this.props.handleChange('type', 'genius')
	}
	handleRegister() {
		this.props.register(this.props.state)
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
						onChange={v => this.props.handleChange('user', v)}
					>用户名</InputItem>
					<WhiteSpace></WhiteSpace>

					<InputItem
						type='password'
						onChange={v => this.props.handleChange('pwd', v)}
					>密码</InputItem>
					<WhiteSpace></WhiteSpace>

					<InputItem
						type='password'
						onChange={v => this.props.handleChange('repeatpwd', v)}
					>确认密码</InputItem>
					<WhiteSpace></WhiteSpace>

					<RadioItem
						checked={ this.props.state.type === 'genius'}
						onChange={ () => this.props.handleChange('type', 'genius') }
					>牛人</RadioItem>

					<RadioItem
						checked={ this.props.state.type === 'boss'}
						onChange={ () => this.props.handleChange('type', 'boss')}
					>Boss</RadioItem>
				</List>
				<Button type="primary" onClick={() => this.handleRegister()}>注册</Button>
			</div>
		)
	}
}

export default Register