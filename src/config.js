import axios from 'axios'
import { Toast } from 'antd-mobile'

//拦截请求
axios.interceptors.request.use(function (cfg) {
	Toast.loading('加载中');
	return cfg
})

//拦截响应
axios.interceptors.response.use(function (cfg) {
	Toast.hide();
	return cfg
})