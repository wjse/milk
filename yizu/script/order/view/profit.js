define(['jquery','util','api','wHandler','converter','iScroll'],function($,util,api,wHandler,converter){

    if(!wHandler.isUserLogin()){
        return;
    }


    api.getFenXiaoOrderList(function(data){
        if(!data.list){
            $('#empty').removeClass('hide');
            return;
        }

        render(data.list);

        util.getScript('/common/page-view').then(function(){
            window.pageView(data.page,'orderList',function(pageNum){
                api.getFenXiaoOrderList(function(_data){
                    $('#dataList').append(dataRender(_data.list));
                },{p:pageNum});
            });
        });
    });

    util.getScript('/common/footer-view').then(function(){
        window.footerView('.profit-page','profile');
    });


    function render(list){
        $('<ul id="dataList">',{
            html : dataRender(list),
        }).appendTo('.order-list');
    };

    function dataRender(list){
        var html = ''
        $.each(list,function(i){
            var order = list[i];
            html += '<li>';
            html += '   <div class="user">';
            html += '       <p>' + order.contact + '</p>';
            html += '       <p>' + order.create_time + '</p>';
            html += '   </div>';
            html += '   <div class="goods">';
            $.each(order.goods,function(j){
                var goods = order.goods[j];
                html += '    <div class="g-info">';
                html += '       <p>' + goods.goods_name + '</p>';
                html += '       <p>X '+ goods.goods_num +'</p>';
                html += '     </div>';
            });
            html += '   </div>';
            html += '   <div class="value">';
            html += '      <p>押金总额：<span>'+ converter.price(order.goods_amount) +'</span></p>';
            html += '      <p>获得佣金：<span>' + converter.price(order.commission_amount) + '</span></p>';
            html += '   </div>';
            html += '</li>';
        });
        return html;
    };
});

