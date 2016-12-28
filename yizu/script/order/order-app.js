require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        alert : '../common/alert',
        util : '../common/util',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        order : 'view/order',
        loading:'../common/loading',
        iScroll : '../common/iscroll'
    },

    shim:{
        alert : {
            deps : ['jquery']
        },
        iScroll : {
            exports: 'iScroll'
        }
    }
});
define(['wHandler','jquery','config','util','api','order','converter','alert','loading','iScroll'],function(handler){
    handler.isWeixin();
});

