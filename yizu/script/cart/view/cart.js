define(['util','api','wHandler','converter','event','goodsApi','jquery','alert'],function(util,api,handler){
    if(!handler.isUserLogin()){
        return;
    }

    api.on(function(data){
        if(!data || data.length == 0){
            util.getScript('/cart/view/cart-empty-view').then(function(){
                window.cartEmptyView();
            });

            util.getScript('/home/view/special-view').then(function(){
                window.specialView(api.recommend(),'猜你喜欢');
            });
        }else{
            util.getScript('/cart/view/cart-list-view').then(function(){
                window.cartListView(data);
            });
        }

        util.getScript('/common/footer-view').then(function(){
            window.footerView('.cart-page','cart');
        });
    });
});
