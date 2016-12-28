define(['jquery','util','api','wHandler','converter','alert'],function($,util,api,handler,converter){

    if(!handler.isUserLogin()){
        return;
    }

    var goodsList,storageKey = 'cartGoods',type = util.getUrlParam('from');

    var address = api.getUserAddress();

    if(address.length == 0) {
        window.location.href = 'address.html';
        return;
    }

    if('cart' != type){
        storageKey = 'toBuyGoods';
    }

    goodsList = util.storage().get(storageKey);
    if(!goodsList){
        return;
    }

    util.getScript('/order/view/confirm-address-view').then(function(){
        window.confirmAddressView(address);
    });

    util.getScript('/order/view/confirm-order-view').then(function(){
        window.confirmOrderView(goodsList);
    });

    $('#goodsNum').html(goodsNum());

    var totalPrice = total();
    var coupon = api.getOrderCoupon(totalPrice);

    if(coupon){
        totalPrice -= coupon.coupon_price;
        $('#coupon').html(
            '<img src="www/image/coupon.png"> '+
            '<span id="couponName">'+ coupon.coupon_name +'</span>'
        );
    }

    $('#total').html(converter.price(totalPrice));

    $('#submit').on('click',function(){
        var result = api.order({
            goods : getSubmitGoods(),
            address_id : $('#defaultAddress').attr('for')
        });

        if(result.ok){
            handler.weixinPay(result.id,function(){
                util.storage().remove(storageKey);
                window.location.href = 'order.html?type=unShip';
            });
        }else{
            $.info('提交订单失败','warn');
        }
    });

    function getSubmitGoods(){
        var goods = [];
        for(var i = 0 ; i < goodsList .length ; i++){
            var g = goodsList[i];
            goods.push({
                goods_id : g.goods_id,
                goods_num : g.goods_num
            });
        }
        return goods;
    };

    function total(){
        var total = 0;
        for(var i = 0 ; i < goodsList.length ; i++){
            var g = goodsList[i];
            total += g.market_price * g.goods_num;
        }
        return total;
    };

    function goodsNum(){
        var goodsNum = 0;
        for(var i = 0 ; i < goodsList.length ; i++){
            goodsNum += parseInt(goodsList[i].goods_num);
        }
        return goodsNum;
    };
    
});
