function searchView(container,searchType,typeList,callback){

    renderSearchBox();

    function renderSearchBox(){

        if(!typeList) return;

        var html  = '<div class="input-group">';
            html += getInputGroup();
            html += '<input id="searchInput" type="text" class="form-control search-input" aria-label="...">';
            html += '</div>';
        $(container).html(html);

        bindOptions();
    };

    function getInputGroup(){
        var html = '<div class="input-group-btn">';
            html+= getInputButton();
            html+= getInputlist();
            html+= '</div>';
        return html;
    };

    function getInputButton(){
        var html  = '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
            html += '<span id="searchTypeText">全部</span> <span class="caret"></span>';
            html += '</button>';
        return html;
    };

    function getInputlist(){

        var html  = '<ul class="dropdown-menu">';

        $.each(typeList, function (index, value) {
            html += '<li><a class="search-type-btn" value="'+value.type+'" href="javascript:;">'+value.name+'</a></li>';
        });

            html += '</ul>';
        return html;
    };

    function bindOptions(){

        $(".search-type-btn").on("click", function () {
            searchType = $(this).attr("value");
            $("#searchTypeText").html($(this).html());
        });

        $("#searchInput").on("keyup", function () {

            if(!searchType) return;

            var type = searchType;
            var value = $(this).val();

            var searchData = {
                type : type,
                value : value
            };

            if(type == "all") searchData = null;

            callback.call(this,searchData);
        });
    };
};


