(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41767dd2"],{1148:function(e,r,t){"use strict";var o=t("a691"),n=t("1d80");e.exports="".repeat||function(e){var r=String(n(this)),t="",i=o(e);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(r+=r))1&i&&(t+=r);return t}},"1c9c":function(e,r,t){"use strict";t.r(r);var o=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"app-container",staticStyle:{"background-color":"#fbf2e6"}},[t("InputGroup",{ref:"child",on:{readChildEvent:e.readParentEvent}})],1)},n=[],i=t("1da1"),u=(t("96cf"),t("d81d"),t("b64b"),t("17e1")),c=(t("2a70"),t("c1df")),a=t("cd7e"),l={name:"new",components:{InputGroup:a["a"]},data:function(){return{}},methods:{readParentEvent:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var t;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(null!=e.$refs.child.ruleForm.depDate&&null!=e.$refs.child.ruleForm.number){r.next=3;break}return e.$message.error("請輸入團號及出發日期"),r.abrupt("return",0);case 3:return t=u["a"].collection(c(e.$refs.child.ruleForm.depDate).format("YYYY-MM")+"G").doc(e.$refs.child.ruleForm.number),r.next=6,t.onSnapshot((function(r){if("undefined"==typeof r.data())return e.$message.error("請輸入正確團號"),0;if(e.$refs.child.ruleForm=r.data(),e.$refs.child.submitShow=!0,e.$message.success("讀取成功"),"true"==e.$route.query.transfer&&!e.$refs.child.ruleForm.lock){var t;if("1"==e.$route.query.transferLength)"true"==e.$route.query.transferIncomeDetailCard?t=!0:"false"==e.$route.query.transferIncomeDetailCard&&(t=!1),e.$refs.child.ruleForm.incomeDetailDate.push(e.$route.query.transferIncomeDetailDate),e.$refs.child.ruleForm.incomeDetailItem.push(e.$route.query.transferIncomeDetailItem),e.$refs.child.ruleForm.incomeDetailIncome.push(e.$route.query.transferIncomeDetailIncome),e.$refs.child.ruleForm.incomeDetailType.push(e.$route.query.transferIncomeDetailType),e.$refs.child.ruleForm.incomeDetailCard.push(t),e.$refs.child.ruleForm.incomeDetailReceiveDate.push(e.$route.query.transferIncomeDetailReceiveDate),e.$refs.child.ruleForm.incomeDetailProve.push(e.$route.query.transferIncomeDetailProve),e.$refs.child.ruleForm.incomeDetailOther.push(e.$route.query.transferIncomeDetailOther),e.$refs.child.ruleForm.incomeDetailOpCheck.push(!1),e.$refs.child.ruleForm.incomeDetailAdminCheck.push(!1);else{t=e.$route.query.transferIncomeDetailCard.map((function(e,r,t){return"true"==e||"false"!=e&&void 0}));for(var o=0;o<parseInt(e.$route.query.transferLength);o++)e.$refs.child.ruleForm.incomeDetailDate.push(e.$route.query.transferIncomeDetailDate[o]),e.$refs.child.ruleForm.incomeDetailItem.push(e.$route.query.transferIncomeDetailItem[o]),e.$refs.child.ruleForm.incomeDetailIncome.push(e.$route.query.transferIncomeDetailIncome[o]),e.$refs.child.ruleForm.incomeDetailType.push(e.$route.query.transferIncomeDetailType[o]),e.$refs.child.ruleForm.incomeDetailCard.push(t[o]),e.$refs.child.ruleForm.incomeDetailReceiveDate.push(e.$route.query.transferIncomeDetailReceiveDate[o]),e.$refs.child.ruleForm.incomeDetailProve.push(e.$route.query.transferIncomeDetailProve[o]),e.$refs.child.ruleForm.incomeDetailOther.push(e.$route.query.transferIncomeDetailOther[o]),e.$refs.child.ruleForm.incomeDetailOpCheck.push(!1),e.$refs.child.ruleForm.incomeDetailAdminCheck.push(!1)}e.$refs.child.count(),e.$refs.child.$forceUpdate()}}));case 6:case"end":return r.stop()}}),r)})))()}},computed:{},mounted:function(){this.$refs.child.adminShow=!0,this.$refs.child.opShow=!0,this.$refs.child.createDateDisable=0,Object.keys(this.$route.query).length>0&&(this.$refs.child.ruleForm.depDate=this.$route.query.depDate,this.$refs.child.ruleForm.number=this.$route.query.number,this.readParentEvent())}},s=l,f=(t("a468"),t("2877")),m=Object(f["a"])(s,o,n,!1,null,"fdd6dc0c",null);r["default"]=m.exports},"2a70":function(e,r,t){},"408a":function(e,r,t){var o=t("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=o(e))throw TypeError("Incorrect invocation");return+e}},"53ca":function(e,r,t){"use strict";t.d(r,"a",(function(){return o}));t("a4d3"),t("e01a"),t("d3b7"),t("d28b"),t("3ca3"),t("ddb0");function o(e){return o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}},"865c":function(e,r,t){},a468:function(e,r,t){"use strict";t("865c")},b680:function(e,r,t){"use strict";var o=t("23e7"),n=t("a691"),i=t("408a"),u=t("1148"),c=t("d039"),a=1..toFixed,l=Math.floor,s=function(e,r,t){return 0===r?t:r%2===1?s(e,r-1,t*e):s(e*e,r/2,t)},f=function(e){var r=0,t=e;while(t>=4096)r+=12,t/=4096;while(t>=2)r+=1,t/=2;return r},m=a&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c((function(){a.call({})}));o({target:"Number",proto:!0,forced:m},{toFixed:function(e){var r,t,o,c,a=i(this),m=n(e),d=[0,0,0,0,0,0],h="",p="0",$=function(e,r){var t=-1,o=r;while(++t<6)o+=e*d[t],d[t]=o%1e7,o=l(o/1e7)},y=function(e){var r=6,t=0;while(--r>=0)t+=d[r],d[r]=l(t/e),t=t%e*1e7},D=function(){var e=6,r="";while(--e>=0)if(""!==r||0===e||0!==d[e]){var t=String(d[e]);r=""===r?t:r+u.call("0",7-t.length)+t}return r};if(m<0||m>20)throw RangeError("Incorrect fraction digits");if(a!=a)return"NaN";if(a<=-1e21||a>=1e21)return String(a);if(a<0&&(h="-",a=-a),a>1e-21)if(r=f(a*s(2,69,1))-69,t=r<0?a*s(2,-r,1):a/s(2,r,1),t*=4503599627370496,r=52-r,r>0){$(0,t),o=m;while(o>=7)$(1e7,0),o-=7;$(s(10,o,1),0),o=r-1;while(o>=23)y(1<<23),o-=23;y(1<<o),$(1,1),y(2),p=D()}else $(0,t),$(1<<-r,0),p=D()+u.call("0",m);return m>0?(c=p.length,p=h+(c<=m?"0."+u.call("0",m-c)+p:p.slice(0,c-m)+"."+p.slice(c-m))):p=h+p,p}})},d28b:function(e,r,t){var o=t("746f");o("iterator")},e01a:function(e,r,t){"use strict";var o=t("23e7"),n=t("83ab"),i=t("da84"),u=t("5135"),c=t("861d"),a=t("9bf2").f,l=t("e893"),s=i.Symbol;if(n&&"function"==typeof s&&(!("description"in s.prototype)||void 0!==s().description)){var f={},m=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),r=this instanceof m?new s(e):void 0===e?s():s(e);return""===e&&(f[r]=!0),r};l(m,s);var d=m.prototype=s.prototype;d.constructor=m;var h=d.toString,p="Symbol(test)"==String(s("test")),$=/^Symbol\((.*)\)[^)]+$/;a(d,"description",{configurable:!0,get:function(){var e=c(this)?this.valueOf():this,r=h.call(e);if(u(f,e))return"";var t=p?r.slice(7,-1):r.replace($,"$1");return""===t?void 0:t}}),o({global:!0,forced:!0},{Symbol:m})}}}]);