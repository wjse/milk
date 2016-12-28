function memberGet() {
    var $ = requirejs('jquery'),util = requirejs('util'),
        api = requirejs('api'),userToken = requirejs('userToken'),
        member = {};
    var storage= util.storage('session');

    //get member
    var id = util.getUrlParam('id');
    if(!id){
        alert('对不起，用户错误！');
        return;
    }
    member = api.getUser(id);

    initMemberView();

    // change role event
    $('#changeRoleBtn').off().on('click',function () {
        var toRole = $(this).attr('data-change');
        if(!toRole){
            return;
        }
        var result = api.updateYizu({
            user_id : member.id,
            role : toRole
        });
        dealUpdateEvent(result);
    });

    //read detail event
    $('#readPointsDetailBtn').off().on('click',function () {

        $('#pointsListTitle').html('');
        $('#pointsList').html('');
        renderPointsPage(1);
    });

    $('#readCoinsDetailBtn').off().on('click',function () {

        $('#coinListTitle').html('');
        $('#coinList').html('');
        renderCoinPage(1);
    });

    $('#readShareDetaldBtn').off().on('click',function () {

        $('#shareListTitle').html('');
        $('#shareList').html('');
        renderSharePage(1);
    });

    //back member list event
    $('#backListBtn').off().on('click',function () {
        var token = storage.get('token');
        window.location.href = 'member-list.html?token=' + token;
    });

    
    function initMemberView() {
        if(!member){
            alert('获取会员信息失败！');
            return;
        }
        $('#headImg').attr('src',member.headimgurl);
        $('#nickname').html(member.nickname);
        $('#id').html(member.id);
        $('#real_name').html(member.real_name);
        $('#order_num').html(member.order_num);
        $('#mobile').html(member.mobile);
        $('#is_lock').html(api.convertIsLockStatus(member.is_lock));
        $('#register_way').html(member.register_way);
        $('#create_time').html(member.create_time);
        $('#parent_id').html(member.parent_id);
        $('#last_login_time').html(member.last_login_time);
        $('#parent_nickname').html(member.parent_nickname);
        initUserRole(member.id,member.salesman_id);
        $('#points').html(member.points);
        $('#coin').html(member.coin);
        $('#share_count').html(member.share_count);
    };

    function initUserRole(userId,salesId) {
        if(salesId == userId){
            $('#user_role').html('加盟商');
            $('#changeRoleBtn').html('转为普通用户').attr('data-change','to_member');
        }else {
            $('#user_role').html('普通用户');
            $('#changeRoleBtn').html('转为加盟商').attr('data-change','to_salesman');
        }
    };
    
    function dealUpdateEvent(result) {
        if(result){
            if(result.status == 200){
                alert('修改成功！');
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

    function renderPointsPage(pageNum){
        var resultPage = api.pointsLog(member.id,pageNum);
        if(!resultPage){
            alert('对不起，暂无数据或数据错误！');
            return;
        }
        //render list
        $('#pointsDetailBox').removeClass('hide');
        util.getScript('/member/view/member-get-list-view').then(function () {
            window.memberGetListView(resultPage.list,'#pointsListTitle','#pointsList','points');
        });

        //render pager
        util.getScript('/common/member-pager').then(function () {
            window.memberPager('#pointsPageNav',resultPage.page.totalPage,resultPage.page.currentPage,function (pageNum) {
                renderPointsPage(pageNum);
            });
        });

    };

    function renderCoinPage(pageNum) {
        var resultPage = api.coinLog(member.id,pageNum);
        if(!resultPage){
            alert('对不起，暂无数据或数据错误！');
            return;
        }
        //render list
        $('#coinDetailBox').removeClass('hide');
        util.getScript('/member/view/member-get-list-view').then(function () {
            window.memberGetListView(resultPage.list,'#coinListTitle','#coinList','coin');
        });

        //render pager
        util.getScript('/common/member-pager').then(function () {
            window.memberPager('#coinPageNav',resultPage.page.totalPage,resultPage.page.currentPage,function (pageNum) {
                renderCoinPage(pageNum);
            });
        });
    };

    function renderSharePage(pageNum){
        var resultPage = api.customers(member.id,pageNum);
        if(!resultPage){
            alert('对不起，暂无数据或数据错误！');
            return;
        }
        //render list
        $('#shareDetailBox').removeClass('hide');
        util.getScript('/member/view/member-get-list-view').then(function () {
            window.memberGetListView(resultPage.list,'#shareListTitle','#shareList','customer');
        });

        //render pager
        util.getScript('/common/member-pager').then(function () {
            window.memberPager('#sharePageNav',resultPage.page.totalPage,resultPage.page.currentPage,function (pageNum) {
                renderSharePage(pageNum);
            });
        });
    };
};
/**
 * Created by Administrator on 2016/5/19 0019.
 */
