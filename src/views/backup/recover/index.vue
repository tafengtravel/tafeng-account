<template>
  <div class="app-container">
    <el-row>
       <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="change"
        :file-list="fileList"
        :auto-upload="false"
        :limit="1">
        <el-button slot="trigger" size="small" type="primary">選擇文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="confirm">還原</el-button>
      </el-upload>
    </el-row>
   

    <el-date-picker
      v-model="month"
      type="month"
      placeholder="選擇月份"
      style="width:150px"
      value-format="yyyy-MM">
    </el-date-picker>
    <el-select v-model="collection" placeholder="請選擇" style="width: 110px;">
      <el-option label="散客" value= "cs"></el-option>
      <el-option label="團體" value= "group"></el-option>
    </el-select>
    <el-input v-model="number" style="width:250px" placeholder="請輸入團號"></el-input>

    
    <el-row></el-row>
    
  </div>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import { formatTime } from '@/utils';



export default {
  components: {

  },
  
  data() {
    return {
      listLoading: false,
      month:'',
      fileList:[],
      number:'',
      itemData:[],
      collection:'cs',
    }
  },
  created() {
    
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(this.$refs.upload.uploadFiles[0].raw)
    },
    async change(){
      let itemData = []
      let selectedFile = this.$refs.upload.uploadFiles[0].raw
      let name = selectedFile.name;//讀取選中檔案的檔名
      let size = selectedFile.size;//讀取選中檔案的大小

      console.log("檔名:"+name+"大小："+size);

      let reader = new FileReader();//這裡是核心！！！讀取操作就是由它完成的。
      reader.readAsText(selectedFile);//讀取檔案的內容

      reader.onload = function(){
        console.log("讀取結果轉為JSON：");
        let docDATA = JSON.parse(this.result);

        for(let i=0;i<docDATA.length;i++){
          console.log(docDATA[i].number)
          console.log(docDATA[i])
          itemData.push({...docDATA[i]})
        }
        console.log(itemData)
      };
      this.itemData = itemData
    },
    confirm() {
      let yes = confirm('確定要進行還原？\n團號：'+this.number+'\n月份：'+this.month);
      if(yes){
        this.recover();
      }
    },
    recover(){
      let ref 
      if(this.collection == 'cs'){
        ref = db.collection(this.month).doc(this.number);
      }else if(this.collection == 'group'){
        ref = db.collection(this.month+'G').doc(this.number);
      }

      for(let i=0;i<this.itemData.length;i++){
        if(this.number == this.itemData[i].number){
          ref.set(this.itemData[i]).then(() => {
            console.log('set data successful');
            alert('還原成功');
            location.reload()
          });
        }
      }
    }
  },
  mounted(){
    
  }
}
</script>



