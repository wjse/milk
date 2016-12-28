function memberList() {
    var $ = requirejs('jquery'),util = requirejs('util'),api = requirejs('api');
    var searchModelData = [
        {
            type : 'all',
            name : '全部'
        },
        {
            type : 'id',
            name : '用户ID'
        },
        {
            type : 'appid',
            name : '公众号ID'
        },
        {
            type : 'nickname',
            name : '用户昵称'
        },
        {
            type : 'mobile',
            name : '手机号码'
        },
        {
            type : 'register_way',
            name : '注册方式'
        }
    ];

    //init page
    renderListTitle();
    renderPage(1);

    //search
    util.getScript('/common/search-view').then(function () {
        window.searchView('#searchBox',searchModelData,function (searchData) {
            if(searchData){
                renderListTitle();
                renderPage(1,searchData);
            }else {
                renderListTitle();
                renderPage(1);
            }
        });
    });

    
    function renderListTitle() {
        util.getScript('/member/view/member-list-view').then(function () {
            window.memberListTitle();
        });
    };

    function renderPage(pageNum,searchData) {
        var searchStr = '?p=' + pageNum;
        if(searchData){
            searchStr += '&value=' + searchData.value + '&search=' + searchData.type;
        }
        var pageResult = api.memberPage(searchStr);
        if(!pageResult){
            return;
        }
        util.getScript('/member/view/member-list-view').then(function () {
            window.memberListPage(pageResult);
        });

        //renderPager
        util.getScript('/common/member-pager').then(function () {
            window.memberPager('#pageNav',pageResult.page.totalPage,pageResult.page.currentPage,function (pageNum) {
                var searchData = getSearchVal();
                renderPage(pageNum,searchData);
            });
        });
    };
    
    function getSearchVal() {
        var searchType = $("#searchTypeText").attr('data-for');
        var value = $("#searchInput").val();

        if(!searchType) return;
        var searchData = {
            type : searchType,
            value : value
        };

        if(searchType == "all") searchData = null;
        return searchData;
    };

};
/**
 * Created by Administrator on 2016/5/19 0019.
 */
