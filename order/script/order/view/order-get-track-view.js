function orderTrackView(oid) {
    var $ = requirejs('jquery'),util = requirejs('util'),api = requirejs('api');

    if(util.isEmpty($('#orderTrackBox').html())){
        //request data
        var trackList = api.track(oid);
        renderTrackBox(trackList);
    }
    $('#orderTrackBox').slideDown(500);



    $('#upTrackBtn').off().on('click',function () {
        $('#orderTrackBox').slideUp(500);
    });

    function renderTrackBox(trackList) {
        var html = '';
            html += renderTrackTitle();
            html += renderTrackList(trackList);
            html += '<div class="up-track-btn" id="upTrackBtn">收起追踪</div>';
        $('#orderTrackBox').html(html);
    };
    
    function renderTrackTitle() {
        var html = '<ul class="track-title">';
            html += '<li class="track-row">处理时间</li>';
            html += '<li class="track-row track-big-row">处理信息</li>';
            html += '<li class="track-row">操作人</li>';
            html += '</ul>';
        return html;
    };

    function renderTrackList(trackList) {
        var html = '<ul class="track-list">';
        if(trackList && trackList.length > 0){
            for(var i in trackList){
                html += '<li>';
                html += '<div class="track-row">' + trackList[i].create_time + '</div>';
                html += '<div class="track-row track-big-row">' + trackList[i].description + '</div>';
                html += '<div class="track-row">' + trackList[i].operator + '</div>';
                html += '</li>';
            }
        }
        html += '</ul>';
        return html;
    };
















};
/**
 * Created by Administrator on 2016/5/27 0027.
 */
