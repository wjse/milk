/**
 *
 * @param obj = {
 *            title : array,
 *            items : array [
 *                  {id:1,name:test,opt:[
 *                      {k1:v1,k2:v2},
 *                      class
 *                  ]}
 *              ]
 *            }
 * @param container
 */
function tableView(obj,container){

    if(!obj.title || !obj.items){
        return;
    }

    render();

    function render(){
        var html = '<div class="table-area" id="tableArea">';
            html += renderTitle(obj.title);
            html += renderBody(obj.items);
            html += '</div>';

        $(container).html(html);
    };

    function renderBody(items){
        var html = '<ul id="listArea">';
        for(var i = 0 ; i < items.length ; i++){
            var item = items[i];
            html += '<li>';
            html += renderDataBody(item);
            html += '</li>';
        }
        html += '</ul>';
        return html;
    };

    function renderDataBody(obj){
        var html = '';
        for(var key in obj){
            if(key == 'id' || obj[key] == 'hide'){
                continue;
            }

            if(key != 'opt'){
                html += '<div class="col-item">'+obj[key]+'</div>';
            }else{
                html += renderOpt(obj[key]);
            }
        }
        return html;
    };

    function renderOpt(obj){
        var html = '<div class="col-item">';
        for(var key in obj){
            html += '<div class="btn btn-xs ' + obj[key][1] + '" data-for="'+ obj[key][0] +'">' + key + '</div>';
        }
        html += '</div>';
        return html;
    };

    function renderTitle(title){
        var html = '<div class="f-oh list-title" id="listTitle">';
        for(var i = 0 ; i < title.length ; i++){
            var data = title[i];
            html += '<div class="col-item title-col">'+ data +'</div>';
        }
        html += '</div>';
        return html;
    };
};/**
 * Created by wujia on 16/4/9.
 */
