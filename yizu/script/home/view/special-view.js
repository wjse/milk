/**
 * 推荐专区
 */
function specialView(special,title){

    if(!special){
        return;
    }

    var container = '#special',
        cartIcon = 'www/image/iconfont-car.png',
        converter = requirejs('converter'),
        wHandler = requirejs('wHandler'),
        goodsApi = requirejs('goodsApi'),
        goodsDetailPage = 'goods-detail.html';

    $(container).append(render());

    $('.more').on('click',function(){
        window.location.href = 'goods.html?cid=' + $(this).attr('for');
    });

    $('.s-goods').on('click',function(){
        if(!wHandler.isUserLogin()){
            return;
        }
        var obj = {goods_id : $(this).attr('for'),goods_num : 1};
        var result = goodsApi.addCart(obj);
        if(result.ok){
            $.info('添加成功');
            if(window.location.href.indexOf('cart.html') != -1){
                setTimeout('window.location.reload()',2000);
            }
        }else{
            $.info('添加失败','warn');
        }
    });

    function render(){
        var html = head();
            html += body();
        return html;
    };

    function head(){
        var html = '<div class="area-head">';
            html += '<strong>'+ title +'</strong>';
            html += '</div>';
        return html;
    };

    function body(){
        var html = '<div class="area-main">';

        $.each(special,function(i){
            var category = special[i].category;
            html += '<div class="list">';
            html += '<div class="list-head"><img src="www/image/iconfont-feilei.png">' + category.category_name;
            html += '<div class="more" for="'+ category.cid +'"><a>更多</a></div></div>';
            html += '<div class="area-box">';
            html += renderGoods(special[i].list);
            html += '</div>';
            html += '</div>';
        });

        return html;
    };

    function renderGoods(list){
        var html = '<ul>';
        $.each(list,function(i){
            var obj = list[i];
            html += '<li>';
            html += '  <a href="'+ goodsDetailPage.concat('?id=',obj.goods_common_id) +'">';
            html += '    <div class="li-image">';
            html += '      <img src="'+ obj.gc_thumb +'">';
            html += '    </div>';
            html += '  </a>';
            html += '    <div class="li-text">' + converter.goodsName(obj) + '</div>';
            html += '    <div class="li-info">';
            html += '      <div class="info-r s-goods" for="' + obj.goods.goods_id + '">';
            html += '        <img src="' + cartIcon + '">';
            html += '      </div>';
            html += '      <p>租金低至</p>';
            html += '      <p>￥'+ (obj.goods.market_price * 0.69 / 36).toFixed(2) +'/月</p>';
            html += '    </div>';
            html += '</li>';
        });

        html += '</ul>';

        return html;
    };
};
