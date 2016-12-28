require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        bootstrap : '../../lib/bootstrap/bootstrap.min',
        config : '../common/config',
        util : '../common/util',
        plugins : '../common/plugins',
        userToken : '../common/token',
        api : 'service/api',
        view : 'view/spec'
    },
    shim : {
        bootstrap: {
            deps: ['jquery']
        }
    }
});

define(['jquery','bootstrap','config','util',
        'plugins','userToken','api','view']);

/**
 * Created by Administrator on 2016/6/2 0002.
 */
