function navView(container,data,callback){

    renderNav();

    bindOption();

    function renderNav(){
        var html  = '<ul class="nav nav-tabs">';
        $.each(data, function (index, nav) {
            html += '<li role="presentation" class="nav-option '+( nav.active ? "active" : "" )+'" forward="'+nav.forward+'">';
            html += '<a id="'+nav.id+'" href="javascript:;">'+nav.name+'</a></li>';
        })
            html += '</ul>';

        $(container).html(html);
    };

    function bindOption(){
        $(".nav-option").on("click",function(){

            $(this).addClass("active").siblings("li").removeClass("active");

            var forward = $(this).attr("forward");

            callback.call(this,forward);
        });
    };
};

