(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67a9319d"],{"0bb5":function(a,t,e){"use strict";e.r(t);var l=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("CompanySearchGroup",{ref:"child",on:{editChildEvent:a.edit}})},n=[],o=(e("17e1"),e("2a70"),e("c1df")),r=e("57ec"),i={components:{CompanySearchGroup:r["a"]},data:function(){return{}},created:function(){},methods:{edit:function(a){console.log(a);var t=this.$router.resolve({path:"/admin/edit/group",query:{number:a.number,depDate:o(a.depDate).format("YYYY-MM")}});window.open(t.href,"_blank")}},mounted:function(){}},p=i,d=e("2877"),c=Object(d["a"])(p,l,n,!1,null,null,null);t["default"]=c.exports},"2a70":function(a,t,e){},"57ec":function(a,t,e){"use strict";var l=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"app-container"},[e("CompanySearchOption",{ref:"child",on:{searchChildEvent:a.search}}),e("div",{staticClass:"el-col-24"},[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"show-summary":"","summary-method":a.getSummaries,data:a.itemData,"row-class-name":a.tableRowClassName,"empty-text":"沒有資料"}},[e("el-table-column",{attrs:{type:"index",label:"筆數",width:"75%",fixed:""}}),e("el-table-column",{attrs:{prop:"number",label:"團號",width:"140%",sortable:"","sort-method":function(a,t){return a.number-t.number}}}),e("el-table-column",{attrs:{prop:"depDate",label:"出發日期",width:"120%",sortable:"","sort-method":function(a,t){return a.depDate.localeCompare(t.depDate)}}}),e("el-table-column",{attrs:{prop:"endDate",label:"結束日期",width:"120%",sortable:"","sort-method":function(a,t){return a.endDate.localeCompare(t.endDate)}}}),e("el-table-column",{attrs:{prop:"name",label:"團名",sortable:"","sort-method":function(a,t){return a.name.localeCompare(t.name)}}}),e("el-table-column",{attrs:{prop:"company",label:"公司名稱",sortable:"","sort-method":function(a,t){return a.company.localeCompare(t.company)}}}),e("el-table-column",{attrs:{prop:"people",label:"代表人",sortable:"","sort-method":function(a,t){return a.people.localeCompare(t.people)}}}),e("el-table-column",{attrs:{prop:"payDetailCompany",label:"廠商"}}),e("el-table-column",{attrs:{prop:"item",label:"品項",sortable:"","sort-method":function(a,t){return a.phone-t.phone}}}),e("el-table-column",{attrs:{prop:"pay",label:"支出",width:"80%"}}),e("el-table-column",{attrs:{prop:"payDate",label:"付款日期",width:"120%",sortable:"","sort-method":function(a,t){return a.payDate.localeCompare(t.payDate)}}}),e("el-table-column",{attrs:{prop:"dl1",label:"第一筆DL",width:"120%"}}),e("el-table-column",{attrs:{prop:"dlpay1",label:"第一筆金額",width:"120%"}}),e("el-table-column",{attrs:{prop:"dl2",label:"第二筆DL",width:"120%"}}),e("el-table-column",{attrs:{prop:"dlpay2",label:"第二筆金額",width:"120%"}}),e("el-table-column",{attrs:{prop:"",label:"編輯",width:"60%"},scopedSlots:a._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{type:"text"},on:{click:function(e){return a.edit(t.row)}}},[a._v("編輯")])]}}])})],1)],1)],1)},n=[],o=e("5530"),r=(e("d3b7"),e("159b"),e("d81d"),e("a434"),e("17e1")),i=(e("2a70"),e("c1df")),p=e("d925"),d={components:{CompanySearchOption:p["a"]},data:function(){return{listLoading:!1,itemData:[],company:"",payTotal:0}},created:function(){},methods:{getSummaries:function(a){var t=a.columns,e=a.data,l=[];return t.forEach((function(a,t){if(0!==t)if("支出"==a.label||"第一筆金額"==a.label||"第二筆金額"==a.label){var n=e.map((function(t){return parseInt(t[a.property])}));n.every((function(a){return isNaN(a)}))||(l[t]=n.reduce((function(a,t){var e=parseInt(t);return isNaN(e)?a:a+t}),0))}else l[t]="";else l[t]="總共"})),l},tableRowClassName:function(a){a.row;var t=a.rowIndex;return t%2===1?"color-row":""},search:function(){var a,t=this;this.listLoading=!0;var e,l,n,p;if(""!=this.$refs.child.month&&null!=this.$refs.child.month)a=r["a"].collection(this.$refs.child.month+"G"),this.itemData.splice(0,this.itemData.length),a.where("payDetailCompany","array-contains",this.$refs.child.company).get().then((function(a){a.forEach((function(a){for(var e=0;e<a.data().payDetailCompany.length;e++)a.data().payDetailCompany[e]==t.$refs.child.company&&t.itemData.push(Object(o["a"])(Object(o["a"])({},a.data()),{},{payDetailCompany:a.data().payDetailCompany[e],item:a.data().payDetailItem[e],pay:a.data().payDetailPay[e],payDate:a.data().payDetailPayDate[e],dl1:a.data().payDetailDl1[e],dlpay1:a.data().payDetailDlPay1[e],dl2:a.data().payDetailDl2[e],dlpay2:a.data().payDetailDlPay2[e]}))}))}));else if(""!=this.$refs.child.date&&null!=this.$refs.child.date){p=i(this.$refs.child.date[0]).format("YYYY-MM"),e=i(this.$refs.child.date[0]),l=i(this.$refs.child.date[1]),n=l.diff(e,"days")+1,this.itemData.splice(0,this.itemData.length);for(var d=0;d<18;d++)a=r["a"].collection(p+"G"),a.where("payDetailCompany","array-contains",this.$refs.child.company).get().then((function(a){a.forEach((function(a){e=t.$refs.child.date[0];for(var l=0;l<n;l++){for(var r=0;r<a.data().payDetailCompany.length;r++)a.data().payDetailPayDate[r]==e&&a.data().payDetailCompany[r]==t.$refs.child.company&&t.itemData.push(Object(o["a"])(Object(o["a"])({},a.data()),{},{payDetailCompany:a.data().payDetailCompany[r],item:a.data().payDetailItem[r],pay:a.data().payDetailPay[r],payDate:a.data().payDetailPayDate[r],dl1:a.data().payDetailDl1[r],dlpay1:a.data().payDetailDlPay1[r],dl2:a.data().payDetailDl2[r],dlpay2:a.data().payDetailDlPay2[r]}));e=i(e).add(1,"days").format("YYYY-MM-DD")}}))})),p=i(p).add(1,"months").format("YYYY-MM")}this.listLoading=!1},edit:function(a){var t={number:a.number,depDate:i(a.depDate).format("YYYY-MM")};this.$emit("editChildEvent",t)}},mounted:function(){}},c=d,s=e("2877"),m=Object(s["a"])(c,l,n,!1,null,null,null);t["a"]=m.exports},a434:function(a,t,e){"use strict";var l=e("23e7"),n=e("23cb"),o=e("a691"),r=e("50c4"),i=e("7b0b"),p=e("65f0"),d=e("8418"),c=e("1dde"),s=e("ae40"),m=c("splice"),u=s("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,y=Math.min,f=9007199254740991,b="Maximum allowed length exceeded";l({target:"Array",proto:!0,forced:!m||!u},{splice:function(a,t){var e,l,c,s,m,u,D=i(this),w=r(D.length),C=n(a,w),v=arguments.length;if(0===v?e=l=0:1===v?(e=0,l=w-C):(e=v-2,l=y(h(o(t),0),w-C)),w+e-l>f)throw TypeError(b);for(c=p(D,l),s=0;s<l;s++)m=C+s,m in D&&d(c,s,D[m]);if(c.length=l,e<l){for(s=C;s<w-l;s++)m=s+l,u=s+e,m in D?D[u]=D[m]:delete D[u];for(s=w;s>w-l+e;s--)delete D[s-1]}else if(e>l)for(s=w-l;s>C;s--)m=s+l-1,u=s+e-1,m in D?D[u]=D[m]:delete D[u];for(s=0;s<e;s++)D[s+C]=arguments[s+2];return D.length=w-l+e,c}})}}]);