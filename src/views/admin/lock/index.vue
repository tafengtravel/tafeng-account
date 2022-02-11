<template>
  <div class="app-container">
    
    <el-date-picker
      v-model="month"
      type="month"
      placeholder="選擇月份"
      style="width:160px"
      value-format="yyyy-MM">
    </el-date-picker>
    <el-select v-model="collection" placeholder="請選擇" style="width:120px">
      <el-option label="散客" value="fit"></el-option>
      <el-option label="團體" value="group"></el-option>
    </el-select>
    <el-select v-model="lockCheck" placeholder="請選擇" style="width:120px">
      <el-option label="鎖定" value="lock"></el-option>
      <el-option label="解鎖" value="unlock"></el-option>
    </el-select>
    <el-button type="primary" @click="lock">鎖定</el-button>

  </div>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";


export default {
  components: {
    
  },
  
  data() {
    return {
      listLoading: false,
      itemData:[],
      month:'',
      company:'',
      collection:'',
      month:'',
      lockCheck:'lock'
    }
  },
  created() {
    
  },
  methods: {
    async lock() {
      let ref
      let number = []
      let collection
      let lockBoolean
      let lockTitle

      switch(this.collection){
        case 'fit':collection = this.month;break
        case 'group':collection = this.month+'G';break
      }

      switch(this.lockCheck){
        case 'lock':lockBoolean = true;lockTitle = '已上鎖';break
        case 'unlock':lockBoolean = false;lockTitle = '已解鎖';break
      }

      ref = db.collection(collection)

      await ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {  
          number.push(doc.data().number)
        }); 
      });

      for(let i=0;i<number.length;i++){
        ref = db.collection(collection).doc(number[i])

        ref.update({lock:lockBoolean}).then(() => {
          console.log(number[i]+' '+lockBoolean);
          this.$notify({
            title: lockTitle,
            message: number[i],
            type: 'success'
          });
        });
      }
    },
  },
  mounted(){
    
  }
}
</script>



