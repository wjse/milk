function tableView(data,parent,callback){
    if(!data) return;

    var html = '';
        html += '<table class="table table-hover">';
        html += GetTableHead(data.head);
        html += GetTableBody(data.body);
        html += '</table>';
    $(parent).html(html);
    Delete();
    update();
    showPic();

    function GetTableHead(headList){
        var html = '';
        html += '<thead><tr>';
        $.each(headList, function (index,value) {
            html += '<th>'+value+'</th>';
        });
        html += '</tr></thead>';
        return html;
    };

    function GetTableBody(recordList){
        var html = '';
            html += '<tbody>';
        $.each(recordList, function (index,value) {
            html += GetRecord(value);
        });
            html += '</tbody>';
        return html;
    };

    function GetRecord(recordInfo){
        var tdOrder = data.tdOrder;
        var backKey = ( recordInfo.id ? recordInfo.id : recordInfo.appid );
        var html  = '';
        if(!recordInfo) return;
            html += '<tr>';
            $.each(tdOrder, function (index,value) {
                html += '<td>';
                switch (value){
                    case "option":
                        html += '<a class="btn btn-xs btn-primary" edit_id="'+backKey+'" href="javascript:;">编辑</a>';
                        html += ' <a class="btn btn-xs btn-danger" del_id="'+backKey+'" href="javascript:;">删除</a>';
                        break;
                    case "pic_url":
                        if(recordInfo.type == 1){
                            html += '<a class="btn btn-xs btn-info show-pic" show_url="'+recordInfo[value]+'">点击查看</a>';
                        }
                        break;
                    case "type":
                        html += '<span>'+( recordInfo[value] == 1 ? "图文" : "纯文本" )+'</span>';
                        break;
                    default :
                        html += '<span class="nowrap" data-toggle="tooltip" data-placement="right" title="'+recordInfo[value]+'">';
                        html += ( null != recordInfo[value] ? recordInfo[value] : "无" );
                        html += '</span>';
                        break;
                };
                html += '</td>';
            });
            html += '</tr>';

        return html;
    };

    function Delete(){
        $("a[del_id]").bind("click", function () {
            if(!confirm("确认删除？")) return;
            var curBackKey = $(this).attr("del_id");
            callback.call(this,curBackKey,"delete");
        });
    };

    function update(){
        $("a[edit_id]").bind("click", function () {
            var curBackKey = $(this).attr("edit_id");
            callback.call(this,curBackKey,"update");
        });
    };

    function showPic(){
        $(".show-pic").on("click", function () {
            var url = $(this).attr("show_url");
            $("#myModal").modal("show");
            $("#modalPic").html("<div><img src='"+url+"'></div>");
        });
    };
};