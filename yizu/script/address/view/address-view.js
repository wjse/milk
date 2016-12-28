function addressView(list){
    var container = '.address-list',
        areaList = requirejs('areaList'),
        util = requirejs('util'),
        api = requirejs('api'),
        addressForm = requirejs('addressForm'),
        converter = requirejs('converter');

    $('<ul>',{
        html : render()
    }).appendTo(container);
    
    $('#select').css('height',$(window).height() - $('.address-form').height() - 60);

    $(container.concat(' li')).on('click',function(){
        var openEditId = '#edit_'.concat($(this).attr('for'));
        $(openEditId).toggleClass('hide');
    });

    $('.btn-primary').on('click',function(){
        addressForm.openEdit(false,$(this),list);
    });

    $('.btn-info').on('click',function(){
        var id = $(this).attr('for');
        var result = api.updateAddress({
            id : id,
            is_default : 1
        });

        if(result.ok){
            window.location.reload();
        }else{
            $.info('设置默认失败','warn');
        }
    });

    $('.btn-danger').on('click',function(){
        var id = $(this).attr('for');
        var result = api.deleteAddress(id);
        if(result.ok){
            window.location.reload();
        }else{
            $.info('删除失败','warn');
        }
    });

    $('.block-btn').on('click',function(){
        $(this).attr('for','save');
        addressForm.openEdit(true,$(this));
    });

    function render(){
        var html = '';

        $.each(list,function(i){
            var addr = list[i],
                isActive = addr.is_default == 1 ? 'active' : '';
            html += '<li class="' + isActive + '" for="' + addr.id + '">';
            html += '<div class="u-name">' + addr.contact + '</div>';
            html += '<div class="u-tel">' + addr.tel + '</div>';
            html += '<div class="u-place">' + converter.address(addr) + '</div>'
            html += '</li>';
            html += '<div id="edit_'+ addr.id +'" class="hide">';
            if(isActive == ''){
                html += '<a class="btn btn-info" for="' + addr.id + '">设为默认</a> ';
            }
            html += '<a class="btn btn-primary" for="' + addr.id + '">编辑</a> ';
            html += '<a class="btn btn-danger" for="' + addr.id + '">删除</a>';
            html += '</div>';
        });

        return html;
    };
};
