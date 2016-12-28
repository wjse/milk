function headerView(headerText){

    renderHeader();

    function renderHeader(){
        var html  = '<div class="header-box container">';
            html += '<p id="moduleTitle">'+headerText+'</p></div>';
        $("header").html(html);
    };
};