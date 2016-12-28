function confirmOrderView(goodsList){
    var util = requirejs('util'),
        converter = requirejs('converter'),
        container = '.goods-list';

    $('<ul>',{
        html : render()
    }).appendTo(container);

    function render(){
        var html = '';
        $.each(goodsList,function(i){
            var goods = goodsList[i];
            html += '<li>';
            html += goodsImage(goods.goods_thumb);
            html += goodsInfo(goods);
            html == '</li>';
        });

        return html;
    };

    function goodsImage(img){
        return '<div class="goods-img"><span></span><img src="'+ img +'"></div>';
    };

    function goodsInfo(goods){
        console.log(goods);
        // var totalPrice = goods.avg_price * goods.lease_year * 12;
        var totalPrice = goods.sale_price;
        // var total = (parseFloat(totalPrice) + parseFloat(goods.market_price));
        var html = '<div class="goods-info">';
            html += '<p>'+ goods.goods_name +'</p>';
            html += '<p>租用时间：<span>' + goods.spec_desc + '</span></p>';
            html += '<p>合计租金：<span>'+ totalPrice * goods.goods_num +'</span></p>';
            html += '<p>合计押金：<span>' + goods.market_price + '</span></p>';
            html += '</div>';
        html += goodsPrice(goods,goods.market_price);
        return html;
    };

    function goodsPrice(goods,total){
        var html  = '<div class="goods-price">';
        html += '  <p>X '+ goods.goods_num +'</p>';
        html += '  <p>支付总额：<span>'+ total * goods.goods_num +'</span></p>';
        html += '</div>';
        return html;
    };
};