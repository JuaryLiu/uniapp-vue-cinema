import {getSwiperData ,getTimeData} from '../api/api.js'
import { parseTime } from '../utile/data.js'
export const cinema = {
    state: {
        current:0,
		list:{},
		swiperList:[],
		time:[],
		schedules:[]
    },
    mutations: {
        changeSwiperItem(state,data) {
			// console.log(data);
			state.swiperList = data
			state.list =  data[state.current]
			// console.log(state.list);
			state.time =  data[state.current].showDate
		},
		changeTimeItem(state,data) {
			// console.log(data);
			state.schedules = data
			state.schedules.forEach(item => {
				item.showAt_ = parseTime(item.showAt *1000,'{h}:{i}')
				item.endAt_ = parseTime(item.endAt *1000,'{h}:{i}')
			})
			// console.log(state.schedules);
		},
		changeCurrent(state,num) {
			state.current = num
		},
		clearSchedules(state) {
			state.schedules = []
		}
    },
    actions: {
     getSwiperItem(store,id) {
		 return getSwiperData(id).then(res => {
			  store.commit('changeSwiperItem',res.data.films)
		 })
	 },
	 getTimeItem(store,data) {
	 	return getTimeData(data.filmId,data.id,data.time).then(res =>{
			// console.log(res);
			store.commit('changeTimeItem',res.data.schedules)
	 	})
	 }
    },
    getters: {
     
    }
}