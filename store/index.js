import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

import {cinema} from './cinema.js'
import {getData } from '../api/api.js'
const store = new Vuex.Store({
	modules: { cinema},
	state: { //存放状态
		cityId: '110100',
		cityName: '北京',
		cinemaslist: [],
		areaList: [],
		areaNmae:'全城',
	},
	mutations: {
		changeCinemasData(state, data) {
			if(data.name === '全城') {
				state.cinemaslist = data.data
			} else {
				state.cinemaslist = data.data.filter(item => {
					return item.districtName === data.name
				})
			}
		},
		changeCityName(state, cityName) {
			state.cityName = cityName
		},
		changeCityId(state, cityId) {
			state.cityId = cityId
		},
		clearCinemasList(state) {
			state.cinemaslist = []
		},
		changeAreaName(state,item) {
			state.areaNmae = item
		},
		clearAreaList(state) {
			state.areaList = []
		},
		changeAreaList(state,data) {
			state.areaList.push('全城')
			data.forEach(item =>{
				state.areaList.push(item.districtName)
			})
			state.areaList = Array.from(new Set(state.areaList))
		}
	},
	actions: {
		getCinemasData(store, data) {
			return getData(data.id).then(res => {
				store.commit('changeCinemasData', {data:res.data.cinemas,name:data.name})
				store.commit('changeAreaList',res.data.cinemas)
			})
		},
	}
})

export default store