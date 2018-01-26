"use strict"
define("restful-api/adapters/rest",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default.RESTAdapter.extend({})}),define("restful-api/app",["exports","restful-api/resolver","ember-load-initializers","restful-api/config/environment"],function(e,t,n,r){Object.defineProperty(e,"__esModule",{value:!0})
var i=Ember.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:t.default});(0,n.default)(i,r.default.modulePrefix),e.default=i}),define("restful-api/components/rest-adapter-url",["exports","ember-inflector","restful-api/utils/restful-helper"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({modelName:"",modelNameToUse:Ember.computed("modelName",function(){return this.get("modelName")||"example"}),httpMethod:Ember.computed("model",function(){return this.get("model.method")}),urlFormat:Ember.computed("model","modelNameToUse",function(){var e=Ember.getOwner(this).lookup("adapter:rest"),t=this.get("model"),r=-1!==t.conditions.indexOf("id");(0,n.filterPossibles)([]).forEach(function(t){console.log(t.type,t.conditions.join(","),e.buildURL("example",-1!==t.conditions.indexOf("id")?"ID":void 0,null,t.type,null)+(t.params?t.params:""))})
var i=e.buildURL(this.get("modelNameToUse"),r?"ID":void 0,null,t.type,null)
return t.params&&(i+=t.params),i}),requestBody:Ember.computed("model","modelNameToUse",function(){var e=this.get("model.request"),n=Ember.getOwner(this).lookup("serializer:-rest")
if(e){var r=n.payloadKeyFromModelName(this.get("modelNameToUse"))
return e.replace("MODELNAMEs",(0,t.pluralize)(r)).replace("MODELNAME",r)}return""}),responseBody:Ember.computed("model","modelNameToUse",function(){var e=this.get("model.response"),n=Ember.getOwner(this).lookup("serializer:-rest")
if(e){var r=n.payloadKeyFromModelName(this.get("modelNameToUse"))
return e.replace("MODELNAMEs",(0,t.pluralize)(r)).replace("MODELNAME",r)}return""})})}),define("restful-api/components/restapi-condition-picker",["exports","restful-api/utils/restful-helper"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n={0:"首先请判断接口的操作类型",1:"接口可能影响多条记录还是只会影响单条记录",2:"能明确的提供所要操作的记录iD吗"}
e.default=Ember.Component.extend({possibleConditions:Ember.computed("selectedConditions.[]","possibles.[]",function(){var e=this.get("level")
return this.get("possibles").reduce(function(t,n){var r=n.conditions[e]
return-1===t.indexOf(r)&&r&&t.push(r),t},[])}),level:Ember.computed.readOnly("selectedConditions.length"),levelTips:Ember.computed("level","result",function(){return this.get("result")?"以下是根据你提供的信息给出的接口规范":n[this.get("level")]}),selectedConditions:Ember.computed(function(){return[]}),possibles:Ember.computed("selectedConditions.[]",function(){return(0,t.filterPossibles)(this.get("selectedConditions"))}),possiblesObserver:Ember.observer("possibles.[]",function(){var e=this.get("possibles")
1===e.length&&this.done(e[0])}),restAdapterMethodDoc:Ember.computed("result.type",function(){return"http://devdocs.io/ember/classes/ds.restadapter/methods#"+this.get("result.type")}),done:function(e){this.set("result",e)},actions:{selectCondition:function(e){this.get("selectedConditions").addObject(e)},reset:function(){this.set("selectedConditions",[]),this.set("result",null)}}})}),define("restful-api/helpers/app-version",["exports","restful-api/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=i
var r=t.default.APP.version
function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return t.hideSha?r.match(n.versionRegExp)[0]:t.hideVersion?r.match(n.shaRegExp)[0]:r}e.default=Ember.Helper.helper(i)}),define("restful-api/helpers/condition-lang",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.conditionLang=n
var t={create:'<span style="color: red;">确定</span>是<span style="color: red;">创建</span>新记录的接口',delete:'<span style="color: red;">确定</span>是<span style="color: red;">删除</span>已有记录的接口',edit:"不是另外三项，可能是编辑接口",get:'<span style="color: red;">确定</span>是<span style="color: red;">单纯读取</span>已有记录的接口',single:'<span style="color: red;">确定</span>是操作<span style="color: red;">单条记录</span>的接口',multi:"可能会操作多条记录",all:'<span style="color: red;">确定</span>要获取<span style="color: red;">所有</span>记录',id:'<span style="color: red;">确定</span>能提供将要<span style="color: red;">被操作记录的ID</span>',noid:"可能不能提供ID"}
function n(e){return t[e[0]]}e.default=Ember.Helper.helper(n)}),define("restful-api/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("restful-api/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("restful-api/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","restful-api/config/environment"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0})
var r=void 0,i=void 0
n.default.APP&&(r=n.default.APP.name,i=n.default.APP.version),e.default={name:"App Version",initialize:(0,t.default)(r,i)}}),define("restful-api/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("restful-api/initializers/data-adapter",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("restful-api/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("restful-api/initializers/export-application-global",["exports","restful-api/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var r,i=t.default.exportApplicationGlobal
r="string"==typeof i?i:Ember.String.classify(t.default.modulePrefix),n[r]||(n[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[r]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default={name:"export-application-global",initialize:n}}),define("restful-api/initializers/injectStore",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("restful-api/initializers/store",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("restful-api/initializers/transforms",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"transforms",before:"store",initialize:function(){}}}),define("restful-api/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("restful-api/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("restful-api/router",["exports","restful-api/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("restful")}),e.default=n}),define("restful-api/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({actions:{didTransition:function(){return this.replaceWith("restful"),!0}}})}),define("restful-api/routes/restful",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({})}),define("restful-api/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("restful-api/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"6Af1XlJu",block:'{"symbols":[],"statements":[[1,[18,"outlet"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"restful-api/templates/application.hbs"}})}),define("restful-api/templates/components/rest-adapter-url",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"hoi4q9w2",block:'{"symbols":[],"statements":[[6,"span"],[9,"style","color: blue;"],[7],[1,[18,"httpMethod"],false],[8],[0,"\\n"],[6,"span"],[9,"style","color: blue;"],[7],[1,[18,"urlFormat"],false],[8],[0,"\\n"],[6,"div"],[7],[0,"\\n    "],[6,"p"],[7],[0,"request body:"],[8],[0,"\\n    "],[6,"pre"],[9,"style","color: blue;"],[7],[1,[18,"requestBody"],false],[8],[0,"\\n"],[8],[0,"\\n\\n"],[6,"div"],[7],[0,"\\n    "],[6,"p"],[7],[0,"response body:"],[8],[0,"\\n    "],[6,"pre"],[9,"style","color: blue;"],[7],[1,[18,"responseBody"],false],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"restful-api/templates/components/rest-adapter-url.hbs"}})}),define("restful-api/templates/components/restapi-condition-picker",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"6B7u41xt",block:'{"symbols":["condition","condition"],"statements":[[6,"div"],[7],[0,"\\n    "],[6,"p"],[7],[0,"\\n        此工具是为了方便前后端开发和对接 REST api 接口，提供一种对接口的分析思路.\\n    "],[8],[0,"\\n    "],[6,"p"],[7],[0,"\\n        最多判断三个条件来决定接口的具体类型：C|U|R|D？ single|multi？ id|noid？\\n    "],[8],[0,"\\n    "],[6,"p"],[7],[0,"\\n        基本所有类型接口都能通过这几个条件来分类。\\n    "],[8],[0,"\\n"],[8],[0,"\\n"],[6,"div"],[7],[0,"\\n    "],[6,"div"],[7],[0,"\\n        "],[1,[18,"levelTips"],false],[0," "],[6,"button"],[3,"action",[[19,0,[]],"reset"]],[7],[0,"reset"],[8],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[7],[0,"\\n        "],[6,"ul"],[7],[0,"\\n"],[4,"each",[[20,["possibleConditions"]]],null,{"statements":[[0,"            "],[6,"li"],[9,"style","margin-bottom: 5px;"],[3,"action",[[19,0,[]],"selectCondition",[19,2,[]]]],[7],[6,"button"],[7],[1,[25,"condition-lang",[[19,2,[]]],null],true],[8],[8],[0,"\\n"]],"parameters":[2]},null],[0,"        "],[8],[0,"\\n    "],[8],[0,"\\n"],[8],[0,"\\n\\n"],[6,"div"],[7],[0,"\\n    API parameters:\\n\\n    "],[6,"p"],[7],[0,"\\n"],[4,"each",[[20,["selectedConditions"]]],null,{"statements":[[0,"            "],[6,"span"],[9,"style","color: red"],[7],[1,[19,1,[]],false],[8],[0,"\\n"]],"parameters":[1]},null],[0,"\\n        "],[1,[25,"input",null,[["type","value","placeholder"],["text",[20,["modelName"]],"可以在此输入模型名"]]],false],[0,"\\n    "],[8],[0,"\\n\\n"],[4,"if",[[20,["result"]]],null,{"statements":[[0,"        "],[6,"p"],[7],[0,"\\n            Emberjs adapter method:\\n            "],[6,"a"],[10,"href",[26,[[18,"restAdapterMethodDoc"]]]],[9,"target","_blank"],[7],[6,"span"],[9,"style","color: red;"],[7],[1,[20,["result","type"]],false],[8],[8],[0,"\\n        "],[8],[0,"\\n\\n        "],[6,"p"],[7],[0,"\\n            Url format: "],[1,[25,"rest-adapter-url",null,[["model","modelName"],[[20,["result"]],[20,["modelName"]]]]],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"restful-api/templates/components/restapi-condition-picker.hbs"}})}),define("restful-api/templates/restful",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"D76NvAPN",block:'{"symbols":[],"statements":[[1,[18,"restapi-condition-picker"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"restful-api/templates/restful.hbs"}})}),define("restful-api/utils/restful-helper",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.getFlattedPossibles=function(){return i},e.filterPossibles=function(e,t){var n=e.join("-")
return(t=t||i).filter(function(e){return 0===e.conditions.join("-").indexOf(n)})}
var t='{\n    "MODELNAME": {\n        ...attrubutes\n    }\n}',n='{\n    "MODELNAME": {\n        "id": "uniq-id",\n        ...attrubutes\n    }\n}',r='{\n    "MODELNAMEs": [\n        {\n            "id": "uniq-id",\n            ...attrubutes\n        }\n    ]\n}',i=[{type:"createRecord",conditions:["create","single"],method:"POST",request:t,response:n},{type:"query",conditions:["create","multi"],method:"POST",params:"?params",response:r},{type:"query",conditions:["delete","multi"],method:"DELETE",params:"?ids[]=&params",response:'{\n    "MODELNAMEs": []\n}'},{type:"query",conditions:["edit","multi"],method:"PUT|PATCH",params:"?ids[]=&params",request:t,response:r},{type:"query",conditions:["get","multi","noid"],method:"GET",params:"?params",response:r},{type:"queryRecord",conditions:["delete","single","noid"],method:"DELETE",params:"?params",response:"TODO"},{type:"queryRecord",conditions:["edit","single","noid"],method:"PUT|PATCH",params:"?params",request:t,response:n},{type:"queryRecord",conditions:["get","single","noid"],method:"GET",params:"?params",response:n},{type:"deleteRecord",conditions:["delete","single","id"],method:"DELETE",response:"204 no content"},{type:"updateRecord",conditions:["edit","single","id"],method:"PUT|PATCH",request:t,response:n},{type:"findAll",conditions:["get","all"],method:"GET",response:r},{type:"findMany",conditions:["get","multi","id"],method:"GET",params:"?ids[]=",response:r},{type:"findRecord",conditions:["get","single","id"],method:"GET",response:n}]}),define("restful-api/config/environment",[],function(){try{var e="restful-api/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(unescape(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(t){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("restful-api/app").default.create({name:"restful-api",version:"0.0.0+a36c9070"})
