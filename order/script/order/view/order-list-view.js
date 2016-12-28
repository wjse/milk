function orderListView(pageResult) {
    var $ = requirejs('jquery'),util = requirejs('util'),api = requirejs('api'),
        userToken = requirejs('userToken');
    var storage = util.storage('session');
    var list = pageResult.list;

    renderOrderList(list);

    function renderOrderList(list) {
        var html = '';
        if(!list || list.length == 0 ){
            return;
        }
        for(var i in list){
            html += '<li>';
            html += renderListRow(list[i]);
            html += '</li>';

        }
        $('#orderList').html(html);
    };

    function renderListRow(order) {
        var html = '';
        html += renderOrderTop(order);
        html += renderOrderContent(order);
        return html;
    };
    
    function renderOrderTop(order) {
        var html = '<div class="list-row-top">';
            html += '<input class="single-order hide" type="checkbox" name="single_order">';
            html += '<div class="order-num">';
            html += '<span>订单号：</span>';
            html += '<span>' + order.order_sn + '</span>';
            html += '</div>';
            html += '<div class="finished-time">';
            html += '<span>下单时间：</span>';
            html += '<span>' + order.create_time + '</span>';
            html += '</div>';
            html += '</div>';
        return html;
    };
    
    function renderOrderContent(order) {
        var list = order.goods;
        var html = '<ul class="list-row-content">';
        if(list){
            for(var i in list){
                html += '<li>';
                html += renderContentRow(list[i],order.order_state,order.contact);
                html += '</li>';
            }
        }
        html += '</ul>';
        return html;
    };

    function renderContentRow(goods,state,contact) {
        var html = '<div class="order-list-row order-list-big-row">';
            html += '<img class="order-goods-img" src="' + goods.goods_thumb + '">';
            html += '<div class="order-goods-name">' + goods.goods_name + '</div>';
            html += '</div>';
            html += '<div class="order-list-row"><span>&yen;</span>' + goods.goods_amount + '</div>';
            html += '<div class="order-list-row"><span>&yen;</span>' + goods.rent_amount + '</div>';
            html += '<div class="order-list-row">' + goods.spec_desc + '</div>';
            html += '<div class="order-list-row"><span>&times;</span>' + goods.goods_num + '</div>';
            html += '<div class="order-list-row">';
            html += '<div class="order-opt">';
            html += '<div class="order-state">' + api.convertState(state) + '</div>';
            html += '<a class="order-view" href="order-view.html?oid=' + goods.order_id + '">查看详情</a>';
            html += '</div>';
            html += '</div>';
            html += '<div class="order-list-row">' + contact + '</div>';
        return html;
    };

};
/**
 * Created by Administrator on 2016/5/26 0026.
 */
