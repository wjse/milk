function listView(list){
    var _list = list,
        api = requirejs('api'),
        modal = requirejs('modal'),
        upload = requirejs('upload'),
        util = requirejs('util'),
        plugins = requirejs('plugins');

    //render list
    render();

    /**
     * update btn event
     * @see modal-view.js
     */
    $('.update').on('click',function(){
        var id = getId(this);
        util.getScript('/brand/view/modal-view').then(function(){
            new modalView('修改品牌',api.get(id),function(brand){
                var result = api.update(brand);
                if(result){
                    modal.alert('提示!','品牌修改成功!',function(){
                        flushList(brand);
                        render();
                    });
                }else{
                    modal.alert('错误!','品牌修改失败!');
                }
            }).openModal();
        });
    });

    //delete btn event
    $('.delete').on('click',function(){
        var id = getId(this);
        modal.confirm('提示!','确定删除该品牌?',function(){
            var result = api.remove(id);
            if(result){
                $('#'.concat(id)).remove();
            }else{
                modal.alert('错误!','删除该品牌失败');
            }
        });
    });

    function render(){
        var html = '<ul>';
        html += listHeader();
        html += listBody();
        html += '</ul>';

        if($('.box')){
            $('.box').remove();
        }
        $('<div>',{
            class : 'box',
            html : html
        }).appendTo('#listBox');
    };

    function listHeader(){
        var header = ['品牌图片','品牌名称','品牌描述','状态','排序','操作'];
        var html = '<li class="header">';
        for(var i = 0 ; i < header.length; i++){
            html += '<div>' + header[i] + '</div>';
        }
        html += '</li>';
        return html;
    };

    function listBody(){
        var html = '';
        if(!_list || _list.length == 0){
            //todo
        }else{
            for(var i = 0 ; i < _list.length; i++){
                var brand = _list[i];
                html += '<li id="'+ brand.bid +'">';
                html += bodyData([api.converter.img(brand.brand_logo),
                                  brand.brand_name,
                                  brand.brand_description,
                                  api.converter.show(brand.is_show),
                                  !brand.sort ? 0 : brand.sort,
                                  operation()]);
                html += '</li>';
            }
        }
        return html;
    };

    function bodyData(array){
        var html = '';
        for(var i = 0 ; i < array.length; i++){
            html += '<div>' + array[i] + '</div>';
        }
        return html;
    };

    function flushList(brand){
        for(var i = 0 ; i < _list.length ; i++){
            if(brand.bid == _list[i].bid){
                _list[i] = brand;
            }
        }
    };

    function operation(){
        var html = '<span class="list-btn update">修改</span>';
            html += '<span class="list-btn delete">删除</span>'
        // var html = '<a class="btn btn-info list-btn update">修改</a>';
        // html += '<a class="btn btn-danger list-btn delete">删除</a>';
        return html;
    };

    function getId(obj){
        return $(obj).parent().parent().attr('id');
    };
};
