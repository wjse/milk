function memberGetListView(list,titleContainer,listContainer,type) {
    var $ = requirejs('jquery');

    if('customer' == type){
        shareListView(list,titleContainer,listContainer);
    }else{
        coinPointsListView(list,titleContainer,listContainer,type);
    }

    function coinPointsListView(list,titleContainer,listContainer,type) {
        renderTitle();
        renderList(list,type);

        function renderTitle() {
            var title = '<li class="detail-row">时间</li>';
            title += '<li class="detail-row use-detail-row">描述</li>';
            title += '<li class="detail-row">变动</li>';
            title += '<li class="detail-row">余额</li>';
            $(titleContainer).html(title);
        };

        function renderList(list,type) {
            var html = '';
            for(var i in list){
                html += '<li>';
                html += '<div class="detail-row">' + list[i].create_time + '</div>';
                html += '<div class="detail-row use-detail-row">' + (list[i].description ? list[i].description : '~') + '</div>';
                html += '<div class="detail-row">' + ('points' == type ? list[i].points : list[i].coin) + '</div>';
                html += '<div class="detail-row">' + list[i].balance + '</div>';
                html += '</li>';
            }
            $(listContainer).html(html);

        };
    };

    function shareListView(list) {

        renderShareTitle();
        renderShareList(list);

        function renderShareTitle() {
            var html = '<li class="detail-row">ID</li>';
            html += '<li class="detail-row nickname-row">微信昵称</li>';
            html += '<li class="detail-row">电话号码</li>';
            $('#shareListTitle').html(html);
        };

        function renderShareList(list) {
            var html = '';
            for(var i in list){
                html += '<li>';
                html += '<div class="detail-row">' + list[i].id + '</div>';
                html += '<div class="detail-row nickname-row">' + list[i].nickname + '</div>';
                html += '<div class="detail-row">' + (list[i].mobile ? list[i].mobile : '~' ) + '</div>';
                html += '</li>';
            }
            $('#shareList').html(html);
        };
    };
};

/**
 * Created by Administrator on 2016/5/25 0025.
 */
