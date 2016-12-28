require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        profit : 'view/profit',
        loading:'../common/loading',
        iScroll : '../common/iscroll'
    },
    shim:{
        iScroll : {
            exports: 'iScroll'
        }
    }
});
define(['wHandler','jquery','config','util','api','profit','converter','loading','iScroll'],function(handler){
    handler.isWeixin();
});

