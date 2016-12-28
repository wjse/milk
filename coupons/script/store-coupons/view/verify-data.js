function verifyData(coupons) {
    var $ = requirejs('jquery'),util = requirejs('util');

    if(util.isEmpty(coupons.title)){
        util.showErrorInfo('#alert','优惠券名称不能为空！');
        return false;
    }
    if(util.isEmpty(coupons.value)){
        util.showErrorInfo('#alert','优惠券面额不能为空！');
        return false;
    }
    if(isNaN(coupons.value)){
        util.showErrorInfo('#alert','优惠券面额只能为数字！');
        return false;
    }
    if(util.isEmpty(coupons.limit_value)){
        util.showErrorInfo('#alert','优惠券使用条件（限额）不能为空！');
        return false;
    }
    if(isNaN(coupons.limit_value)){
        util.showErrorInfo('#alert','优惠券使用条件（限额）只能为数字！');
        return false;
    }
    if('A' == coupons.date_type){
        coupons.start_time = $('#start_time').val();
        coupons.end_time = $('#end_time').val();

        if(util.isEmpty(coupons.start_time)){
            util.showErrorInfo('#alert','优惠券的有效起始时间不能为空！');
            return false;
        }
        if(util.isEmpty(coupons.end_time)){
            util.showErrorInfo('#alert','优惠券的有效结束时间不能为空！');
            return false;
        }
    }else if('R' == coupons.date_type){
        coupons.relative_day = $('#relative_day').val();
        if(util.isEmpty(coupons.relative_day)){
            util.showErrorInfo('#alert','优惠券的有效时间不能为空！');
            return false;
        }
        if(isNaN(coupons.relative_day)){
            util.showErrorInfo('#alert','优惠券的有效时间只能为数字！');
            return false;
        }
    }
    if(util.isEmpty(coupons.create_num)){
        util.showErrorInfo('#alert','优惠券发行量不能为空！');
        return false;
    }
    if(isNaN(coupons.create_num)){
        util.showErrorInfo('#alert','优惠券发行量只能为数字！');
        return false;
    }
    if(util.isEmpty(coupons.user_receive_limit)){
        util.showErrorInfo('#alert','每人限额不能为空！');
        return false;
    }
    if(isNaN(coupons.user_receive_limit)){
        util.showErrorInfo('#alert','每人限额只能为数字！');
        return false;
    }

    return coupons;
}
/**
 * Created by Administrator on 2016/6/6 0006.
 */
