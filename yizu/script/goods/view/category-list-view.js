function categoryListView(category,cid){

    if(!category){
        return;
    }

    $(".aside").css("height", $(window).height() - 110);

    var container = '.aside',
        api = requirejs('api'),
        util = requirejs('util'),
        searchVal = util.getUrlParam('search');

    $('<div>',{
        class : 'nav-box',
        html : render()
    }).appendTo(container);

    if(!cid && !searchVal){
        $('.nav-box ul li').first().addClass('active');
    }

    $('.nav-box ul li').on('click',function(){
        tabCategory($(this));
    });

    function render(){
        var html = '<ul>';
            $.each(category,function(i){
                var obj = category[i];
                var isActive = '';
                if(cid && cid == obj.cid || searchVal == obj.category_name){
                    isActive = 'active';
                }
                html += '<li class="'+ isActive +'" for="'+ obj.cid +'">' + obj.category_name + '</li>';
            });
            html += '</ul>';
        return html;
    };

    function tabCategory($li){
        $('.nav-box ul li').removeClass('active');
        $li.addClass('active');
        var cid = $li.attr('for');
        api.queryGoodsByCategoryCallback(function(result){
            window.goodsListView(result.goods,cid);
        },{cid:cid});
    };
};
