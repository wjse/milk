function modalHtml(id){
    var $ = requirejs('jquery'), util = requirejs('util'),config = requirejs('config')
        ,api = requirejs('api'),upload = requirejs('upload'),plugins = requirejs('plugins'),
        userToken = requirejs('userToken');
    var storage = util.storage('session');
    var uploadPath = config.v4.concat('/goods/uploads');

    render(id);

    plugins.upload('#uploadBtn',uploadPath.concat('?token=',storage.get('token')),function(file,resp){
        console.log(resp);
        if(resp.status == 200){
            $('.preview-img').attr('src',resp.data[0].image_url).attr('data-for',resp.data[0].image_url);
        }else if(status == 401){
            alert('用户登录失效，请重新登录');
            userToken.goLogin();
        }
    });

    $('#submitBtn').off().on('click',function(){
        var img = $('.preview-img'), name = $('#name'), link = $('#link'),
            imgVal = img.attr('data-for'),nameVal = name.val(),linkVal = link.val();

        if(util.isEmpty(imgVal)){
            showError('.'.concat(img.attr('for')),'请上传模块图标！');
            return;
        }

        if(util.isEmpty(nameVal)){
            showError('.'.concat(name.attr('for')),'请上输入名称！');
            return;
        }

        if(util.isEmpty(linkVal)){
            showError('.'.concat(link.attr('for')),'请上输入系统连接！');
            return;
        }

        try{
            if(id){
                edit(id,nameVal,linkVal,imgVal);
            }else {
                save(nameVal,linkVal,imgVal);
            }
        }catch(e){
            showError('#alertInfo','提交失败，系统错误！');
        }
    });

    function edit(id,name,entry,img){
        api.edit({
            id:id,
            system_name:name,
            system_url:entry,
            system_image:img
        }).then(function(resp){
            console.log(resp);
            if(resp.status == 200){
                window.location.reload();
            }else if(resp.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else {
                showError('#alertInfo','修改失败！');
            }
        });
    };

    function save(name,entry,img){
        api.add({
            system_name:name,
            system_url:entry,
            system_image:img
        }).then(function(resp){
            console.log(resp);
            if(resp.status == 200){
                window.location.reload();
            }else if(resp.status == 401){
                alert('用户登录失效，请重新登录！');
                userToken.goLogin();
            }else{
                showError('#alertInfo','新增失败！');
            }
        });
    };

    function showError(id,msg){
        $(id).removeClass('hide').html(msg);
    };

    function render(id){
        var imgUrl = '',name = '',linkUrl = '',title = '新增业务系统模块';
        if(id){
            imgUrl = $('#' + id + '_img').attr("src");
            name = $('#' + id + '_name').html();
            linkUrl = $('#' + id + '_link').val();
            title = '修改业务系统模块'
            $("hiddenSystemId").val(id);
        }

        $('.error-info').addClass('hide');
        $('.modal-title').html(title);
        $('.preview-img').attr('src',imgUrl).attr('data-for',imgUrl);
        $('#alertInfo').addClass('hide');
        $('#hiddenImgUrl').val(imgUrl);
        $('#name').val(name);
        $('#link').val(linkUrl);
        $('#managementModal').modal('show');
    };
};

