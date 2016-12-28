require.config({
    paths : {
        jquery: '../../lib/jquery/jquery.min',
        bootstrap: '../../lib/bootstrap/bootstrap.min',
        jqueryForm: '../../lib/jquery/jquery.form',
        util: '../common/util',
        userToken : '../common/token',
        config:'../common/config',
        api : 'service/api',
        view : 'view/member'
    },
    shim : {
        'bootstrap': {
            deps: ['jquery']
        },
        "jqueryForm": {
            deps: ["jquery"]
        }
    }
});
define(['jquery','bootstrap','util','userToken','config','api','view']);
/**
 * Created by Administrator on 2016/5/19 0019.
 */
