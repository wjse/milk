define(['jquery','util','api','iScroll','wHandler','goodsApi','alert','slick'],function($,util,api,iScroll){

    api.on(function(data){
        /**
         * banner view
         * @see banner-view.js
         */
        util.getScript('/home/view/banner-view').then(function(){
            window.bannerView(data.banner);
        });

        /**
         * search view
         * @see common/search-view.js
         */
        util.getScript('/common/search-view').then(function(){
            window.searchView('.header');
        });

        /**
         * one view
         * @see one-view.js
         */
        util.getScript('/home/view/one-view').then(function(){
            window.oneView(data.one_zone,iScroll);
        });

        /**
         * special view
         * @see special-view.js
         */
        util.getScript('/home/view/special-view').then(function(){
            window.specialView(data.recommend,'推荐专区');
        });

        /**
         * footer view
         * @see common/footer-view
         */
        util.getScript('/common/footer-view').then(function(){
            window.footerView('#index','home');
        });
    });

});