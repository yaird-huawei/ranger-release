/*
 * Huawei technologies
 */

define(function(require){
    'use strict';

	var Backbone		= require('backbone');
	var XAEnums			= require('utils/XAEnums');
	var localization	= require('utils/XALangSupport');
	var XAUtil			= require('utils/XAUtils');
    
	var VXAuditMap		= require('models/VXAuditMap');
	var VXPermMap		= require('models/VXPermMap');
	var PolicyTimeList 	= require('views/policies/PolicyTimeList');

	var TestUconView 	= require('views/policies/TestUconView');

	var BackboneFormDataType	= require('models/BackboneFormDataType');

	require('backbone-forms.list');
	require('backbone-forms.templates');
	require('backbone-forms');
	require('backbone-forms.XAOverrides');
	require('jquery-ui');
	require('tag-it');

	var RangerPolicyForm = Backbone.Form.extend(
	/** @lends RangerPolicyForm */
	{
		_viewName : 'RangerPolicyForm',

    	/**
		* intialize a new RangerPolicyForm Form View 
		* @constructs
		*/
		templateData : function(){
            var conditionType = 'U-XACML';
			var policyType = XAUtil.enumElementByValue(XAEnums.RangerPolicyType, this.model.get('policyType'));

			return { 'id' : this.model.id,
					'policyType' : policyType.label,
                    'conditionType' : conditionType,
          'policyTimeBtnLabel': (this.model.has('validitySchedules') && this.model.get('validitySchedules').length > 0) ? localization.tt('lbl.editValidityPeriod')
                  : localization.tt('lbl.addValidityPeriod')
				};
		},
		initialize: function(options) {
			console.log("initialized a UconRangerPolicyForm Form View");
			_.extend(this, _.pick(options, 'rangerServiceDefModel', 'rangerService'));
    		Backbone.Form.prototype.initialize.call(this, options);

			this.bindEvents();
			this.defaultValidator={}
		},

		/** all events binding here */
		bindEvents : function(){
			this.on('isAuditEnabled:change', function(form, fieldEditor){
    			this.evAuditChange(form, fieldEditor);
    		});
			this.on('isEnabled:change', function(form, fieldEditor){
				this.evIsEnabledChange(form, fieldEditor);
			});
		},
		ui : {
         'policyTimeBtn'      : '[data-js="policyTimeBtn"]'
		},
		/** fields for the form
		*/
		fields: ['name', 'description', 'isEnabled', 'isAuditEnabled','recursive'],
		schema :function(){
			return this.getSchema();
		},
		getSchema : function(){
			var that = this;
            var basicSchema = ['name','isEnabled','policyPriority','policyLabels'];
			var schemaNames = this.getPolicyBaseFieldNames();

			var formDataType = new BackboneFormDataType();

			var attr1 = _.pick(_.result(this.model,'schemaBase'),basicSchema);
			var attr2 = _.pick(_.result(this.model,'schemaBase'),schemaNames);
			return _.extend(attr1,attr2);
		},
		/** on render callback */
		render: function(options) {
            var that = this;
			Backbone.Form.prototype.render.call(this, options);
			this.renderCustomFields();

			if(!this.model.isNew()){
				this.setUpSwitches();
			}
            this.fields.isEnabled.$el.find('.control-label').removeClass();
			this.fields.name.$el.find('.help-inline').removeClass('help-inline').addClass('help-block margin-left-5')

            this.setPolicyValidityTime();

		},
            setPolicyValidityTime : function(){
              var that = this;
              this.$el.find(this.ui.policyTimeBtn).on('click', function(e){
                  var policyDirtyField = that.model.has('validitySchedules') ? new Backbone.Collection(that.model.get('validitySchedules')) : new Backbone.Collection();
                  policyDirtyField.on('change',function(){
                      that.$el.find('[data-js="policyTimeBtn"]').addClass('dirtyField');
                  });
                  var view = new PolicyTimeList({
                      collection: policyDirtyField,
                      model : that.model
                });
                var modal = new Backbone.BootstrapModal({
                  content	: view,
                  title	: 'Policy Validity Period',
                  okText  :"Save",
                  animate : true,focusOk:false,
                  escape:false,
                  // allowCancel:false,
                  modalOptions:{
                    backdrop: 'static',
                    keyboard: false
                  },
                }).open();

                modal.$el.addClass('modal-policy-time');
                $('body').addClass('hideBodyScroll')
                //To prevent modal being close by click out of modal
                modal.$el.find('.cancel, .close').on('click', function(e){
                  modal._preventClose = false;
                  $('body').removeClass('hideBodyScroll');
                  $('[data-js="policyTimeBtn"]').addClass('dirtyField');
                  $(".datetimepicker").remove();
                });
                modal.$el.find('.ok').on('click', function(e){
                    modal._preventClose = false;
                    $('body').removeClass('hideBodyScroll');
                });
                modal.on('shown', function(a){
                  this.preventClose();
                });
              });
            },

		evAuditChange : function(form, fieldEditor){
			XAUtil.checkDirtyFieldForToggle(fieldEditor.$el);
		},
		evIsEnabledChange : function(form, fieldEditor){
			XAUtil.checkDirtyFieldForToggle(fieldEditor.$el);
		},
		setUpSwitches :function(){
			var that = this;
			this.fields.isAuditEnabled.editor.setValue(this.model.get('isAuditEnabled'));
			this.fields.isEnabled.editor.setValue(this.model.get('isEnabled'));
                    if(this.model.has('policyPriority')){
                        this.fields.policyPriority.editor.setValue(this.model.get('policyPriority') == 1 ? true : false);
                    }
		},
		renderCustomFields: function(){
			var that = this;
            that.$("#yair_container").html(new TestUconView({
                model 	   : that.model,
                headerTitle: "MyTest",
                rangerServiceDefModel : that.rangerServiceDefModel,
                rangerService : that.rangerService,
                rangerPolicyType : that.model.get('policyType')
            }).render().el);

		},
		beforeSave : function(){
        	var that = this, resources = {};

        	if(this.model.has('policyLabels')){
                var policyLabel =[];
                policyLabel= this.model.get('policyLabels').split(',');
                this.model.set('policyLabels', policyLabel);
             }

        	this.model.set('service',this.rangerService.get('name'));
            this.model.set('name', _.escape(this.model.get('name')));
            if(this.model.has('policyPriority')){
                    this.model.set('policyPriority', this.model.get('policyPriority') ? 1 : 0);
            }

            if(this.model.has('dtoPolicy')){
                this.model.set('dtoPolicy', this.model.get('dtoPolicy'));
            }

        },
		getPolicyBaseFieldNames : function(){
                        return ['description','isAuditEnabled'];
		},
	});
	return RangerPolicyForm;
});
