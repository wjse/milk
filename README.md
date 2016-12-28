#Build commands

    npm install
    
    bower install
    
    gulp


#Package

    module/
    
        api-test.js  --require entry js
        
        /view   --viewer for DOM
        
        /api    --service for server
        
        /model  --logic model
        
    


#Entry js demo

##api-test.js

    //配置js

    require.config({
    
        paths:{
        
            jquery:'../lib/jquery/jquery',
            
            view:'view/goods-view',
            
            api:'service/api'
            
        },
        shim : {
            'bootstrap': {
                deps: ['jquery']
            }
         }
        
    });

    //定义导入js模块
    define(['jquery','goodsView','api']);

##viewer js demo

    //require注入所需要的模块
    
    require(['api'],function(api){
        ...
    });

##api js demo
    //定义模块
    
    define(['api'],function(){
    
        return {};
        
    });
##shim : {
          'bootstrap': {
              deps: ['jquery']
          }
      }
