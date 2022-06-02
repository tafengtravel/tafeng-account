<template>
  <div class="app-container">
    <el-row>

      <el-button type="primary" @click="newHuman">新增</el-button>
      <el-dialog title="基本資料" class = "sub_title" :visible.sync="dialogNewHuman">
        <el-form :model="form" :inline="true" label-position="left" label-width="85px" class="demo-ruleForm">
          <el-row>
            <el-form-item label="編號">
              <el-input v-model.trim="form.number"></el-input>
            </el-form-item>   
          </el-row>
          <el-row>
            <el-form-item label="姓名">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>  
            <el-form-item label="生日">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="form.birth" style="width: 250px;"></el-date-picker>
            </el-form-item> 
            <el-form-item label="身分證">
              <el-input v-model.trim="form.id" @input="(val) => (form.id = form.id.toUpperCase())"></el-input>
            </el-form-item> 
          </el-row>
          <el-row>
            <el-form-item label="代號">
              <el-select v-model="form.cs" placeholder="代號" style="width:250px" >
                <el-option
                  v-for="item in csOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="電話">
              <el-input v-model.trim="form.phone"></el-input>
            </el-form-item> 
            <el-form-item label="信箱">
              <el-input v-model.trim="form.mail"></el-input>
            </el-form-item> 
          </el-row>
          <el-row>
            <el-form-item label="入職日期">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="form.entryDate" style="width: 250px;"></el-date-picker>
            </el-form-item> 
            <el-form-item label="離職日期">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="form.quitDate" style="width: 250px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否在職">
              <el-select v-model="form.active" placeholder="請選擇" style="width: 250px;">
                <el-option label="是" :value= true></el-option>
                <el-option label="否" :value= false></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
        
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogNewHuman = false">取 消</el-button>
          <el-button type="primary" @click="submitHuman">送 出</el-button>  
        </span>
      </el-dialog>

      <div class ="el-col-24">
        <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :default-sort = "{prop: 'active',order: 'descending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
          <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
          <el-table-column prop="number" label="編號" width='100%' sortable :sort-method = "(a,b)=>{return a.number - b.number}"></el-table-column>
          <el-table-column prop="name" label="姓名" width='140%'  sortable :sort-method = "(a,b)=>{return a.name - b.name}"></el-table-column>
          <el-table-column prop="cs" label="代號" width='100%'  sortable :sort-method = "(a,b)=>a.cs.localeCompare(b.cs)"></el-table-column>
          <el-table-column prop="birth" label="生日" width='140%'  sortable :sort-method = "(a,b)=>a.birth.localeCompare(b.birth)"></el-table-column>
          <el-table-column prop="id" label="身分證" width='140%'  sortable :sort-method = "(a,b)=>a.id.localeCompare(b.id)"></el-table-column>
          <el-table-column prop="phone" label="電話" width='140%' sortable :sort-method = "(a,b)=>a.phone.localeCompare(b.phone)"></el-table-column>
          <el-table-column prop="mail" label="信箱" width='300%'></el-table-column>
          <el-table-column prop="entryDate" label="入職日期" width='140%' sortable :sort-method = "(a,b) =>a.entryDate.localeCompare(b.entryDate)"></el-table-column>
          <el-table-column prop="quitDate" label="離職日期" width='140%' sortable :sort-method = "(a,b) =>a.quitDate.localeCompare(b.quitDate)"></el-table-column>
          <el-table-column prop="active" label="是否在職" :formatter="check" width='120%' sortable :sort-method = "(a,b) =>{return a.active - b.active}"></el-table-column>
          <el-table-column prop="" label="編輯">
            <template slot-scope="scope">
              <el-button @click="editHuman(scope.row)" type="text" >編輯</el-button>
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
      form:{
        name:'',
        cs:'',
        birth:'',
        id:'',
        phone:'',
        mail:'',
        entryDate:'',
        quitDate:'',
        active:'',
      },
      submitNew:false,
      csOptions: [{
        value: 'A1',
        label: 'A1'
      },{
        value: 'A2',
        label: 'A2'
      },{
        value: 'A3',
        label: 'A3'
      },{
        value: 'A4',
        label: 'A4'
      },{
        value: 'B1',
        label: 'B1'
      },{
        value: 'B2',
        label: 'B2'
      },{
        value: 'B3',
        label: 'B3'
      },{
        value: 'B4',
        label: 'B4'
      },{
        value: 'B5',
        label: 'B5'
      },{
        value: 'B6',
        label: 'B6'
      },{
        value: 'B7',
        label: 'B7'
      },{
        value: 'B8',
        label: 'B8'
      },{
        value: 'B9',
        label: 'B9'
      },{
        value: 'B10',
        label: 'B10'
      },{
        value: 'B11',
        label: 'B11'
      },{
        value: 'B12',
        label: 'B12'
      },{
        value: 'OP1',
        label: 'OP1'
      },{
        value: 'OP2',
        label: 'OP2'
      },{
        value: '',
        label: ''
      }],
    }
  },
  created() {
    
  },
  methods: {
    check(row, column, cellValue, index){
      if(row[column.property]){
        return '✔️'
      }else{
        return '❌'
      }
    },
    newHuman(){
      this.form = {'number':(this.itemData.length+1).toString()}
      this.submitNew = true
      this.dialogNewHuman = true
    },
    editHuman(row){
      this.submitNew = false
      this.dialogNewHuman = true
      this.form = row
    },
    async submitHuman(){
      // this.ruleForm.recordAccount.push(this.email)
      // this.ruleForm.recordTime.push(moment().format('YYYY-MM-DD HH:mm'))
      let ref = db.collection('human-resources').doc(this.form.number);
      console.log(ref)
      console.log(this.submitNew)
      console.log(this.form)

      await ref.get().then(doc => { 
        if(typeof(doc.data()) != 'undefined' && this.submitNew == true){
          if (doc.exists && this.submitNew == true) {
            this.$message.error('此團號已存在！請重新讀取一次團號！')
            return 0;
          }   
        }else{
          ref.set(this.form).then(() => {
            console.log('set data successful');
            this.$message.success('新增成功');
            this.$router.push({ path: '/human/table' })
          });
        }
      })
      this.dialogNewHuman = false
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 1) {
        return 'color-row';
      }
      return '';
    },
  },
  mounted(){
    let ref = db.collection('human-resources')

    ref.onSnapshot((querySnapshot => {
      this.itemData.splice(0,this.itemData.length) //用splice清空 就無須reverse刷新dom 由於onSnapshot 須放在裡面清空
      querySnapshot.forEach(doc => {  
        this.itemData.push({...doc.data()})
      }); 
      this.listLoading = false
    }));

    ref = db.collection('human-resources').doc('3').collection('record')

    ref.onSnapshot((querySnapshot => {
       //用splice清空 就無須reverse刷新dom 由於onSnapshot 須放在裡面清空
      querySnapshot.forEach(doc => {  
        console.log(doc.data())
      }); 
      this.listLoading = false
    }));

    ref.where('entryDate','==','2022-04-14').get().then(querySnapshot => { //資料編排改變後 客服需改變
      querySnapshot.forEach(doc => {  
        console.log(doc.data())
      }); 
    });
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



