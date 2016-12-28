function asideView(moduleName){
    var asideList,util = requirejs('util'),userToken = requirejs('userToken');

    renderAside();


    function renderAside(){
        var html = '<div class="aside-box" id="aside">';
        html += '<div class="back"  data-toggle="tooltip" data-placement="right" title="返回主菜单">';
        html += '<a href="' + userToken.mainPath() + '">';
        html += '<img alt="back_img" src="www/image/home.png"></a>';
        html += '</div>';

        html += '</div>';

        $("aside").html(html);
    };
    
};