function listView(pageList) {
    var $ = requirejs('jquery'),util = requirejs('util'),
        api = requirejs('api'),userToken = requirejs('userToken'),head = [];


    if(!pageList || pageList.length == 0){
        $('#cooperatorList').html('<li><div class="alert alert-warning">对不起，暂无数据!</div></li>');
        return;
    }

    util.getScript('/cooperators/view/head-model').then(function () {
        head = window.headModel();
    });

    renderHead();
    renderListContent(pageList);

    //delete event
    $('.delete').off().on('click',function () {
        if(confirm('确认删除该条加盟申请？')){
            var id = $(this).attr('data-for');
            var result = api.delBusiness(id);
            dealResult(result);
        }
    });
    
    function renderHead() {
        var optClass = '',html = '';
        for(var i in head){
            if(head[i].opt){
                optClass = 'small-list-col';
            }
            html += '<li class="list-col ' + optClass + '">' + head[i].name + '</li>';
        }
        $('.list-head').html(html);
    };
    
    function renderListContent(list) {
        var html = '';
        for(var i in list){
            html += renderListRow(list[i]);
        }
        $('#cooperatorList').html(html);
    };

    function renderListRow(business) {
        var html = '<li>';

            html += '<div class="list-col">' + business.user_id + '</div>';
            html += '<div class="list-col">' + business.user_name + '</div>';
            html += '<div class="list-col">' + (business.name ? business.name : '~') + '</div>';
            html += '<div class="list-col">' + (business.mobile ? business.mobile : '~') + '</div>';
            html += '<div class="list-col">' + (business.area ? business.area : '~') + '</div>';
            html += '<div class="list-col small-list-col">';
            html += '<span class="delete" data-for="' + business.id + '">删除</span>';
            html += '/div>';
            html += '/li>';

        return html;
    };

    function dealResult(result) {
        if(result){
            if(result.status == 200){
                alert('删除成功！');
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else if(result.status == 503){
                alert('删除失败，错误状态：503，错误原因：' + result.err);
            }else {
                alert('删除失败，错误状态：' + result.status + '，错误原因：' + result.msg);
            }
        }else {
            alert('服务器错误，返回为空!');
        }
    };
};
/**
 * Created by Administrator on 2016/6/4 0004.
 */
