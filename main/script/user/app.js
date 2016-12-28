require.config({
    paths:{
        jquery:'../../lib/jquery/jquery.min',
        bootstrap: '../../lib/bootstrap/bootstrap.min',
        util : '../common/util',
        userToken : '../common/token',
        config:'../common/config',
        api:'service/api',
        user : 'view/user',
        system : '../system/service/api'
    },
    shim : {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});
define(['jquery','bootstrap','util','userToken','config','api','system','user']);
