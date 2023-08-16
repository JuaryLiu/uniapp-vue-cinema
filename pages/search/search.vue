<template>
	<view>
		<view class="search">
			<u-search placeholder="请输入要查询的影院" v-model="value" shape="round" :showAction='false'></u-search>
		</view>
		
		<view class="box" v-if="value">
			<view v-for="data in cinemasList" :key="data.cinemaId" class="item">
				<view class="title">
					<text class="name info">{{ data.name }}</text>
					<text class="address info">{{ data.address }}</text>
				</view>
				<view class="price">
					<text>￥{{ data.lowPrice / 100 }}起</text>
					<text style="font-size: 0.75rem; color: #797d82">距离未知</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			};
		},
		onLoad() {
			this.$store.dispatch('getCinemasData', {
				id: this.$store.state.cityId,
				name: '全城'
			})
		},
		computed: {
			cinemasList() {
				return this.$store.state.cinemaslist.filter(item => item.name.toUpperCase().includes(this.value
					.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))

			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.search {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		position: fixed;
		top: 0;
		z-index: 999;
		background: #fff;
		&::after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-bottom: 1px solid #ededed;
			color: #ededed;
			transform: scaleY(.5);
		}
	}

	text {
		display: block;
	}

	.info {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
		max-width: 80%;
	}

	.box {
		margin-top: 100rpx;
		padding-bottom: 20rpx;
	}

	.item {
		padding: 0.9375rem;
		height: 2.8125rem;
		position: relative;

		&::after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-bottom: 1px solid #ededed;
			color: #ededed;
			transform: scaleY(.5);
		}

		.title {
			padding-right: 0.9375rem;
			width: 16.5625rem;
			float: left;

			.name {
				font-size: 0.9375rem;
			}

			.address {
				color: #797d82;
				font-size: 0.75rem;
				margin-top: 0.3125rem;
			}
		}

		.price {
			float: right;
			width: 4.375rem;
			text-align: center;
			margin-right: -0.3125rem;

			text {
				font-size: 0.9375rem;
				color: #ff5f16;
			}
		}
	}
</style>