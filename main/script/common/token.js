define(['jquery','config','util'],function ($,config,util) {
    var storage = util.storage('session');

    return {
        setToken : function () {
            var token = storage.get('token');
            if(!token){
                token = util.getUrlParam('token');
                if(token){
                    storage.put('token',token);
                }else {
                    alert('token丢失!');
                }
            }
        },

        loginPath : function () {
            var url = window.location.href;
            var loginPath = '';

            if(url.indexOf('localhost:') != -1){
                loginPath = 'http://localhost:3001/index.html';
            }else if(url.indexOf('yizu.vcoola.cn') != -1){
                loginPath ='http://yizu.vcoola.cn:8082/index.html';
            }
            return loginPath;
        },

        mainPath : function () {
            var url = window.location.href;
            var mainPath = '';

            if(url.indexOf('localhost:') != -1){
                mainPath = 'http://localhost:3001/main.html';
            }else if(url.indexOf('yizu.vcoola.cn') != -1){
                mainPath ='http://yizu.vcoola.cn:8082/main.html';
            }
            return mainPath;
        },
        
        getTokenUrl : function (url) {
            var token = storage.get('token');
            if(url.indexOf('?') >0){
                url += '&';
            }else {
                url += '?';
            }
            url += 'token=' + token;
            return url;
        },

        goLogin : function () {
            storage.clear();
            var loginPath = this.loginPath();
            window.location.href = loginPath;
        }
    };
});
/**
 * Created by Administrator on 2016/5/20 0020.
 */
