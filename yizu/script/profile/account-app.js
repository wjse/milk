require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        account : 'view/account',
        loading : '../common/loading'
    }
});
define(['wHandler','jquery','config','util','api','account','converter','loading'],function(handler){
    handler.isWeixin();
});
