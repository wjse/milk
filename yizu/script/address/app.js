require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        alert : '../common/alert',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        areaList : 'service/area-list',
        address : 'view/address',
        addressForm : 'view/address-form',
        loading : '../common/loading'
    },
    shim : {
        alert: {
            deps : ['jquery']
        }
    }
});
define(['wHandler','jquery','config','util','api','address','converter','areaList','addressForm','loading'],function(handler){
    handler.isWeixin();
});
