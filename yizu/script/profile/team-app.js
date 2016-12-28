require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        wHandler : '../common/handler',
        team : 'view/team',
        api : 'service/api',
        loading : '../common/loading',
        converter: '../common/converter',
        iScroll : '../common/iscroll'
    },
    shim:{
        iScroll : {
            exports: 'iScroll'
        }
    }
});
define(['wHandler','jquery','config','util','api','team','loading','converter','iScroll'],function(h){
    h.isWeixin();
});
