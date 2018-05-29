import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLink from '../navlink/navlink'

@connect(
	state => state
)

class Dashboard extends React.Component{
	constructor() {
		super()
	}

	render() {
		const user = this.props.user;
		const navList = [{
			path: '/boss',
			text: '牛人',
			icon: 'boss',
			title: '牛人列表',
			component: '',
			hide: user.type === 'genius'
		},{
			path: '/genius',
			text: 'boss',
			icon: 'genius',
			title: 'Boss列表',
			component: '',
			hide: user.type === 'boss'
		},{
			path: '/msg',
			text: '消息',
			icon: 'msg',
			title: '消息列表',
			component: ''
		},{
			path: '/me',
			text: '我',
			icon: 'user',
			title: '个人中心',
			component: ''
		}];
		const pathname = this.props.location.pathname
		return (
			<div>
				<NavBar mode='dard'>{ navList.find(v => v.path === pathname).title }</NavBar>
				<div>content</div>
				<NavLink data={navList}></NavLink>
			</div>

		)
	}
}

export default  Dashboard