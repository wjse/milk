function asideView(asideId,asideList,callback){

    renderAside();

    bindOptions();

    function renderAside(){
        var html = '<div class="aside-box" id="'+asideId+'">';
        html += '<div class="back"  data-toggle="tooltip" data-placement="right" title="返回主菜单">';
        html += '<a href="javascript:;">';
        html += '<img alt="back_img" src="www/image/home.png"></a>';
        html += '</div>';
        html += '<div class="nav-box">';
        html += '<nav>';
        html += '<ul>';
        $.each(asideList, function (index,li) {
            html += '<li class="li-module '+ ( li.active ? "active" : "" ) +'" module="'+li.module+'" ';
            html += ' data-toggle="tooltip" data-placement="right" title="'+li.title+'">';
            html += '<a href="javascript:;"><img src="'+li.img+'" alt="'+li.module+'"></a></li>';
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

            var module = $(this).attr("module");

            callback.call(this,module);

            var moduleTitle = $(this).attr("title");

        });
    };
};