<template>
  <div class="app-container">
    <el-row>

      <el-button type="primary" @click="dialogNewHuman = true">新增</el-button>
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

      <div class ="el-col-24">
        <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :default-sort = "{prop: 'number',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
          <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
          <el-table-column prop="number" label="編號" width='140%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
          <el-table-column prop="name" label="姓名" width='140%'  sortable :sort-method = "(a,b)=>{return a.name - b.name}"></el-table-column>
          <el-table-column prop="birth" label="生日" width='140%'  sortable :sort-method = "(a,b)=>a.birth.localeCompare(b.birth)"></el-table-column>
          <el-table-column prop="id" label="身分證" width='140%'  sortable :sort-method = "(a,b)=>a.id.localeCompare(b.id)"></el-table-column>
          <el-table-column prop="phone" label="電話" width='140%' sortable :sort-method = "(a,b)=>a.phone.localeCompare(b.phone)"></el-table-column>
          <el-table-column prop="mail" label="信箱"></el-table-column>
          <el-table-column prop="entryDate" label="入職日期" width='140%' sortable :sort-method = "(a,b) =>a.entryDate.localeCompare(b.entryDate)"></el-table-column>
          <el-table-column prop="quitDate" label="離職日期" width='140%' sortable :sort-method = "(a,b) =>a.quitDate.localeCompare(b.quitDate)"></el-table-column>
          <el-table-column prop="active" label="是否在職" width='120%' sortable :sort-method = "(a,b) =>a.active.localeCompare(b.active)"></el-table-column>
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
      form:{},
    }
  },
  created() {
    
  },
  methods: {
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



