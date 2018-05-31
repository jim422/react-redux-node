import React from 'react'

export default function commonForm(Comp) {
	return  class WrapperComp extends React.Component{
		constructor() {
			super()
			this.state = {}
			this.handleChange = this.handleChange.bind(this)
			console.log(Comp, this.props)
		}
		handleChange(key, value) {
			this.setState({
				[key]: value
			})
		}
		render() {
			return <Comp {...this.props} handleChange={this.handleChange} state={this.state}></Comp>
		}
	}
}