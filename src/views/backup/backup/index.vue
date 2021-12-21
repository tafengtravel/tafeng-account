<template>
  <div class="app-container">
    <el-row>
      <el-date-picker
        v-model="month"
        type="monthrange"
        range-separator="至"
        start-placeholder="開始月份"
        end-placeholder="結束月份"
        value-format="yyyy-MM">
      </el-date-picker>
      <el-select v-model="collection" placeholder="請選擇" style="width: 110px;">
        <el-option label="散客" value= "cs"></el-option>
        <el-option label="團體" value= "group"></el-option>
      </el-select>
      <el-button type="primary" @click="download">下載</el-button>
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
    }
  },
  created() {
    
  },
  methods: {
    async download() {
      this.itemData.length = 0
      
      let startMonth = moment(this.month[0]);
      let endMonth = moment(this.month[1]);
      let monthLength = endMonth.diff(startMonth, 'month')+1;  
      let ref
      let itemData = [];
      startMonth = this.month[0];
      
      for(let j=0;j<monthLength;j++){

        itemData.length = 0
        if(this.collection == 'cs'){
          ref = db.collection(startMonth);
        }else if(this.collection == 'group'){
          ref = db.collection(startMonth + 'G');
        }

        await ref.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            itemData.push(doc.data())
          });
        });

        let content = JSON.stringify(itemData);
        let blob = new Blob([content], {type: "text/plain;charset=utf-8"});

        if(this.collection == 'cs'){
          saveAs(blob, startMonth+".json"); 
        }else if(this.collection == 'group'){
          saveAs(blob, startMonth+"G.json"); 
        }

        startMonth = moment(startMonth).add(1,'months').format('YYYY-MM')
      }
      
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
</style>



