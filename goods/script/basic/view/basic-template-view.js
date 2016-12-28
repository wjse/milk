function basicTemplateView(data) {
    var $ = requirejs('jquery'),config = requirejs('config'),util = requirejs('util'),
        upload = requirejs('upload'),plugins = requirejs('plugins');
    var storage = util.storage('session');
    var uploadPath = config.v4.concat('/goods/uploads?token=',storage.get('token'));

    var initData = {
        gc_name : '',
        gc_desc : '',
        display_price : '',
        gc_sort : '0',
        spec_tpl : [],
        gc_thumb : '',
        detail_img : [],
        common_body : ''
    };
    if(data){
        initData = data;
    }
    renderStandardModule(initData);

    //thumb and detail upload event
    plugins.upload('#goodsLocalUpload',uploadPath,function(fileName,resp){
        if(resp && resp.status == 200){
            var path = resp.data[0];
            var type = $('#goodsLocalUpload').attr('for');
            if('thumb' == type){
                $('#gc_thumb').attr('src',path.image_url);
            }else if('detail' == type){
                var detailPreviewHtml = detailImgPreview(path.image_url);
                $('#previewBox').append(detailPreviewHtml);
                previewMouseEvent();
                previewDeleteEvent();
            }
        }
    });

    //common body upload event
    plugins.upload('#uploadCommonBodyBtn',uploadPath,function(fileName,resp){
        if(resp && resp.status == 200){
            var path = resp.data[0].image_url;
            appendCommonBodyImg(path);
        }else if(resp.status == 401){
            alert('用户登录失效，请重新登录！');
            util.goLogin();
        }else {
            alert('上传失败，失败原因:' + resp.msg);
        }
    },300,2);

    $('#sortBtn').off().on('click',function () {
        if('逆序' == $(this).html()){
            $(this).html('正序');
        }else {
            $(this).html('逆序');
        }
        var html = '';
        var imgStrArr = [];
        var bodyImgArr = $('#common_body img');
        if(bodyImgArr){
            for(var i = 0 ; i < bodyImgArr.length ; i++){
                var path = $(bodyImgArr).eq(i).attr('src');
                imgStrArr.push('<img src=" ' + path + '">');
            }
        }
        var reverseImgArr = imgStrArr.reverse();
        for(var i = 0 ; i < reverseImgArr.length; i ++){
            html += reverseImgArr[i];
        }
        $('#common_body').html(html);
        imgClick();
    });

    $(document).keydown(function (e) {
        if(e.which == '8' || e.which == '46'){
            var focusObj = $('#common_body').find('.img-border');
            if(focusObj.length > 0){
                $(focusObj).remove();
            }
        }
    });

    function renderStandardModule(initData) {
        $('#gc_name').val(initData.gc_name);
        $('#gc_desc').val(initData.gc_desc);
        util.getScript('/basic/view/basic-spec-view').then(function () {
            var specListHtml = window.basicSpecView(initData.spec_tpl);
            $('#specListBox').html(specListHtml);
        });
        $('#display_price').val(initData.display_price);
        $('#gc_sort').val(initData.gc_sort);
        $('#gc_thumb').attr('src',initData.gc_thumb);
        clearDetailImg();
        $('#previewBox').append(goodsDetailImgPreview(initData.detail_img));
        $('#common_body').html(initData.common_body);
        var imgArrObj = $('#common_body img');
        imgArrObj.removeAttr('style');

        imgClick();
        previewMouseEvent();
        previewDeleteEvent();
        util.getScript('/basic/view/basic-spec-view').then(function () {
            window.updateSpec();
        });
        util.getScript('/basic/view/basic-spec-view').then(function () {
            window.deleteSpec();
        });
    };

    function appendCommonBodyImg(path) {
        var focusObj = $('#common_body').find('.img-border');
        if(focusObj.length == 0){
            $('#common_body').append('<img src="' + path + '">');
        }else {
            $(focusObj).after('<img src="' + path + '">');
        }
        imgClick();
    };

    function imgClick() {
        $('#common_body img').off().on('click',function () {
            $('#common_body img').removeClass('img-border');
            $(this).addClass('img-border');
        });
    };

    function clearDetailImg() {
        var detailArr = $('#previewBox > .goods-preview-img');
        if(detailArr){
            for(var i = 0 ; i < detailArr.length; i++){
                $(detailArr).eq(i).remove();
            }
        }
    };

    function goodsDetailImgPreview(detailImgArr) {
        var html = '';
        if(detailImgArr && detailImgArr.length > 0){
            for(var i = 0 ; i < detailImgArr.length ; i++){
                html += detailImgPreview(detailImgArr[i].img_url);
            }
        }
        return html;
    };

    function detailImgPreview(url) {
        var html = '';
        if(url){
            html += '<div class="goods-preview-img">';
            html += '<img src="' + url + '">';
            html += '<div class="delete-img-btn hide">';
            html += '<span class="glyphicon glyphicon-remove"></span>';
            html += '</div>';
            html += '</div>';
        }

        return html;
    };

    //img delete event
    function previewDeleteEvent() {
        $('.delete-img-btn').off().on('click',function () {
            $(this).parent('.goods-preview-img').remove();
        });
    };
    //img mouse event
    function previewMouseEvent() {
        $('.goods-preview-img').mouseenter(function () {
            $(this).children('.delete-img-btn').removeClass('hide');
        }).mouseleave(function () {
            $(this).children('.delete-img-btn').addClass('hide');
        });
    };

    function appendSpecLi(spec) {
        util.getScript('/basic/view/basic-spec-view').then(function () {
            var specLiHtml = window.renderSpecListLi(spec,true);
            $('#specListBox').append(specLiHtml);
            updateSpec();
            deleteSpec();
        });
    };

    function updateSpec() {
        $('.spec-edit').off().on('click',function () {
            var parentLi = $(this).parent('li');
            var specOptions = $(this).siblings('.spec-option');
            var updateData = {
                title_id : $(this).siblings('.spec-title-name').attr('data')
            };
            util.getScript('/basic/view/basic-spec-view').then(function () {
                updateData.option_id = window.buildSpecOptionData(specOptions);
            })

            $('#myModal').modal('show');
            util.getScript('/basic/view/modal-view').then(function () {
                window.modalView('specUpdate',function (spec) {
                    $(parentLi).remove();
                    appendSpecLi(spec);
                },updateData);
            });
        });
    };

    function deleteSpec() {
        $('.spec-delete').off().on('click',function () {
            $(this).parent('li').remove();
        });
    };
};
/**
 * Created by Administrator on 2016/5/15 0015.
 */
