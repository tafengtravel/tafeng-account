<template>
  <div>
      
    <el-row :gutter="20">
      <el-input
        type="textarea"
        :autosize="{ minRows: 10}"
        :placeholder="'呂皇一 E123456789 1997/03/20\n呂皇二 E123456789 1997/03/20\n呂皇三 E123456789 1997/3/20\n呂皇四 E123456789 86/03/20\n呂皇五 E123456789 86.03.20\n呂皇六 E123456789 86.3.20\n以上格式均可以\n同一筆資料中間用空白間隔，每一筆資料用分行區隔\n特殊票種請重新選擇性別(EX：嬰兒、兒童)'"
        v-model="passenger">
      </el-input>
    </el-row>

    <el-row :gutter="20">
      <el-button type="primary" @click="normalization">轉換</el-button>
    </el-row>

    <el-row :gutter="20">
      <el-input
        type="textarea"
        :autosize="{ minRows: 10}"
        v-model="passengerConsole">
      </el-input>
    </el-row>

  </div>
</template>

<script>
import * as moment from "moment/moment";

export default {
  data() {
    return {
      passenger:'',
      passengerConsole:'',
    }
  },
  created() {
    
  },
  methods: {
    search() {
      let searchChildEvent = {'cs':this.cs,'month':this.month}
      this.$emit("searchChildEvent", searchChildEvent);
    },
    normalization(){
      let passenger = this.passenger
      let passengerData = []
      passenger = passenger.replaceAll('.','/')
      passenger = passenger.replaceAll('/','-')
      passenger = passenger.trim().split(/\s+/)
      for(let i=0;i<passenger.length;i++){
        if(i%3 == 1){
          if(!isNaN(passenger[i].substring(0,1))){
            let temp = passenger[i]
            passenger[i] = passenger[i+1]
            passenger[i+1] = temp
          }
        }else if(i%3 == 2){
          if(parseInt(passenger[i].substring(0,passenger[i].indexOf('-'))) < 1800){
            passenger[i] = (parseInt(passenger[i].substring(0,passenger[i].indexOf('-')))+1911).toString() + passenger[i].substring(passenger[i].indexOf('-'),passenger[i].length)
          }
          passenger[i] = moment(passenger[i]).format('YYYY-MM-DD')
          passengerData.push({name:passenger[i-2],id:passenger[i-1],birth:passenger[i-0]})
        }
      }
      this.$emit("passengerChildEvent", passengerData);
    }
  },
  mounted(){
      
  }
}
</script>


