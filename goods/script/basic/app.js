require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        $form : '../../lib/jquery/jquery.form',
        bootstrap : '../../lib/bootstrap/bootstrap.min',
        note : '../common/summernote.min',
        tree : '../common/tree.jquery',
        config : '../common/config',
        upload : '../common/uploader',
        util : '../common/util',
        plugins : '../common/plugins',
        userToken : '../common/token',
        brandApi : '../brand/service/api',
        categoryApi : '../category/service/api',
        api : 'service/api',
        basic : 'view/basic'
    },
    shim : {
        bootstrap: {
            deps: ['jquery']
        },
        upload :{
            deps: ['jquery','$form']
        },
        note :{
            deps: ['bootstrap','jquery']
        },
        tree : {
            deps: ['jquery']
        }
    }
});
define(['jquery','bootstrap','note','config','upload','util','plugins',
    'userToken','tree','brandApi','categoryApi','api','basic']);

