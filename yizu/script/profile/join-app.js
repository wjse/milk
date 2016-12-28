require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        wHandler : '../common/handler',
        alert : '../common/alert',
        join : 'view/join',
        api : 'service/api',
        loading : '../common/loading'
    },
    shim : {
        alert: {
            deps : ['jquery']
        }
    }
});
define(['wHandler','jquery','config','util','api','join','loading','alert'],function(h){
    h.isWeixin();
});
