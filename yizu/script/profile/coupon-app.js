require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        wHandler : '../common/handler',
        api : 'service/api',
        coupon : 'view/coupon',
        converter : '../common/converter',
        loading : '../common/loading',
        iScroll : '../common/iscroll'
    },
    shim:{
        iScroll : {
            exports: 'iScroll'
        }
    }
});
define(['wHandler','jquery','config','util','api','coupon','loading','converter','iScroll'],function(wHandler){
    wHandler.isWeixin();
});

