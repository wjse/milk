function goodsListView(page,callback) {
    var $ = requirejs('jquery'),util = requirejs('util'),
        basicApi = requirejs('basicApi'),listHtml = '';
    
    var pageList = page.list;

    if(pageList && pageList.length > 0){
        for(var i in pageList){
            listHtml += listRowHtml(pageList[i]);
        }
    }
    $('#goodsListBox').html(listHtml);

    $('.goods-opt').on('click',function () {
        if(confirm('确认修改商品状态？')){
            var is_on_sale;
            var status = $(this).attr('status');
            var goods_common_id = $(this).attr('data-for');
            if('0' == status){
                is_on_sale = '1';
            }else if('1' == status) {
                is_on_sale = '0';
            }
            var data = {
                goods_common_id : goods_common_id,
                is_on_sale : is_on_sale
            };
            callback.call(this,data,'update');
        }

    });

    //delete goods_common_id goods
    $('.goods-delete').off().on('click',function () {
        if(confirm('确认删除该型号和型号下所有商品？')){
            var goods_common_id = $(this).attr('data-for');
            callback.call(this,goods_common_id,'delete');
        }
    });

    function listRowHtml(rowData) {
        var html = '<li>';

            html += '<div class="list-item model-number-item f-oh">';
            html += '<img class="goods-img f-fl" src="' + rowData.gc_thumb + '">';
            html += '<div class="model-number-name f-fl">' + rowData.gc_name + '</div>';
            html += '</div>';
            html += '<div class="list-item goods-info-item">';
            html += detailGoodsInfo(rowData.goods);
            html += '</div>';
            html += '<div class="list-item">' + rowData.sold_num + '</div>';
            html += '<div class="list-item">';
            html += '<a class="read-view" href="goods-view.html?goods_common_id=' + rowData.goods_common_id + '">查看商品</a>';
            html += '<div class="goods-opt" status="' + (rowData.is_on_sale ? rowData.is_on_sale : 0) + '" data-for="' + rowData.goods_common_id + '">' + basicApi.convertStatusStr(rowData.is_on_sale) + '</div>';
            html += '<div class="goods-delete" data-for="' + rowData.goods_common_id  + '">删除商品</div>';
            html += '</div>';
            html += '</li>';

        return html;
    };

    function detailGoodsInfo(goodsArr) {
        var html = '';
        if(goodsArr && goodsArr.length > 0){
            for(var i in goodsArr){

                html += '<div class="goods-info-item-detail">';
                html += '<div class="goods-name">' + goodsArr[i].goods_name + '；</div>';
                html += '<div class="goods-other">规格' + (goodsArr[i].spec_desc ? goodsArr[i].spec_desc : '暂无！') + '；库存' + (goodsArr[i].stock_balance ? goodsArr[i].stock_balance : 0) + '；售价&yen;' + (goodsArr[i].sale_price ? goodsArr[i].sale_price : 0) + '；</div>';
                html += '</div>';
            }
        }

        return html;
    };
};
/**
 * Created by Administrator on 2016/5/13 0013.
 */
