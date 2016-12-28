require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        $form : '../../lib/jquery/jquery.form',
        bootstrap : '../../lib/bootstrap/bootstrap.min',
        config : '../common/config',
        upload : '../common/uploader',
        util : '../common/util',
        plugins : '../common/plugins',
        date : '../common/jquery.date',
        tree : '../common/tree.jquery',
        brandApi : '../brand/service/api',
        categoryApi : '../category/service/api',
        basicApi : '../basic/service/api',
        userToken : '../common/token',
        api : 'service/api',
        goods : 'view/goods'
    },
    shim : {
        bootstrap: {
            deps: ['jquery']
        },
        upload :{
            deps: ['jquery','$form']
        },
        tree : {
            deps: ['jquery']
        },
        date :{
            deps: ['jquery','bootstrap']
        }
    }
});
define(['jquery','bootstrap','config','upload','util','plugins','date',
    'tree','brandApi','categoryApi','basicApi','userToken','api','goods']);

