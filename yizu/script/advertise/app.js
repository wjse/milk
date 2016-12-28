require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        wHandler : '../common/handler',
        converter : '../common/converter',
        advertise : 'view/advertise',
        loading:'../common/loading'
    }
});
define(['wHandler','jquery','config','util','advertise','converter','loading'],function(handler){
    handler.isWeixin();
});
