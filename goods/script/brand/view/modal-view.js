function modalView(title,data,fn){
    var _data = {
        bid : "",
        brand_description : "",
        brand_logo : "",
        brand_name : "",
        brand_url : "",
        is_show : "",
        sort : ""
    },
        util = requirejs('util'),
        upload = requirejs('upload'),
        plugins = requirejs('plugins'),
        config = requirejs('config'),
        obj = $('#modal');
    var storage = util.storage('session');
    var uploadPath = config.v4.concat('/goods/uploads?token=',storage.get('token'));

    function init(){
        if(data){
            _data = data;
            if(!_data.sort){
                _data.sort = 0;
            }
        }

        $('#modalTitle').html(title);

        setModal();
        bindEvent();
    };

    function setModal(){
        $('#image').attr('src',_data.brand_logo);
        $.each(_data,function(k){
            $('#'.concat(k)).val(_data[k]);
        });

        var isShowRadios = $('.is_show');
        for(var i = 0 ; i < isShowRadios.length ; i++){
            if(isShowRadios[i].value == _data.is_show){
                $(isShowRadios[i]).prop('checked',true);
                break;
            }
        }
    };

    function bindEvent(){
        plugins.upload('#uploadBtn',uploadPath,function(fileName,resp){
            if(resp.status == 200){
                console.log(resp);
                var img = resp.data[0].image_url;
                $('#brand_logo').val(img);
                $('#image').attr('src',img);
            }else{
                showError('#imageTips','图片上传失败');
            }
        });

        $('#confirmBtn').unbind();
        $('#confirmBtn').on('click',function(){
            var brand = getSubmitBrand();
            if(brand){
                fn.call(this,brand);
                obj.modal('hide');
            }
        });
    };

    function getSubmitBrand(){
        $.each(_data,function(k){
            var val = $('#'.concat(k)).val();
            _data[k] = val;
        });

        var isShowArray = $('.is_show');
        for(var i = 0 ; i < isShowArray.length ; i++){
            if(isShowArray[i].checked){
                _data.is_show = isShowArray[i].value;
                break;
            }
        }

        if(util.isEmpty(_data.brand_name)){
            showError('.brand_name-error','请输入品牌名称');
            return false;
        }

        if(util.isEmpty(_data.brand_description)){
            showError('.brand_description-error','请输入品牌描述');
            return false;
        }

        if(!util.isInteger(_data.sort)){
            showError('.sort-error','请输入数字');
            return false;
        }

        return _data;
    };

    function showError(id,text){
        $(id).html(text).removeClass('hide');
    };

    this.openModal = function(){
        init();
        obj.modal('show');
    };
};