const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const userRouter = require('./user.js');
app.use('/user', userRouter);

//新增数据
// User.create({
// 	user: 'asics',
// 	age: 14
// }, function (err, doc) {
// 	if(err) {
// 		console.log(err)
// 	} else {
// 		console.log(doc)
// 	}
// })


app.get('/', function (req, res) {

	res.send('<h1>ff</h1>')
});

app.listen('9093', function () {
	console.log('aa')
})