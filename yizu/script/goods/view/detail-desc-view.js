function detailDescView(desc){

    if(!desc){
        desc = '';
    }

    var container = '.description';

    $(container).html(render());

    function render(){
        var html = '<div class="des-head">';
        html += '      <div class="desc-btn active"><a href="#">商品介绍</a></div>';
        html += '      <div class="desc-btn"><a href="#">规格参数</a></div>';
        html += '   </div>';
        html += '   <div class="des-main">' + desc + '</div>';
        return html;
    };
};
