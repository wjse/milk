function searchView(type,btnName,callback) {
    var $ = requirejs('jquery'),util = requirejs('util'),plugins = requirejs('plugins');
    var storage = util.storage('session');

    renderSearch(type,btnName);
    bindSearchEvent();
    bindAddEvent();


    function renderSearch(type,btnName) {
        var html = '<div class="form-group">';

            html += '<span class="search-name">卡券名称:</span>';
            html += '<input class="search-big-input" type="text" id="title">';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<span class="search-name">有效天数:</span>';
            html += '<input class="search-big-input" type="text" id="days">';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<div class="btn-set" id="searchBtn">';
            html += '<span class="glyphicon glyphicon-search btn-icon"></span>';
            html += '<span class="btn-text">搜索</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="form-group">';
            html += '<div class="btn-set" id="toAddBtn" data-for="' + type + '">';
            html += '<span class="glyphicon glyphicon-plus btn-icon"></span>';
            html += '<span class="btn-text">' + btnName + '</span>';
            html += '</div>';
            html += '</div>';

        $('#searchBox').html(html);
    };

    function bindSearchEvent() {
        $('#searchBtn').off().on('click',function () {
            var title = $('#title').val(),
                days = $('#days').val(),
                searchStr = '';

            if(util.isEmpty(title) && util.isEmpty(days)){
                return;
            }
            if(util.isNotEmpty(title)){
                searchStr += '&title=' + title;
            }
            if(util.isNotEmpty(days)){
                searchStr += '&days=' + days;
            }

            callback.call(this,searchStr);

        });
    };

    function bindAddEvent() {
        $('#toAddBtn').off().on('click',function () {
            var type = $(this).attr('data-for');
            if('store' == type){
                window.location.href = 'store-coupons-add.html?token=' + storage.get('token');
            }else if('goods' == type){
                window.location.href = 'goods-coupons-add.html?token=' + storage.get('token');
            }else if('gift' == type){
                window.location.href = 'gift-coupons-add.html?token=' + storage.get('token');
            }
        });
    };

};
/**
 * Created by Administrator on 2016/6/4 0004.
 */
