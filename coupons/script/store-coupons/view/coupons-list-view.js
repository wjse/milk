function couponsListView(lists) {
    var $ = requirejs('jquery'),util = requirejs('util'), api = requirejs('api'),
        userToken = requirejs('userToken'),plugins = requirejs('plugins');

    if(!lists || lists.length == 0){
        return;
    }
    
    renderHead();
    renderList(lists);

    $('.delete').off().on('click',function () {
        if(confirm('确认删除该优惠券？')){
            var id = $(this).attr('data-for');
            var result = api.delStore(id);
            dealDeleteResult(result);
        }
    });

    function renderHead() {
        var head,html = '';
        util.getScript('/store-coupons/view/store-list-head-model').then (function () {
            head = window.storeListHeadModel();
        });

        for(var i in head){
            var specialClass = '';
            if(head[i].special){
                specialClass = 'big-list-col';
            }
            html += '<li class="list-col ' + specialClass + '">' + head[i].title + '</li>';
        }
        $('#listBox .list-head').html(html);
    };
    
    function renderList(lists) {
        var html = '';
        for(var i in lists){
            html += renderRow(lists[i]);
        }
        $('#listContent').html(html);
    };
    
    function renderRow(coupons) {
        var html = '<li>';
            html += '<div class="list-col">' + coupons.title + '</div>';
            html += '<div class="list-col big-list-col">';
            if(coupons.start_time || coupons.end_time){
                html += '<div>起：' + coupons.start_time + '</div>';
                html += '<div>止：' + coupons.end_time + '</div>';
            }else {
                html += '<div>' + (coupons.relative_day ? coupons.relative_day: '0') + '天</div>'
            }
            html += '</div>';
            html += '<div class="list-col">' + coupons.limit_value + '</div>';
            html += '<div class="list-col">' + coupons.create_num + '</div>';
            html += '<div class="list-col">' + coupons.receive_num + '</div>';
            html += '<div class="list-col">' + coupons.used_num + '</div>';
            html += '<div class="list-col">' + api.convertPromotionType(coupons.promotion_type) + '</div>';
            html += '<div class="list-col">';
            html += '<a class="card-view" href="store-coupons-get.html?id=' + coupons.id + '">查看</a>';
            if('1' == coupons.be_del){
                html += '<span class="delete" data-for="' + coupons.id + '">删除</span>';
            }
            html += '</div>';
            html += '</li>';

        return html;
    };

    function dealDeleteResult(result) {
        if(result){
            if(result.status == 200){
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(result.status == 503){
                alert('删除失败！失败状态：503，失败原因：' + result.err);
            }else {
                alert('删除失败！失败状态：' + result.status + '，失败原因：' + result.msg);
            }
        }else {
            alert('服务器错误，返回为空！');
        }
    };

};
/**
 * Created by Administrator on 2016/6/6 0006.
 */
