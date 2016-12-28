/**
 * 一元专区
 */
function oneView(oneZone,iScroll){

    if(!oneZone){
        return;
    }

    console.log(oneZone);

    var api = requirejs('api'),
        goodsApi = requirejs('goodsApi'),
        util = requirejs('util'),
        converter = requirejs('converter'),
        container = '#one',
        cartIcon = 'www/image/iconfont-car.png',
        goodsDetailPage = 'goods-detail.html',
        wHandler = requirejs('wHandler'),
        goods = oneZone.list,
        endDate = oneZone.end_time,
        dateStr = api.RTime(endDate);

    $(container).append(render());

    renderTime();

    setViewWidth();

    $('.o-goods').on('click',function(){

        if(!wHandler.isUserLogin()){
            return;
        }

        var obj = {goods_id : $(this).attr('for'),goods_num : 1};
        var result = goodsApi.addCart(obj);

        if(result.ok){
            $.info('添加成功');
        }else{
            $.info('添加失败','warn');
        }
    });

    new iScroll('wrapper',{
        hScrollbar:false,
        vScrollbar:false,
        vScroll:false
    });

    function setViewWidth(){
        $('.area-1-ul li').css('width',window.screen.width/2);
        var liWidth = parseInt($('.area-1-ul li').css('width'));
        $('.area-1-ul').css('min-width',liWidth * goods.length);
    };

    function render(){
        var html = head();
            html += body();
        return html;
    };

    function head(){
        var html = '<div class="area-head">';
            html += '<strong>一元专区</strong>';
            html += '</div>';
        return html;
    };

    function body(){
        var html = '<div class="area-main">';
            html += '<div class="area-box" id="wrapper">';
            html += data();
            html += '</div>';
            html += '</div>';
        return html;
    };


    function data(){
        var html = '<ul class="area-1-ul">';

        $.each(goods,function(i){
            var obj = goods[i];
            html += '<li>';
            html += '  <a href="'+ goodsDetailPage.concat('?id=',obj.goods_common_id) +'">';
            html += '    <div class="li-image">';
            html += '      <img src="'+ obj.goods.goods_thumb +'">';
            html += '    </div>';
            html += '  </a>';
            html += '    <div class="li-text">' + converter.goodsName(obj) + '</div>';
            html += '    <div class="li-info">';
            html += '      <div class="info-l">';
            html += '        <p>' + !obj.gc_desc ? '' : obj.gc_desc + '</p>';
            html += '        <p>' + obj.display_price + '元/年</p>';
            html += '      </div>';
            html += '      <div class="info-r o-goods" for="'+ obj.goods.goods_id +'">';
            html += '        <img src="'+ cartIcon +'">';
            html += '      </div>';
            html += '    </div>';
            html += '</li>';
        });

        html += '</ul>';
        return html;
    };

    function renderTime(){
        var array = dateStr.split('_');
        var html = '<div class="time-count">还剩 ';
            html += '<span class="hour">' + array[0] + ' </span> : ';
            html += '<span class="min">' + array[1] + ' </span> : ';
            html += '<span class="sec">' + array[2] + ' </span> ';
            html += '</div>';

        $(html).appendTo(container.concat(' .area-head'));
        setInterval('getRTime()',1000);
    };

    this.getRTime = function(){
        dateStr = api.RTime(endDate);
        var array = dateStr.split('_');
        $('.hour').html(array[0]);
        $('.min').html(array[1]);
        $('.sec').html(array[2]);
    };
};
