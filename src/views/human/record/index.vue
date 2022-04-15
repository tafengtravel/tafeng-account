<template>
  <div class="app-container">
    <el-row>

      <el-dialog title="基本資料" class = "sub_title" :visible.sync="dialogNewHuman">
        <el-form :model="form" :inline="true" label-position="left" label-width="70px" class="demo-ruleForm">
          <el-row>
            <el-form-item label="編號" label-width="85px">
              <el-input v-model.trim="form.number"></el-input>
            </el-form-item>   
            <el-form-item label="姓名" label-width="85px">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>  
            <el-form-item label="生日" label-width="85px">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="form.birth" style="width: 250px;"></el-date-picker>
            </el-form-item> 
          </el-row>
          <el-row>
            <el-form-item label="身分證" label-width="85px">
              <el-input v-model.trim="form.id" @input="(val) => (form.number = form.number.toUpperCase())"></el-input>
            </el-form-item> 
            <el-form-item label="電話" label-width="85px">
              <el-input v-model.trim="form.phone"></el-input>
            </el-form-item> 
            <el-form-item label="信箱" label-width="85px">
              <el-input v-model.trim="form.mail"></el-input>
            </el-form-item> 
          </el-row>
          <el-row>
            <el-form-item label="入職日期" label-width="85px">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="form.entryDate" style="width: 250px;"></el-date-picker>
            </el-form-item> 
            <el-form-item label="離職日期" label-width="85px">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="form.quitDate" style="width: 250px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否在職" label-width="85px">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogNewHuman = false">取 消</el-button>
          <el-button type="primary" @click="submitHuman">送 出</el-button>
        </span>
      </el-dialog>

      <el-select v-model="nameSearch" placeholder="請選擇" style="width:140px">
        <el-option
          v-for="item in nameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker type="month" value-format="yyyy-MM" placeholder="選擇日期" v-model="monthSearch" style="width: 160px;"></el-date-picker>
      <el-button @click="searchRecord()" type="primary">搜尋</el-button>
      <el-row></el-row>
      <div class ="el-col-24">
        <el-table v-loading="listLoading" :data="itemData" :default-sort = "{prop: 'date',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
          <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
          <el-table-column prop="date" label="日期" width='140%' sortable :sort-method = "(a,b)=>{return a.date - b.date}"></el-table-column>
          <el-table-column prop="week" label="星期" width='140%' sortable :sort-method = "(a,b)=>{return a.date - b.date}"></el-table-column>
          <el-table-column prop="name" label="姓名" sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
          <el-table-column prop="entryTime" label="上班時間" width='140%' sortable :sort-method = "(a,b)=>{return a.entryTime - b.entryTime}"></el-table-column>
          <el-table-column prop="quitTime" label="下班時間" width='140%' sortable :sort-method = "(a,b)=>{return a.quitTime - b.quitTime}"></el-table-column>
          <el-table-column prop="" label="編輯" width='60%'>
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" >編輯</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    
    
  </div>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import { saveAs } from 'file-saver';

export default {
  components: {
    
  },
  
  data() {
    return {
      listLoading: false,
      itemData:[],
      month:'',
      people:'',
      collection:'cs',
      dialogNewHuman:false,
      itemData:[],
      form:[],
      nameOptions: [],
      nameSearch:'',
      monthSearch:moment(new Date()).format('YYYY-MM'),
    }
  },
  created() {
    
  },
  methods: {
    searchRecord(){
      let number
      this.form.forEach((data, index)=>{
        if(data.name == this.nameSearch){
          let ref = db.collection('human-resources').doc(data.number).collection('record')
          ref.where('month','==',this.monthSearch).onSnapshot(querySnapshot => { 
            this.itemData.splice(0,this.itemData.length)//資料編排改變後 客服需改變
            querySnapshot.forEach(doc => {  
              this.itemData.push({...doc.data(),'week':moment(doc.data().date).locale('zh-TW').format('dddd')})
            }); 
          });
        }
      })

      
    },
    readName(){
      let ref = db.collection('human-resources')
      ref.get().then(querySnapshot => { //資料編排改變後 客服需改變
        querySnapshot.forEach(doc => {  
          this.form.push(doc.data())
          this.nameOptions.push({'value':doc.data().name,'label':doc.data().name})
        }); 
      });
    },
    submitHuman(){
      
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 1) {
        return 'color-row';
      }
      return '';
    },
  },
  mounted(){
    this.readName()
  }
}
</script>
<style >

@media (max-width: 768px) {
  .el-date-range-picker {
    width: 258px;
  }
  .el-date-range-picker__content {
    float: none;
  }
}
@media (min-width: 768px){
  .el-dialog {
    width: 70%;
  }
}
@media (max-width: 768px) {
  .el-dialog {
    width: 90%;
  }
}
</style>



