require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        $form : '../../lib/jquery/jquery.form',
        bootstrap : '../../lib/bootstrap/bootstrap.min',
        config : '../common/config',
        upload : '../common/uploader',
        modal : '../common/modal',
        util : '../common/util',
        plugins : '../common/plugins',
        userToken : '../common/token',
        api : 'service/api',
        brand : 'view/brand'
    },
    shim : {
        bootstrap: {
            deps: ['jquery']
        },
        upload :{
            deps: ['jquery','$form']
        }
    }
});
define(['jquery','bootstrap','config','upload','modal',
    'userToken','util','plugins','api','brand']);
