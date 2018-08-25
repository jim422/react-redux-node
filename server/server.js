const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model.js');
const Chat = model.getModel('chat');
const path = require('path')

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
app.use(bodyParser.json());
app.use(cookieParser());

const userRouter = require('./user.js');
app.use('/user', userRouter);

console.log(path.resolve('build'));
app.use(function (req, res, next) {
	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	} else {
		return res.sendFile(path.resolve('build/index.html'))
	}
});
app.use('/', express.static(path.resolve('build')));

io.on('connection', function (socket) {
	socket.on('sendmsg', function (data) {
		const { from, to, msg} = data.from
		const chatid = [from, to].sort().join('_')

		Chat.create({chatid, from, to, content: msg}, function (err, doc) {
			console.log(doc)
			io.emit('recvmsg', Object.assign({}, doc._doc))
		})
	})
})

app.get('/', function (req, res) {

	res.send('<h1>ff</h1>')
});

server.listen('9093', function () {
	console.log('aa')
})