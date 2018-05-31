const mongoose = require('mongoose');


//使用chat 集合
const DB_URL = 'mongodb://127.0.0.1:27017/chat';

mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
	console.log('mongoose connected')
});

const models = {
	user: {
		'user': {type: String, required: true},
		'pwd': {type: String, required: true},
		'type': {type: String, required: true},
		'avatar': {type: String},
		//个人简介或职位简介
		'desc': {type: String},
		//职位名
		'title': {type: String},
		//如果是boss多两个字段 公司，薪资
		'company': {type: String},
		'money': {type: String}
	},
	chat: {
		'chatid': {type: String, required:true},
		'from': {type: String, required: true},
		'to': {type: String, required: true},
		'read': {type: Boolean, default: false},
		'content': {type: String, required: true, default: ' '},
		'create_time': {type: Number, default:new Date().getTime()}
	}
};

for (let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function (name) {
		return mongoose.model(name)
	}
}