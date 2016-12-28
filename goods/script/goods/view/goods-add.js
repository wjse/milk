function goodsAdd(){
    var $ = requirejs('jquery'),config = requirejs('config'),brandApi = requirejs('brandApi'),
        categoryApi = requirejs('categoryApi'), basicApi = requirejs('basicApi'), api = requirejs('api'),
        date = requirejs('date'), util = requirejs('util'), tree = requirejs('tree'),
        upload = requirejs('upload'),plugins = requirejs('plugins'),userToken = requirejs('userToken');
    var storage = util.storage('session');

    var uploadPath = config.v4.concat('/goods/uploads?token=',storage.get('token'));

    /**
     * time
     */
    plugins.dateUI('#promote_start_time');
    plugins.dateUI('#promote_end_time');

    //init category choose
    renderCategoryTree();

    //init brand select
    util.getScript('/basic/view/basic-brand-select-view').then(function () {
        window.basicBrandSelectView();
    });

    /**
     * choose category event
     */
    $('#categoryChooseBtn').unbind().bind('click',function () {
        $('#multipleChooseBox').slideToggle(300);
    });

    // template change event
    $('#templateSelect').unbind().bind('change',function () {
        var goods_common_id = $('#templateSelect').val();
        var basicTemplate  = basicApi.get(goods_common_id);
        renderTemplateBox(basicTemplate.gc_name,basicTemplate.spec_tpl);
        $('#templateBox').show();
        $('#goods_name').val(basicTemplate.gc_name);
    });

    $('#market_price').off().on('blur',function () {
        if(util.isEmpty($('#templateSelect').val())){
            alert('请选择商品型号！');
            $('#market_price').val('');
            return;
        }
        var checkedYear = '';
        var market_price = $(this).val();

        var leaseYearArr = $('input[name=lease_year]');
        if(leaseYearArr && leaseYearArr.length > 0){
            checkedYear = $('input[name=lease_year]:checked').attr('data-param');
            $('#sale_price').val(parseFloat(market_price) * parseFloat(checkedYear));
        }
    });

    //thumb img upload
    plugins.upload('#thumbImgUpload',uploadPath.concat(),function(fileName,resp){
        if(resp && resp.status == 200){
            var path = resp.data[0].image_url;
            $('#thumbImgBox').html('<img class="thumb-img" id="goods_thumb" src="' + path + '">');
        }
    });

    //is_limit change event
    $('input[name=is_limit]').bind('change',function () {
        var is_limit = $('input[name=is_limit]:checked').val();
        if('1' == is_limit){
            $('#limitBox').removeClass('hide');
        }else {
            $('#limitBox').addClass('hide');
            $('#limit_num').val('');
        }
    });

    //is_promote change event
    $('input[name=is_promote]').bind('change',function () {
        var is_promote = $('input[name=is_promote]:checked').val();
        if('1' == is_promote){
            $('#promoteBox').removeClass('hide');
        }else {
            $('#promoteBox').addClass('hide');
            $('#promote_price').val('');
            $('#promote_start_time').val('');
            $('#promote_end_time').val('');
        }
    });

    /**
     * save event
     */
    $('#saveBtn').unbind().bind('click',function () {
        var data = {
            category_id : $('#categoryId').val(),
            brand_id : $('#brandChooseSelect').val(),
            goods_common_id : $('#templateSelect').val(),
            goods_thumb : $('#goods_thumb').attr('src'),
            goods_name : $('#goods_name').val(),
            goods_ad : $('#goods_ad').val(),
            sale_price : $('#sale_price').val(),
            market_price : $('#market_price').val(),
            discount_percent : $('#discount_percent').val(),
            commission_ratio : $('#commission_ratio').val(),
            freight : $('#freight').val(),
            goods_sort : $('#goods_sort').val(),
            stock_balance : $('#stock_balance').val(),
            stock_alarm : $('#stock_alarm').val(),
            provide_invoice : $('input[name=provide_invoice]:checked').val(),
            is_display : $('input[name=is_display]:checked').val(),
            is_hot : $('input[name=is_hot]:checked').val(),
            is_new : $('input[name=is_new]:checked').val(),
            is_limit : $('input[name=is_limit]:checked').val(),
            is_promote : $('input[name=is_promote]:checked').val(),
            for_vip : $('input[name=for_vip]:checked').val(),
            spec_str : buildGoodsSpecArr()

        };
        util.getScript('/goods/view/goods-verify').then(function () {
            var goods = window.goodsVerify(data,'add');
            if(goods){
                saveGoodsEvent(goods);
            }
        });
    });

    //hide error event
    $('input').on('change',function () {
        util.hideErrorInfo('#goodsAlertInfo');
    });

    function renderCategoryTree() {
        util.getScript('/basic/view/basic-category-tree-view').then(function () {
            window.basicCategoryTreeView(function (cid) {
                var templates = basicApi.templateSelect(cid);
                util.getScript('/basic/view/basic-category-tree-view').then(function () {
                    window.initTemplateSelect(templates);
                });
            });
        });
    };

    function renderTemplateBox(gc_name,spec_tpl) {
        $('#gc_name').html(gc_name);
        $('#specList').html(renderSpecList(spec_tpl));
        var specItemArr = $('.spec-item');
        if($('.spec-item')){
            for(var i = 0 ; i < specItemArr.length; i++){
                $(specItemArr).eq(i).children('.radio-box').children('.checkbox-inline').eq(0)
                    .children('input[type=radio]').prop('checked',true);
            }
        }
    };

    function renderSpecList(specArr) {
        var html = '';

        if(specArr && specArr.length > 0){
            for(var i in specArr){
                html += '<div class="spec-item">';
                html += '<div class="spec-title">' + specArr[i].title_name + '：</div>';
                html += '<div class="radio-box">';
                html += specRadioHtml(specArr[i].options,specArr[i].title_code);
                html += '</div>';
                html += '</div>';
            }
        }
        return html;
    };

    function specRadioHtml(options,name) {
        var html = '';
        if(options && options.length > 0){
            for(var i in options){
                html += '<label class="checkbox-inline">';
                html += '<input type="radio" name="' + name + '" value="' + options[i].option_id + '" data-param="' + options[i].param_1 + '"> ' + options[i].option_name;
                html += '</label>';
            }
        }
        return html;
    };

    function buildGoodsSpecArr() {
        var spec_str = [];
        var specItemArr =  $('#specList > .spec-item');
        if(specItemArr && specItemArr.length > 0){
            for(var i = 0 ; i < specItemArr.length; i++){
                var option_name = $(specItemArr).eq(i).children('.radio-box').children('.checkbox-inline')
                    .children('input[type=radio]').attr('name');
                var option_id = $('input[type=radio][name=' + option_name + ']:checked').val();
                spec_str.push(parseInt(option_id));
            }
        }
        return spec_str;
    };

    function saveGoodsEvent(goods) {
        var result = api.saveGoods(goods);
        if(result.status == 200){
            alert('商品创建成功！');
            window.location.href = 'goods-list.html';
        }else if(result.status == 401){
            alert('用户登录失效，请重新登录！');
            userToken.goLogin();
        }else{
            alert('商品创建失败！错误状态：' + result.status + '错误原因：' + result.msg);
            util.showErrorInfo('#goodsAlertInfo','商品创建失败,' + result.msg + '！');
        }
    };
    
};