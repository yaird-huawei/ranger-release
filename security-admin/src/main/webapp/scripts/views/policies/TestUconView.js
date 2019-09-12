
define(function(require){
    'use strict';

	var Backbone		= require('backbone');
	var App				= require('App');
	var XAEnums			= require('utils/XAEnums');
	var XAUtil			= require('utils/XAUtils');
	var XALinks 		= require('modules/XALinks');
	var localization	= require('utils/XALangSupport');
    var jsonEditor      = require('json-editor');
	var RangerServiceDef    = require('models/RangerServiceDef');
	var Vent			    = require('modules/Vent');
	require('jquery-ui');

    var TestUconViewTmpl = require('hbs!tmpl/policies/TestUconView_tmpl');

    var TestUconView = Backbone.Marionette.Layout.extend({

        template : TestUconViewTmpl,
//        ui: {
//            'uconEditorHolder': $("#ucon_editor_holder")
//        },
        initialize: function(options){
        	_.extend(this, _.pick(options, 'rangerServiceDefModel', 'rangerService'));
            _.bindAll(this, "changed");
            console.log("initialize sucks.");
        },
        initJsonEditor: function(){

            var jsonSchema = null;
            var schemaServiceUrl = this.rangerService.get('configs').ucon_policymgr_external_url + "dto/schema"
            $.ajax({
                url : schemaServiceUrl,
                async : false,
                dataType : 'text',
                success : function(data){
                    jsonSchema = JSON.parse(data);
                    console.log(jsonSchema);
                },
            });

            var jsonInput = this.model.get('dtopPolicy');

            var element = this.$('#ucon_editor_holder')[0];
            jsonEditor.defaults.options.theme = 'bootstrap3'; // jqueryui|bootstrap3|bootstrap2|barebones
            jsonEditor.defaults.options.iconlib = 'bootstrap3';//foundation3|fontawesome4|fontawesome2||fontawesome3|bootstrap2|jqueryui
//                    jsonEditor.defaults.options.template = 'handlebars';jqueryui

            var options = {
            schema: jsonSchema,
            keep_oneof_values: false,
            object_layout: "grid",
            disable_edit_json: true,
            disable_properties: true,
            }
            var editor = new jsonEditor(element, options);
            editor.setValue(jsonInput);
        },
        events: {
            "change input": "changed",
            "change select": "changed"
        },
        changed:function (evt) {
           var changed = evt.currentTarget;
           var value = $(evt.currentTarget).val();
           var obj = {};
           obj[changed.id] = value;
           this.model.set(obj);

           this.initJsonEditor();
        },
    });
    return TestUconView;
});
