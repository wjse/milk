require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        $form : '../../lib/jquery/jquery.form',
        bootstrap : '../../lib/bootstrap/bootstrap.min',
        config : '../common/config',
        upload : '../common/uploader',
        plugins : '../common/plugins',
        util : '../common/util',
        userToken : '../common/token',
        api : 'service/api',
        view : 'view/system',
        colorHandler : 'model/color-handler'
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
define(['util','jquery','bootstrap','upload','plugins','userToken','api','view','config','colorHandler']);