
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
        initialize: function(){
            _.bindAll(this, "changed");
            console.log("initialize sucks.");
        },
        initJsonEditor: function(){

                      var jsonInput2 =    {
                                            "policyId": "kafka-policy-001",
                                            "policyDescription": null,
                                            "ruleCombiningAlgorithm": "urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable",
                                            "version": "1.0",
                                            "target": {
                                              "or": [
                                                {
                                                  "and": [
                                                    {
                                                      "matches": [
                                                        {
                                                          "matchId": "urn:oasis:names:tc:xacml:1.0:function:string-equal",
                                                          "attributeValue": {
                                                            "type": "AttributeValueElementDTO",
                                                            "dataType": "http://www.w3.org/2001/XMLSchema#string",
                                                            "value": "publish"
                                                          },
                                                          "attributeDesignator": {
                                                            "type": "AttributeDesignatorDTO",
                                                            "attributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                                                            "dataType": "http://www.w3.org/2001/XMLSchema#string",
                                                            "issuer": null,
                                                            "mustBePresent": true,
                                                            "category": "urn:oasis:names:tc:xacml:3.0:attribute-category:action"
                                                          },
                                                          "attributeSelector": null
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            "rule": [
                                              {
                                                "ruleId": "Rule_for_internalUsers",
                                                "ruleDescription": null,
                                                "ruleEffect": "Permit",
                                                "target": {
                                                  "or": [
                                                    {
                                                      "and": [
                                                        {
                                                          "matches": [
                                                            {
                                                              "matchId": "urn:oasis:names:tc:xacml:1.0:function:string-regexp-match",
                                                              "attributeValue": {
                                                                "type": "AttributeValueElementDTO",
                                                                "dataType": "http://www.w3.org/2001/XMLSchema#string",
                                                                "value": "ucon-topic-01"
                                                              },
                                                              "attributeDesignator": {
                                                                "type": "AttributeDesignatorDTO",
                                                                "attributeId": "urn:oasis:names:tc:xacml:1.0:resource:resource-id",
                                                                "dataType": "http://www.w3.org/2001/XMLSchema#string",
                                                                "issuer": null,
                                                                "mustBePresent": true,
                                                                "category": "urn:oasis:names:tc:xacml:3.0:attribute-category:resource"
                                                              },
                                                              "attributeSelector": null
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                },
                                                "condition": {
                                                  "expression": {
                                                    "expressionType": {
                                                      "type": "ApplyElementDTO",
                                                      "functionId": "urn:oasis:names:tc:xacml:1.0:function:string-equal",
                                                      "description": null
                                                    },
                                                    "expressions": [
                                                      {
                                                        "expressionType": {
                                                          "type": "ApplyElementDTO",
                                                          "functionId": "urn:oasis:names:tc:xacml:1.0:function:string-one-and-only",
                                                          "description": null
                                                        },
                                                        "expressions": [
                                                          {
                                                            "expressionType": {
                                                              "type": "AttributeDesignatorDTO",
                                                              "attributeId": "http://wso2.org/attribute/roleNames",
                                                              "dataType": "http://www.w3.org/2001/XMLSchema#string",
                                                              "issuer": "default",
                                                              "mustBePresent": true,
                                                              "category": "urn:oasis:names:tc:xacml:1.0:subject-category:access-subject"
                                                            },
                                                            "expressions": []
                                                          }
                                                        ]
                                                      },
                                                      {
                                                        "expressionType": {
                                                          "type": "AttributeValueElementDTO",
                                                          "dataType": "http://www.w3.org/2001/XMLSchema#string",
                                                          "value": "internalUsers"
                                                        },
                                                        "expressions": []
                                                      }
                                                    ]
                                                  }
                                                },
                                                "obligation": []
                                              },
                                              {
                                                "ruleId": "Rule_deny_all",
                                                "ruleDescription": null,
                                                "ruleEffect": "Deny",
                                                "target": null,
                                                "condition": null,
                                                "obligation": []
                                              }
                                            ],
                                            "obligation": []
                                          };

                    var jsonSchema2String = this.model.get('uconSchema');
                    var jsonSchema2 = JSON.parse(jsonSchema2String);


                    var element = this.$('#ucon_editor_holder')[0];
                    jsonEditor.defaults.options.theme = 'bootstrap3'; // jqueryui|bootstrap3|bootstrap2|barebones
                    jsonEditor.defaults.options.iconlib = 'bootstrap3';//foundation3|fontawesome4|fontawesome2||fontawesome3|bootstrap2|jqueryui
//                    jsonEditor.defaults.options.template = 'handlebars';jqueryui

                    var options = {
                    schema: jsonSchema2,
                    keep_oneof_values: false,
                    object_layout: "grid",
                    disable_edit_json: true,
                    disable_properties: true,
                    }
                    var editor = new jsonEditor(element, options);
                    editor.setValue(jsonInput2);
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
