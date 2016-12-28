function pageView(page,container,callback){

    var pageNum = page.currentPage;
    var totalPage = page.totalPage;

    new iScroll(container,{
        hScrollbar:false,
        vScrollbar:false,
        checkDOMChanges:true,
        onScrollEnd:function(){
            var y = this.y;
            var wH = this.wrapperH;
            var sH = this.scrollerH;

            if(y == (wH - sH)){
                if(totalPage > pageNum){
                    pageNum += 1;
                    callback.call(this,pageNum);
                }
            }
        }
    });
};
