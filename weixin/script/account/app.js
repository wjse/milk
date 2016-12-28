require.config({
    paths: {
        jquery: '../../lib/jquery/jquery.min',
        bootstrap: '../../lib/bootstrap/bootstrap.min',
        jqueryForm: '../../lib/jquery/jquery.form',
        util: '../common/util',
        config:'../common/config',
        // storage : '../common/storage',

        api: 'service/api',
        view: 'view/view',
        menuView : "view/menu-view",
        agentSet : "view/agent-set"
    },
    shim : {
        'bootstrap': {
            deps: ['jquery']
        },
        "jqueryForm": {
            deps: ["jquery"]
        }
    }
});
define(["jquery","bootstrap","jqueryForm","util","api","view","menuView"]);