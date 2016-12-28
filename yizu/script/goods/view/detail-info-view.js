function detailInfo(goods){
    var container = '.simple-info',
        converter = requirejs('converter');
    
    $(container).html(render());

    function render(){
        var html = name();
        html += deposit();
        return html;
    };

    function name(){
        var html = '<div class="name">';
        html += '    <span>' + converter.goodsName(goods) + '</span>';
        html += '   </div>';
        return html;
    };

    function deposit(){
        var html = '<div class="deposit">';
        html += '    <span class="market-price">市场价: ' + converter.marketPrice(goods) + '</span>';
        html += '     <span>租金低至' + converter.price(goods.goods[0].avg_price) + '元/月</span>';
        html += '   </div>';
        return html;
    };
};
