import React from 'react'
import PropTypes from 'prop-types'

import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter

class NavLink extends React.Component{
	static propTypes = {
		data: PropTypes.array.isRequired
	}
	render() {
		const navList = this.props.data.filter( v => !v.hide);
		const pathname = this.props.location.pathname;
		console.log(navList, pathname)
		return (
			<TabBar>
				{
					navList.map(v => (
						<TabBar.Item
							title = { v.text }
							key = { v.path }
							icon = {{uri: require(`./img/${v.icon}.png`)}}
							selectedIcon = {{uri: require(`./img/${v.icon}-active.png`)}}
							selectd={v.path === pathname}
							onPress={() => {
								this.props.history.push(v.path)
							}}
						>
						</TabBar.Item>
					))
				}
			</TabBar>
		)
	}
}

export default NavLink