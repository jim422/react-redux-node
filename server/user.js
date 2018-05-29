const express = require('express');
const Router = express();
const utils = require('utility');
const model = require('./model.js');
const User = model.getModel('user');
const _filter = {
	'pwd': 0,
	'__v': 0
}

Router.get('/list', function (req, res) {
	User.find({}, function (err, doc) {
		return res.json(doc)
	})
});

Router.post('/register', function (req, res) {
	console.log(req.body);
	const { user, pwd, type } = req.body;

	//先查询一次用户名是否重复
	User.findOne({ user }, function (err, doc) {
		if (doc) {
			return res.json({
				code: 1,
				msg: '用户名重复'
			})
		}

		const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
		userModel.save(function (err, doc) {
			if (err) {
				return res.json({ code: 1, msg: '链接数据库出错'})
			}

			const { user, type, _id } = doc;
			res.cookie('userid', _id)

			return res.json({code: 0, data: { user, type, _id }})
		})

	})

});

Router.post('/login', function (req, res) {
	const { user, pwd } = req.body;

	User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
		if (!doc) {
			return res.json({ code: 1, msg: '用户或密码错误' })
		}
		res.cookie('userid', doc.id);
		return res.json({code: 0, data: doc })
	})
})

Router.get('/info', function (req, res) {
	const { userid } = req.cookies;

	if (!userid) {
		return res.json({code: 1})
	} else {
		User.findOne({ _id: userid }, _filter, function (err, doc) {
			if (err) {
				return res.json({ code: 1, msg: '后端出错' })
			}

			if (doc) {
				return res.json({ code: 0, data: doc})
			}
		})
	}

});

Router.post('/update', function (req, res) {
	const userid = req.cookies.userid;

	if (!userid) {
		return res.json({code: 1, msg: 'err'})
	}

	const body = req.body;

	User.findByIdAndUpdate(userid, body, function (err, doc) {
		const data = Object.assign({}, {
			user: doc.user,
			type: doc.type
		}, body)

		return res.json({ code: 0, data })
	})
})

function md5Pwd(pwd) {
	const prefix = 'kim_bong_ger';
	return utils.md5(utils.md5(prefix + pwd))
}

module.exports = Router;