function orderGet() {
    var $ = requirejs('jquery'),util = requirejs('util'),api = requirejs('api'),
        userToken = requirejs('userToken');
    var storage = util.storage('session');

    var orderId = util.getUrlParam('oid');
    if(!orderId){
        return;
    }
    //getOrder
    var order = api.getOrder(orderId);
    if(!order){
        alert('请求数据错误！');
        return;
    }
    //init order view
    initOrderView(order);

    //back order list btn
    $('#backListBtn').off().on('click',function () {
        window.location.href = 'order-list.html?token=' + storage.get('token');
    });

    //track event
    $('#trackOrderBtn').off().on('click',function () {
        util.getScript('/order/view/order-get-track-view').then(function () {
            window.orderTrackView(order.oid);
        });
    });

    //to ship event
    $('#shipBtn').off().on('click',function () {
        var companys = api.shipCompany();
        if(companys){
            util.getScript('/order/view/order-get-ship-view').then(function () {
                window.orderShipView(companys,function (shipData) {
                    shipData.oid = order.oid;
                    shipEvent(shipData);
                });
            });
        }
    });

    function initOrderView(order) {
        $('#order_sn').html(order.order_sn);
        $('#order_state').html(api.convertState(order.order_state));
        if('20' == order.order_state){
            $('#shipBtn').removeClass('hide');
        }
        //收货人信息
        $('#contact').html(order.contact);
        $('#address').html(order.ship_province + order.ship_city + order.ship_district + order.ship_address);
        $('#tel').html(order.tel);
        $('#payer_openid').html(order.payer_openid);
        $('#payment_way').html(order.payment_way);
        $('#freight1').html('&yen;' + order.freight);
        //goodsList
        util.getScript('/order/view/order-get-goods-view').then(function () {
            window.orderGoodsView(order.goodsList);
        });
        //total info
        $('#goods_amount').html(order.goods_amount);
        $('#deduct_coin').html(order.deduct_coin);
        $('#deduct_points').html(order.deduct_points);
        $('#coupon_price').html(order.coupon_price);
        $('#discount_price').html(order.discount_amount);
        $('#freight').html(order.freight);
        $('#pay_amount').html(order.pay_amount);

    };

    function shipEvent(shipData) {
        var result = api.ship(shipData);
        if(result){
            if(result.status == 200){
                alert('发货成功！');
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else {
                alert('系统错误，错误状态：' + result.status + '，错误原因：' + result.msg);
            }
        }
    };




};
/**
 * Created by Administrator on 2016/5/26 0026.
 */
