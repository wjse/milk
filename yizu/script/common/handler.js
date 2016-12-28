define(['jquery','config','util'],function($,config,util){

    const title = '壹租';
    var path = config.v4,
        appId = 'wxbc5a917b4cabf914';
        // appId = 'wxa68f10c1765f9d8c';

    this.isWeixin = function(){
        var ua = navigator.userAgent;
        if(!/MicroMessenger/.test(ua)){
            window.location.href = '/error.html';
        }

        setTitle();
    };

    this.hasUser = function(){
        var token = util.storage().get('user');
        if(!token){
            token = util.getUrlParam('utoken');
            if(!token){
                return false;
            }else{
                if(!validateToken(token)){
                    return false;
                }else{
                    util.storage().put('user',token);
                }
            }
        }else{
            if(!validateToken(token)){
                return false;
            }
        }
        return true;
    };

    this.login = function(){
        var currentPage = encodeURI(window.location.href),
            loginPath = path.concat('/wechat/login?appId=',appId,'&returnUrl=',currentPage);
        window.location.href = loginPath;
    };

    this.isUserLogin = function(){
        if(!this.hasUser()){
            util.storage().remove('user');
            this.login();
            return false;
        }
        return true;
    };

    this.weixinPay = function(orderId,callback){
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else{
            var token = util.storage().get('user');
            $.ajax({
                url : path.concat('/wechat/payment?uToken=',token,'&order_id=',orderId),
                type : 'get',
                success : function(resp){
                    if(!resp.status){
                        onBridgeReady(resp,callback);
                    }
                }
            });

        }
    };

    function onBridgeReady(resp,callback){
        WeixinJSBridge.invoke('getBrandWCPayRequest',resp,function(res){
            if(res.err_msg == 'get_brand_wcpay_request:ok'){
                callback.call();
            }
        });
    };

    function setTitle(){
        $('title').html(title);
    };

    function validateToken(token){
        var result = false;
        $.ajax({
            url : path.concat('/yizu/user?uToken=',token,'&validToken'),
            type : 'get',
            async : false,
            success : function(resp){
                if(resp.status == 200){
                    result = true;
                }
            }
        });

        return result;
    };

    this.overScroll = function (el) {
        if(!el){
            return;
        }
        el.addEventListener('touchstart', function() {
            var top = el.scrollTop
                , totalScroll = el.scrollHeight
                , currentScroll = top + el.offsetHeight;
            if(top === 0) {
                el.scrollTop = 1;
            } else if(currentScroll === totalScroll) {
                el.scrollTop = top - 1;
            }
        });
        el.addEventListener('touchmove', function(evt) {
            if(el.offsetHeight < el.scrollHeight)
                evt._isScroller = true;
        });

        document.body.addEventListener('touchmove', function(evt) {
            if(!evt._isScroller) {
                evt.preventDefault();
            }
        });
    }

    return this;
});