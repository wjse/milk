require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        alert : '../common/alert',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        goodsApi : '../goods/service/api',
        event : 'service/cart-event',
        cart : 'view/cart',
        loading:'../common/loading'
    },
    shim : {
        alert: {
            deps : ['jquery']
        }
    }
});
define(['wHandler','jquery','config','util','api','event','cart','converter','goodsApi','alert','loading'],function(handler){
    handler.isWeixin();
});
