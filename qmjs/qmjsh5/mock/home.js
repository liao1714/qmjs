import mockjs from 'mockjs'
export default {
  '/api/home/banner': {
    'code': 200,
    'data': [
      {
        'isShow': 1,
        'imageUrl': 'banner1.png',
        'comment': '轮播图1'
      },
      {
        'isShow': 1,
        'imageUrl': 'banner2.png',
        'comment': '轮播图2'
      },
      {
        'isShow': 1,
        'imageUrl': 'banner3.png',
        'comment': '轮播图3'
      }
    ],
    'msg': 'ok'
  },
  '/api/home/activity': {
    'code': 200,
    'data': [
      {
        'pkId': 1,
        'title': '厦门软件园5km路跑大赛，即将进行敬请期待，欢迎参加啊啊啊啊',
        'imageUrl': 'activity.png',
        'type': '跑步',
        'area': '软件园',
        'number': '234',
        'status': 0
      },
      {
        'pkId': 2,
        'title': '厦门软件园篮球大赛，即将进行敬请期待，欢迎参加啊啊啊啊',
        'imageUrl': 'activity.png',
        'type': '篮球',
        'area': '软件园',
        'number': '234',
        'status': 1
      },
      {
        'pkId': 3,
        'title': '厦门软件园高尔夫球大赛，即将进行敬请期待，欢迎参加啊啊啊啊',
        'imageUrl': 'activity.png',
        'type': '高尔夫球',
        'area': '软件园',
        'number': '234',
        'status': 2
      },
      {
        'pkId': 4,
        'title': '厦门软件园羽毛球大赛，即将进行敬请期待，欢迎参加啊啊啊啊',
        'imageUrl': 'activity.png',
        'type': '羽毛球',
        'area': '软件园',
        'number': '234',
        'status': 1
      }
    ],
    'msg': 'ok'
  },
  '/api/blade-auth/oauth/captcha': {
    key:'123',
    image:'456'
  },
  // 使用 mockjs 等三方库
  // 更多用法请参考 http://mockjs.com/examples.html
  'GET /api/test': mockjs.mock({
    code: 1,
    data:{
      'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }]
    },
    msg: 'ok'
  }),
}
