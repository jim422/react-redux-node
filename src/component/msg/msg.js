import React from 'react'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

@connect(
	state => state
)
class Msg extends React.Component{
	getLast(arr) {
		return arr[arr.length - 1]
	}
	render() {
		console.log(this.props)
		const msgGroup = {}
		const userid = this.props.user._id
		this.props.chat.chatmsg.forEach(v => {
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
		const chatList = Object.values(msgGroup) || []
		const userInfo = this.props.chat.users
		return (
			<div>

					{
						chatList.map(v => {
							const lastItem = this.getLast(v)
							const targetId = v[0].from === userid ? v[0].to : v[0].from

							if (!userInfo[targetId]) {

							}

							return (
								<List>
									<Item
										key={lastItem._id}
										thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
									>
										{lastItem.content}
										<Brief>{userInfo[targetId].name}</Brief>
									</Item>
								</List>
							)
						})
					}
			</div>
		)
	}
}

export default Msg