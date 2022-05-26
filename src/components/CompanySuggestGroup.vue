<template>
  <div class="app-container">
    
    <CompanySearchOption @searchChildEvent="search" ref="child"></CompanySearchOption>

    <div class ="el-col-24">
      <el-table v-loading="listLoading" show-summary :summary-method="getSummaries" :data="itemData" style="width: 100%" :row-class-name="tableRowClassName" empty-text="沒有資料">

        <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='140%' sortable :sort-method = "(a,b)=>{return a.number - b.number}"></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='120%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='120%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="company" label="公司名稱"  sortable :sort-method = "(a,b)=>a.company.localeCompare(b.company)"></el-table-column>
        <el-table-column prop="people" label="代表人" sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="payDetailCompany" label="廠商" ></el-table-column>
        <el-table-column prop="item" label="品項" sortable :sort-method = "(a,b)=>{return a.phone - b.phone}"></el-table-column>
        <el-table-column prop="pay" label="支出" width='80%'></el-table-column>
        <el-table-column prop="payDate" label="付款日期" width='120%' sortable :sort-method = "(a,b) =>a.payDate.localeCompare(b.payDate)"></el-table-column>
        <el-table-column prop="dl1" label="第一筆DL" width='120%' ></el-table-column>
        <el-table-column prop="dlpay1" label="第一筆金額" width='120%' ></el-table-column>
        <el-table-column prop="dl2" label="第二筆DL" width='120%' ></el-table-column>
        <el-table-column prop="dlpay2" label="第二筆金額" width='120%' ></el-table-column>
        <el-table-column prop="" label="編輯" width='60%'>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" >編輯</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
  </div>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import CompanySearchOption from '@/components/CompanySearchOption.vue'

export default {
  components: {
    CompanySearchOption
  },
  
  data() {
    return {
      listLoading: false,
      itemData:[],
      company:'',
      payTotal:0,
    }
  },
  created() {
    
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '總共';
          return;
        }
        if(column.label == '支出'||column.label == '第一筆金額'||column.label == '第二筆金額'){
          const values = data.map(item => parseInt(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = parseInt(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            
          }
        }else{
          sums[index] = '';
        }
        
      });

      return sums;
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 1) {
        return 'color-row';
      }
      return '';
    },
    search() {
      this.listLoading = true
      let ref
      let priceInsufficient = 0
      let startDate 
      let endDate
      let dateLength
      let month

      if(this.$refs.child.month != ''&&this.$refs.child.month != null){
        ref = db.collection(this.$refs.child.month+'G');
        this.itemData.splice(0,this.itemData.length) //用splice清空 就無須reverse刷新dom

        ref.where('payDetailCompany','array-contains',this.$refs.child.company).get().then((querySnapshot => { //資料編排改變後 客服需改變
          querySnapshot.forEach(doc => {  
            for(let j=0;j<doc.data().payDetailCompany.length;j++){
              if(doc.data().payDetailCompany[j] == this.$refs.child.company){
                this.itemData.push({
                  ...doc.data(),
                  'payDetailCompany':doc.data().payDetailCompany[j],
                  'item':doc.data().payDetailItem[j],
                  'pay':doc.data().payDetailPay[j],
                  'payDate':doc.data().payDetailPayDate[j],
                  'dl1':doc.data().payDetailDl1[j],
                  'dlpay1':doc.data().payDetailDlPay1[j],
                  'dl2':doc.data().payDetailDl2[j],
                  'dlpay2':doc.data().payDetailDlPay2[j],
                })
              }
            }
          }); 
        }));
      }else if(this.$refs.child.date != ''&&this.$refs.child.date != null){
        month = moment(this.$refs.child.date[0]).format('YYYY-MM')
        startDate = moment(this.$refs.child.date[0]);
        endDate = moment(this.$refs.child.date[1]);
        dateLength = endDate.diff(startDate, 'days')+1;
        this.itemData.splice(0,this.itemData.length) //用splice清空 就無須reverse刷新dom

        for(let j=0;j<18;j++){ //先往後搜尋18個月
          ref = db.collection(month+'G');
            ref.where('payDetailCompany','array-contains',this.$refs.child.company).get().then((querySnapshot => { //廠商相符
              querySnapshot.forEach(doc => {  
                startDate = this.$refs.child.date[0] //初始日期
                for(let i=0;i<dateLength;i++){ //付款日期長度
                  for(let j=0;j<doc.data().payDetailCompany.length;j++){
                    if(doc.data().payDetailPayDate[j] == startDate && doc.data().payDetailCompany[j] == this.$refs.child.company){ //付款日期相符
                      this.itemData.push({
                        ...doc.data(),
                        'payDetailCompany':doc.data().payDetailCompany[j],
                        'item':doc.data().payDetailItem[j],
                        'pay':doc.data().payDetailPay[j],
                        'payDate':doc.data().payDetailPayDate[j],
                        'dl1':doc.data().payDetailDl1[j],
                        'dlpay1':doc.data().payDetailDlPay1[j],
                        'dl2':doc.data().payDetailDl2[j],
                        'dlpay2':doc.data().payDetailDlPay2[j],
                      })
                    }
                  }
                  startDate = moment(startDate).add(1,'days').format('YYYY-MM-DD')
                }
              }); 
            }));
          month = moment(month).add(1,'months').format('YYYY-MM')
        }
      } 
      this.listLoading = false
    },
    edit(row){
      let editChildEvent = {'number':row.number,'depDate':moment(row.depDate).format('YYYY-MM')}
      this.$emit("editChildEvent", editChildEvent);
    }
  },
  mounted(){
    
  }
}
</script>



