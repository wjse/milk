function asideModel(moduleName){
    var list = [{
        active : false,
        module : "goods",
        title : "商品管理",
        img : "www/image/shangping.png",
        link : 'goods-list.html'
    },{
        active : false,
        module : "basic",
        title : "型号管理",
        img : "www/image/xinghao.png",
        link : 'basic.html'
    },{
        active : false,
        module : "category",
        title : "品类管理",
        img : "www/image/pinglei.png",
        link : 'category.html'
    },{
        active : false,
        module : "brand",
        title : "品牌管理",
        img : "www/image/pingpai.png",
        link : 'brand.html'
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
