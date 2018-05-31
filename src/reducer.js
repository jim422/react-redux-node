import { combineReducers } from 'redux'
import { user } from './redux/user.redux.js'
import { chatUser } from './redux/chatuser.redux'
import { chat } from './redux/chat.redux'

export default combineReducers({
	user,
	chatUser,
	chat
})