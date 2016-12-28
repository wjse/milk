function asideView(moduleName){
    var asideList,util = requirejs('util'),userToken = requirejs('userToken');
    var storage = util.storage('session');

    util.getScript('/common/aside-model').then(function(){
       asideList = window.asideModel(moduleName);
    });

    renderAside();

    bindOptions();

    function renderAside(){
        var html = '<div class="aside-box" id="aside">';
        html += '<div class="back"  data-toggle="tooltip" data-placement="right" title="返回主菜单">';
        html += '<a href="' + userToken.mainPath() + '">';
        html += '<img alt="back_img" src="www/image/home.png"></a>';
        html += '</div>';
        html += '<div class="nav-box">';
        html += '<nav>';
        html += '<ul>';
        $.each(asideList, function (index,li) {
            html += '<li class="li-module '+ ( li.active ? "active" : "" ) +'" module="'+li.module+'" ';
            html += ' data-toggle="tooltip" data-placement="right" title="'+li.title+'">';
            html += '<a href="' + li.link + '">';
            html += '<img src="'+li.img+'" alt="'+li.module+'">';
            html += '<span class="module-name">' + li.title + '</span>';
            html += '</a></li>';
        });
        html += '</ul>';
        html += ' </nav>';
        html += '</div>';
        html += '</div>';

        $("aside").html(html);
    };

    function bindOptions(){

        $("li.li-module").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
    };
};