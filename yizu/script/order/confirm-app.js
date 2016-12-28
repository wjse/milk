require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        alert : '../common/alert',
        util : '../common/util',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        confirm : 'view/confirm',
        loading:'../common/loading'
    },

    shim:{
        alert : {
            deps : ['jquery']
        }
    }
});
define(['wHandler','jquery','config','util','api','confirm','converter','alert','loading'],function(handler){
    handler.isWeixin();
});

