function cartListView(list){
    var container = '.cart-page',
        converter = requirejs('converter'),
        storage = requirejs('util').storage(),
        api = requirejs('api'),
        event = requirejs('event');

    $(container).html(render());
    
    $('.goods-img').on('click',function(){
        var goodsId = $(this).attr('for');
        window.location.href = 'goods-detail.html?id='.concat(goodsId);
    });

    $('.select').on('click',function(){
        event.select($(this),list);
    });

    $('.selectAll').on('click',function(){
        event.selectAll($(this),list);
    });

    $('.editBtn').on('click',function(){
        if($(this).html() == '编辑'){
            event.showEdit($(this));
        }else{
            event.finishEdit($(this));
        }
    });

    $('.delete a').on('click',function(){
        event.remove($(this).attr('for'));
    });

    $('.raise').on('click',function(){
        event.raise($(this));
    });

    $('.reduce').on('click',function(){
        event.reduce($(this));
    });

    $('#order').on('click',function(){
        var goods = event.getOrderGoods(list);
        if(goods.length > 0){
            storage.put('cartGoods',goods);
            window.location.href = 'confirm-order.html?from=cart';
        }
    });

    function goodsInfo(goods){
        var html  = '<div class="goods-info">';
        html += '  <div class="goods-img" for="' + goods.goods_common_id + '">';
        html += '    <img src="'+ goods.goods_thumb +'">';
        html += '  </div>';
        html += '  <div class="goods-detail for-show-'+ goods.cart_id +'">';
        html += '    <p>'+ converter.text(goods.goods_name) +'</p>';
        html += '    <p>租用时间：<span>' + converter.text(goods.lease_year) + '年</span></p>';
        html += '    <p>合计租金：<span>'+ goods.total_rent +'</span></p>';
        html += '    <p>到期退款：<span>' + goods.total_refund + '</span></p>';
        html += '  </div>';
        html += cartEdit(goods);
        html += '</div>';
        return html;
    };

    function render(){
        var html  = '<div class="goods-list">';
            html += '<ul>';
            html += eachList();
            html += '</ul>';
            html += '</div>';
            html += option();
        return html;
    };

    function eachList(){
        var html = '';
        $.each(list,function(i){
            var goods = list[i];
            html += '<li>';
            html += goodsOption(goods,i);
            html += goodsInfo(goods);
            html += goodsPrice(goods);
            html += '</li>';
        });
        return html;
    };

    function goodsOption(goods,index){
        var html  = '<div class="goods-option">';
            html += '    <div>';
            html +=  '        <a class="select" id="index_'+ index +'"></a>'
            html += '         <span>'+ converter.text(goods.brand_name) +'</span>';
            html += '    </div>';
            html += '    <div><a class="editBtn" for='+ goods.cart_id +'>编辑</a></div>';
            html += '</div>';
        return html;
    };

    function goodsPrice(goods){
        var html  = '<div class="goods-price for-show-'+ goods.cart_id +'"">';
            html += '  <p>X '+ goods.goods_num +'</p>';
            html += '  <p>押金：<span>'+ event.totalMarketPrice(goods) +'</span></p>';
            html += '</div>';
        return html;
    };

    function option(){
        var html = '<div class="option">';
            html += '   <div class="option-box">';
            html += '      <div><a class="selectAll" href="#"></a><span>全选</span></div>';
            html += '      <div><span>合计</span>';
            html += '           <span id="allTotalPrice">￥0</span>';
            html += '           <a id="order">结算</a>';
            html += '   </div>';
            html += '</div>';
        return html;
    };

    function cartEdit(goods){
        var html  = '<div class="goods-detail for-edit-'+ goods.cart_id +' hide">';
            html += '<div class="edit">';
            html += '  <p>数量：</p>';
            html += '  <div class="rent-num">';
            html += '    <a class="reduce">-</a>';
            html += '    <span id="goodsNum">'+ goods.goods_num +'</span>';
            html += '    <a class="raise">+</a>';
            html += '  </div>';
            html += '  <div class="delete">';
            html += '    <a for="'+ goods.cart_id +'">删除</a>';
            html += '  </div>';
            html += '</div>';
            html += '</div>';
        return html;
    };
};
