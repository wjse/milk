define(['util','api','modal','userToken','upload'],function(util,api,modal,userToken){
    //getToken
    userToken.setToken();
    
    var moduleName = '品牌管理';

    /**
     * head
     * @see common/header-view.js
     */
    util.getScript('/common/header-view').then(function () {
        window.headerView(moduleName);
    });

    /**
     * aside
     * @see common/aside-view.js
     */
    util.getScript('/common/aside-view',false).then(function(){
        window.asideView('brand');
    });

    /**
     * mainbox minheight
     */
    $("#mainBox").css('minHeight',$(window).height()-100);

    /**
     * load list
     * @see list-view.js
     */
    util.getScript('/brand/view/list-view').then(function(){
        window.listView(api.list());
    });

    /**
     * new brand
     * @see modal-view.js
     */
    $('#newBrand').click(function(){
        util.getScript('/brand/view/modal-view').then(function(){
            new modalView('创建品牌',null,function(brand){
                var result = api.save(brand);
                if(result){
                    modal.alert('提示!','品牌创建成功!',function(){
                        window.location.reload();
                    });
                }else {
                    modal.alert('错误!', '品牌创建失败!');
                }
            }).openModal();
        });
    });
});

