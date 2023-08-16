let token = uni.getStorageSync('token');

function call(option) {
	return new Promise((resolve, reject) => {
		if (!option.data) option.data = {};
		if (token) option.data.token = token;
		uni.showLoading({
			mask:true
		});
		uniCloud.callFunction({
			name: option.name,
			data: option.data,
			success: (res) => {
				uni.hideLoading();
				if (res.result.code == 200) {
					if (res.result.data.token) {
						token = res.result.data.token;
						uni.setStorageSync('token', res.result.data.token);
					}
					if (option.success) option.success(res.result.data);
					resolve(res.result.data);
				} else if(res.result.code == 201) {
					uni.showToast({
						icon: 'none',
						title: res.result.msg
					})
					if (option.fail) option.fail(res);
				} else if(res.result.code == 203) {
					// uni.clearStorageSync();
					uni.showToast({
						icon: 'none',
						title: token?'请重新登录':'请登录'
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/login/login'
						})
					},1000)
				}
			},
			fail: (err) => {
				uni.hideLoading();
				if (option.fail) option.fail(err);
				reject();
			},
			complete: () => {
				uni.hideLoading();
				if (option.complete) option.complete();
			}
		});
	});
}
module.exports = {
	call: call
}

