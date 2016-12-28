require.config({
    paths : {
        jquery: '../../lib/jquery/jquery.min',
        bootstrap: '../../lib/bootstrap/bootstrap.min',
        util: '../common/util',
        userToken : '../common/token',
        config:'../common/config',
        api : 'service/api',
        view : 'view/view'
    },
    shim : {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});
define(['jquery','bootstrap','util','userToken','config','api','view']);
/**
 * Created by Administrator on 2016/6/3 0003.
 */
