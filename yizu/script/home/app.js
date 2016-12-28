require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        alert : '../common/alert',
        iScroll : '../common/iscroll',
        config : '../common/config',
        util : '../common/util',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        goodsApi : '../goods/service/api',
        home : 'view/home',
        loading : '../common/loading',
        slick : '../../lib/slick/slick.min'
    },

    shim : {
        iScroll : {
            exports: 'iScroll'
        },
        alert:{
            deps : ['jquery']
        },
        slick:{
            deps : ['jquery']
        }
    }
});
define(['wHandler','jquery','iScroll','config','util','api','home','converter','goodsApi','alert','loading','slick'],function(handler){
    handler.isWeixin();
});
