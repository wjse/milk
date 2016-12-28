require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        $form : '../../lib/jquery/jquery.form',
        bootstrap : '../../lib/bootstrap/bootstrap.min',
        config : '../common/config',
        util : '../common/util',
        userToken : '../common/token',
        api : 'service/api',
        category : 'view/category'
    },
    shim : {
        bootstrap: {
            deps: ['jquery']
        }
    }
});
define(['jquery','bootstrap','config','api','util','userToken','category']);
