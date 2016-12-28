function asideModel(moduleName){
    var util = requirejs('util');
    var storage = util.storage('session');
    var token = storage.get('token');

    var list = [{
        active : false,
        module : "index",
        title : "优惠券首页",
        img : "www/image/coupons_index.png",
        link : 'index.html?token=' + token
    },{
        active : false,
        module : "store",
        title : "店铺优惠券管理",
        img : "www/image/coupons_store.png",
        link : 'store-coupons-list.html?token=' + token
    },{
        active : false,
        module : "goods",
        title : "商品优惠券管理",
        img : "www/image/coupons_goods.png",
        link : 'goods-coupons-list.html?token=' + token
    },{
        active : false,
        module : "gift",
        title : "优惠券礼包套餐",
        img : "www/image/coupons_gift.png",
        link : 'gift-coupons-list.html?token=' + token
    }];

    for(var i = 0 ; i < list.length ; i ++ ){
        if(list[i].module == moduleName){
            list[i].active = true;
            break;
        }
    }

    return list;
};

/**
 * Created by Administrator on 2016/4/12.
 */
