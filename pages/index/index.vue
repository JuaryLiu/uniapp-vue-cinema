<template>
	<view>
		<view class="tabs">
			<view class="tab" v-for="(item,index) in data" :key="index" @click="isShow(index)"
				:class="index === currentIndex?'active':''">
				{{item}}
			</view>
		</view>
		<view class="list">
			<scroll-view class="scroll" scroll-y="true" lower-threshold='20' @scrolltolower="lower">
				<view class="list-item" v-for="item in list" :key="item.filmId">
					<view class="content" @click="goPath(item.filmId)">
						<view class="img">
							<image :src="item.poster" mode=""></image>
						</view>
						<view class="info">
							<view>
								<text class="title">{{ item.name }}</text>
								<text class="title-item">{{ item.item.name }}</text>
							</view>
							<text v-if="show">观众评分:<text class="grade">{{ item.grade }}</text></text>
							<text>主演:
								<text style="margin-right: 5rpx;" v-for="(data,index) in item.actors" :key="index">
									{{data.name}}
								</text>
							</text>
							<text v-if="!show">上映时间:星期{{item.premiereAt}}</text>
							<text v-if="show">{{ item.nation }} | {{ item.runtime }} 分钟</text>
						</view>
						<view class="btn" v-if="show">
							<text >购票</text>
							
						</view>
						<view class="btn" v-if="!show && item.isPresale">
							<text >预定</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {parseTime} from '../../utile/data.js'
	import {
		getList
	} from '../../api/api.js'
	export default {
		data() {
			return {
				list: [],
				current: 1,
				total: 0,
				data: ['正在热映', '即将上映'],
				currentIndex: 0,
				show:true,
				type:1
			}
		},
		onLoad() {
			// this.$store.dispatch('getFilmData',{this.$store.state.cityId})
			// console.log(this.$store.state.cityId);
			getList(this.cityId, 1,1).then(res => {
				this.list = res.data.films
				this.total = res.data.total
			})

		},
		computed: {
			cityId() {
				return this.$store.state.cityId
			}
		},
		methods: {
			isShow(index) {
				this.currentIndex = index
				if(index === 0) {
					this.type = 1
					this.show = true
				} else if(index === 1) {
					this.type = 2
					this.show = false
				}
				this.item = []
				getList(this.cityId, 1,this.type).then(res => {
					this.list = res.data.films
					this.total = res.data.total
					this.list.forEach(item =>{
						item.premiereAt= parseTime(item.premiereAt,'{a} {m}月{d}日')
					})
				})
				
			},
			goPath(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			},
			async lower() {
				if (this.list.length == this.total) {
					return
				}
				this.current++

				let res = await getList(this.cityId, this.current,this.type)
				// console.log(res.data);
				res.data.films.forEach(item => {
					item.premiereAt= parseTime(item.premiereAt,'{a} {m}月{d}日')
					this.list.push(item)
				})
			}
		}
	}
</script>

<style lang="scss">
	.tabs {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		height: 100rpx;
		display: flex;
		align-items: center;
		background: #fff;
		z-index: 999;

		&::after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 2rpx;
			border-bottom: 2rpx solid #ededed;
			color: #ededed;
			transform-origin: 0 100%;
			transform: scaleY(.5);
		}

		.active {
			color: #ff5f16;

			&::after {
				width: 160rpx;
				content: '';
				position: absolute;
				bottom: -26rpx;
				left: 100rpx;
				border: 1px solid #ff5f16;
				border-radius: 20px;
			}
		}

		.tab {
			flex: 1;
			text-align: center;
			position: relative;
		}
	}

	.scroll {
		height: 1400rpx;
		// overflow: hidden;
	}

	.list {
		margin-top: 100rpx;
		padding-left: 30rpx;
		box-sizing: border-box;

		.list-item {
			width: 100%;
			padding: 30rpx 0;

			.content {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.img {
					width: 132rpx;
					height: 190rpx;

					image {
						width: 132rpx;
						height: 190rpx;
					}
				}

				.btn {
					margin-right: 30rpx;
					width: 100rpx;
					color: #ff5f16;
					border: 2rpx solid #ff5f16;
					line-height: 50rpx;
					height: 50rpx;
					text-align: center;
					font-size: 26rpx;
				}

				.info {
					flex: 1;
					margin: 0 10rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					color: #797d82;
					font-size: 26rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: left;

					view {
						.title {
							color: #191a1b;
							font-size: 32rpx;
							margin-right: 10rpx;
						}

						.title-item {
							width: 40rpx;
							height: 28rpx;
							background: #d2d6dc;
							color: #fff;
							font-size: 32rpx;
							border-radius: 4rpx;
							line-height: 28rpx;
						}
					}

					text {
						margin-top: 8rpx;
					}

					.grade {
						color: #ffb232;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>