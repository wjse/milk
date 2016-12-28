define(['jquery','util','api','wHandler','converter','alert','iScroll'],function($,util,api,handler){

    if(!handler.isUserLogin()){
        return;
    }

    var type = util.getUrlParam('type');
        
    api.on(type,function(data){
        util.getScript('/order/view/order-head-view').then(function(){
            window.orderHeadView(type);
        });

        util.getScript('/order/view/order-main-view').then(function(){
            window.orderMainView(type,data);
        });

        util.getScript('/common/footer-view').then(function(){
            window.footerView('.order-page','profile');
        });
    });
});
