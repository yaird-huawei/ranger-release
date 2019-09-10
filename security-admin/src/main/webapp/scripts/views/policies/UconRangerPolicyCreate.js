
/* 
 * Policy create view
 */

define(function(require){
    'use strict';

	var Backbone		= require('backbone');
	var App				= require('App');
	var XAEnums			= require('utils/XAEnums');
	var XAUtil			= require('utils/XAUtils');
	var XALinks 		= require('modules/XALinks');
	var localization	= require('utils/XALangSupport');
	
	var RangerPolicycreateTmpl = require('hbs!tmpl/policies/RangerPolicyCreate_tmpl');
	var RangerPolicyForm = require('views/policies/UconRangerPolicyForm');
	var RangerServiceDef	= require('models/RangerServiceDef');
	var Vent			 = require('modules/Vent');

	var RangerPolicyCreate = Backbone.Marionette.Layout.extend(
	/** @lends RangerPolicyCreate */
	{
		_viewName : 'RangerPolicyCreate',
		
    	template : RangerPolicycreateTmpl,
    	templateHelpers : function(){
                var infoMsg = '', displayClass = 'hide', policyTimeStatus = '', expiredClass = 'hide';
		if(XAUtil.isMaskingPolicy(this.model.get('policyType'))){
			if(XAUtil.isTagBasedDef(this.rangerServiceDefModel)){
				infoMsg = localization.tt('msg.maskingPolicyInfoMsgForTagBased'), displayClass = 'show';	
			}else{
				infoMsg = localization.tt('msg.maskingPolicyInfoMsg'), displayClass = 'show';
			}
		}else if(XAUtil.isRowFilterPolicy(this.model.get('policyType'))){
			infoMsg = localization.tt('msg.rowFilterPolicyInfoMsg'), displayClass = 'show';
		}
        if(this.editPolicy && !_.isEmpty(this.model.get('validitySchedules'))){
            if(XAUtil.isPolicyExpierd(this.model)){
                policyTimeStatus = localization.tt('msg.policyExpired'), expiredClass = 'show';
            }else{
                expiredClass = 'hide';
            }
                }
    		return {
			editPolicy : this.editPolicy,
			infoMsg : infoMsg,
                        displayClass : displayClass,
                        policyTimeStatus : policyTimeStatus,
                        expiredClass : expiredClass
    		};
    	},
    	breadCrumbs :function(){
    		var name  = 'ServiceManager';

    		if(this.rangerServiceDefModel.get('name') == XAEnums.ServiceType.SERVICE_TAG.label){
    		    name = 'TagBasedServiceManager';
    		}
    		else if(this.rangerServiceDefModel.get('name').includes(XAEnums.ServiceType.SERVICE_UCON.label)){
    		    name = 'UconServiceManager';
    		}

    		if(this.model.isNew()){
    			return [XALinks.get(name),XALinks.get('ManagePolicies',{model : this.rangerService}),XALinks.get('PolicyCreate')];
    		} else {
    			return [XALinks.get(name),XALinks.get('ManagePolicies',{model : this.rangerService}),XALinks.get('PolicyEdit')];
    		}
    	} ,        

		/** Layout sub regions */
    	regions: {
			'rForm' :'div[data-id="r_form"]'
		},

    	/** ui selector cache */
    	ui: {
			'btnSave'	: '[data-id="save"]',
			'btnCancel' : '[data-id="cancel"]',
			'btnDelete' : '[data-id="delete"]',
			'policyDisabledAlert' : '[data-id="policyDisabledAlert"]' 
		},

		/** ui events hash */
		events: function() {
			var events = {};
			events['click ' + this.ui.btnSave]		= 'onSave';
			events['click ' + this.ui.btnCancel]	= 'onCancel';
			events['click ' + this.ui.btnDelete]	= 'onDelete';
			
			return events;
		},

    	/**
		* intialize a new RangerPolicyCreate Layout 
		* @constructs
		*/
		initialize: function(options) {
			var that = this;
			console.log("initialized a UconRangerPolicyCreate Layout");

			_.extend(this, _.pick(options, 'rangerService'));
			this.initializeServiceDef();

			that.form = new RangerPolicyForm({
				template : require('hbs!tmpl/policies/UconRangerPolicyForm_tmpl'),
				model : this.model,
				rangerServiceDefModel : this.rangerServiceDefModel,
				rangerService : this.rangerService,
			});


			this.editPolicy = this.model.has('id') ? true : false;
			this.bindEvents();
			this.params = {};
		},
		initializeServiceDef : function(){
			
			this.rangerServiceDefModel	= new RangerServiceDef();
			this.rangerServiceDefModel.url = XAUtil.getRangerServiceDef(this.rangerService.get('type'));
			this.rangerServiceDefModel.fetch({
				cache : false,
				async : false
			});
		},

		/** all events binding here */
		bindEvents : function(){
			/*this.listenTo(this.model, "change:foo", this.modelChanged, this);*/
			/*this.listenTo(communicator.vent,'someView:someEvent', this.someEventHandler, this)'*/
		},

		/** on render callback */
		onRender: function() {
			XAUtil.showAlerForDisabledPolicy(this);
			this.rForm.show(this.form);
			this.rForm.$el.dirtyFields();
			XAUtil.preventNavigation(localization.tt('dialogMsg.preventNavPolicyForm'),this.rForm.$el);
		},
		popupCallBack : function(msg,validateObj){
			if(XAUtil.isMaskingPolicy(this.model.get('policyType'))){
				msg = msg.replace('permission','access type')
			}
			XAUtil.alertPopup({
				msg :msg,
			});
		},
		onSave: function(){
			var errors = this.form.commit({validate : false});
			if(! _.isEmpty(errors)){
				return;
			}

			//validate policyItems in the policy

			this.saveMethod();
		},
		saveMethod : function(){
			var that = this;
			XAUtil.blockUI();

            if(XAUtil.isUconPolicy(this.model.get("policyType")) && this.editPolicy == false){
                this.model.url = this.rangerService.get('configs').ucon_policymgr_external_url + 'service/plugins/policies/';
            }

			this.model.save({},{
				wait: true,
				success: function () {
					XAUtil.blockUI('unblock');
					var msg = that.editPolicy ? 'Policy updated successfully' :'Policy created successfully';
					XAUtil.notifySuccess('Success', msg);
					XAUtil.allowNavigation();
					App.appRouter.navigate("#!/service/"+that.rangerService.id+"/policies/"+ that.model.get('policyType'),{trigger: true});
				},
				error : function(model, response, options) {
					XAUtil.blockUI('unblock');
					var msg = that.editPolicy ? 'Error updating policy.': 'Error creating policy.';
					if (response && response.responseJSON && response.responseJSON.msgDesc) {
						XAUtil.showErrorMsg(response.responseJSON.msgDesc);
					} else {
						XAUtil.notifyError('Error', msg);
					}
				}
			});
		},
		onCancel : function(){
			XAUtil.allowNavigation();
			App.appRouter.navigate("#!/service/"+this.rangerService.id+"/policies/"+ this.model.get('policyType'),{trigger: true});

		},
		onDelete :function(){
			var that = this;
			XAUtil.confirmPopup({
				msg :'Are you sure want to delete ?',
				callback : function(){
					XAUtil.blockUI();
					that.model.destroy({
						success: function(model, response) {
							XAUtil.blockUI('unblock');
							XAUtil.allowNavigation();
							XAUtil.notifySuccess('Success', localization.tt('msg.policyDeleteMsg'));
							App.appRouter.navigate("#!/service/"+that.rangerService.id+"/policies/"+ that.model.get('policyType'),{trigger: true});
						},
						error: function (model, response, options) {
							XAUtil.blockUI('unblock');
							if (response && response.responseJSON && response.responseJSON.msgDesc){
								    XAUtil.notifyError('Error', response.responseJSON.msgDesc);
							} else {
							    	XAUtil.notifyError('Error', 'Error deleting Policy!');
							}
						}
					});
				}
			});
		},
		/** on close */
		onClose: function(){
			XAUtil.allowNavigation();
            XAUtil.removeUnwantedDomElement();
		}
	});
	return RangerPolicyCreate;
});
