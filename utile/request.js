const BASE_URL = 'https://m.maizuo.com'

const common = {
	baseUrl: BASE_URL,
	data: {},
	header: {
		'content-type': 'application/json',
		'content-type': 'application/x-www-form-urlencoded'
	},
	method: 'GET',
	dataType: 'json',
	isShowLoading: true
}
export default function request(options = {}) {
	options.url = BASE_URL + options.url
	options.data = options.data || common.baseUrl
	options.header = options.header || common.header
	options.method = options.method || common.method
	options.dataType = options.dataType || common.dataType
	options.isShowLoading = options.isShowLoading || common.isShowLoading
	if (options.isShowLoading) {
		uni.showLoading({
			title: '加载中...'
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success: res => {
				// console.log('res', res)
				if (res.statusCode !== 200) {
					return reject()
				}
				return resolve(res.data)
			},
			fail: rej => {
				uni.showLoading({
					title: '网络请求错误'
				})
				return
			},
			complete: () => {
				if (options.isShowLoading) {
					uni.hideLoading()
				}
			}
		})
	})
}