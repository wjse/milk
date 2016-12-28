function goodsGet() {
    var $ = requirejs('jquery'),config = requirejs('config'),brandApi = requirejs('brandApi'),
        categoryApi = requirejs('categoryApi'), basicApi = requirejs('basicApi'), api = requirejs('api'),
        date = requirejs('date'),util = requirejs('util'), tree = requirejs('tree'),
        userToken = requirejs('userToken'),goodsList = [];
    var uploadPath = config.v4.concat('/goods/uploads');

    //get goods
    var goods_common_id = util.getUrlParam('goods_common_id');
    if(goods_common_id){
        var commonGoods = api.getCommonGoods(goods_common_id);
        if(commonGoods.list){
            goodsList = commonGoods.list;
        }
    }
    //render goodsList
    renderGoodsList();

    //update event
    $('.update').on('click',function () {
        var goods_id = $(this).attr('data-for');
        var goods = api.get(goods_id);
        if(goods){
            $('#partContent').removeClass('hide');
            util.getScript('/goods/view/goods-get-content-view').then(function () {
                window.goodsGetContentView(goods,function (data) {
                    verifyGoods(data);
                });
            });
        }
    });

    //is_on_sale event
    $('.status-opt').on('click',function () {
        if(confirm('确认修改商品状态？')){
            var is_on_sale;
            var status = $(this).attr('status');
            var goods_id = $(this).attr('data-for');
            if('0' == status){
                is_on_sale = '1';
            }else if('1' == status) {
                is_on_sale = '0';
            }
            var data = {
                goods_id : goods_id,
                is_on_sale : is_on_sale
            };
            var result = api.updateGoods(data);
            if(result){
                alert('商品状态修改成功！');
                window.location.reload();
            }else {
                alert('商品状态修改失败！');
            }
        }
    });

    //delete event
    $('.delete').off().on('click',function () {
         if(confirm('确认删除该商品？')){
             var goods_id = $(this).attr('data-for');
             var result = api.del(goods_id);
             if(result){
                 if(result.status == 200){
                     alert('删除商品成功！');
                     window.location.reload();
                 }else if(result.status == 401){
                     alert('用户登录失效，请重新登录！');
                     userToken.goLogin();
                 }else {
                     alert('删除失败，失败状态：' + result.status + '，失败原因：' + result.msg);
                 }
             }else {
                 alert('请求错误，返回undefined！');
             }
         }
    });

    //hide error event
    $('input').on('change',function () {
        util.hideErrorInfo('#goodsAlertInfo');
    });

    function renderGoodsList() {
        var html = '';
        if(goodsList.length > 0){
            for(var i in goodsList){
                html += '<li>';
                html += renderGoodsListRow(goodsList[i]);
                html += '</li>';
            }
        }
       $('#specGoodsList').html(html);
    };
    
    function renderGoodsListRow(goods) {
        var html = '<div class="spec-col goods-head-col">' + goods.goods_name + '</div>';
        html += '<div class="spec-col goods-spec-col">' + (goods.spec_desc ? goods.spec_desc : "暂无！") + '</div>';
        html += '<div class="spec-col">' + goods.sale_price + '</div>';
        html += '<div class="spec-col">' + goods.stock_balance + '</div>';
        html += '<div class="spec-col">' + goods.sold_num + '</div>';
        html += '<div class="spec-col opt-col">';
        html += '<span class="update" data-for="' + goods.goods_id + '">编辑</span>';
        html += '<span class="status-opt" data-for="' + goods.goods_id + '" status="' + (goods.is_on_sale ? goods.is_on_sale : "0") + '">' + api.convertStatusStr(goods.is_on_sale) + '</span>';
        html += '<span class="delete" data-for="' + goods.goods_id + '">删除</span>';
        html += '</div>';

        return html;
    };

    function verifyGoods(data) {
        util.getScript('/goods/view/goods-verify').then(function () {
            var goods = window.goodsVerify(data,'update');
            if(goods){
                var result = api.updateGoods(goods);
                if(result.status == 200){
                    alert('商品修改成功！');
                    window.location.reload();
                }else if(result.status == 401){
                    alert('用户登录失效，请重新登录！');
                    userToken.goLogin();
                }else {
                    alert('商品修改失败！错误状态：' + result.status + '错误原因：' + result.msg);
                    util.showErrorInfo('#goodsAlertInfo','商品修改失败,' + result.msg + '！');
                }
            }
        });
    };

};
/**
 * Created by Administrator on 2016/5/12 0012.
 */
