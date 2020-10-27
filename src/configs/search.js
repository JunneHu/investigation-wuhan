import moment from 'moment';

// type 0 input 1 select 2 RangePicker
const beginTime = moment().format('YYYY-MM-DD 00:00:00');
const endTime = moment().format('YYYY-MM-DD 23:59:59');

export default {
    CommodityType: [
        {
            name: '游戏名称',
            index: 0,
            type: 0,
            id: 'code',
        },
        {
            name: '分类状态',
            index: 1,
            type: 1,
            id: 'isEnable',
            defaultValue: '',
            items: [
                { name: '全部', value: '' },
                { name: '正常', value: 'true' },
                { name: '禁用', value: 'false' },
            ]
        },
    ],
    ProfitWithdraw: [
        {
            name: '流水号',
            index: 0,
            type: 0,
            id: 'id',
        },
        {
            name: '类型',
            index: 1,
            type: 1,
            id: 'type',
            defaultValue: '1',
            changeType: true,
            items: [
                { name: '提现利润', value: '1' },
                { name: '充值利润', value: '2' },
            ]
        },
        {
            name: '提现日期',
            index: 2,
            type: 2,
        },
    ],
    ProfitStatement: [
        {
            name: '订单号',
            index: 0,
            type: 0,
            id: 'orderId',
        },
        {
            name: '订单类型',
            index: 1,
            type: 1,
            id: 'orderType',
            defaultValue: '',
            items: [
                { name: '全部', value: '' },
                { name: '非求购', value: '1' },
                { name: '求购', value: '2' },
            ]
        },
        {
            name: '下单日期',
            index: 3,
            type: 2,
        },
        {
            name: '交易模式',
            index: 2,
            type: 1,
            id: 'tradeMode',
            defaultValue: '',
            items: [
                { name: '全部', value: '' },
                { name: '寄售', value: '1' },
                { name: '自售', value: '2' },
                { name: '挂单', value: '3' },
            ]
        },
    ],
};
