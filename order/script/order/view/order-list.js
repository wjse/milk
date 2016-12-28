function orderList() {
    var $ = requirejs('jquery'),util = requirejs('util'),api = requirejs('api');

    //renderNavBox
    renderNavBox();
    renderList(1);


    function renderNavBox() {
        var tabData = [
            {
                active : true,
                id : "tab_1",
                forward : "",
                name : '所有订单'
            },
            {
                active : false,
                id : "tab_2",
                forward : "10",
                name : '待付款'
            },
            {
                active : false,
                id : "tab_3",
                forward : "20",
                name : '待发货'
            },
            {
                active : false,
                id : "tab_4",
                forward : "30",
                name : '已发货'
            },
            {
                active : false,
                id : "tab_5",
                forward : "40",
                name : '已完成'
            }
        ];

        //get nav box
        util.getScript('/common/nav-view').then(function () {
            window.navView('#navBox',tabData,function (state) {
                tabChange(state);
            });
        });
    };

    function tabChange(state) {
        $("#navBox li[forward='"+state+"']").addClass("active").siblings("li").removeClass("active");
        renderList(1,state);
    };
    
    function renderList(pageNum,state) {
        var getUrlStr = '?p=' + pageNum;
        if(state){
            getUrlStr += '&order_state=' + state;
        }
        var pageResult = api.orderPage(getUrlStr);
        $('#orderList').html('');
        $('#pageNav').html('');
        if(!pageResult){
            return;
        }
        util.getScript('/order/view/order-list-view').then(function () {
            window.orderListView(pageResult);
        });
        //render pager
        util.getScript('/common/pager').then(function () {
            window.pager(pageResult.page.totalPage,pageResult.page.currentPage,function (pageNum) {
                var state = $("#navBox").find("li.active").attr('forward');
                renderList(pageNum,state);
            });
        });

    };
    
};
/**
 * Created by Administrator on 2016/5/26 0026.
 */
