define(['jquery'],function($){

    const password_base = [
        'a','b','c','d','e','f','g','h','i','j',
        'k','l','m','n','o','p','q','r','s','t',
        'u','v','w','x','y','z','1','2','3','4',
        '5','6','7','8','9'
    ];

    return {
        sha : function(s){
            return hex_sha1(s);
        },

        isEmpty : function(str){
            return !str || str == '';
        },

        isNotEmpty : function(str){
            return !this.isEmpty(str);
        },

        isOverLength : function(str,length){
            if(this.isEmpty(str)){
                return false;
            }
            return str.length > length;
        },

        isMobile : function(str){
            var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            return reg.test(str);
        },

        isInteger : function(str){
            var reg = /^[0-9]*$/;
            return reg.test(str);
        },

        isNegative : function(str){
            var reg = /^\-[1-9][0-9]*$/;
            return reg.test(str);
        },

        hideErrorInfo : function(id){
            $(id).addClass('hide');
        },

        showErrorInfo: function(id,msg){
            $(id).html(msg).removeClass('hide');
        },

        checkInput : function(str){
            var pattern =/^[^\|"'<>_-]*$/;
            if(pattern.test(str))
            {
                return false;
            }
            return true;
        },

        getScript : function(url){
            return $.ajax({
                url : 'script'.concat(url,'.js'),
                async : false,
                dataType : 'script'
            });
        },

        getUrlParam : function(k){
            var reg = new RegExp("(^|&)"+ k +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) {
                return decodeURI(r[2]);
            }
            return null;
        },

        getRandomPassword : function(){
            var password = '';
            for(var i = 0 ; i < 6 ; i++){
                var random = parseInt(Math.random() * password_base.length);
                var p = password_base[random];
                if(random % 6 != 0){
                    p = p.toUpperCase();
                }
                password += p;
            }

            return password;
        },
        equals : function(o1,o2) {
            var isK = true;
            for (var k1 in o1) {
                if (!o2[k1]) {
                    isK = false;
                    break;
                }
            }

            if (!isK) {
                return false;
            }
            var isV = true;
            for (var k in o1) {
                if (o1[k] != o2[k]) {
                    isV = false;
                    break;
                }
            }

            return isV;
        },

        storage : function(type){
            var storage = window.localStorage;
            if('session' == type){
                storage = window.sessionStorage;
            }

            return {
                get : function(k){
                    var v = storage.getItem(k);
                    if(null == v){
                        return v;
                    }
                    try{
                        return JSON.parse(v);
                    }catch(e){
                        return v;
                    }
                },
                put : function (k,v) {
                    if(typeof(v) == "object"){
                        v = JSON.stringify(v);
                    }
                    storage.setItem(k,v);
                },
                remove:function(k){
                    storage.removeItem(k);
                },
                clear:function(){
                    storage.clear();
                }
            };
        },
        
        goLogin : function (url) {
            this.storage('session').clear();
            var url = window.location.href;
            if(url.indexOf('localhost:')){
                window.location.href = 'http://localhost:3000/' + url;
            }else if(url.indexOf('yizu.vcoola.cn')) {
                window.location.href = 'http://yizu.vcoola.cn/' + url;
            }
        }
    };
});