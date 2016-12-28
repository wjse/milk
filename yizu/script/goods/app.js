require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        util : '../common/util',
        config :'../common/config',
        wHandler : '../common/handler',
        converter : '../common/converter',
        api : 'service/api',
        sorter : 'service/sorter',
        goods : 'view/goods',
        loading:'../common/loading',
        iScroll : '../common/iscroll'
    },
    shim : {
        iScroll : {
            exports: 'iScroll'
        }
    }
});

define(['wHandler',"jquery",'util','config','api','sorter','goods','converter','loading','iScroll'],function (handler) {
    handler.isWeixin();
});