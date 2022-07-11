<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-select v-model="trip" placeholder="請選擇">
        <el-option label="單去程" value="outbound"></el-option>
        <el-option label="單回程" value="inbound"></el-option>
        <el-option label="來回" value="round"></el-option>
      </el-select>
    </el-row>
    <Ticket @passengerChildEvent="passengerToConsole" ref="child"></Ticket>
  </div>
</template>

<script>
import axios from 'axios'
import * as moment from "moment/moment";
import '@/styles/common.css'
import Ticket from '@/components/Ticket.vue'

export default {
  components: { 
    Ticket 
  },
  data() {
    return {
      trip:'outbound',
    };
  },
  computed: {

  },
  methods: {
    passengerToConsole(passengerData){
      console.log(passengerData)

      let consoleStr = ''
      let value = '.value ='
      let quote = '"'

      let roundTicket = '"YBC+YEBC"'
      let singleTicket = '"YEBC"'
      let email = 'CPH_Body_tb_Email.value = "tafengtravel@gmail.com"'
      let ticket = 'CPH_Body_rpt_PassengerList_ddl_Farebasis_'
      let id = 'CPH_Body_rpt_PassengerList_tb_ID_NO_'
      let birth1 = 'CPH_Body_rpt_PassengerList_tb_Birthday_'
      let birth2 = 'CPH_Body_rpt_PassengerList_hi_Birthday_'
      let country = 'CPH_Body_rpt_PassengerList_hi_Country_'
      let countryValue = 'TW'
      let trip = 'CPH_Body_rpt_PassengerList_ddl_Farebasis_'

      let tripValue
      if(this.trip == 'outbound'){
        tripValue = 'YU'
      }else if (this.trip == 'inbound'){
        tripValue = 'YEU'
      }else if (this.trip == 'round'){
        tripValue = 'YU+YEU'
      }
      
      passengerData.forEach((data, index, object) => {
        
        consoleStr = consoleStr +
        trip + index.toString() + value + quote + tripValue + quote + '\n' +
        country + index.toString() + value + quote + countryValue + quote + '\n' +
        birth1 + index.toString() + value + quote + moment(data.birth).format('YYYY/MM/DD') + quote + '\n' +
        birth2 + index.toString() + value + quote + moment(data.birth).format('YYYY/MM/DD') + quote + '\n' +
        id + index.toString() + value + quote + data.id + quote + '\n' 
      });
      
      consoleStr = consoleStr + 'CPH_Body_tb_Email.value = "tafengtravel@gmail.com"'
      console.log(consoleStr)
      this.$refs.child.passengerConsole = consoleStr
    }
  },
  async mounted() {

  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

