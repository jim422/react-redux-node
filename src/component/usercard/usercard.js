import React from 'react'
import PropTypes from 'prop-types'

import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

const Header = Card.Header
const Body = Card.Body

class UserCard extends React.Component{
	static propTypes = {
		userList: PropTypes.array.isRequired
	}
	render() {
		return(
			<WingBlank>
				{this.props.userList.map(v => (
					v.avatar
						? (
							<Card key={v._id}>
								<Header
									title={v.user}
									thumb={require(`../img/${v.avatar}.png`)}
									extra={<span>{v.title}</span>}
								></Header>

								<Body>
								{v.type === 'boss' ? <div>公司：{v.company}</div> : null}
								{v.desc}
								{v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
								</Body>
								<WhiteSpace/>
							</Card>
						)
						: null
				))}
			</WingBlank>
		)
	}
}

export default UserCard