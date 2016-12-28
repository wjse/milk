function listView(list) {
    var $ = requirejs('jquery'), util = requirejs('util'), api = requirejs('api');

    /**
     * init listBox
     */
    var listHtml = buildList(list,1,0);
    $('#listBox').html(listHtml);
    add();
    update();
    del();
    spread();

    /**
     * add event
     */
    function add() {
        $('.add-btn').unbind().bind('click',function () {
            var classNum = $(this).parent('.box-title').parent('.box').attr('data-level');
            var parent_id = $(this).parent('.box-title').parent('.box').attr('data-parent');
            var contentBox = $(this).parent('.box-title').next('.box-content');
            $('#modal').modal('show');
            util.getScript('/category/view/modal-view').then(function(){
                window.modalView('添加' + classNum + '级品类' ,null,function (data) {
                    data.parent_id = parent_id;
                    var result = api.save(data);
                    if(result){
                        alert('添加品类成功！');
                        var itemHtml = renderBoxContent(result,classNum);
                        if($(contentBox).children('.list-item').length == 0){
                            $(contentBox).html('');
                        }
                        $(contentBox).append(itemHtml);
                        update();
                        del();
                        spread();
                    }else {
                        alert('添加品类失败');
                    }
                });

            });
        });
    };


    /**
     * update event
     */
    function update() {
        $('.update').unbind().bind('click',function () {
            var classNum = $(this).attr('data-level');
            var cid = $(this).attr('edit-for');
            var contentBox = $(this).parent('.list-item').parent('.box-content');
            $('#modal').modal('show');
            util.getScript('/category/view/modal-view').then(function(){
                window.modalView('修改' + classNum + '级品类' ,api.get(cid),function (data) {
                    var result = api.update(data);
                    if(result) {
                        alert('修改品类成功！');
                        $('#' + cid).remove();
                        var itemHtml = renderBoxContent(result, classNum);
                        $(contentBox).append(itemHtml);
                        update();
                        del();
                        spread();
                    }else {
                        alert('修改品类失败！');
                    }
                });
            });
        });
    };


    /**
     * delete event
     */
    function del() {
        $('.delete').unbind().bind('click',function () {
            if(confirm('确认删除该品类？')){
                //get current id
                var cid = $(this).attr('del-for');
                var result = api.remove(cid);
                if(result){
                    $(this).parent('.list-item').remove();
                }else{
                    alert('删除该品类失败!');
                }
            }
        });
    };


    /**
     * spread event
     */
    function spread() {
        $('.item-name').unbind().bind('click',function (event) {
            event.stopPropagation();
            $(this).parent('.list-item').addClass('list-item-bg').siblings('.list-item').removeClass('list-item-bg');
            var id = $(this).parent('.list-item').attr('data');
            var classNum = $(this).parent('.list-item').parent('.box-content').parent('.box').attr('data-level');
            var boxObj = $('#listBox>.box');
            if(boxObj.length > classNum){
                $(this).parent('.list-item').parent('.box-content').parent('.box').nextAll().remove();
            }

            var nextHtml = buildList(api.next(id),parseInt(classNum) + 1,id);
            $('#listBox').append(nextHtml);

            add();
            update();
            del();
            spread();
        });
    };



    function buildList(list,classNum,parentId) {
        var html = '<div class="box" data-level="' + classNum + '" data-parent="' + parentId + '">';

        html += renderBoxTop(classNum);
        html += '<div class="box-content">';

        if(!list || list.length == 0){
            html += '暂无分类！';
        }else {
            for(var i in list){
                html += renderBoxContent(list[i],classNum);
            }
        }

        html += '</div>';
        html += '</div>';

        return html;
    };

    function renderBoxTop(classNum) {
        var html = '<div class="box-title f-oh">';
            html += '<span class="title-name f-fl">' + classNum + '级品类</span>';
            html += '<div class="add-btn f-fr">添加</div>';
            html += '</div>';
        return html;
    };

    function renderBoxContent(currentItem,classNum) {
        var html = '';
            html += '<div class="list-item" id="' + currentItem.cid + '" data="' + currentItem.cid + '">';
            // html += '<img class="left-img" src="www/image/loginout.png">';
            html += '<span class="item-name">' + currentItem.category_name + '</span>';
            html += '<span class="glyphicon glyphicon-remove opt-bg delete" data-level="' + classNum + '" del-for="' + currentItem.cid + '"></span>';
            html += '<span class="glyphicon glyphicon-pencil opt-bg update" data-level="' + classNum + '" edit-for="' + currentItem.cid + '"></span>';
            html += '</div>';
        return html;
    };


};
