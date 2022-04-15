<template>
  <div class="app-container">
    <el-row>

      <el-dialog title="編輯" class = "sub_title" :visible.sync="dialogEditRecord">
        <el-form :model="formRecord" :inline="true" label-position="left" label-width="70px" class="demo-ruleForm">
          <el-row>
            <el-form-item label="姓名" label-width="85px">
              <el-input v-model.trim="formRecord.name"></el-input>
            </el-form-item>   
            <el-form-item label="日期" label-width="85px">
              <el-input v-model.trim="formRecord.date"></el-input>
            </el-form-item>  
          </el-row>
          <el-row>
            <el-form-item label="上班時間" label-width="85px">
              <el-input v-model.trim="formRecord.entryTime"></el-input>
            </el-form-item> 
            <el-form-item label="上班鎖定" label-width="85px">
              <el-select v-model="formRecord.entryTimeDisable">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item> 

          </el-row>
          <el-row>
            <el-form-item label="下班時間" label-width="85px">
              <el-input v-model.trim="formRecord.quitTime"></el-input>
            </el-form-item> 
            <el-form-item label="下班鎖定" label-width="85px">
              <el-select v-model="formRecord.quitTimeDisable">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item> 
          </el-row>
        </el-form>
        
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditRecord = false">取 消</el-button>
          <el-button type="primary" @click="submitRecord()">送 出</el-button>
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
              <el-button @click="editRecord(scope.row)" type="text" >編輯</el-button>
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
      dialogEditRecord:false,
      itemData:[],
      formBasic:[],
      formRecord:{},
      nameOptions: [],
      nameSearch:'',
      monthSearch:moment(new Date()).format('YYYY-MM'),
      number:'',//員工編號
    }
  },
  created() {
    
  },
  methods: {
    editRecord(row){
      this.dialogEditRecord = true
      let ref = db.collection('human-resources').doc(this.number).collection('record').doc(row.date)
      ref.onSnapshot(doc => { //資料編排改變後 客服需改變
        this.formRecord = doc.data()
      });
    },
    submitRecord(){
      let ref = db.collection('human-resources').doc(this.number).collection('record').doc(this.formRecord.date)
      ref.set(this.formRecord).then(() => {
        console.log('set data successful');
        this.$message.success('修改成功');
        this.$router.push({ path: '/human/record'})
        this.dialogEditRecord = false
      });
    },
    searchRecord(){
      let number
      this.formBasic.forEach((data, index)=>{
        if(data.name == this.nameSearch){
          this.number = data.number
        }
      })
      let ref = db.collection('human-resources').doc(this.number).collection('record')
      ref.where('month','==',this.monthSearch).onSnapshot(querySnapshot => { 
        this.itemData.splice(0,this.itemData.length)//資料編排改變後 客服需改變
        querySnapshot.forEach(doc => {  
          this.itemData.push({...doc.data(),'week':moment(doc.data().date).locale('zh-TW').format('dddd')})
        }); 
      });
    },
    readName(){
      let ref = db.collection('human-resources')
      ref.get().then(querySnapshot => { //資料編排改變後 客服需改變
        querySnapshot.forEach(doc => {  
          this.formBasic.push(doc.data())
          this.nameOptions.push({'value':doc.data().name,'label':doc.data().name})
        }); 
      });
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
    width: 50%;
  }
}
@media (max-width: 768px) {
  .el-dialog {
    width: 90%;
  }
}
</style>



