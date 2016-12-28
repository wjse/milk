require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        alert : '../common/alert',
        util : '../common/util',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        profile : 'view/profile',
        loading : '../common/loading'
    },
    shim : {
        alert: {
            deps : ['jquery']
        }
    }
});
define(['wHandler','jquery','config','util','api','profile','converter','loading'],function(handler){
    handler.isWeixin();
});
