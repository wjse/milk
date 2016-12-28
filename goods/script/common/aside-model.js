function asideModel(moduleName){
    var util = requirejs('util');
    var storage = util.storage('session');
    var token = storage.get('token');

    var list = [{
        active : false,
        module : "goods",
        title : "商品管理",
        img : "www/image/shangping.png",
        link : 'goods-list.html?token=' + token
    },{
        active : false,
        module : "basic",
        title : "型号管理",
        img : "www/image/xinghao.png",
        link : 'basic.html?token=' + token
    },{
        active : false,
        module : "category",
        title : "品类管理",
        img : "www/image/pinglei.png",
        link : 'category.html?token=' + token
    },{
        active : false,
        module : "brand",
        title : "品牌管理",
        img : "www/image/pingpai.png",
        link : 'brand.html?token=' + token
    },{
        active : false,
        module : "spec",
        title : "规格模板管理",
        img : "www/image/spec.png",
        link : 'spec.html?token=' + token
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
