function goodsList() {
    var $ = requirejs('jquery'),basicApi = requirejs('basicApi'),
        api = requirejs('api'),util = requirejs('util'),userToken = requirejs('userToken');

    /**
     * init page
     */
    renderPage(1);

    $('input[name=checkAll]').click(function () {
        if($(this).prop('checked') == true){
            $('input[name=goods]').prop('checked',true);
        }else{
            $('input[name=goods]').prop('checked',false);
        }
    });

    function renderPage(pageNum) {
        var page = basicApi.basicPage(pageNum);

        if(page){
            // list
            buildGoodsList(page);
            // pager
            util.getScript('/common/pager').then(function () {
                window.pager(page.page.totalPage,page.page.currentPage,function (pageNum) {
                    renderPage(pageNum);
                });
            });
        }
    };

    function buildGoodsList(page) {
        util.getScript('/goods/view/goods-list-view').then(function () {
            window.goodsListView(page,function (data,type) {
                if('update' == type){
                    updateEvent(data);
                }else if('delete' == type){
                    deleteEvent(data);
                }
            });
        });
    };

    function updateEvent(data) {
        var result = basicApi.update(data);
        if(result){
            if(result.status == 200){
                alert('商品状态修改成功！');
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else {
                alert('商品状态修改成功，失败状态：' + result.status + '，失败原因：' + result.msg);
            }
        }else {
            alert('请求错误，返回undefined！');
        }
    };


    function deleteEvent(goods_common_id) {
        var result = basicApi.del(goods_common_id);
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
    };
};
/**
 * Created by Administrator on 2016/5/12 0012.
 */
