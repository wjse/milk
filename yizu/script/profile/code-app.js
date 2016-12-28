require.config({
    paths : {
        jquery : '../../lib/jquery/jquery.min',
        config : '../common/config',
        util : '../common/util',
        wHandler : '../common/handler',
        api : 'service/api',
        qrcode : 'view/qrcode',
        loading : '../common/loading'
    }
});
define(['wHandler','jquery','config','util','api','qrcode','loading']);
