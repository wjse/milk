define(['jquery'],function($){
    var loading = {};

    loading.start = function(){
        $('<div>',{
            id : 'loading',
            style:'width:100%;height:700px;position:fixed;top:0;left:0;text-align:center;padding-top:70%;background-color: rgba(247,247,247,0.5);',
            html : '<img src="../../www/image/loading.gif" width="50px">'
        }).appendTo('body');
    };

    loading.end = function(){
        $('#loading').remove();
    };
    
    return loading;
});
