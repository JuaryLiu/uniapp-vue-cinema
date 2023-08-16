<template>
	<view>
		<view class="nav">
			<view @click="goCity">
				<text>{{cityName}}</text>
				<u-icon name="arrow-down" size="12"></u-icon>
			</view>
			<view @click="isShow">
				<text>{{areaNmae}}</text>
				<u-icon name="arrow-down" size="12"></u-icon>
			</view>
			<view @click="goSearch">
				<text>搜索</text>
				<u-icon name="search" size="20"></u-icon>
			</view>
		</view>
		<u-overlay :show="value"></u-overlay>
		<view class="showNav" v-if="show">
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(item,index) in areaList" :key="index" >
					<text class="grid-text" @click="isChoose(item)">{{item}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="box">
			<view v-for="data in cinemaslist" :key="data.cinemaId" class="item" @click="goCinema(data.cinemaId)">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				change:false,
				value: false
			};
		},
		onLoad() {
			this.$store.dispatch('getCinemasData', {id:this.$store.state.cityId,name:'全城'})
		},
		computed: {
			cinemaslist() {
				return this.$store.state.cinemaslist
			},
			cityName() {
				return this.$store.state.cityName
			},
			areaList() {
				return this.$store.state.areaList
			},
			areaNmae() {
				return this.$store.state.areaNmae
			}
		},
		methods: {
			goCinema(id) {
				uni.navigateTo({
					url: `/pages/cinema/cinema?id=${id}`
				})
			},
			isChoose(item) {
				this.value = !this.value
				this.show = false
				this.$store.commit('changeAreaName',item)
				this.$store.dispatch('getCinemasData',{id:this.$store.state.cityId,name:item})
				// this.$store.commit('clearCinemasList')
			},
			isShow() {
				this.value = !this.value
				this.show = !this.show
				
			},
			goCity() {
				uni.navigateTo({
					url: `/pages/city/city`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			goSearch() {
				uni.navigateTo({
					url: `/pages/search/search`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		border: 1px solid #ff5f16 !important;
		color: #ff5f16 !important;
	}
	.showNav {
		width: 100%;
		position: fixed;
		top: 100rpx;
		left: 0;
		padding-left: 30rpx;
		padding-top: 30rpx;
		background: #fff;
		z-index: 99999999;
		.grid-text {
			margin-bottom: 30rpx;
			width: 160rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
			border:1px solid #f4f4f4;
			border-radius: 6rpx;
			font-size: 28rpx;
			color: #797d82;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}

	.nav {
		display: flex;
		font-size: 30rpx;
		justify-content: space-around;
		height: 100rpx;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 99999999;
		view {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 5rpx;
		}

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

	.header {
		display: flex;
		align-items: center;

		.city {
			font-size: 20rpx;
			padding-right: 10rpx;
			color: #191a1b;
		}
	}

	text {
		display: block;
	}

	i {
		font-size: 0.75rem;
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