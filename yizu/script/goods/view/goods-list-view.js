function goodsListView(goods,cid){
    if(!cid){
        cid = $('.nav-box li[class=active]').attr('for');
    }
    var container = '.box-goods';
    $(container).children('ul').html('');
    if(!goods){
        return;
    }

    var api = requirejs('api'),
        goodsDetailPage = 'goods-detail.html',
        util = requirejs('util'),
        handler = requirejs('wHandler'),
        converter = requirejs('converter'),
        loading = requirejs('loading');



    renderPage();
    $('.box-goods').css('height',$(window).height() - 146);

    util.getScript('/common/page-view').then(function(){
        window.pageView(goods.page,'goodsList',function(pageNum){
            api.queryGoodsByCategoryCallback(function(result){
                goods = result.goods;
                renderPage();
            },{cid:cid,p:pageNum});
        });
    });

    handler.overScroll(document.querySelector('.box-goods'));
    handler.overScroll(document.querySelector('.nav-box'));

    function renderPage(){
           $(container).children('ul').append(render());
    };

    function render(){
        var html = '';
        var list = goods.list;
        for(var i in list){
            var obj = list[i];
            if($('#'.concat(obj.goods_common_id)).length > 0){
                continue;
            }
            html += '<li id="'+ obj.goods_common_id +'" default="'+ obj.goods_common_id +'" sales="'+obj.sold_num+'" rent="'+ converterSortPrice(obj.display_price) +'">';
            html += '<a href="'+ goodsDetailPage.concat('?id=',obj.goods_common_id) +'">';
            html += goodsImage(obj.gc_thumb);
            html += info(obj);
            html += goodsName(obj);
            html += '</a>';
            html += '</li>';
        }
        html += '';
        return html;
    };

    function goodsImage(img){
        var html = '<div class="li-image">';
        html += '<span></span><img src="' + img + '">';
        html += '</div>';
        return html;
    };

    function info(obj){
        var html = '<div class="li-info">';
        html += '<div>已租' + obj.sold_num + '台</div>';
        html += '<div class="info-r">￥'+ obj.display_price +'</div>';
        html += '</div>';
        return html;
    };

    function goodsName(obj){
        var html = '<div class="li-text">';
        html += '<p>' + converter.goodsName(obj) + '</p>';
        html += '</div>';
        return html;
    };

    function converterSortPrice(p){
        return p.match(/\d+/)[0];
    };
};