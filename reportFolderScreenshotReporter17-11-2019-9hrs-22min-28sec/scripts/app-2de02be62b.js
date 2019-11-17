/******/!function(n){function t(s){if(e[s])return e[s].exports;var a=e[s]={exports:{},id:s,loaded:!1};return n[s].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}// webpackBootstrap
/******/
var e={};return t.m=n,t.c=e,t.p="",t(0)}([function(n,t,e){"use strict";var s=e(1),a=e(2),o=e(3),i=e(4),l=e(5),r=e(6),c=e(7),p=e(8),d=e(9),u=e(10),g=e(11),f=e(12);angular.module("reporter",["ngTouch","ngSanitize","ui.router","ui.bootstrap","ngStorage","angularUtils.directives.dirPagination","angular.filter"]).constant("moment",moment).config(s.config).config(a.routerConfig).run(o.runBlock).component("spec",r.SpecComponent).component("expectations",l.ExpectationComponent).component("log",d.LogComponent).component("logs",p.LogsComponent).component("speclogs",c.SpecLogsComponent).component("screenshots",u.ScreenshotComponent).component("dump",g.DumpComponent).component("header",f.HeaderComponent).controller("MainController",i.MainController)},function(n,t){"use strict";function e(n){"ngInject";n.debugEnabled(!0)}e.$inject=["$logProvider"],Object.defineProperty(t,"__esModule",{value:!0}),t.config=e},function(n,t){"use strict";function e(n,t){"ngInject";n.state("app",{"abstract":!0,views:{"":{templateUrl:"app/abstract/abstract.html",controller:"MainController",controllerAs:"main"},"menu@app":{templateUrl:"app/abstract/menu.html"}}}).state("app.welcome",{url:"/welcome",views:{jumbotron:{templateUrl:"app/welcome/jumbotron.html"},content:{templateUrl:"app/welcome/content.html"}}}).state("app.report",{"abstract":!0,url:"/report",views:{"jumbotron@app":{templateUrl:"app/abstract/filtering.html"}}}).state("app.report.screenshots",{url:"/screenshots",views:{subfiltering:{templateUrl:"app/screenshots/subfiltering.html"},"content@app":{templateUrl:"app/screenshots/content.html"}}}).state("app.report.console",{url:"/console",views:{subfiltering:{templateUrl:"app/console/subfiltering.html"},"content@app":{templateUrl:"app/console/content.html"}}}),t.otherwise("/welcome")}e.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(t,"__esModule",{value:!0}),t.routerConfig=e},function(n,t){"use strict";function e(n,t){"ngInject";t.$on("$stateChangeStart",function(t,e,s,a,o){n.debug("$stateChangeStart to "+e.to+"- fired when the transition begins. toState,toParams : \n",e,s)}),t.$on("$stateChangeError",function(t,e,s,a,o){n.debug("$stateChangeError - fired when an error occurs during transition."),n.debug(arguments)}),t.$on("$stateChangeSuccess",function(t,e,s,a,o){n.debug("$stateChangeSuccess to "+e.name+"- fired once the state transition is complete.")}),t.$on("$viewContentLoaded",function(t){n.debug("$viewContentLoaded - fired after dom rendered",t)}),t.$on("$stateNotFound",function(t,e,s,a){n.debug("$stateNotFound "+e.to+"  - fired when a state cannot be found by its name."),n.debug(e,s,a)})}e.$inject=["$log","$rootScope"],Object.defineProperty(t,"__esModule",{value:!0}),t.runBlock=e},function(n,t){"use strict";function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function n(n,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,s.key,s)}}return function(t,e,s){return e&&n(t.prototype,e),s&&n(t,s),t}}();t.MainController=function(){function n(t,s){"ngInject";e(this,n),this.data=t,this.addParentReferences(this.data.tests),this.storage=s,this.storage.$default({filtering:this.getDefaultConfiguration()}),this.filtering=this.storage.filtering}return n.$inject=["data","$sessionStorage"],s(n,[{key:"addParentReferences",value:function(n){if(n)for(var t=0;t<n.length;t++){var e=n[t];if(e.failedExpectations)for(var s=0;s<e.failedExpectations.length;s++){var a=e.failedExpectations[s];if(a.logs)for(var o=0;o<a.logs.length;o++){var i=a.logs[o];i.test=e,i.exp=a}}if(e.passedExpectations)for(var l=0;l<e.passedExpectations.length;l++){var r=e.passedExpectations[l];if(r.logs)for(var c=0;c<r.logs.length;c++){var p=r.logs[c];p.test=e,p.exp=r}}}return n}},{key:"getDefaultConfiguration",value:function(){return{expand:!1,show:"failed",showPassed:!1,showFailed:!0,showStack:!1,showLogs:!0,showDumps:!1,showSpecScreenshots:!1,showScreenshots:!0,perPage:30,excludeList:[],logFilter:"severe"}}},{key:"reset",value:function(){this.storage.$reset({filtering:this.getDefaultConfiguration()}),this.filtering=this.storage.filtering}}]),n}()},function(n,t){"use strict";function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function n(n,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,s.key,s)}}return function(t,e,s){return e&&n(t.prototype,e),s&&n(t,s),t}}(),a=function(){function n(t,s){"ngInject";var a=this;e(this,n),this.highlight="spec",this.exclude="node_modules",this.$onInit=function(){t.$watch(function(){return a.spec.filtering.showStack},function(n){a.showStack=n,s.debug("showStack = ",n)}),a.setup(t,s)}}return n.$inject=["$scope","$log"],s(n,[{key:"setup",value:function(n,t){var e=this;this.failed()&&n.$watch(function(){return e.spec.showFailed},function(n){e.show=n,t.debug("showFailed = ",n)}),this.passed()&&n.$watch(function(){return e.spec.showPassed},function(n){e.show=n,t.debug("showPassed = ",n)})}},{key:"filterStackTraces",value:function(n){if(n){if(!this.exclude)return n;for(var t=n.split("\n"),e=[],s=1;s<t.length;s++)-1===t[s].indexOf(this.exclude)&&e.push(t[s]);return e.join("\n")}}},{key:"failed",value:function(){return"failed"===this.type}},{key:"passed",value:function(){return"passed"===this.type}}]),n}();t.ExpectationComponent={templateUrl:"app/components/expectation/expectation.html",bindings:{model:"<",type:"@"},controller:a,require:{spec:"^spec"}}},function(n,t){"use strict";function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function a(n){"ngInject";var t=this;e(this,a),this.$onInit=function(){n.$watch(function(){return t.filtering.expand},function(n){t.expand=n}),n.$watch(function(){return t.filtering.showFailed},function(n){t.showFailed=n}),n.$watch(function(){return t.filtering.showPassed},function(n){t.showPassed=n}),n.$watch(function(){return t.filtering.showSpecScreenshots},function(n){t.showSpecScreenshots=n})}};s.$inject=["$scope"];t.SpecComponent={templateUrl:"app/components/spec/spec.html",bindings:{test:"<",filtering:"<"},controller:s}},function(n,t){"use strict";function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function a(n){"ngInject";var t=this;e(this,a),this.$onInit=function(){n.$watch(function(){return t.spec.filtering.showLogs},function(n){t.showLogs=n}),n.$watch(function(){return t.spec.filtering.logFilter},function(n){t.filter=n})}};s.$inject=["$scope"];t.SpecLogsComponent={bindings:{model:"<"},require:{spec:"^^spec"},templateUrl:"app/components/spec/logs/spec-logs.html",controller:s}},function(n,t){"use strict";function e(n){if(Array.isArray(n)){for(var t=0,e=Array(n.length);t<n.length;t++)e[t]=n[t];return e}return Array.from(n)}function s(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function n(n,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,s.key,s)}}return function(t,e,s){return e&&n(t.prototype,e),s&&n(t,s),t}}(),o=function(){function n(t,e,a){"ngInject";var o=this;s(this,n),this.$log=e,this.$filter=a,this.$onInit=function(){t.$watch(function(){return o.model?o.model.length:0},function(n){n&&(o.logs=o.getLogs(o.model))})}}return n.$inject=["$scope","$log","$filter"],a(n,[{key:"getLogs",value:function(n){var t=[];if(n)for(var s=0;s<n.length;s++){var a=n[s];if(a.failedExpectations)for(var o=0;o<a.failedExpectations.length;o++){var i=a.failedExpectations[o];i.logs&&i.logs.length>0&&t.push.apply(t,e(i.logs))}if(a.passedExpectations)for(var l=0;l<a.passedExpectations.length;l++){var r=a.passedExpectations[l];r.logs&&r.logs.length>0&&t.push.apply(t,e(r.logs))}}return t}},{key:"getColor",value:function(n){if(!n||!n.level)return"";switch(n.level.toUpperCase()){case"INFO":return"list-group-item-info";case"WARNING":return"list-group-item-warning";case"SEVERE":case"ERROR":return"list-group-item-danger";case"DEBUG":default:return""}}},{key:"omit",value:function(){function n(n){try{var t=angular.fromJson(n.message),e=t.message;if(e)return e.message=e.text,e}catch(s){return n}}var t=this;return function(e){if(t.filtering.exclude){var s=t.$filter("filter")([e],t.filtering.exclude);if(s.length>0)return!0}var a=!0,o=!1,i=void 0;try{for(var l,r=t.filtering.excludeList[Symbol.iterator]();!(a=(l=r.next()).done);a=!0){var c=l.value;if(e.message==c.message)return!0;if(n(e).message==c.message)return!0}}catch(p){o=!0,i=p}finally{try{!a&&r["return"]&&r["return"]()}finally{if(o)throw i}}return!1}}}]),n}();t.LogsComponent={bindings:{model:"<",filtering:"="},templateUrl:"app/components/logs/logs.html",controller:o}},function(n,t){"use strict";function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function n(n,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,s.key,s)}}return function(t,e,s){return e&&n(t.prototype,e),s&&n(t,s),t}}(),a=function(){function n(t){"ngInject";e(this,n),this.$log=t,this.log=this.extract(this.model),this.color=this.getColor()}return n.$inject=["$log"],s(n,[{key:"getColor",value:function(){switch(this.log.level.toUpperCase()){case"INFO":return"text-info";case"WARNING":return"text-warning";case"SEVERE":case"ERROR":return"text-danger";case"DEBUG":return"text-muted";default:return""}}},{key:"extract",value:function(n){try{var t=angular.fromJson(n.message),e=t.message;if(e)return e.message=e.text,e}catch(s){return n}}},{key:"exclude",value:function(){this.filtering.excludeList.push(this.log)}}]),n}();t.LogComponent={bindings:{model:"<",filtering:"=?",noToolbar:"@?"},templateUrl:"app/components/log/log.html",controller:a}},function(n,t){"use strict";function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function a(n){"ngInject";var t=this;e(this,a),this.show=!0,this.$onInit=function(){n.$watch(function(){return t.spec.filtering.showScreenshots},function(n){t.show=n})}};s.$inject=["$scope"];t.ScreenshotComponent={bindings:{screenshots:"<model",htmls:"<model2"},require:{spec:"^spec"},templateUrl:"app/components/screenshot/screenshot.html",controller:s}},function(n,t){"use strict";function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function a(n,t){"ngInject";var s=this;e(this,a),this.$onInit=function(){n.$watch(function(){return s.spec.filtering.showDumps},function(n){s.showDump=n,t.debug("showDump = ",n)})}};s.$inject=["$scope","$log"];t.DumpComponent={templateUrl:"app/components/dump/dump.html",bindings:{model:"<"},controller:s,require:{spec:"^spec"}}},function(n,t){"use strict";function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function n(n,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,s.key,s)}}return function(t,e,s){return e&&n(t.prototype,e),s&&n(t,s),t}}(),a=function(){function n(){"ngInject";e(this,n)}return s(n,[{key:"title",value:function(){return this.model&&this.model.commit?this.model.commit.split("\n",1)[0]:void 0}}]),n}();t.HeaderComponent={bindings:{model:"<"},templateUrl:"app/components/header/header.html",controller:a}}]),angular.module("reporter").run(["$templateCache",function(n){n.put("app/abstract/abstract.html",'\n<div class=container>\n  <div ui-view=menu></div>\n  <div class=jumbotron>\n    <header model=main.data.ci></header>\n    <div ui-view=jumbotron></div>\n  </div>\n  <div class=row>\n    <div ui-view=content></div>\n  </div>\n  <div class=row>\n    <div class=col-md-12>\n      <div class="text-center center-block"><br><br><br><br>\n        <hr> <a href=https://github.com/azachar/screenshoter-report-analyzer>Screenshoter Report Analyzer</a> <span class=text-muted> (c) 2016-2018 Andrej Zachar, License MIT.</span> <span class=text-muted>Powered by </span> <a href=https://github.com/azachar/protractor-screenshoter-plugin/ >protractor-screenshoter-plugin</a>.<br><br>\n        <iframe src="https://ghbtns.com/github-btn.html?user=azachar&amp;repo=protractor-screenshoter-plugin&amp;type=star&amp;count=true&amp;size=large" frameborder=0 scrolling=0 width=160px height=30px></iframe>\n      </div>\n    </div>\n  </div>\n</div>'),n.put("app/abstract/filtering.html",'\n<div class=row>\n  <div class=col-md-12>\n    <h4>Filtering</h4>\n  </div>\n  <div class="col-md-10 col-sm-12">\n    <div class=btn-toolbar>\n      <div class=btn-group>\n        <button ng-model=main.filtering.show uib-btn-radio="" class="btn btn-primary"> <i class="fa fa-bars"></i> <span>All</span></button>\n      </div>\n      <div class=btn-group> \n        <button ng-if=main.data.stat.passed ng-model=main.filtering.show uib-btn-radio="\'passed\'" class="btn btn-success"> <i class="fa fa-check"></i> <span>Passed ({{::main.data.stat.passed}})</span></button>\n        <button ng-if=main.data.stat.failed ng-model=main.filtering.show uib-btn-radio="\'failed\'" class="btn btn-danger"><i class="fa fa-close"></i>  <span>Failed ({{::main.data.stat.failed}})</span></button>\n        <button ng-if=main.data.stat.pending ng-model=main.filtering.show uib-btn-radio="\'pending\'" class="btn btn-info"> <i class="fa fa-pencil"></i>  <span>Pending ({{::main.data.stat.pending}})</span></button>\n        <button ng-if=main.data.stat.disabled ng-model=main.filtering.show uib-btn-radio="\'disabled\'" class="btn btn-default"> <i class="fa fa-ban"></i>  <span>Disabled ({{::main.data.stat.disabled}})</span></button>\n      </div>\n    </div>\n  </div>\n  <div class="col-md-2 col-sm-12">\n    <div class=pull-right> <span>Showing</span>  <strong>{{filtered.length}}</strong>  <span>{{main.filtering.show}}</span></div>\n  </div>\n  <div class=col-md-12>\n    <div ui-view=subfiltering></div>\n  </div>\n</div>'),n.put("app/abstract/menu.html",'\n<nav class="navbar navbar-default">\n  <div class=container-fluid>\n    <div class=navbar-header><a href=/ class=navbar-brand> <img src=assets/logo.svg title="logo created by Vectors Market from the Noun Project" class=pull-left><span class=pull-right>Screenshoter Report Analyzer</span></a>\n      <button type=button data-toggle=collapse data-target=#navbar aria-expanded=false aria-controls=navbar class="navbar-toggle collapsed"><span class=sr-only>Toggle navigation</span>               <span class=icon-bar></span>               <span class=icon-bar></span>               <span class=icon-bar></span></button>             \n    </div>           \n    <div id=navbar class="navbar-collapse collapse">\n      <ul class="nav navbar-nav">\n        <li ui-sref-active=active><a ui-sref=app.welcome>Home</a></li>               \n        <li ui-sref-active=active><a ui-sref=app.report.screenshots>Screenshots report</a></li>               \n        <li ui-sref-active=active><a ui-sref=app.report.console>Console report</a></li>\n      </ul>\n      <ul class="nav navbar-nav">\n        <li>\n          <p class=navbar-text>\n            <iframe src="https://ghbtns.com/github-btn.html?user=azachar&amp;repo=protractor-screenshoter-plugin&amp;type=star&amp;count=true&amp;size=normal" frameborder=0 scrolling=0 width=160px height=30px></iframe>\n          </p>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>'),n.put("app/console/content.html",'\n<div class=col-md-12>\n  <logs model="main.data.tests | filter:{status:main.filtering.show}" filtering=main.filtering></logs>\n</div>'),n.put("app/console/subfiltering.html",'\n<p>\n  </p><div class=btn-toolbar>\n    <div class=btn-group>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="" class="btn btn-xs btn-success"> <span>All</span></button>\n    </div>\n    <div class=btn-group>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'DEBUG\'" class="btn btn-xs btn-default"> <span>Debug</span></button>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'INFO\'" class="btn btn-xs btn-info"> <span>Info</span></button>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'WARN\'" class="btn btn-xs btn-warning"> <span>Warning</span></button>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'SEVERE\'" class="btn btn-xs btn-danger"> <span>Severe</span></button>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'ERROR\'" class="btn btn-xs btn-danger"> <span>Error</span></button>\n    </div>\n  </div>\n<p></p>\n<h2>Showing {{main.filtering.logFilter}}    </h2>'),n.put("app/screenshots/content.html",'\n<div dir-paginate="t in main.data.tests | filter:{status:main.filtering.show} | itemsPerPage: main.filtering.perPage" class=col-md-12>\n  <spec test=t filtering=main.filtering></spec>\n</div>\n<div class=col-md-12>\n  <p>\n    </p><hr>\n    <div class=text-center>\n      <dir-pagination-controls></dir-pagination-controls>\n    </div>\n  <p></p>\n</div>'),n.put("app/screenshots/subfiltering.html",'\n<p>\n  </p><div class=btn-toolbar>\n    <div class=btn-group>\n      <button ng-model=main.filtering.expand uib-btn-checkbox class="btn btn-sm btn-info"> <i ng-class="main.filtering.expand ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa></i> <span>Expand all</span></button>\n    </div>\n    <div class=btn-group>\n      <button ng-model=main.filtering.showScreenshots uib-btn-checkbox class="btn btn-sm btn-primary"> <i ng-class="main.filtering.showScreenshots ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa></i> <span>Show screenshots</span></button>\n      <button ng-model=main.filtering.showPassed uib-btn-checkbox class="btn btn-sm btn-success"> <i ng-class="main.filtering.showPassed ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa></i> <span>Show passed expectations</span></button>\n      <button ng-model=main.filtering.showFailed uib-btn-checkbox class="btn btn-sm btn-danger"> <i ng-class="main.filtering.showFailed ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa></i> <span>Show failed expectations </span></button>\n    </div>\n    <div class=btn-group>\n      <button ng-model=main.filtering.showSpecScreenshots uib-btn-checkbox class="btn btn-sm btn-default"> <i ng-class="main.filtering.showSpecScreenshots ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa></i> <span>Show after spec done screenshots</span></button>\n    </div>\n  </div>\n<p></p>\n<p>\n  </p><hr>\n<p></p>\n<p>\n  </p><div class=btn-toolbar>\n    <div class=btn-group>\n      <button ng-model=main.filtering.showStack uib-btn-checkbox class="btn btn-xs btn-warning"> <i ng-class="main.filtering.showStack ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa></i> <span>Show protractor stack </span></button>\n      <button ng-model=main.filtering.showLogs uib-btn-checkbox class="btn btn-xs btn-default"> <i ng-class="main.filtering.showLogs ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa></i> <span>Show browsers logs</span></button>\n      <button ng-model=main.filtering.showDumps uib-btn-checkbox class="btn btn-xs btn-info"> <i ng-class="main.filtering.showDumps ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa></i> <span>Show attached dumps</span></button>\n    </div>\n    <div class=btn-group>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="" class="btn btn-xs btn-success"> <span>All</span></button>\n    </div>\n    <div class=btn-group>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'DEBUG\'" class="btn btn-xs btn-default"> <span>Debug</span></button>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'INFO\'" class="btn btn-xs btn-info"> <span>Info</span></button>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'WARN\'" class="btn btn-xs btn-warning"> <span>Warning</span></button>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'SEVERE\'" class="btn btn-xs btn-danger"> <span>Severe</span></button>\n      <button ng-model=main.filtering.logFilter ng-disabled=!main.filtering.showLogs uib-btn-radio="\'ERROR\'" class="btn btn-xs btn-danger"> <span>Error</span></button>\n    </div>\n  </div>\n<p></p>'),n.put("app/welcome/content.html","\n<div class=container><a ui-sref=app.report.screenshots>\n    <uib-progress max=main.data.tests.length>\n      <uib-bar value=main.data.stat.passed type=success></uib-bar>\n      <uib-bar value=main.data.stat.failed type=danger></uib-bar>\n      <uib-bar value=main.data.stat.pending type=info></uib-bar>\n      <uib-bar value=main.data.stat.disabled type=muted></uib-bar>\n    </uib-progress></a></div>\n<div class=text-center>\n  <h3>{{main.data.ci.name}}  Build Information </h3>\n  <div class=row>\n    <div class=col-md-2></div>\n    <div class=col-md-8>\n      <pre>{{main.data.ci.commit || 'N/A'}}</pre>\n    </div>\n    <div class=col-md-2></div>\n    <div class=col-md-6>\n      <h5> <a ng-href={{main.data.ci.url}}><span>Number: {{main.data.ci.build || 'N/A'}}</span></a></h5>\n      <h5>Branch: {{main.data.ci.branch || 'N/A'}}</h5>\n    </div>\n    <div class=col-md-6>\n      <h5>TAG: {{main.data.ci.tag || 'N/A'}}</h5>\n      <h5>SHA: {{main.data.ci.sha || 'N/A'}}</h5>\n    </div>\n  </div>\n  <h3>Reports</h3>\n  <div class=btn-group><a ui-sref=app.report.screenshots class=\"btn btn-info\">Screenshots centric</a><a ui-sref=app.report.console class=\"btn btn-danger\">Console centric</a></div>\n</div>"),n.put("app/welcome/jumbotron.html",'\n<p> <span class=pull-left> <span>Total tests </span> <strong>{{::main.data.tests.length}}</strong>  <span ng-if=main.data.stat.passed class=text-success> |  <span>Passed {{::main.data.stat.passed}}</span> <i class="fa fa-check"></i></span><span ng-if=main.data.stat.failed class=text-danger> |  <span>Failed {{::main.data.stat.failed}}</span>  <i class="fa fa-close"></i></span><span ng-if=main.data.stat.pending class=text-info> |  <span>Pending {{::main.data.stat.pending}}</span>  <i class="fa fa-pencil"></i></span><span ng-if=main.data.stat.disabled> |  <span>Disabled {{::main.data.stat.disabled}}</span>  <i class="fa fa-ban"></i></span></span><span class=pull-right> <i class="fa fa-clock-o"></i>  <span>Generated on </span><strong>{{::main.data.generatedOn | date:\'medium\'}}</strong></span></p>'),n.put("app/components/dump/dump.html",'\n<div ng-if=$ctrl.model>\n  <p><br>\n    <button ng-model=$ctrl.showDump uib-btn-checkbox class="btn btn-info"> <i class="fa fa-file-text"></i> <span>Show attached dump</span></button>\n    </p><div ng-if=$ctrl.showDump>\n      <p>\n        </p><h5>Dump</h5>\n        <pre class=text-info><code>{{::$ctrl.model}}</code></pre>\n      <p></p>\n    </div>\n  <p></p>\n</div>'),n.put("app/components/expectation/expectation.html",'\n<div ng-if="$ctrl.show &amp;&amp; $ctrl.model.length &gt; 0">\n  <h3 ng-if=$ctrl.passed()>Passed Expectations</h3>\n  <h3 ng-if=$ctrl.failed()>Failed Expectations</h3>\n  <div ng-repeat="exp in $ctrl.model | reverse" class=well>\n    <h4 ng-if=$ctrl.passed() class=text-success><i class="fa fa-check"></i> <strong title=actual>{{::exp.actual}}</strong> <strong class=text-primary><i>{{::exp.matcherName}}</i></strong> <strong title=Expected>{{::exp.expected}}</strong> <i class=text-primary>=</i> <strong>{{::exp.message}}</strong> <span class="pull-right text-info"><i class="fa fa-clock-o"></i> <strong>{{::exp.when | date:\'H:mm:ss:sss\'}}</strong></span></h4>\n    <h4 ng-if=$ctrl.failed() class=text-danger> <i class="fa fa-exclamation"></i> <span>{{::exp.message}}</span> <span class="pull-right text-info"><i class="fa fa-clock-o"></i> <strong>{{::exp.when | date:\'H:mm:ss:sss\'}} </strong></span></h4>\n    <screenshots model=exp.screenshots model2=exp.htmls></screenshots>\n    <speclogs model=exp.logs></speclogs>\n    <div ng-if=exp.stack>\n      <div class=row>\n        <div class=col-md-4>\n          <button ng-model=$ctrl.showStack uib-btn-checkbox class="btn btn-warning"> <i class="fa fa-stack-overflow"></i> <span>Show protractor stack</span></button>\n        </div>\n        <div ng-if=$ctrl.showStack class=col-md-4>\n          <div class=form-group>\n            <input ng-model=$ctrl.highlight placeholder=highlight class=form-control>\n          </div>\n        </div>\n        <div ng-if=$ctrl.showStack class=col-md-4>\n          <div class=form-group>\n            <input ng-model=$ctrl.exclude placeholder=exclude class=form-control>\n          </div>\n        </div>\n      </div>\n      <div ng-if=$ctrl.showStack>\n        <p>\n          </p><h5>Protractor\'s log:</h5>\n          <pre class=text-danger><code class=highlight> <span ng-bind-html="$ctrl.filterStackTraces(exp.stack) | uibTypeaheadHighlight:$ctrl.highlight"></span></code></pre>\n        <p></p>\n      </div>\n    </div>\n    <dump model=exp.dump></dump>\n  </div>\n</div>'),n.put("app/components/header/header.html","\n<div ng-if=$ctrl.model.build>\n  <h2><span title=commit><i class=\"fa fa-envelope-o\"></i> <span>{{$ctrl.title() || 'N/A commit message'}}</span></span></h2>\n  <h3> <span title=branch class=pull-left><i class=\"fa fa-leaf\"></i> <span>{{$ctrl.model.branch || 'N/A branch'}}</span></span><span title=build class=pull-right><a ng-href={{$ctrl.model.url}}><span><i class=\"fa fa-building\"></i> <code>{{$ctrl.model.build || 'N/A build'}}</code></span></a></span></h3><br>\n  <hr>\n</div>\n<div ng-if=!$ctrl.model.build>\n  <h2>Screenshoter Local Report</h2>\n</div>"),n.put("app/components/log/log.html",'<span class={{$ctrl.color}}><strong class=text-uppercase>{{::$ctrl.log.level}}</strong> <code class="highlight {{$ctrl.color}}"><span ng-bind-html="$ctrl.log.message | uibTypeaheadHighlight:$ctrl.filtering.search"></span></code> <small><i>{{::$ctrl.log.timestamp | date:\'shortTime\'}}</i></small> <a ng-if=!$ctrl.noToolbar ng-click=$ctrl.exclude() class="btn btn-xs btn-danger"><i class="fa fa-ban"></i> <span>Exclude same</span></a><a ng-if=$ctrl.log.stack ng-model=$ctrl.more uib-btn-checkbox class="btn btn-xs btn-default"><i class="fa fa-plus"></i> <span>show stack</span></a>\n  <div ng-if=$ctrl.more class=text-muted>\n    <ul>\n      <li ng-repeat="frame in $ctrl.log.stack.callFrames"><strong>{{::frame.functionName}}</strong> <span>{{::frame.url}}@{{frame.lineNumber}}:{{frame.columnNumber}}</span></li>\n    </ul>\n  </div></span>'),n.put("app/components/logs/logs.html",'\n<h3>Total {{$ctrl.logs.length}}  Console {{$ctrl.filtering.logFilter}} logs {{$ctrl.filtering.show}}</h3>\n<div ng-if=$ctrl.filtering.excludeList.length&gt;0>\n  <h4>Duplicated (excluded)</h4>\n  <ul>\n    <li ng-repeat="log in $ctrl.filtering.excludeList">\n      <log model=log no-toolbar=true></log>\n    </li>\n  </ul>\n  <button ng-click="$ctrl.filtering.excludeList.length=0" class="btn btn-defaul">Clear</button>\n</div>\n<h4>\n  Console logs\n   <small class=text-info>{{::$ctrl.filtering.logFilter}}</small>\n</h4>\n<div class=row>\n  <div class=col-md-4>\n    <div class=form-group>\n      <input ng-model=$ctrl.filtering.exclude placeholder=exclude ng-model-options="{ debounce: 1000 }" class=form-control>\n    </div>\n    <div class=form-group>\n      <input ng-model=$ctrl.filtering.search placeholder=search ng-model-options="{ debounce: 1000 }" class=form-control>\n    </div>\n  </div>\n  <div class=col-md-4><br><br>\n    <div class=text-center><small>\n        <dir-pagination-controls></dir-pagination-controls></small></div>\n  </div>\n  <div class=col-md-3></div>\n  <div class=col-md-1>\n    <div class=form-group>\n      <label>Results per page</label>\n      <input ng-model=$ctrl.filtering.perPage placeholder="results per page" ng-model-options="{ debounce: 1000 }" class=form-control>\n    </div>\n  </div>\n</div>\n<p>   \n  </p><hr>\n  <ul dir-paginate="browserAndLogs in $ctrl.logs | itemsPerPage:$ctrl.filtering.perPage" class=list-group>\n    <li ng-repeat="log in browserAndLogs.logs |  filter:$ctrl.filtering.search  | filter:{level:$ctrl.filtering.logFilter} | omit:$ctrl.omit()" class="list-group-item {{::$ctrl.getColor(log)}}">\n      <log model=log filtering=$ctrl.filtering></log> <span title="Browser name" class=badge>{{::browserAndLogs.browser}}</span> \n      <div class=btn-group> <a ng-model=showEnclosedSpec uib-btn-checkbox class="btn btn-xs btn-info"> <span>Show spec</span></a>\n      </div>\n      <p>\n        </p><div ng-if=showEnclosedSpec class=well>\n          <spec test=browserAndLogs.test filtering=$ctrl.filtering></spec>\n        </div>\n      <p></p>\n    </li>\n  </ul>\n<p></p>\n<p>\n  </p><hr>\n  <div class=text-center>\n    <dir-pagination-controls></dir-pagination-controls>\n  </div>\n<p></p>'),n.put("app/components/screenshot/screenshot.html",'\n<div class=row>\n  <div ng-repeat="s in $ctrl.screenshots" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">\n    <div class=thumbnail>\n      <div ng-click="$ctrl.show=!$ctrl.show" class="caption text-center">\n        <h4 title="Browser name"> <span>{{::s.browser}}</span> <small title="The screenshot was taken on">{{::s.when | date:\'mediumTime\'}}</small></h4>\n      </div><a href={{::s.img}} ng-if=$ctrl.show target=blank><img ng-src={{::s.img}} title="{{::s.when | date:&quot;mediumTime&quot;}}"></a>\n      <div ng-if=$ctrl.htmls[$index].file class=text-center><a href={{::$ctrl.htmls[$index].file}} target=_blank class="btn btn-info"> <i class="fa fa-code"></i> <span>Open HTML</span></a></div>\n    </div>\n  </div>\n</div>'),n.put("app/components/spec/spec.html",'\n<div ng-class="{&quot;panel-danger&quot;: $ctrl.test.status === &quot;failed&quot;, &quot;panel-success&quot;: $ctrl.test.status == &quot;passed&quot;, &quot;panel-default&quot;: $ctrl.test.status == &quot;disabled&quot;, &quot;panel-info&quot;: $ctrl.test.status == &quot;pending&quot; }" class=panel> \n  <div ng-model=$ctrl.expand uib-btn-checkbox class=panel-heading>\n    <h3><i ng-class="{&quot;fa-close&quot;: $ctrl.test.status === &quot;failed&quot;, &quot;fa-check&quot;: $ctrl.test.status == &quot;passed&quot;, &quot;fa-pencil&quot;: $ctrl.test.status == &quot;pending&quot;, &quot;fa-ban&quot;: $ctrl.test.status == &quot;disabled&quot; }" class=fa></i> <span>{{::$ctrl.test.description}} </span> <small>({{::$ctrl.test.id}})</small> <small class=pull-right>{{::$ctrl.test.duration}}</small></h3><span>{{::$ctrl.test.pendingReason}}</span><span>{{::$ctrl.test.failedExpectations[0].message | limitTo:150}}</span>\n  </div>\n  <div ng-if=$ctrl.expand class=panel-footer>\n    <div class=row>\n      <div class="col-md-6 text-success"> <i class="fa fa-check"></i> <span>Passed </span> <strong>{{::$ctrl.test.passedExpectations.length}}</strong> \n        <button ng-model=$ctrl.showPassed uib-btn-checkbox class="btn btn-xs btn-success"> <span>Show passed</span> <i ng-class="$ctrl.showPassed ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa></i></button>\n      </div>\n      <div class="col-md-6 text-danger">\n        <div class=pull-right><i class="fa fa-exclamation"></i> <span>Failed </span> <strong>{{::$ctrl.test.failedExpectations.length}}</strong> \n          <button ng-model=$ctrl.showFailed uib-btn-checkbox class="btn btn-xs btn-danger"> <span>Show failed </span> <i ng-class="$ctrl.showFailed ? &quot;fa-toggle-on&quot; : &quot;fa-toggle-off&quot;" class=fa> </i></button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div ng-if=$ctrl.expand class=panel-body> \n    <p class=lead>{{::$ctrl.test.fullName}}</p>\n    <div class=row>\n      <div class=col-md-12>\n        <expectations model=$ctrl.test.failedExpectations type=failed></expectations>\n      </div>\n      <div class=col-md-12>\n        <expectations model=$ctrl.test.passedExpectations type=passed></expectations>\n      </div>\n    </div>\n    <div ng-if="$ctrl.showSpecScreenshots &amp;&amp; $ctrl.test.specScreenshots.length &gt; 0" class=row>\n      <div ng-class="{&quot;text-danger&quot;: $ctrl.test.status === &quot;failed&quot;, &quot;text-success&quot;: $ctrl.test.status === &quot;passed&quot;}" class=col-md-12>\n        <hr>\n        <h3>Spec Screenshots</h3>\n        <p>{{::$ctrl.test.message}}</p>\n      </div>\n      <div class=col-md-6>\n        <screenshots model=$ctrl.test.specScreenshots model2=$ctrl.test.specHtmls></screenshots>\n      </div>\n      <div class=col-md-6>\n        <speclogs model=$ctrl.test.specLogs></speclogs>\n      </div>\n      <div class=col-md-12>\n        <dump model=$ctrl.test.specDump class=spec-dump></dump>\n      </div>\n    </div>\n  </div>\n  <div ng-if=$ctrl.expand class=panel-footer>\n    <div class=row>\n      <div class=col-md-3><span>Start</span> <strong>{{::$ctrl.test.start | date:\'mediumTime\'}}</strong></div>\n      <div class=col-md-3>\n        <div class=text-center><span>End</span> <strong>{{::$ctrl.test.end | date:\'mediumTime\'}}</strong></div>\n      </div>\n      <div class=col-md-3>\n        <div class=text-center><span>Jasmine Timeout</span> <strong>{{::$ctrl.test.timeout}} ms </strong></div>\n      </div>\n      <div class=col-md-3>\n        <div class=pull-right><span>Elapsed Time</span> <strong>{{::$ctrl.test.diff}} ms </strong></div>\n      </div>\n    </div>\n  </div>\n</div>'),
n.put("app/components/spec/logs/spec-logs.html",'\n<div ng-if=$ctrl.model.length&gt;0> \n  <button ng-model=$ctrl.showLogs uib-btn-checkbox class="btn btn-warning"> <i class="fa fa-stack-overflow"></i> <span>Show browsers logs</span></button>\n  <div ng-if=$ctrl.showLogs>\n    <p>\n      </p><div class=btn-toolbar>\n        <div class=btn-group>\n          <button ng-model=$ctrl.filter uib-btn-radio="" class="btn btn-xs btn-success"> <span>All</span></button>\n        </div>\n        <div class=btn-group>\n          <button ng-model=$ctrl.filter uib-btn-radio="\'DEBUG\'" class="btn btn-xs btn-default"> <span>Debug</span></button>\n          <button ng-model=$ctrl.filter uib-btn-radio="\'INFO\'" class="btn btn-xs btn-info"> <span>Info</span></button>\n          <button ng-model=$ctrl.filter uib-btn-radio="\'WARN\'" class="btn btn-xs btn-warning"> <span>Warning</span></button>\n          <button ng-model=$ctrl.filter uib-btn-radio="\'SEVERE\'" class="btn btn-xs btn-danger"> <span>Severe</span></button>\n          <button ng-model=$ctrl.filter uib-btn-radio="\'ERROR\'" class="btn btn-xs btn-danger"> <span>Error</span></button>\n        </div>\n      </div>\n      <p>\n        </p><div class=row>\n          <div ng-repeat="i in $ctrl.model" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">\n            <div class=text-center>\n              <h4 title="Browser name">{{::i.browser}}</h4>\n            </div>\n            <ul>\n              <li ng-repeat="log in i.logs | filter:{level:$ctrl.filter} as filtered">\n                <log model=log no-toolbar=true></log>\n              </li>\n            </ul>\n          </div>\n        </div>\n      <p></p>\n    <p></p>\n  </div>\n</div>')}]);
//# sourceMappingURL=../maps/scripts/app-2de02be62b.js.map
