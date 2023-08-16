<template>
	<view class="user">
		<u-popup :show="show" mode="center">
			<view class="content flex flex-column a-center j-center">
				<view class="title">授权登陆</view>
				<view class="info-msg">
					请授权头像等信息，以便我们为您提供更好的服务
				</view>
				<button @click="getUser" class="btn" :loading="loading" :disabled="loading">
					微信一键登录
				</button>
				<button style="margin-top: 20px;" @click="show = false" class="btn">
					取消登录
				</button>
			</view>
		</u-popup>
		<header>
			<image src="../../static/user.png" mode=""></image>
			<view class="nick-name" @click="show = true">立即登录</view>
		</header>
		<view class="tabs">
			<view>
				<view class="value">0张</view>
				<view class="label">卖座券</view>
			</view>
			<view>
				<view class="value">￥0</view>
				<view class="label">余额</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				fileList6: [],
				show: false,
				loading: false,
				userList: {},
				overShow: false,
				isLogin: true
			};
		},
		onLoad() {

		},

	}
</script>

<style lang="scss" scoped>
	.warp {
		margin-top: 50%;

		image {
			width: 100%;
		}

		.btn {
			position: absolute;
			bottom: 20rpx;
			left: 50%;
			transform: translateX(-50%);
			height: 50rpx;
			font-size: 28rpx;
			line-height: 50rpx;
			border: 2rpx solid #fff;
			color: #fff;
			text-align: center;
			background-color: #000;
		}
	}

	.content {
		width: 500rpx;
		height: 600rpx;
		background: white;
		border-radius: 8rpx;

		.title {
			font-size: 34rpx;
			margin: 80rpx 0;
			font-weight: bold;
			width: 100%;
			text-align: center;
			color: black;
		}

		.info-msg {
			font-size: 28rpx;
			margin-bottom: 60rpx;
			padding: 0 60rpx;
			color: grey;
			text-indent: 2em;
		}

		.btn {
			padding: 8rpx 0rpx;
			width: 400rpx;
			text-align: center;
			background: #FF8D1A;
			border-radius: 8rpx;
			font-size: 26rpx;
			color: white;
		}
	}

	.user {
		background-color: #f5f5f5;
	}

	header {
		box-sizing: border-box;
		text-align: center;
		margin-top: -88rpx;
		height: 400rpx;
		padding-left: 44rpx;
		padding-top: 128rpx;
		background: url(https://assets.maizuo.com/h5/v5/public/app/img/bg.a5bdd690.png);
		background-size: cover;
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 32rpx;

		image {
			width: 126rpx;
			height: 126rpx;
			border-radius: 70rpx;
			margin-right: 40rpx;
			border: 4rpx solid #fff;
		}
	}

	.tabs {
		width: 100%;
		margin: 0 auto;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		text-align: center;
		font-size: 26rpx;
		padding: 0;
		height: 178rpx;
		background: #fff;
		margin-bottom: 20rpx;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;

		view {
			position: relative;
			-webkit-box-flex: 1;
			-ms-flex: 1;
			flex: 1;
			list-style: none;

			.value {
				color: #191a1b;
				font-size: 34rpx;
			}

			.label {
				font-size: 26rpx;
				color: #797d82;
			}
		}
	}
</style>