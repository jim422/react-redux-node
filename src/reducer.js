import { combineReducers } from 'redux'
import { user } from './redux/user.redux.js'
import { chatUser } from './redux/chatuser.redux'

export default combineReducers({
	user,
	chatUser
})