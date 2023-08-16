## /ApiCinema

```text
接口根网址是https://m.maizuo.com，需要通过反向代理才能访问接口数据，如果基于微信小程序则不需要反向代理，腾讯云服务，帮我们做了
```

#### 公共Header参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| Content-Type | application/json | 必传字段 |
| Content-Type | application/x-www-form-urlencoded | - |

#### 公共Query参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 公共Body参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

## /ApiCinema/当前影院的信息接口

```text
暂无描述
```

#### 公共Header参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 公共Query参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 公共Body参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

## /ApiCinema/当前影院的信息接口/影院场次信息数据

```text
通过不同的时间，影院，影片，返回不同的信息（schedules数组，里面存放了对应的场次信息）
~~~~
```

#### 接口状态

> 开发中

#### 接口URL

> /gateway/?filmId=6464&cinemaId=4876&date=1692115200&k=7271273

#### 请求方式

> GET

#### Content-Type

> none

#### 请求Header参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| X-Host | mall.film-ticket.schedule.list | String | 是 | 必传字段 |

#### 请求Query参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| filmId | 6464 | String | 是 | 电影id |
| cinemaId | 4876 | String | 是 | 影院id |
| date | 1692115200 | String | 是 | 某天的时间 |
| k | 7271273 | String | 否 | - |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

## /ApiCinema/当前影院的信息接口/影院信息

```text
获取当前影院的基本信息
```

#### 接口状态

> 开发中

#### 接口URL

> gateway/?cinemaId=4876

#### 请求方式

> GET

#### Content-Type

> none

#### 请求Header参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| X-Host | mall.film-ticket.cinema.info | String | 是 | 必传字段 |

#### 请求Query参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| cinemaId | 4876 | String | 是 | 影院id |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

## /ApiCinema/当前影院的信息接口/影院上映电影数据

```text
获取当前影院上映电影的信息~~~~
```

#### 接口状态

> 开发中

#### 接口URL

> gateway/?cinemaId=4876&k=3596631

#### 请求方式

> GET

#### Content-Type

> none

#### 请求Header参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| X-Host | mall.film-ticket.film.cinema-show-film | String | 是 | 必传字段 |

#### 请求Query参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| cinemaId | 4876 | String | 是 | 影院id |
| k | 3596631 | String | 否 | - |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

## /ApiCinema/电影信息描述接口

```text
暂无描述
```

#### 公共Header参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 公共Query参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 公共Body参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

## /ApiCinema/电影信息描述接口/首页电影数据数据

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口URL

> gateway?cityId=110100&pageNum=1&pageSize=10&type=1

#### 请求方式

> GET

#### Content-Type

> urlencoded

#### 请求Header参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| X-Host | mall.film-ticket.cinema.list | String | 是 | 必传字段 |

#### 请求Query参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| cityId | 110100 | String | 是 | 城市id |
| pageNum | 1 | String | 是 | 当前页码 |
| pageSize | 10 | String | 是 | 每页数据数量 |
| type | 1 | String | 是 | type是电影类型，1是正在热映，2是即将上映 |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

#### 成功响应示例

```javascript
{"status": 0,
"data": 
    {"films": [{"filmId": "filmId", "name": "string",}], "total": "number"},
"msg": "ok"}
```

#### 错误响应示例

```javascript
{
	"status": "****",
	"data": "",
	"msg": "****"
}
```

## /ApiCinema/电影信息描述接口/电影详情

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口URL

> gateway?filmId=6460

#### 请求方式

> GET

#### Content-Type

> urlencoded

#### 请求Header参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| X-Host | mall.film-ticket.film.info | String | 是 | 必传字段 |

#### 请求Query参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| filmId | 6460 | String | 是 | 影片对应ID |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

#### 成功响应示例

```javascript
{"status": 0,
"data": 
    {"films": [{"filmId": "filmId", "name": "string",}], "total": "number"},
"msg": "ok"}
```

#### 错误响应示例

```javascript
{
	"status": "****",
	"data": "",
	"msg": "****"
}
```

## /ApiCinema/城市信息接口

```text
暂无描述
```

#### 公共Header参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 公共Query参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 公共Body参数

| 参数名 | 示例值 | 参数描述 |
| --- | --- | ---- |
| 暂无参数 |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

## /ApiCinema/城市信息接口/城市影院数据

```text
暂无描述
```

#### 接口状态

> 开发中

#### 接口URL

> gateway?cityId=110100

#### 请求方式

> GET

#### Content-Type

> none

#### 请求Header参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| X-Host | mall.film-ticket.cinema.list | String | 是 | 必传字段 |

#### 请求Query参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| cityId | 110100 | String | 是 | 当前城市id |
| ticketFlag | 1 | String | 是 | - |
| k | 3996697 | String | 是 | - |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```

#### 成功响应示例

```javascript
{"status": 0,
"data": 
    {"cinemaId": [{"cinemaId": "cinemaId", "name": "string",}], "total": "number"},
"msg": "ok"}
```

#### 错误响应示例

```javascript
{
	"status": "****",
	"data": "",
	"msg": "****"
}
```

## /ApiCinema/城市信息接口/城市信息

```text
全国所有城市信息~~~~
```

#### 接口状态

> 开发中

#### 接口URL

> gateway?k=6924312

#### 请求方式

> GET

#### Content-Type

> none

#### 请求Header参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| X-Host | mall.film-ticket.city.list | String | 是 | 必传字段 |

#### 请求Query参数

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| k | 6924312 | String | 否 | - |

#### 预执行脚本

```javascript
暂无预执行脚本
```

#### 后执行脚本

```javascript
暂无后执行脚本
```
