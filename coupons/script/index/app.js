require.config({
    paths: {
        jquery : '../../lib/jquery/jquery.min',
        $form : '../../lib/jquery/jquery.form',
        bootstrap : '../../lib/bootstrap/bootstrap.min',
        config : '../common/config',
        util : '../common/util',
        plugins : '../common/plugins',
        userToken : '../common/token',
        view : 'view/coupons'
    },
    shim : {
        bootstrap: {
            deps: ['jquery']
        }
    }
});
define(['jquery','$form','bootstrap','config',
     'util','plugins','userToken','view']);
/**
 * Created by Administrator on 2016/5/31 0031.
 */
