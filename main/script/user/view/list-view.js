// /**
//  * for page list only
//  * @param users
//  */
function userListView(userList) {
    var $ = requirejs('jquery'),util = requirejs('util'),
        userToken = requirejs('userToken'),api = requirejs('api');

        renderListTitle(userList.title);
        renderListContent(userList.list);

    //list event
    $('.update').off().on('click',function(){
        //tab style change
        $("li.nav-option[forward=formBox]").addClass("active").siblings("li").removeClass("active");

        $('.tab-body').addClass('hide');
        $('#formBox').removeClass('hide');

        var id = $(this).attr('data-for');
        util.getScript('/user/view/edit-view').then(function(){
            window.editView(id);
        });
    });

    $('.delete').off().on('click',function(){
        if(!confirm('确定删除？')){
            return;
        }

        var id = $(this).attr('data-for');
        api.delete(id).then(function(resp){
            if(resp.status == 200){
                alert('删除成功！');
                window.location.reload();
            }else{
                alert('删除失败！');
            }
        });
    });

    function renderListTitle(title) {
        var html = '';
        for(var i = 0 ; i < title.length ; i++){
            var data = title[i];
            html += '<li class="user-row">' + data + '</li>';
        }
        $('#listTitle').html(html);
    };
    
    function renderListContent(list) {
        var html = '';
        if(list || list.length > 0){
            for(var i in list){
                html += '<li>';
                html += '<div class="user-row">' + list[i].admin_name + '</div>';
                html += '<div class="user-row">' + list[i].admin_nickname + '</div>';
                html += '<div class="user-row">' + api.convertType(list[i].admin_type) + '</div>';
                html += '<div class="user-row">';
                html += '<div class="update" data-for="' + list[i].admin_id + '">编辑</div>';
                html += '<div class="delete" data-for="' + list[i].admin_id + '">删除</div>';
                html += '</div>';
                html += '</li>';
            }
        }
        $('#listContent').html(html);
    };


};
