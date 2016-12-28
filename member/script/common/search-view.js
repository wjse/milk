function searchView(container,typeList,callback){
    var $ = requirejs('jquery');

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
            html += '<span class="search-text" id="searchTypeText">全部</span> <span class="caret"></span>';
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
            var searchType = $(this).attr("value");
            $("#searchTypeText").html($(this).html()).attr('data-for',searchType);
        });

        $(document).keydown(function (e) {
            if(e.which == 13){
                var searchType = $("#searchTypeText").attr('data-for');
                var value = $("#searchInput").val();

                if(!searchType) return;
                var searchData = {
                    type : searchType,
                    value : value
                };

                if(searchType == "all") searchData = null;

                callback.call(this,searchData);
            }
        });

    };
};


