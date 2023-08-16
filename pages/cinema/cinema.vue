<template>
	<view>
		<view class="header">
			{{cinemaList.name}}
		</view>
		<view class="cinema-info">
			<view class="tags">
				<view class="tag" v-for="(item,index) in cinemaList.services" :key="index">
					{{item.name}}
				</view>
				<u-icon name="arrow-right" color="#ffb232" size="10"></u-icon>
			</view>
			<view class="address">
				<u-icon name="map" size="18"></u-icon>
				<view class="des">
					{{cinemaList.address}}
				</view>
				<view class="tel">
					<u-icon name="phone" size="18"></u-icon>
				</view>
			</view>
		</view>

		<view class="content">
			<view class="swiper">
				<swiper class="swiper-box" circular="true" previous-margin="20px" next-margin="20px" @change="getItem">
					<swiper-item v-for="item in swiperList" :key="item.flimId">
						<view :class="item.colorClass" class="swiper-item">
							<image class="image" :src="item.poster" mode="aspectFill" />
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="info" @click="goDetail">
				<view class="head">
					<text class="name">{{ content.name }}</text>
					<text class="score">{{ content.grade }}</text>
					<text class="unit">分</text>
				</view>
				<view class="des">
					{{content.category}} | {{content.runtime}}分钟 | {{content.director}}
				</view>
			</view>
			<u-scroll-list style="padding-bottom:0 ;" :indicator='false'>
				<view :class="index ===currentIndex?'active':'' " v-for="(item, index) in date" :key="index" @click="getTime(item,index)">
					<view class="item">{{item}}</view>
				</view>
			</u-scroll-list>
			<view class="schedule-list">
				<view class="list-item" v-for="(item,index) in schedules" :key="index"
					:class="item.showAt *1000 < new Date().valueOf()?'active':''">
					<view class="left">
						<view class="start-at">{{item.showAt_}}</view>
						<view class="end-at">{{item.endAt_}}散场</view>
					</view>
					<view class="middle">
						<view class="language">{{item.filmLanguage}}{{item.imagery}}</view>
						<view class="hall">{{item.hallName}}</text> </view>
					</view>
					<view class="right">
						<view class="price">￥{{item.salePrice / 100 }}起</view>
						<view class="btn" v-if="!(item.showAt *1000 < new Date().valueOf())">购票</view>
						<view class="btn" v-else>停售</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		parseTime
	} from '../../utile/data.js'
	import {
		getCinemaData,
		getSwiperData,
		getTimeData
	} from '../../api/api.js'
	export default {
		data() {
			return {
				cinemaList: {},
				id: null,
				show: false,
				currentIndex: 0
			};
		},
		onLoad(e) {
			this.id = e.id

			getCinemaData(e.id).then(res => {
				// console.log(res);
				this.cinemaList = res.data.cinema
			})
			this.$store.dispatch('getSwiperItem', e.id)

			// console.log(this.filmId);
			this.$store.dispatch('getTimeItem', {
				id: e.id,
				filmId: this.filmId,
				time: this.time
			})
		},
		computed: {
			...mapState({
				content: state => state.cinema.list,
				swiperList: state => state.cinema.swiperList,
				filmId: state => state.cinema.list.filmId,
				time: state => state.cinema.time[0],
				schedules: state => state.cinema.schedules,
			}),
			date() {
				return this.$store.state.cinema.time.map(item => parseTime(item * 1000, '{m}月{d}号'))
			},
		},
		methods: {
			goDetail() {
				console.log(this.content.filmId);
				uni.navigateTo({
					url: `/pages/detail/detail?id=${this.content.filmId}`
				})
			},
			getItem(e) {
				this.$store.commit('changeCurrent', e.detail.current)
				this.$store.dispatch('getSwiperItem', this.id)
				this.$store.dispatch('getTimeItem', {
					id: this.id,
					filmId: this.filmId,
					time: this.time
				})
				// console.log(this.filmId);
			},
			getTime(item, i) {
				// console.log(i);
				this.currentIndex = i
				// console.log(this.showAt);
				this.$store.commit('clearSchedules')
				this.$store.dispatch('getTimeItem', {
					id: this.id,
					filmId: this.filmId,
					time: item
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.item {
		width: 160rpx;
		padding: 30rpx;
		position: relative;
	}
	.active {
		.item {
			color: #ff5f16;
					&::after {
						width: 150rpx;
						content: '';
						position: absolute;
						bottom: 0px;
						left: 20rpx;
						border: 2px solid #ff5f16;
						border-radius: 20px;
					}
		}
	}
	.header {
		text-align: center;
		font-size: 34rpx;
		color: #191a1b;
		width: 100%;
		padding: 0 30rpx;
		background: #fff;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		height: 88rpx;
		line-height: 88rpx;
	}

	.cinema-info {
		.tags {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			color: #ffb232;
			overflow: hidden;
			position: relative;
			padding: 10rpx 0 30rpx;

			.tag {
				position: relative;
				padding: 0 12rpx;
				margin: 0 5rpx;
				font-size: 20rpx;

				&::after {
					content: " ";
					transform: scale(.5);
					position: absolute;
					border: 2rpx solid #ffb232;
					top: -50%;
					right: -50%;
					bottom: -50%;
					left: -50%;
					border-radius: 2rpx;
				}
			}
		}

		.address {
			height: 100rpx;
			position: relative;
			display: flex;
			padding-left: 34rpx;
			align-items: center;

			.des {
				font-size: 28rpx;
				height: 40rpx;
				padding: 0 24rpx;
				flex: 1;
				position: relative;
				color: #191a1b;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				&::after {
					content: " ";
					position: absolute;
					right: 0;
					top: 0;
					width: 2rpx;
					bottom: 0;
					border-right: 2rpx solid #ededed;
					color: #ededed;
					transform-origin: 100% 0;
					transform: scaleX(.5);
				}
			}

			.tel {
				height: 36rpx;
				padding: 0 50rpx;
			}
		}
	}

	.content {
		.swiper {
			.swiper-box {
				/* width: 95%; */
				height: 200px;
			}

			.swiper-item {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: #999;
				color: #fff;
				margin: 10px;
				border-radius: 15upx;
				/* app上运行不显示图片，就需要加下面这行，设置高度 */
				height: 380upx;
			}

			.image {
				/* width: 750rpx; */
				height: 380upx;
				border-radius: 15upx;
			}
		}

		.info {
			width: 100%;
			background: #fff;

			padding: 30rpx 0;
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
				transform-origin: 0 100%;
				transform: scaleY(.5);
			}

			.head {
				margin-bottom: 20rpx;
				text-align: center;
				line-height: 36rpx;

				.name {
					font-size: 30rpx;
					color: #191a1b;
					padding-right: 10rpx;
				}

				.score {
					font-size: 32rpx;
					font-style: italic;
					color: #ffb232;
				}

				.unit {
					font-size: 20rpx;
					color: #ffb232;
				}
			}

			.des {
				text-align: center;
				height: 36rpx;
				color: #797d82;
				font-size: 26rpx;
				padding: 0 12%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.list {
			position: relative;
			z-index: 100;
			width: 100%;
			height: 100rpx;
			overflow-x: hidden;
			background: #fff;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		}

		.schedule-list {
			.active {
				color: #d2d6dc !important;

				.hall,
				.end-at {
					color: #d2d6dc !important;
				}

				.price {
					color: #d2d6dc !important;
				}

				.btn {
					color: #d2d6dc !important;
					border: 1px solid #d2d6dc !important;
				}
			}

			.list-item {
				display: flex;
				align-items: center;
				padding: 30rpx;
				position: relative;
				background: #fff;
				font-size: 15px;
				color: #191a1b;

				&::before {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					height: 1px;
					border-top: 1px solid #ededed;
					color: #ededed;
					transform-origin: 0 0;
					transform: scaleY(.5);
				}

				.hall,
				.end-at {
					font-size: 26rpx;
					color: #797d82;
					margin-top: 4rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

				}

				.left {
					width: 168rpx;
				}

				.middle {
					width: 270rpx;
				}

				.right {
					width: 248rpx;
					display: flex;
					align-items: center;
					color: #ff5f16;

					.btn {
						height: 25px;
						width: 50px;
						margin-left: 20rpx;
						border-radius: 2px;
						text-align: center;
						border: 1px solid #ff5f16;
					}
				}
			}
		}
	}
</style>