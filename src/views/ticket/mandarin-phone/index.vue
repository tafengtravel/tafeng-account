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
      let lastName = 'lastName_'
      let firstName = 'firstName_'
      let birth = 'birthyDate_'
      let id = 'Idnum_'
      let value = '.value ='
      let quote = '"'
      

      passengerData.forEach((data, index, object) => {
        consoleStr = consoleStr +
        lastName + index.toString() + value + quote + data.name.substring(0,1) + quote + '\n' +
        firstName + index.toString() + value + quote + data.name.substring(1,data.name.length) + quote + '\n' +
        birth + index.toString() + value + quote + data.birth + quote + '\n' +
        id + index.toString() + value + quote + data.id + quote + '\n' 
      });
      
      consoleStr = consoleStr + 'contname.value = "呂孟庭" \ncontpsgname.value = "呂孟庭" \nNightphone_Code.value = "0933341445"' 
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

