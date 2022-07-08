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
      let lastName = 'lastName'
      let firstName = 'firstName'
      let birth = 'birthday'
      let id = 'id'
      let value = '.value ='
      let quote = '"'
      

      passengerData.forEach((data, index, object) => {
        consoleStr = consoleStr +
        lastName + (index+1).toString() + value + quote + data.name.substring(0,1) + quote + '\n' +
        firstName + (index+1).toString() + value + quote + data.name.substring(1,data.name.length) + quote + '\n' +
        birth + (index+1).toString() + value + quote + data.birth + quote + '\n' +
        id + (index+1).toString() + value + quote + data.id + quote + '\n' 
      });
      
      consoleStr = consoleStr + 'contactNameMobile.value =' + quote + passengerData[0].name + quote
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

