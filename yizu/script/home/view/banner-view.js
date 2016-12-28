function bannerView(banner){
    if(!banner){
        return;
    }

    
    $('.banner').append(render());



    $(function(){
        $('.slick').slick({
            arrows : false,
            autoplay : true
        });
    })

    function render(){
        var html = '<div class="slick">';
        $.each(banner,function(i){
            var b = banner[i];
            if(!b.link_url || b.link_url){
                b.link_url = '#';
            }
            html += '<a href="'+ b.link_url +'"><img style="width:'+ window.screen.width +'px!important;" src="'+ b.img_url +'" alt="banner"></a>';
        });
        html += '</div>';
        return html;
    };
};
