define(['jquery'],function($){

    this.confirm = function(title,content,fn){
        var id = 'modalConfirm';

        template(id,title,content,false);

        okEvent(id,fn);

        $('.'.concat(id,'_cancel')).on('click',function(){
            delModal(id);
        });
    };

    this.alert = function(title,content,fn){
        var id = 'modalAlert';
        template(id,title,content,false);

        okEvent(id,fn);
    };

    function okEvent(id,fn){
        $('.'.concat(id,'_ok')).unbind();
        $('.'.concat(id,'_ok')).on('click',function(){
            if(isFunction(fn)) {
                fn.call();
            }
            delModal(id);
        });
    };

    function delModal(id){
        $('#'.concat(id)).modal('hide');
        $('#'.concat(id)).on('hide.bs.modal',function(){
            $('#'.concat(id)).remove();
        });
    };

    function template(id,title,content,isAlert){
        var html = '<div class="modal-dialog">';
            html += '    <div class="modal-content">';
            html += '        <div class="modal-header">';
            html += '             <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            html += '             <h4 class="modal-title">'+ title +'</h4>';
            html += '        </div>';
            html += '        <div class="modal-body"><p>'+ content + '</p></div>';
            html += '        <div class="modal-footer">';
            if(!isAlert){
                html += '        <button type="button" class="btn btn-default '+ id +'_cancel" data-dismiss="modal">取消</button>';
            }
            html += '            <button type="button" class="btn btn-primary '+ id +'_ok">确定</button>';
            html += '        </div>';
            html += '    </div>';
            html == '</div>';

        $('<div>',{
            class : 'modal fade',
            id : id,
            html : html
        }).appendTo('body');

        $('#'.concat(id)).modal('show');
    };

    function isFunction(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]';
    }

    return this;
});
