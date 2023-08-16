<template>
	<view>
		<view class="search">
			<u-search placeholder="请输入要查询的城市" v-model="keyword" :showAction='false'></u-search>
		</view>
		<view class="hot">
			<view class="hot-title">
				热门城市
			</view>
			<u-grid :border="false" col="3">
				<u-grid-item v-for="(item,index) in hotList" :key="index">
					<text class="grid-text" @click="goCity(item)">{{item.name}}</text>
				</u-grid-item>
			</u-grid>
			<!-- <u-toast ref="uToast" /> -->
		</view>
		<u-index-list :index-list="computedList">
			<template v-for="data in cityList">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="data.type"></u-index-anchor>
				<!-- #endif -->
				<u-index-item>
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="data.type"></u-index-anchor>
					<!-- #endif -->
					<view class="list-cell" v-for="item in data.list" :key="item.cityId" @click="goCity(item)">
						{{item.name}}
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
</template>

<script>
	import {
		getCity
	} from '../../api/api.js'
	export default {
		data() {
			return {
				cityList: [],
				title: '',
				keyword: '',
				hotList: []
			};
		},
		computed: {
			computedList() {
				return this.cityList.map(item => item.type)
			}
		},
		onLoad() {
			this.title = '当前城市-' + this.$store.state.cityName
			uni.setNavigationBarTitle({
				title: this.title
			});
			getCity().then(res => {
				this.cityList = this.renderCity(res.data.cities)
				this.hotList = res.data.cities.filter(item => {
					return item.isHot == 1
				})
			})
		},
		methods: {
			goCity(item) {
				this.$store.commit('changeCityName', item.name)
				this.$store.commit('changeCityId', item.cityId)
				this.$store.commit('clearAreaList')
				this.$store.dispatch('getCinemasData', {
					id: item.cityId,
					name: '全城'
				})
				this.$store.commit('changeAreaName', '全城')

				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			renderCity(list) {
				var letterList = []
				var cityList = []
				for (var i = 65; i < 91; i++) {
					// console.log(String.fromCharCode(i))
					letterList.push(String.fromCharCode(i))
				}
				// console.log(letterList)
				letterList.forEach(letter => {
					var newlist = list.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
					// console.log(newlist)
					if (newlist.length > 0) {
						cityList.push({
							type: letter,
							list: newlist
						})
					}
				})
				return cityList
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot {
		padding-left: 30rpx;
		padding-top: 30rpx;
		background: #fff;
	}

	.hot-title {
		font-size: 26rpx;
		color: #797d82;
		margin-bottom: 20rpx;
	}

	.grid-text {
		margin-bottom: 30rpx;
		padding: 15rpx 50rpx;
		background-color: #f4f4f4;
		border-radius: 6rpx;
		font-size: 28rpx;
		color: #191a1b;
		overflow: hidden;
	}

	.search {
		background-color: rgb(222, 222, 222);
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>