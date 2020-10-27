const rawData = [
  {
    "id": 1,
    "parentId": 0,
    "name": "行政办公",
    "icon": "mail"
  },
  {
    "id": 11,
    "parentId": 1,
    "name": "组织单位",
    "icon": "pie-chart"
  },
  {
    "id": 111,
    "parentId": 11,
    "name": "组织单位1",
    "icon": "pie-chart"
  },
  {
    "id": 1111,
    "parentId": 111,
    "name": "单位职能1",
    "icon": "pie-chart"
  },
  {
    "id": 1112,
    "parentId": 111,
    "name": "单位职能1",
    "icon": "pie-chart"
  },
  {
    "id": 1113,
    "parentId": 111,
    "name": "单位职能1",
    "icon": "pie-chart"
  },
  {
    "id": 112,
    "parentId": 11,
    "name": "组织单位2",
    "icon": "pie-chart"
  },
  {
    "id": 1121,
    "parentId": 112,
    "name": "单位职能2",
    "icon": "pie-chart"
  },
  {
    "id": 1122,
    "parentId": 112,
    "name": "单位职能3",
    "icon": "pie-chart"
  },
  {
    "id": 1123,
    "parentId": 112,
    "name": "单位职能4",
    "icon": "pie-chart"
  },
  {
    "id": 12,
    "parentId": 1,
    "name": "工作流程",
    "icon": "pie-chart"
  },
  {
    "id": 121,
    "parentId": 12,
    "name": "人员考勤",
    "icon": "pie-chart"
  },
  {
    "id": 1211,
    "parentId": 121,
    "name": "考勤排班",
    "icon": "pie-chart"
  },
  {
    "id": 1212,
    "parentId": 121,
    "name": "考勤管理",
    "icon": "pie-chart"
  },
  {
    "id": 1213,
    "parentId": 121,
    "name": "我的考勤",
    "icon": "pie-chart"
  },
  {
    "id": 1214,
    "parentId": 121,
    "name": "打卡管理",
    "icon": "pie-chart"
  },
  {
    "id": 122,
    "parentId": 12,
    "name": "薪资福利",
    "icon": "pie-chart"
  },
  {
    "id": 1221,
    "parentId": 122,
    "name": "薪资管理",
    "icon": "pie-chart"
  },
  {
    "id": 1222,
    "parentId": 122,
    "name": "工资管理",
    "icon": "pie-chart"
  },
  {
    "id": 1223,
    "parentId": 122,
    "name": "薪资用户",
    "icon": "pie-chart"
  },
  {
    "id": 1224,
    "parentId": 122,
    "name": "我的工资",
    "icon": "pie-chart"
  },
  {
    "id": 123,
    "parentId": 12,
    "name": "人员排班",
    "icon": "pie-chart"
  },
  {
    "id": 1231,
    "parentId": 123,
    "name": "排班模版",
    "icon": "pie-chart"
  },
  {
    "id": 12322,
    "parentId": 123,
    "name": "排班管理",
    "icon": "pie-chart"
  },
  {
    "id": 1233,
    "parentId": 123,
    "name": "我的考勤",
    "icon": "pie-chart"
  },
  {
    "id": 1234,
    "parentId": 123,
    "name": "打卡管理",
    "icon": "pie-chart"
  },
  {
    "id": 124,
    "parentId": 12,
    "name": "招聘管理",
    "icon": "pie-chart"
  },
  {
    "id": 1241,
    "parentId": 124,
    "name": "建立管理",
    "icon": "pie-chart"
  },
  {
    "id": 1242,
    "parentId": 124,
    "name": "人才管理",
    "icon": "pie-chart"
  },
  {
    "id": 1243,
    "parentId": 124,
    "name": "代办管理",
    "icon": "pie-chart"
  },
  {
    "id": 1244,
    "parentId": 124,
    "name": "打卡管理",
    "icon": "pie-chart"
  },
  {
    "id": 125,
    "parentId": 12,
    "name": "人员考勤",
    "icon": "pie-chart"
  },
  {
    "id": 1251,
    "parentId": 125,
    "name": "考勤排班",
    "icon": "pie-chart"
  },
  {
    "id": 1252,
    "parentId": 125,
    "name": "考勤管理",
    "icon": "pie-chart"
  },
  {
    "id": 1253,
    "parentId": 125,
    "name": "我的考勤",
    "icon": "pie-chart"
  },
  {
    "id": 1254,
    "parentId": 125,
    "name": "打卡管理",
    "icon": "pie-chart"
  },
  {
    "id": 13,
    "parentId": 1,
    "name": "人事行政",
    "icon": "pie-chart"
  },
  {
    "id": 14,
    "parentId": 1,
    "name": "公共信息",
    "icon": "pie-chart"
  },
  {
    "id": 15,
    "parentId": 1,
    "name": "投票管理",
    "icon": "pie-chart"
  },
  {
    "id": 2,
    "parentId": 0,
    "name": "财务系统",
    "icon": "pie-chart"
  },
  {
    "id": 21,
    "parentId": 2,
    "name": "人事行政",
    "icon": "pie-chart"
  },
  {
    "id": 22,
    "parentId": 2,
    "name": "人事行政",
    "icon": "pie-chart"
  },
  {
    "id": 23,
    "parentId": 2,
    "name": "人事行政",
    "icon": "pie-chart"
  },
  {
    "id": 24,
    "parentId": 2,
    "name": "公共信息",
    "icon": "pie-chart"
  },
  {
    "id": 25,
    "parentId": 2,
    "name": "投票管理",
    "icon": "pie-chart"
  },
  {
    "id": 3,
    "parentId": 0,
    "name": "分析系统",
    "icon": "pie-chart"
  },
  {
    "id": 4,
    "parentId": 0,
    "name": "测量工具",
    "icon": "pie-chart"
  },
  {
    "id": 41,
    "parentId": 4,
    "name": "Option1",
    "icon": "pie-chart"
  },
  {
    "id": 411,
    "parentId": 41,
    "name": "Option411",
    "icon": "pie-chart"
  },
  {
    "id": 412,
    "parentId": 41,
    "name": "Option412",
    "icon": "pie-chart"
  },
  {
    "id": 413,
    "parentId": 41,
    "name": "Option413",
    "icon": "pie-chart"
  },
  {
    "id": 42,
    "parentId": 4,
    "name": "Option42",
    "icon": "pie-chart"
  },
  {
    "id": 43,
    "parentId": 4,
    "name": "Option43",
    "icon": "pie-chart"
  },
  {
    "id": 5,
    "parentId": 0,
    "name": "第三方应用",
    "icon": "pie-chart"
  },
  {
    "id": 51,
    "parentId": 5,
    "name": "Option51",
    "icon": "pie-chart"
  },
  {
    "id": 511,
    "parentId": 51,
    "name": "Option511",
    "icon": "pie-chart"
  },
  {
    "id": 5111,
    "parentId": 511,
    "name": "Option5111",
    "icon": "pie-chart"
  },
  {
    "id": 5112,
    "parentId": 511,
    "name": "Option5112",
    "icon": "pie-chart"
  },
  {
    "id": 5113,
    "parentId": 511,
    "name": "Option5113",
    "icon": "pie-chart"
  },
  {
    "id": 512,
    "parentId": 51,
    "name": "Option512",
    "icon": "pie-chart"
  },
  {
    "id": 5121,
    "parentId": 512,
    "name": "班组管理",
    "icon": "pie-chart"
  },
  {
    "id": 5122,
    "parentId": 512,
    "name": "班组管理理",
    "icon": "pie-chart"
  },
  {
    "id": 5123,
    "parentId": 512,
    "name": "班组管理理理",
    "icon": "pie-chart"
  },
  {
    "id": 513,
    "parentId": 51,
    "name": "Option513",
    "icon": "pie-chart"
  },
  {
    "id": 52,
    "parentId": 5,
    "name": "Option52",
    "icon": "pie-chart"
  },
  {
    "id": 53,
    "parentId": 5,
    "name": "Option53",
    "icon": "pie-chart"
  },
  {
    "id": 6,
    "parentId": 0,
    "name": "维护平台",
    "icon": "mail"
  },
  {
    "id": 7,
    "parentId": 0,
    "name": "项目管理",
    "icon": "mail"
  }
]


function resolveHierarchical(data, menu) {
  var children = data.filter(each => each.parentId == menu.id);
  children.forEach((o) => {
    var p = {};
    p.id = o.id;
    p.parentId = o.parentId;
    p.name = o.name;
    p.icon = o.icon;
    p.submenus =[];

    menu.submenus.push(p);

    resolveHierarchical(data, p);
  })
}

function hierarchical(data) {
  var lv1 = [];
  
  var lv1Raw = data.filter(each => each.parentId == 0).map(each => { each.submenus =[]; return each});

  lv1Raw.forEach((o, i) => {
    var p = {};
    p.id = o.id;
    p.parentId = o.parentId;
    p.name = o.name;
    p.icon = o.icon;
    p.submenus =[];

    lv1.push(p);

    resolveHierarchical(data, p);
  })

  return lv1;
}


export default hierarchical(rawData);