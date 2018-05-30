import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import browserCookies from 'browser-cookies'

import { Result, List, WhiteSpace, Modal } from 'antd-mobile'

import { logoutSubmit } from '../../redux/user.redux'

const Item = List.Item
const Brief = Item.Brief

@connect(
	state=> state.user,
	{logoutSubmit}
)
class User extends React.Component{
	logout() {
		const alert = Modal.alert

		alert('退出登录', '确认退出登录吗', [{
			text: '取消', onPress: () => {}
		},{
			text: '确认', onPress: () => {
				browserCookies.erase('userid')
				this.props.logoutSubmit()
			}
		}])
	}

	render() {
		const props = this.props
		return props.user
			? (
					<div>
						<Result
							img={<img src={require(`../img/${this.props.avatar}.png`)} style={{ width: 50 }} alt=''/>}
							title={this.props.user}
							message={props.type === 'boss' ? this.props.company : null}
						/>
						<List renderHeader={() => '简介'}>
							<Item
								multipleLine
							>
								{props.title}
								<Brief>{props.desc}</Brief>
								{props.money ? <Brief>薪资：{props.money}</Brief> : null}
							</Item>
						</List>
						<WhiteSpace/>

						<List>
							<Item onClick={() => this.logout()}>退出登录</Item>
						</List>
					</div>
				)
			:  <Redirect to={props.redirectTo}/>
	}
}

export default User