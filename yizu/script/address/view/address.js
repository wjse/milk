define(['util','api','wHandler','converter','areaList','addressForm','alert'],function(util,api,handler){
    if(!handler.isUserLogin()){
        return;
    }

    var list = api.on();

    if(!list || list.length == 0){
        util.getScript('/address/view/empty-view').then(function(){
            window.addressEmptyView();
        });

        return;
    }

    util.getScript('/address/view/address-view').then(function(){
        window.addressView(list);
    });
    
});
