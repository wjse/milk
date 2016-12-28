function orderMainView(type,data){
    var container = '.order-page .main',
        list = data.list,
        handler = requirejs('wHandler'),
        api = requirejs('api'),
        converter = requirejs('converter'),
        util = requirejs('util');
    
    if(!data || !list || list.length == 0){
        $('#empty').removeClass('hide');
        $('.main').css('margin-top',0);
        return;
    }

    renderPage();
    $('#orderList').height($(window).height() -100);

    $('.payOrder').on('click',function(){
        handler.weixinPay($(this).attr('for'),function(){
            window.location.reload();
        });
    });

    $('.cancelOrder').on('click',function(){
        var result = api.updateOrder({
            oid : $(this).attr('for'),
            order_state : 0
        });

        if(result.ok){
            $.info('取消订单成功');
            setTimeout('window.location.reload()',2000);
        }else{
            $.info('取消订单失败','warn');
        }
    });

    util.getScript('/common/page-view').then(function(){
        window.pageView(data.page,'orderList',function(pageNum){
            api.on(type,function(result){
                list = result.list;
                $('#dataList').append(renderData());
            },{p:pageNum});
        });
    });

    function renderPage(){
        $('<div>',{
            class : 'order-list',
            id:'orderList',
            html : render()
        }).appendTo(container);
    };

    function render(){
        var html = '<ul id="dataList">';
        html += renderData();
        html += '</ul>';
        return html;
    };

    function renderData(){
        var html = '';
        $.each(list,function(i){
            var order = list[i];
            html += '<li>';
            html += '<div class="order">';
            html += orderNum(order.order_sn);
            html += goodsList(order);
            html += '</div>';
            html += '</li>';
        });
        return html;
    };

    function orderNum(id){
        var html = '<div class="order-number">';
        html += '<span>订单编号:</span>';
        html += '<span>' + id + '</span>';
        html += '<span>' + converter.orderTypeText(type) + '</span>';
        html += '</div>';
        return html;
    };

    function goodsList(order){
        var html = '<div class="goods-list">';
        var goodsList = order.goods;
        html += '<ul>';
        var total = 0;
        $.each(goodsList,function(i){
            var goods = goodsList[i];
            html += '<li class="goods">';
            html += goodsInfo(goods);
            html += goodsPrice(goods);
            html += '</li>';
            total += converter.totalMarketPrice(goods,true);
        });
        html += '</ul>';
        html += '</div>';
        if(type == 'unPay'){
            html += calculate(total,order);
        }
        return html;
    };

    function goodsInfo(goods){
        var html = '<div class="goods-info">';
        html += '<div class="goods-img"><img src="'+ goods.goods_thumb +'"></div>';
        html += '<div class="goods-detail">';
        html += goodsDetail(goods);
        html += '</div>';
        html += '</div>';
        return html;
    };

    function goodsDetail(goods){
        var html = '<p>' + goods.goods_name + '</p>';
        html += '<p>租用时间:<span>' + converter.text(goods.lease_year) + '年</span></p>';
        html += '<p>合计租金:<span>' + converter.totalSalePrice(goods) + '</span></p>';
        html += '<p>到期退款:<span>' + converter.totalReturnMoney(goods) + '</span></p>';
        return html;
    };

    function goodsPrice(goods){
        var html = '<div class="goods-price">';
        html += '<p>X '+ goods.goods_num +'</p>';
        html += '<p>押金:<span>'+ converter.totalMarketPrice(goods) +'</span></p>';
        html += '</div>';
        return html;
    };

    function calculate(total,order){
        var html = '<div class="calculate">';
        var orderId = order.oid;
        html += '<p>合计:<span style="">';
        if(order.coupon_price && order.coupon_price > 0){
            html += '<s>'+ converter.price(total) +'</s>'+ converter.price(total - order.coupon_price);
        }else{
            html += converter.price(total);
        }
        html += '</span></p>';
        html += '<p>';
        html += '<a class="cancelOrder" for="'+ orderId +'">取消订单</a> ';
        html += '<a class="payOrder" for="'+ orderId +'">付款</a>';
        html += '</p>';
        html += '</div>';
        return html;
    };
};