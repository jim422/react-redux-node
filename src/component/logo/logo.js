import React, { Component } from 'react'
import logoImg from './job.jpg'
import './logo.css'

class Logo extends Component{
	constructor(props){
		super(props)
	}
	render() {
		return (
			<div className="logo_container">
				<img src={logoImg} alt=""/>
			</div>
		)
	}
}

export default Logo