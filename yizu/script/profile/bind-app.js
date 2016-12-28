require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        wHandler : '../common/handler',
        alert : '../common/alert',
        api : 'service/api',
        bind : 'view/bind',
        loading : '../common/loading'
    },
    shim : {
        alert: {
            deps : ['jquery']
        }
    }
});
define(['wHandler','jquery','config','util','api','bind','loading','alert'],function(h){
    h.isWeixin();
});
