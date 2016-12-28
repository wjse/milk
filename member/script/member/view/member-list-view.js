function memberListPage(pageResult) {
    var $ = requirejs('jquery'),util = requirejs('util'),api = requirejs('api'),
        userToken = requirejs('userToken');
    var storage = util.storage('session');
    var pageList = pageResult.list;

    renderMemberList(pageList);

    //is_lock status change
    $('.freeze-opt').off().on('click',function () {
        if(confirm('确认修改用户状态？')){
            var is_lock = $(this).attr('data-lock');
            var data = {
                id : $(this).attr('data-for')
            }
            if('1' == is_lock){
                data.is_lock = '0';
            }else{
                data.is_lock = '1';
            }
            var result = api.update(data);
            if(result.status == 200){
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else {
                alert('修改失败,错误状态：' + result.status + '错误原因：' + result.msg);
            }
        }

    });

    //change role
    $('.change-role').off().on('click',function () {
        var user_id = $(this).attr('data-for');
        var role = $(this).html();
        var toRole;
        if('转为加盟商' == role){
            toRole = 'to_salesman';
        }else if('转为普通会员' == role){
            toRole = 'to_member';
        }
        var result = api.updateYizu({
            user_id : user_id,
            role : toRole
        });
        dealRoleUpdateEvent(result);
    });

    function dealRoleUpdateEvent(result) {
        if(result){
            if(result.status == 200){
                alert('用户角色修改成功！');
                window.location.reload();
            }else if(result.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else {
                alert('请求错误，错误状态：' + result.status + '，错误原因：' + result.msg);
            }
        }else {
            alert('系统错误，返回为空！');
        }
    };


    function renderMemberList(list) {
        var html = '';
        if(list.length == 0){
            $('#memberList').html('<li>对不起，暂无数据!</li>');
            return;
        }
        for(var i in list){
            html += renderListRow(list[i]);
        }
        $('#memberList').html(html);
    };
    
    function renderListRow(member) {

        var html = '<li>';
            html += '<div class="member-list-row member-id-row">' + member.id + '</div>';
            html += '<div class="member-list-row member-info-row">';
            html += '<a href="member-view.html?id=' + member.id + '&token=' + storage.get('token') + '">';
            html += '<div class="member-infos-item member-infos-head-img">';
            html += '<img class="member-head-img" src="' + member.headimgurl + '" alt="会员头像">';
            html += '</div>';
            html += '<div class="member-infos-item member-infos-other">';
            html += '<div class="user-name-row">' + member.nickname + '</div>';
            html += '<div class="user-register-time-row">';
            html += '<div>注册时间：</div>';
            html += '<div>' + member.create_time + '</div>';
            html += '</div></div>';
            html += '</a>';
            html += '</div>';
            html += '<div class="member-list-row">' + member.register_way + '</div>';
            html += '<div class="member-list-row">' + (member.mobile ? member.mobile : '-') + '</div>';
            html += '<div class="member-list-row">';
            html += '<div>' + (member.salesman_id == member.id ? '加盟商' : '普通会员') + '</div>';
            html += '<div class="change-role" data-for="' + member.id + '">' + (member.salesman_id == member.id ? '转为普通会员' : '转为加盟商') + '</div>';
            html += '</div>';
            html += '<div class="member-list-row">' + member.order_num + '</div>';
            html += '<div class="member-list-row">' + member.points + '</div>';
            html += '<div class="member-list-row">' + member.coin + '</div>';
            html += '<div class="member-list-row">' + (member.last_login_time ? member.last_login_time : '-') + '</div>';
            html += '<div class="member-list-row">';
            html += '<span class="freeze-opt" data-for="' + member.id + '" data-lock="' + member.is_lock + '">' + api.convertIsLock(member.is_lock) + '</span>';
            html += '</div>';
            html += '</li>';

        return html;
    };

};

function memberListTitle() {

    var html = renderTitle();
    $('#memberTitle').html(html);

    function renderTitle() {
        var title = '<li class="member-list-row member-id-row">ID</li>';
            title += '<li class="member-list-row member-info-row">会员</li>';
        title += '<li class="member-list-row">注册方式</li>';
        title += '<li class="member-list-row">手机号</li>';
        title += '<li class="member-list-row">会员角色</li>';
        title += '<li class="member-list-row">购买订单数</li>';
        title += '<li class="member-list-row">积分</li>';
        title += '<li class="member-list-row">佣金</li>';
        title += '<li class="member-list-row">最近一次登录</li>';
        title += '<li class="member-list-row">操作</li>';

        return title;
    };

};
/**
 * Created by Administrator on 2016/5/25 0025.
 */
