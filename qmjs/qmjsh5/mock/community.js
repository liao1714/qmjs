export default {
  '/api/mock/community/activity': {
    'code': 200,
    'data': [
      {
        'portrait': 'portrait.png',
        'name': '软二最靓的仔',
        'isPresident': true,
        'groupName': '团二超跑团',
        'time': '11:20',
        'content': '8月15日0点夜跑聚会，路线是软件园南门奠基石到环岛路会展中心，一共10km，跑步开始时间8月18日（星期天）早上6：00在南门奠基石集合，不需要缴费，要报名的直接在请在评论中回复1，统计截止到8月16日23：00，限制人数30人，先到先得，大家可以踊跃参加，会有志愿者会免费矿泉水提供补充。',
        'imageList': ['community-activity1.png', 'community-activity2.png', 'community-activity1.png', 'community-activity1.png',],
        'sign': false
      },
      {
        'portrait': 'portrait.png',
        'name': '软二最靓的仔',
        'isPresident': false,
        'groupName': '团二超跑团',
        'time': '11:20',
        'content': '8月15日0点夜跑聚会，路线是软件园南门奠基石到环岛路会展中心，一共10km，跑步开始时间8月18日（星期天）早上6：00在南门奠基石集合，不需要缴费。',
        'imageList': ['community-activity1.png', 'community-activity2.png'],
        'sign': false
      }
    ],
    'msg': 'ok'
  },
  '/api/mock/community/association': {
    'code': 200,
    'data': {
      'myAssociation': [
        {
          'portrait': 'portrait.png',
          'name': '夜跑美男组',
          'isNew': true,
          'content': '8月15日0点夜跑聚会。'
        },
        {
          'portrait': 'portrait.png',
          'name': '夜跑美男组',
          'isNew': true,
          'content': '8月15日0点夜跑聚会。'
        },
        {
          'portrait': 'portrait.png',
          'name': '夜跑美男组',
          'isNew': false,
          'content': '8月15日0点夜跑聚会。'
        }
      ],
      'findAssociation': [
        {
          'portrait': 'portrait.png',
          'name': '夜跑美男组',
          'type': '跑步',
          'address': '翔安',
          'number': '26',
          'content': '专注于竞速跑，速度就是王道。'
        },
        {
          'portrait': 'portrait.png',
          'name': '夜跑美男组',
          'type': '跑步',
          'address': '翔安',
          'number': '26',
          'content': '专注于竞速跑，速度就是王道。'
        },
        {
          'portrait': 'portrait.png',
          'name': '夜跑美男组',
          'type': '跑步',
          'address': '翔安',
          'number': '26',
          'content': '专注于竞速跑，速度就是王道。'
        }
      ]
    },
    'msg': 'ok'
  }
}
