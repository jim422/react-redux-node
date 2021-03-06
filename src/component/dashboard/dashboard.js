import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { NavBar } from 'antd-mobile'
import NavLink from '../navlink/navlink'

import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
@connect(
	state => state,
	{ getMsgList, recvMsg }
)

class Dashboard extends React.Component{
	constructor() {
		super()
	}
	componentDidMount() {
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
	}

	render() {
		const user = this.props.user;
		const navList = [{
			path: '/boss',
			text: '牛人',
			icon: 'boss',
			title: '牛人列表',
			component: Boss,
			hide: user.type === 'genius'
		},{
			path: '/genius',
			text: 'boss',
			icon: 'genius',
			title: 'Boss列表',
			component: Genius,
			hide: user.type === 'boss'
		},{
			path: '/msg',
			text: '消息',
			icon: 'msg',
			title: '消息列表',
			component: Msg
		},{
			path: '/user',
			text: '我',
			icon: 'user',
			title: '个人中心',
			component: User
		}];
		const pathname = this.props.location.pathname
		console.log(pathname)
		return (
			<div>
			{
                pathname !== '/'
                    ? (<div>
                        <NavBar mode='dard' className='fixed-header'>{navList.find(v => v.path === pathname).title}</NavBar>
                        <div style={{marginTop: 45}}>
                            <Switch>
                                {
                                    navList.map(v => {
                                        return (
                                            <Route
                                                key={v.path}
                                                path={v.path}
                                                component={v.component}
                                            />
                                        )
                                    })
                                }
                            </Switch>
                        </div>
                        <NavLink
                            data={navList}
                        />
                    </div>)
                    : <Redirect
                        to={'/login'}
                    />

			}
            </div>
		)
	}
}

export default  Dashboard