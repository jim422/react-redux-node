import React, { Component } from 'react'
import logoImg from './jobs.jpg'
import './logo.css'

class Logo extends Component{
	constructor(props){
		super(props)
	}
	render() {
		return (
			<div className="logo_container">
				<img src={logoImg} alt="" style={{width: '100%', height: '100%'}}/>
			</div>
		)
	}
}

export default Logo