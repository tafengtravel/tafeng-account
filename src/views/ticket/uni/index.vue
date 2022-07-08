<template>
  <div class="dashboard-container">
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
      let gender = 'CPH_Body_rpt_PassengerList_ddl_Title_'
      let lastName = 'CPH_Body_rpt_PassengerList_tb_LastName_'
      let firstName = 'CPH_Body_rpt_PassengerList_tb_FirstName_'

      passengerData.forEach((data, index, object) => {
        let genderValue
        if(data.id.substring(1,2) == '1'){
          genderValue = 'MR'
        }else if (data.id.substring(1,2) == '2'){
          genderValue = 'MS'
        }

        consoleStr = consoleStr +
        country + index.toString() + value + quote + countryValue + quote + '\n' +
        lastName + index.toString() + value + quote + data.name.substring(0,1) + quote + '\n' +
        firstName + index.toString() + value + quote + data.name.substring(1,data.name.length) + quote + '\n' +
        birth1 + index.toString() + value + quote + moment(data.birth).format('YYYY/MM/DD') + quote + '\n' +
        birth2 + index.toString() + value + quote + moment(data.birth).format('YYYY/MM/DD') + quote + '\n' +
        gender + index.toString() + value + quote + genderValue + quote + '\n' +
        id + index.toString() + value + quote + data.id + quote + '\n' 
      });
     
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

