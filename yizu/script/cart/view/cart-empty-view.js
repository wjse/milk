function cartEmptyView(){

    var container = '.cart-page';

    $(container).html($('<div>',{
        class : 'cart-empty',
        html : render()
    }));

    function render(){
        var html = noticeMsg();
        html += '<div class="content-area area-2" id="special"></div>';
        return html;
    };

    function noticeMsg(){
        var html ='<div class="empty-notice">';
            html += '<p><img src="www/image/iconfont-cart.png"></p>';
            html += '<p>您的租袋空空如也！</p>';
            html += '</div>';
        return html;
    };
};
