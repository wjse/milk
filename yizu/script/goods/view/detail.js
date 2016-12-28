define(['util','api','converter','alert','slick'],function(util,api){
    var id = util.getUrlParam('id');

    if(!id){
        return;
    }

    api.getGoods(id,function(goods){
        /**
         * banner view
         * @see banner-view.js
         */
        util.getScript('/home/view/banner-view').then(function(){
            window.bannerView(goods.detail_img);
        });

        /**
         * info view
         * @see detail-info-view.js
         */
        util.getScript('/goods/view/detail-info-view').then(function(){
            window.detailInfo(goods);
        });

        /**
         * model view
         * @see detail-model-view.js
         */
        util.getScript('/goods/view/detail-model-view').then(function(){
            window.detailModelView();
        });

        /**
         * description view
         * @see detail-desc-view.js
         */
        util.getScript('/goods/view/detail-desc-view').then(function(){
            window.detailDescView(goods.common_body);
        });

        /**
         * option view
         * @see detail-option-view.js
         */
        util.getScript('/goods/view/detail-option-view').then(function(){
            window.detailOptionView();
        });

        /**
         * select view
         * @see detail-select-view.js
         */
        util.getScript('/goods/view/detail-select-view').then(function(){
            window.detailSelectView(goods);
        });
    });


});
