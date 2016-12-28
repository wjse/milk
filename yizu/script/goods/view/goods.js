define(['util','api','iScroll','sorter','converter','wHandler'],function(util,api){
    var cid = util.getUrlParam('cid'),params = util.storage('session').get('params');

    if(!params){
        params = {};
    }

    if(cid) {
        params.cid = cid;
    }


    api.on(params,function(data){
        var searchVal = util.getUrlParam('search');
        if(searchVal){
            var goodsList = api.search(searchVal);
            data.goods = goodsList;
        }

        util.getScript('/common/search-view').then(function(){
            window.searchView('.header');
        });

        /**
         * nav view
         * @see nav-view.js
         */
        util.getScript('/goods/view/nav-view').then(function(){
            window.navView(data);
        });

        /**
         * category list view
         * @see category-list-view.js
         */
        util.getScript('/goods/view/category-list-view').then(function(){
            window.categoryListView(data.category,cid);
        });

        /**
         * goods list view
         * @see goods-list-view.js
         */
        util.getScript('/goods/view/goods-list-view').then(function(){
            window.goodsListView(data.goods);
        });

        /**
         * footer view
         * @see common/footer-view
         */
        util.getScript('/common/footer-view').then(function(){
            window.footerView('#goods','goods');
        });
    });
});
