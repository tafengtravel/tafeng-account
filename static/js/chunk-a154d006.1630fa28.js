(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a154d006"],{"0016":function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"app-container",staticStyle:{"background-color":"#fbf2e6"}},[t("Input",{ref:"child",on:{readChildEvent:e.readParentEvent}})],1)},i=[],o=t("1da1"),a=(t("b64b"),t("96cf"),t("17e1")),c=(t("2a70"),t("c1df")),u=t("1270"),s={name:"new",components:{Input:u["a"]},data:function(){return{}},methods:{readParentEvent:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var t;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(null!=e.$refs.child.ruleForm.depDate&&null!=e.$refs.child.ruleForm.number){r.next=3;break}return e.$message.error("請輸入團號及出發日期"),r.abrupt("return",0);case 3:return t=a["a"].collection(c(e.$refs.child.ruleForm.depDate).format("YYYY-MM")).doc(e.$refs.child.ruleForm.number),r.next=6,t.onSnapshot((function(r){if("undefined"==typeof r.data())return e.$message.error("請輸入正確團號"),0;e.$refs.child.ruleForm=r.data(),e.$refs.child.readNumber=!0,e.$refs.child.createDate=!0,e.$refs.child.submitShow=!0,e.$message.success("讀取成功")}));case 6:e.$refs.child.$forceUpdate();case 7:case"end":return r.stop()}}),r)})))()}},computed:{},mounted:function(){this.$refs.child.adminShow=!1,this.$refs.child.opShow=!1,Object.keys(this.$route.query).length>0&&(this.$refs.child.ruleForm.depDate=this.$route.query.depDate,this.$refs.child.ruleForm.number=this.$route.query.number,this.readParentEvent())}},f=s,l=(t("962b"),t("2877")),d=Object(l["a"])(f,n,i,!1,null,"418a6df8",null);r["default"]=d.exports},1148:function(e,r,t){"use strict";var n=t("a691"),i=t("1d80");e.exports="".repeat||function(e){var r=String(i(this)),t="",o=n(e);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(r+=r))1&o&&(t+=r);return t}},"2a70":function(e,r,t){},3506:function(e,r,t){},"408a":function(e,r,t){var n=t("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=n(e))throw TypeError("Incorrect invocation");return+e}},"962b":function(e,r,t){"use strict";t("3506")},b680:function(e,r,t){"use strict";var n=t("23e7"),i=t("a691"),o=t("408a"),a=t("1148"),c=t("d039"),u=1..toFixed,s=Math.floor,f=function(e,r,t){return 0===r?t:r%2===1?f(e,r-1,t*e):f(e*e,r/2,t)},l=function(e){var r=0,t=e;while(t>=4096)r+=12,t/=4096;while(t>=2)r+=1,t/=2;return r},d=u&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c((function(){u.call({})}));n({target:"Number",proto:!0,forced:d},{toFixed:function(e){var r,t,n,c,u=o(this),d=i(e),h=[0,0,0,0,0,0],m="",p="0",b=function(e,r){var t=-1,n=r;while(++t<6)n+=e*h[t],h[t]=n%1e7,n=s(n/1e7)},w=function(e){var r=6,t=0;while(--r>=0)t+=h[r],h[r]=s(t/e),t=t%e*1e7},v=function(){var e=6,r="";while(--e>=0)if(""!==r||0===e||0!==h[e]){var t=String(h[e]);r=""===r?t:r+a.call("0",7-t.length)+t}return r};if(d<0||d>20)throw RangeError("Incorrect fraction digits");if(u!=u)return"NaN";if(u<=-1e21||u>=1e21)return String(u);if(u<0&&(m="-",u=-u),u>1e-21)if(r=l(u*f(2,69,1))-69,t=r<0?u*f(2,-r,1):u/f(2,r,1),t*=4503599627370496,r=52-r,r>0){b(0,t),n=d;while(n>=7)b(1e7,0),n-=7;b(f(10,n,1),0),n=r-1;while(n>=23)w(1<<23),n-=23;w(1<<n),b(1,1),w(2),p=v()}else b(0,t),b(1<<-r,0),p=v()+a.call("0",d);return d>0?(c=p.length,p=m+(c<=d?"0."+a.call("0",d-c)+p:p.slice(0,c-d)+"."+p.slice(c-d))):p=m+p,p}})}}]);