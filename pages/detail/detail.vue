<template>
	<view class="detail">

		<view class="section">
			<view class="img">
				<image :src="detail.poster" mode=""></image>
			</view>
			<view class="content">
				<view class="film-top">
					<view class="film-name">
						<text class="name">{{ detail.name }}</text>
						<text class="item">{{ detail.filmType.name }}</text>
					</view>
					<view class="film-grade">
						<text class="grade">{{ detail.grade }}</text>
						<text class="grade-text">分</text>
					</view>
				</view>
				<view class="content-text">{{ detail.category }}</view>
				<view class="content-text">
					{{ time}}上映
				</view>
				<view class="content-text">
					{{ detail.nation }} | {{ detail.runtime }}分钟
				</view>
				<view class="text content-text">
					{{ detail.synopsis }}
				</view>
			</view>
			<view class="actors">
				<view class="actors-title">
					<text>演职人员</text>
				</view>
				<u-scroll-list>
					<view v-for="(data, index) in detail.actors" :key="index">
						<image :src="data.avatarAddress"></image>
						<view class="actors-name">
							<text>{{ data.name }}</text>
						</view>
						<view class="actors-role">
							<text>{{ data.role }}</text>
						</view>
					</view>

				</u-scroll-list>
			</view>

			<view class="photos">
				<view class="photos-title">
					<text>剧照</text>
					<text class="right" @click="showPhote = true">全部{{ "(" + detail.photos.length + ")" }}></text>
				</view>
				<u-scroll-list>
					<view v-for="(data, index) in detail.photos" :key="index" @click="showOverlay(index)">
						<image :src="data"></image>
					</view>
				</u-scroll-list>

				<u-overlay :show="show" :duration="400" :z-index="99999" :opacity="1">
					<view class="warp">
						<view class="nav">
							<u-icon name="close" color="#fff" size="28" @click="goBack"></u-icon>
							<text>{{current +1}}/{{detail.photos.length}}</text>
						</view>
						<u-swiper :list="detail.photos" :height="180" @change="change" :autoplay='false' bgColor='#000'
							:current="current"></u-swiper>
					</view>
				</u-overlay>
			</view>

		</view>
		<view class="footer">
			选座购票
		</view>
		<u-overlay style="background-color: #fff;" :show="showPhote" :duration="400" :z-index="99999" :opacity="1">
			<view class="all-warp">
				<view class="nav">
					<u-icon name="arrow-left" color="#191a1b" size="28" @click="showPhote = false"></u-icon>
					<text>剧照( {{detail.photos.length}} )</text>
				</view>
				<view class="all-photo">
					<view v-for="(data, index) in detail.photos" class="photo-item" :key="index">
						<image :src="data"></image>
					</view>
				</view>
			</view>
		</u-overlay>

	</view>
</template>

<script>
	import {
		parseTime
	} from '../../utile/data.js'
	export default {
		data() {
			return {
				detail: {},
				show: false,
				current: 0,
				showPhote: false
			};
		},
		methods: {
			goBack() {
				this.show = false
			},
			showOverlay(index) {
				this.show = true
				this.current = index
			},
			change(e) {
				this.current = e.current
			}
		},
		computed: {
			time() {
				return parseTime(this.detail.premiereAt * 1000, "{y}-{m}-{d}")
			}
		},
		onLoad(e) {
			console.log(e);
			uni.request({
				url: `https://m.maizuo.com/gateway?filmId=${e.id}&k=1800602`,
				header: {
					'X-Host': 'mall.film-ticket.film.info'
				},
				success: res => {
					// console.log(res.data.data.film);
					this.detail = JSON.parse(JSON.stringify(res.data.data.film))
					uni.setNavigationBarTitle({
						title: res.data.data.film.name
					});
				}
			})

		}
	}
</script>

<style lang="scss" scoped>
	
	.all-warp {
		.nav {
			height: 88rpx;
			margin-left: 10px;
			display: flex;
			align-items: center;
		
			text {
				font-size: 36rpx;
				color: #191a1b;
				flex: 1;
				text-align: center;
				margin-right: 20px;
			}
		}

		.all-photo {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.photo-item {
				width: 124px;
				height: 124px;
				box-sizing:border-box;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.warp {
		margin-top: 10px;
		text-align: center;
		color: #fff;

		.nav {
			margin-left: 10px;
			display: flex;
			margin-bottom: 55%;
			align-items: center;

			text {
				flex: 1;
				text-align: center;
				margin-right: 20px;
			}
		}
	}

	.detail {

		.section {
			background: #f5f5f5;
			padding-bottom: 100rpx;

			.img {
				width: 100%;
				height: 420rpx;
				overflow: hidden;
				position: relative;
				top: 0;

				image {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 50%;
					-webkit-transform: translateY(-50%);
				}
			}

			.content {
				padding: 0.9375rem;
				background: #fff;

				.text {
					margin-top: 0.75rem;
				}

				.content-text {
					font-size: 0.8125rem;
					color: #797d82;
					margin-top: 0.25rem;
				}

				.film-top {
					background: #fff;
					display: flex;
					justify-content: space-between;

					.film-name {
						width: 16rem;

						.name {
							font-size: 1.125rem;
							color: #191a1b;
							margin-right: 0.4375rem;
						}

						.item {
							font-size: 0.5625rem;
							color: #fff;
							background-color: #d2d6dc;
							height: 0.875rem;
							line-height: 0.875rem;
							margin-bottom: 0.4375rem;
							border-radius: 0.125rem;
							display: inline-block;
							vertical-align: middle;
						}
					}

					.film-grade {
						background: #fff;
						color: #ffb232;

						.grade {
							font-size: 1.125rem;
							font-style: italic;
						}

						.grade-text {
							font-size: 0.625rem;
						}
					}
				}
			}

			.actors {
				background: #fff;
				width: 100%;
				margin-top: 0.625rem;

				// height: 8.75rem;
				image {
					width: 170rpx;
					height: 170rpx;
					margin: 0 20rpx;
				}

				.actors-title {
					padding: 0.9375rem;
				}

				.actors-name {
					text-align: center;
					padding-top: 0.625rem;
					font-size: 0.75rem;
					color: #191a1b;
				}

				.actors-role {
					font-size: 0.625rem;
					color: #797d82;
					text-align: center;
				}
			}

			.photos {
				background: #fff;
				margin-top: 0.625rem;
				margin-bottom: 10px;
				overflow: hidden;

				image {
					width: 300rpx;
					height: 150rpx;
					margin: 0 20rpx;
				}

				.photos-title {
					padding: 0.9375rem;
					display: flex;
					justify-content: space-between;

					.right {
						font-size: 13px;
						color: #797d82;
					}
				}
			}
		}

		.footer {

			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 999;
			height: 120rpx;
			line-height: 120rpx;
			background-color: #ff5f16;
			color: #fff;
			font-size: 32rpx;
			text-align: center;
		}
	}
</style>