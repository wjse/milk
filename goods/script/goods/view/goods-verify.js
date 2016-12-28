function goodsVerify(goods,type) {
    var $ = requirejs('jquery'),util = requirejs('util');

    if('add' == type){
        if(util.isEmpty(goods.category_id)){
            util.showErrorInfo('#goodsAlertInfo','商品品类不能为空！');
            return false;
        }
        if(util.isEmpty(goods.brand_id)){
            util.showErrorInfo('#goodsAlertInfo','商品品牌不能为空！');
            return false;
        }
        if(util.isEmpty(goods.goods_common_id)){
            util.showErrorInfo('#goodsAlertInfo','商品型号不能为空！');
            return false;
        }
    }

    if(util.isEmpty(goods.goods_name)){
        util.showErrorInfo('#goodsAlertInfo','商品标题不能为空！');
        return false;
    }
    if(util.isEmpty(goods.sale_price)){
        util.showErrorInfo('#goodsAlertInfo','商品售价不能为空！');
        return false;
    }
    if(isNaN(goods.sale_price)){
        util.showErrorInfo('#goodsAlertInfo','商品售价只能为数字！');
        return false;
    }
    if(util.isEmpty(goods.market_price)){
        util.showErrorInfo('#goodsAlertInfo','商品押金不能为空！');
        return false;
    }
    if(isNaN(goods.market_price)){
        util.showErrorInfo('#goodsAlertInfo','商品押金只能为数字！');
        return false;
    }
    if(parseFloat(goods.market_price) < parseFloat(goods.sale_price)){
        util.showErrorInfo('#goodsAlertInfo','商品押金必须大于商品售价！');
        return false;
    }
    if(util.isEmpty(goods.discount_percent)){
        util.showErrorInfo('#goodsAlertInfo','折扣比例不能为空！');
        return false;
    }
    if(isNaN(goods.discount_percent)){
        util.showErrorInfo('#goodsAlertInfo','折扣比例上限只能为数字！');
        return false;
    }
    if(parseFloat(goods.discount_percent) > 1 || parseFloat(goods.discount_percent) < 0){
        util.showErrorInfo('#goodsAlertInfo','折扣比例上限只能为0~1之间的数字！');
        return false;
    }
    if(util.isEmpty(goods.commission_ratio)){
        util.showErrorInfo('#goodsAlertInfo','返佣比例不能为空！');
        return false;
    }
    if(isNaN(goods.commission_ratio)){
        util.showErrorInfo('#goodsAlertInfo','返佣比例只能为数字！');
        return false;
    }
    if(parseFloat(goods.commission_ratio) > 1 || parseFloat(goods.commission_ratio) < 0){
        util.showErrorInfo('#goodsAlertInfo','返佣比例只能为0~1之间的数字！');
        return false;
    }
    if(util.isEmpty(goods.freight)){
        util.showErrorInfo('#goodsAlertInfo','运费不能为空！');
        return false;
    }
    if(isNaN(goods.freight)){
        util.showErrorInfo('#goodsAlertInfo','运费只能为数字！');
        return false;
    }
    if(util.isNotEmpty(goods.gc_sort) && isNaN(goods.gc_sort)){
        util.showErrorInfo('#goodsAlertInfo','排序只能为数字！');
        return false;
    }
    if(util.isEmpty(goods.stock_balance)){
        util.showErrorInfo('#goodsAlertInfo','库存量不能为空！');
        return false;
    }
    if(isNaN(goods.stock_balance)){
        util.showErrorInfo('#goodsAlertInfo','库存量只能为数字！');
        return false;
    }
    if(util.isEmpty(goods.stock_alarm)){
        util.showErrorInfo('#goodsAlertInfo','库存预警值不能为空！');
        return false;
    }
    if(isNaN(goods.stock_alarm)){
        util.showErrorInfo('#goodsAlertInfo','库存预警值只能为数字！');
        return false;
    }
    if('1' == goods.is_limit){
        goods.limit_num = $('#limit_num').val();
        if(util.isEmpty(goods.limit_num)){
            util.showErrorInfo('#goodsAlertInfo','限购数量不能为空！');
            return false;
        }
        if(isNaN(goods.limit_num)){
            util.showErrorInfo('#goodsAlertInfo','限购数量只能为数字！');
            return false;
        }
    }
    if('1' == goods.is_promote){
        goods.promote_price = $('#promote_price').val();
        goods.promote_start_time = $('#promote_start_time').val();
        goods.promote_end_time = $('#promote_end_time').val();
        if(util.isEmpty(goods.promote_price)){
            util.showErrorInfo('#goodsAlertInfo','促销价格不能为空！');
            return false;
        }
        if(isNaN(goods.promote_price)){
            util.showErrorInfo('#goodsAlertInfo','促销价格只能为数字！');
            return false;
        }
        if(util.isEmpty(goods.promote_start_time)){
            util.showErrorInfo('#goodsAlertInfo','促销开始时间不能为空！');
            return false;
        }
        if(util.isEmpty(goods.promote_end_time)){
            util.showErrorInfo('#goodsAlertInfo','促销结束时间不能为空！');
            return false;
        }
    }

    return goods;
};
/**
 * Created by Administrator on 2016/5/12 0012.
 */
