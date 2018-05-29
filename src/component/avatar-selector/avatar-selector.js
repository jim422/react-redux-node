import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List } from 'antd-mobile'


class AvatarSelector extends React.Component {
	static propTypes = {
		selectAvatar: PropTypes.func.isRequired
	}

	constructor() {
		super()
		this.state = {}
	}
	render() {
		const avatarList = ['boy', 'girl', 'unknown'].map(v => ({
			icon: require(`../img/${v}.jpg`),
			text: v
		}));
		const gridHeader = this.state.text
												? (<div>
														<span>已选择图像</span>
														<img src={this.state.icon} style={{width: 20}}/>
														</div>)
												: '请选择头像';
		return (
			<div>
				<List renderHeader={() => gridHeader }>
					<Grid
						data = {avatarList}
						onClick={ele => {
							this.props.selectAvatar(ele.text)
							this.setState(ele)
						}}
					>
					</Grid>
				</List>
			</div>
		)
	}
}

export default AvatarSelector