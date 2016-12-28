require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        bootstrap : '../../lib/bootstrap/bootstrap.min',
        util : '../common/util',
        config : '../common/config',
        userToken : '../common/token',
        system : '../system/service/api',
        view : 'view/home',
        colorHandler : '../system/model/color-handler'
    },
    shim : {
        'bootstrap': {
            deps: ['jquery']
        }
    }

});

define(['util','jquery','bootstrap','userToken','system','view','config','colorHandler']);