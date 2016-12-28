require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        alert : '../common/alert',
        util : '../common/util',
        config :'../common/config',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        detail : 'view/detail',
        loading:'../common/loading',
        slick : '../../lib/slick/slick.min'
    },
    shim : {
        alert: {
            deps : ['jquery']
        },
        slick:{
            deps : ['jquery']
        }
    }
});

define(['wHandler',"jquery",'util','config','api','detail','converter','alert','loading','slick'],function (handler) {
    handler.isWeixin();
});