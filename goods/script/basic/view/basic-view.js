function basicView() {
    var $ = requirejs('jquery'),util = requirejs('util'),tree = requirejs('tree'),
        categoryApi = requirejs('categoryApi'), brandApi = requirejs('brandApi'),
        api = requirejs('api'),note  = requirejs('note'),plugins = requirejs('plugins'),
        userToken = requirejs('userToken'),config = requirejs('config'),brandOption = '';
    var storage = util.storage('session');
    var uploadPath = config.v4.concat('/goods/uploads?token=',storage.get('token'));

    //init category tree
    renderCategoryTree();

    //init brand select
    util.getScript('/basic/view/basic-brand-select-view').then(function () {
        window.basicBrandSelectView();
    });

    //choose category event
    $('#categoryChooseBtn').unbind().bind('click',function () {
        $('#multipleChooseBox').slideToggle();
    });

    /**
     * goods spec_tpl event
     */
    // template change event
    $('#templateSelect').unbind().bind('change',function () {
        var goods_common_id = $('#templateSelect').val();
        var data  = api.get(goods_common_id);
        initStandardModule(data);
        $('#standardModule').slideDown();

    });
    //new template click event
    $('#newSpecTemplateBtn').unbind().bind('click',function () {
        initStandardModule();
        $('#templateSelect option').eq(0).prop('selected',true);
        $('#standardModule').slideDown();
    });

    //createSpec
    $('#toCreateSpecBtn').unbind().bind('click',function () {
        $('#myModal').modal('show');
        util.getScript('/basic/view/modal-view').then(function () {
            window.modalView('specAdd',function (spec) {
                util.getScript('/basic/view/basic-spec-view').then(function () {
                    window.appendSpecLi(spec);
                });

            });
        });
    });
    
    // saveBtn event
    $('#saveBtn').unbind().bind('click',function () {
        util.getScript('/basic/view/basic-data-verify').then(function () {
            window.basicDataVerify(function (verifyResult) {
                verifyResult.spec_tpl = buildSpecTemplateData();
                if(verifyResult.goods_common_id ){
                    templateUpdateEvent(verifyResult);
                }else {
                    templateAddEvent(verifyResult);
                }
            });
        });
    });

    //upload choose event
    $('#goodsImgTab >li >a').unbind().bind('click',function () {
        var uploadFor = $(this).attr('for');
        $(this).parent().addClass('active').siblings().removeClass('active');
        $('#goodsLocalUpload').attr('for',uploadFor);
    });

    //cancel edit event
    $('#cancelEditBtn').unbind().bind('click',function () {
        $('#standardModule').slideUp();
    });
    //hide error event
    $('input').on('change',function () {
        util.hideErrorInfo('#templateAlertInfo');
    });

    function renderCategoryTree() {
        util.getScript('/basic/view/basic-category-tree-view').then(function () {
            window.basicCategoryTreeView(function (cid) {
                var templates = api.templateSelect(cid);
                util.getScript('/basic/view/basic-category-tree-view').then(function () {
                    window.initTemplateSelect(templates);
                });
            });
        });
    };

    function initStandardModule(data) {
        util.getScript('/basic/view/basic-template-view').then(function () {
            window.basicTemplateView(data);
        });
    };

    function buildSpecTemplateData() {
        var spec_tpl = [];
        var specLiObj = $('#specListBox > li');
        if(specLiObj && specLiObj.length > 0){
            for(var i = 0 ; i < specLiObj.length; i ++){
                var title_id = $(specLiObj).eq(i).children('.spec-title-name').attr('data');
                var options = $(specLiObj).eq(i).children('.spec-option');
                var template = {
                    title_id : title_id
                };
                util.getScript('/basic/view/basic-spec-view').then(function () {
                    template.option_id = window.buildSpecOptionData(options);
                });
                spec_tpl.push(template);
            }
        }
        return spec_tpl;
    };

    function templateAddEvent(data) {
        var result = api.save(data);
        if(result.status == 200){
            alert('型号添加成功！');
            window.location.reload();
        }else if(result.status == 401){
            alert('用户登录失效，请重新登录！');
            userToken.goLogin();
        }else {
            alert('型号添加失败！错误状态：' + result.status + '错误原因：' + result.msg);
            util.showErrorInfo('#templateAlertInfo','型号添加失败,' + result.msg + '！');
        }
    };
    
    function templateUpdateEvent(data) {
        var result = api.update(data);
        if(result.status == 200){
            alert('型号修改成功！');
            window.location.reload();
        }else if(result.status == 401){
            alert('用户登录失效，请重新登录！');
            userToken.goLogin();
        }else {
            alert('型号修改失败！错误状态：' + result.status + '错误原因：' + result.msg);
            util.showErrorInfo('#templateAlertInfo','型号修改失败,' + result.msg + '！');
        }

    };

};
/**
 * Created by Administrator on 2016/5/7 0007.
 */
