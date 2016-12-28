function pager(totalPage,pageNum,callback,containerBox){
    var container = containerBox ? containerBox : '#pageNav';
    const show_page = 3;
    render();

    function render(){
        var html = '<ul class="pagination">';

        if(  pageNum > 1){
            html += '<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
        }

        for( var j =  pageNum - show_page; j <  pageNum + show_page ; j++){
            if(j > 0 && j <=  totalPage){
                html += '<li id="'+ j +'" class="page '+(j ==  pageNum ? "active" : "")+'"><a href="javascript:;">'+j+'</a></li>';
            }
        }

        if( pageNum + show_page <  totalPage){
            html += "<li><a href='javascript:;'>...</a></li>";
        }

        if( pageNum <  totalPage){
            html += '<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
        }

        html += '</ul>';
        $(container).html(html);
        nextEvent();
        prevEvent();
        pageEvent();
    };

    function nextEvent(){
        $(container + " a[aria-label='Next']").on('click',function(){
            var p = pageNum + 1;
            $(container + ' .page').removeClass('active');
            $(container + ' #' + p).addClass('active');
            callback.call(this,p);
        });
    };

    function prevEvent(){
        $(container + " a[aria-label='Previous']").on('click',function(){
            var p = pageNum - 1;
            $(container + ' .page').removeClass('active');
            $(container + ' #' + p).addClass('active');
            callback.call(this,p);
        });
    };

    function pageEvent(){
        $(container + " li.page").on('click',function(){
            $('.page').removeClass('active');
            $(this).addClass('active');
            var p = $(this).children().html();
            callback.call(this,p);
        });
    };
};