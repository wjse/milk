function backAndAddView() {
    var html = '<div class="top-opt back-item">';
    html += '<a href="main.html">';
    html += '<img class="top-opt-icon" src="www/image/back.png">';
    html += '</a>';
    html += '<div class="system-name">返回首页</div>';
    html += '</div>';
    html += '<div class="top-opt add-item navy modal-icon" id="toAddModule">';
    html += '<img class="top-opt-icon" src="www/image/add.png">';
    html += '<div class="system-name">新增业务模块</div>';
    html += '</div>';
    $('.back-add-box').html(html);


};
/**
 * Created by Administrator on 2016/5/20 0020.
 */
