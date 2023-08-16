import request  from '../utile/request.js';

export  function getData(id) {
	return request({
		url:`/gateway?cityId=${id}&ticketFlag=1&k=4916560`,
		header: {
			"X-Host": "mall.film-ticket.cinema.list",
		}
	})
}

export  function getList(id,current,type) {
	return request({
		url:`/gateway?cityId=${id}&pageNum=${current}&pageSize=10&type=${type}`,
		header: {
			'X-Host': 'mall.film-ticket.film.list'
		}
	})
}

export  function getCity() {
	return request({
		url:`/gateway?k=2099798`,
		header: {
			"X-Host": "mall.film-ticket.city.list"
		}
	})
}
export  function getCinemaData(id) {
	return request({
		url:`/gateway/?cinemaId=${id}&k=2660658`,
		header: {
			"X-Host": "mall.film-ticket.cinema.info"
		}
	})
}


export  function getSwiperData(id) {
	return request({
		url:`/gateway/?cinemaId=${id}&k=4915013`,
		header: {
			"X-Host": "mall.film-ticket.film.cinema-show-film"
		}
	})
}

export  function getTimeData(filmId,cinemaId,time=1685808000) {
	return request({
		url:`/gateway/?filmId=${filmId}&cinemaId=${cinemaId}&date=${time}&k=6015462`,
		header: {
			"X-Host": "mall.film-ticket.schedule.list"
		}
	})
}
