import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LISG = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
	chatmsg: [],
	users: {},
	unread: 0
}

export function chat(state = initState, action) {
	switch (action.type) {
		case MSG_LISG:
			return {
				...state,
				chatmsg: action.payload.msgs,
				unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length,
				users: action.payload.users
			}
		case MSG_RECV:
			let count;
			let recvMsg;

			if (action.payload.userid.indexOf(action.payload.userid) !== -1) {
				count = 1
				recvMsg = action.payload.msg
			} else {
				count = 0
				recvMsg = []
			}
			return {
				...state,
				chatmsg: [...state.chatmsg, recvMsg],
				unread: state.unread + count,
			}
		case MSG_READ:
			const { from, num } = action.payload
			return {
				...state,
				chatmsg: state.chatmsg.map(v => ({
					...v,
					read: from === v.from ? true : v.read
				})),
				unread: state.unread - num
			}
		default:
			return state
	}
}

function msgList(msgs, users, userid) {
	return {type: MSG_LISG, payload: { msgs, users, userid }}
}

function msgRecv(msg, userid) {
	return { type: MSG_RECV, payload: { msg, userid} }
}

export function getMsgList() {
	return (dispatch, getState) => {
		axios.get('/user/getmsglist')
			.then(res => {
				if (res.status === 200 && res.data.code ===0) {
					const userid = getState().user._id;
					dispatch(msgList(res.data.msgs, res.data.users, userid))
				}
			})
	}
}

export function sendMsg(from, to, msg) {
	return dispatch => {
		socket.emit('sendmsg', { from, to, msg })
	}
}

export function recvMsg() {
	return (dispatch, getState) => {
		socket.on('recvmsg', function (data) {
			console.log(data)
			const userid = getState().user._id;
			dispatch(msgRecv(data, userid))
		})
	}
}

function msgRead({ from, userid, num }) {
	return {type: 'MSG_READ', payload: { from, userid, num }}
}

export function readMsg(from) {
	return (dispatch, getState) => {
		axios.post('/user/readmsg', {from})
			.then(res => {
				const userid = getState().user
				if (res.status == 200 && res.data.code == 0) {
					dispatch(msgRead({userid, from, num: res.data.num}))
				}
			})
	}
}