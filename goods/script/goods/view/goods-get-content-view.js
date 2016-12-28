function goodsGetContentView(goods,callback) {
    var $ = requirejs('jquery'),config = requirejs('config'),date = requirejs('date'),
        util = requirejs('util'),upload = requirejs('upload'),plugins = requirejs('plugins'),
        userToken = requirejs('userToken');
    var storage = util.storage('session');
    
    var uploadPath = config.v4.concat('/goods/uploads?token=',storage.get('token'));
    
    initPartContent();

    /**
     * time
     */
    plugins.dateUI('#promote_start_time');
    plugins.dateUI('#promote_end_time');

    //thumb img upload
    plugins.upload('#thumbImgUpload',uploadPath,function(fileName,resp){
        if(resp && resp.status == 200){
            var path = resp.data[0].image_url;
            $('#thumbImgBox').html('<img class="thumb-img" id="goods_thumb" src="' + path + '">');
        }
    });

    // market price
    $('#market_price').off().on('blur',function () {
        var market_price = $(this).val();
        var param_1 = $(this).attr('data-param');
        if(util.isNotEmpty(param_1)){
            $('#sale_price').val(parseFloat(market_price) * parseFloat(param_1));
        }
    });

    //save update event
    $('#saveBtn').on('click',function () {
        var data = {
            goods_id : goods.goods_id,
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
            goods_thumb : $('#goods_thumb').attr('src'),
            provide_invoice : $('input[name=provide_invoice]:checked').val(),
            is_display : $('input[name=is_display]:checked').val(),
            is_hot : $('input[name=is_hot]:checked').val(),
            is_new : $('input[name=is_new]:checked').val(),
            is_limit : $('input[name=is_limit]:checked').val(),
            is_promote : $('input[name=is_promote]:checked').val(),
            for_vip : $('input[name=for_vip]:checked').val(),
        };
        callback.call(this,data);
    });

    //cancel edit event
    $('#cancelEditBtn').on('click',function () {
        $('#partContent').addClass('hide');
    });

    //is_limit change event
    $('input[name=is_limit]').on('change',function () {
        var is_limit = $('input[name=is_limit]:checked').val();
        if('1' == is_limit){
            $('#limitBox').removeClass('hide');
        }else {
            $('#limitBox').addClass('hide');
            $('#limit_num').val('');
        }
    });

    //is_promote change event
    $('input[name=is_promote]').on('change',function () {
        var is_promote = $('input[name=is_promote]:checked').val();
        if ('1' == is_promote) {
            $('#promoteBox').removeClass('hide');
        } else {
            $('#promoteBox').addClass('hide');
            $('#promote_price').val('');
            $('#promote_start_time').val('');
            $('#promote_end_time').val('');
        }
    });

    function initPartContent() {
        var param_1 = calculateSpecParam1(goods);
        $('#goods_name').val(goods.goods_name);
        $('#goods_ad').val(goods.goods_ad);
        $('#market_price').val(goods.market_price).attr('data-param',param_1 ? param_1 : '');
        $('#sale_price').val(goods.sale_price);
        $('#discount_percent').val(goods.discount_percent);
        $('#commission_ratio').val(goods.commission_ratio);
        $('#freight').val(goods.freight);
        $('#goods_sort').val(goods.goods_sort);
        $('#stock_balance').val(goods.stock_balance);
        $('#stock_alarm').val(goods.stock_alarm);
        $('#thumbImgBox').html('');
        if(goods.goods_thumb){
            $('#thumbImgBox').html('<img class="thumb-img" id="goods_thumb" src="' + goods.goods_thumb + '">');
        }
        $('input[name=provide_invoice][value=' + goods.provide_invoice + ']').prop('checked',true);
        $('input[name=is_display][value=' + goods.is_display + ']').prop('checked',true);
        $('input[name=is_hot][value=' + goods.is_hot + ']').prop('checked',true);
        $('input[name=is_new][value=' + goods.is_new + ']').prop('checked',true);
        $('input[name=is_limit][value=' + goods.is_limit + ']').prop('checked',true);
        $('#limit_num').val(goods.limit_num);
        $('input[name=is_promote][value=' + goods.is_promote + ']').prop('checked',true);
        $('#promote_price').val(goods.promote_price);
        $('#promote_start_time').val(goods.promote_start_time);
        $('#promote_end_time').val(goods.promote_end_time);
        $('input[name=for_vip][value=' + goods.for_vip + ']').prop('checked',true);
        if('1' == goods.is_limit){
            $('#limitBox').removeClass('hide');
        }else {
            $('#limitBox').addClass('hide');
        }
        if('1' == goods.is_promote){
            $('#promoteBox').removeClass('hide');
        }else {
            $('#promoteBox').addClass('hide');
        }
        if(!$('#goodsAlertInfo').hasClass('hide')){
            $('#goodsAlertInfo').addClass('hide');
        }
    };

    function calculateSpecParam1(goods) {
        var param_1 = '';
        var lease_year = goods.spec_str.lease_year;
        if(lease_year){
            var yearOptions = getYearOptions(goods.common.spec_tpl);
            param_1 = getParam1(yearOptions,lease_year);

        }
        return param_1;
    };

    function getYearOptions(spec_tpl) {
        if(spec_tpl && spec_tpl.length > 0){
            for(var i in spec_tpl){
                if('lease_year' == spec_tpl[i].title_code){
                    return spec_tpl[i].options;
                }
            }
        }
    };
    
    function getParam1(yearOptions,lease_year) {
        if(yearOptions && yearOptions.length > 0){
            for(var i in yearOptions){
                if(yearOptions[i].option_id == lease_year){
                    return yearOptions[i].param_1;
                }
            }
        }
    };
};
/**
 * Created by Administrator on 2016/5/15 0015.
 */
