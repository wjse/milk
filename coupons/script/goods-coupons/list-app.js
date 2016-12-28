require.config({
    paths: {
        jquery : '../../lib/jquery/jquery.min',
        $form : '../../lib/jquery/jquery.form',
        bootstrap : '../../lib/bootstrap/bootstrap.min',
        config : '../common/config',
        upload : '../common/uploader',
        util : '../common/util',
        plugins : '../common/plugins',
        date : '../common/jquery.date',
        userToken : '../common/token',
        api : 'service/api',
        goodsCoupons : 'view/goods-coupons'
    },
    shim : {
        bootstrap: {
            deps: ['jquery']
        },
        upload : {
            deps : ['jquery','$form']
        },
        date :{
            deps: ['jquery','bootstrap']
        }
    }
});
define(['jquery','$form','bootstrap','config',
    'upload', 'util','plugins','date',
    'userToken','api','goodsCoupons']);
/**
 * Created by Administrator on 2016/5/31 0031.
 */
