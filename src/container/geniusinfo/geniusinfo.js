import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { update } from '../../redux/user.redux'
@connect(
	state => state.user,
	{ update }
)

class GeniusInfo extends React.Component {
	constructor() {
		super()
		this.state = {
			title: '',
			desc: ''
		}
	}
	onChange(key, val) {
		this.setState({
			[key]: val
		})
	}
	selectAvatar(imgName) {
		this.setState({
			avatar: imgName
		})
	}
	render() {
		const path = this.props.location.pathname;
		const redirect = this.props.redirectTo
		return (
			<div>
				{redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
				<NavBar
					mode="dark"
				>牛人完善信息页</NavBar>
				<AvatarSelector selectAvatar={(imgName) => { this.selectAvatar(imgName) } }></AvatarSelector>

				<InputItem onChange={(v) => this.onChange('title', v)}>
					求职岗位
				</InputItem>

				<InputItem onChange={(v) => this.onChange('money', v)}>
					期望薪资
				</InputItem>

				<TextareaItem
					onChange = {(v) => this.onChange('desc', v)}
					rows = { 3 }
					autoHeight
					title = '职位简介'
				>

				</TextareaItem>

				<Button
					type='primary'
					onClick={ () => this.props.update(this.state)}
				>保存</Button>

			</div>
		)
	}
}

export default GeniusInfo