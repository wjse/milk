function footerView(container,current){

    var footer = [
        {
            id : 'home',
            text : '首页',
            link : 'index.html'
        },{
            id : 'goods',
            text : '分类',
            link : 'goods.html'
        },{
            id : 'cart',
            text : '租袋',
            link : 'cart.html'
        },{
            id : 'profile',
            text : '我的',
            link : 'profile.html'
        }
    ];

    $('<footer>',{
        html : render()
    }).appendTo(container);

    function render(){
        var html = '<div class="footer-box">';
            html += body();
            html += '</div>';
        return html;
    };

    function body(){
        var html = '';

        $.each(footer,function(i){
            var isActive = footer[i].id == current ? 'active' : '';
            html += '<div class="footer-li ' + isActive + '">';
            html += '  <a href="' + footer[i].link + '">';
            html += '    <p class="footer-li-icon"></p>';
            html += '    <p>'+ footer[i].text +'</p>';
            html += '  </a>';
            html += '</div>';
        });

        return html;
    };
};
