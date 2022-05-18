<template>
  <div class="app-container" style="background-color:#fbf2e6">
    <Input @readChildEvent="readParentEvent" ref="child"></Input>
  </div>
</template>

<script>
import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import Input from '@/components/Input.vue'


export default {
  name: 'new',
  components: {
    Input
  },
  data() {
    return {

    }
  },
  methods:{
    async readParentEvent(){
      if(this.$refs.child.ruleForm.cs == null || this.$refs.child.ruleForm.depDate == null || this.$refs.child.ruleForm.people == null){
        this.$message.error('請輸入客服、出發日期、代表人')
        return 0
      }
      let ref = db.collection(moment(this.$refs.child.ruleForm.depDate).format('YYYY-MM'));
      let number = []
      let i = 0

      await ref.where('cs','==',this.$refs.child.ruleForm.cs).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {    

            number[i]=doc.id;
            console.log(number[i]);
            i=i+1;
            
          });
      });

      number.sort();

      console.log(number)

      let number1 = number[number.length-1];
      console.log(number1);

      if(number1 === undefined){
        console.log("尚未建立");
        let number0 = this.$refs.child.ruleForm.cs;
        number1 = parseInt((this.$refs.child.ruleForm.depDate).substring(0,4));
        number1 = number1 - 1911;
        if(this.$refs.child.ruleForm.cs == 'B10' || this.$refs.child.ruleForm.cs == 'B11' || this.$refs.child.ruleForm.cs == 'B12'){
          this.$refs.child.ruleForm.number = this.$refs.child.ruleForm.cs+number1.toString()+(this.$refs.child.ruleForm.depDate).substring(5,7)+'001'
        }else{
          this.$refs.child.ruleForm.number = number0.substring(0,1)+'0'+number0.substring(1,2)+ number1.toString() +(this.$refs.child.ruleForm.depDate).substring(5,7)+'001'
        }

      }else{

        let number0 = number1;
        number1 = number1.substring(3,11);
        number1 = parseInt(number1);
        number1 = number1 +1;
        number1 = number1.toString();
        console.log(number1);
        console.log(number0.substring(0,1));
        console.log(number0.substring(2,3));

        if(this.$refs.child.ruleForm.cs == 'B10' || this.$refs.child.ruleForm.cs == 'B11' || this.$refs.child.ruleForm.cs == 'B12'){
          this.$refs.child.ruleForm.number = this.$refs.child.ruleForm.cs+number1
        }else{
          this.$refs.child.ruleForm.number = number0.substring(0,1)+'0'+number0.substring(2,3)+number1;
        }

      }
      
      ref = db.collection(moment(this.$refs.child.ruleForm.depDate).format('YYYY-MM')).doc(this.$refs.child.ruleForm.number);
      await ref.get().then(function(doc){ 
        if(typeof(doc.data()) != 'undefined'){
          if (doc.exists) {
            alert('錯誤 此團號已存在 請聯繫管理員');
            window.location.reload("");
          }   
        }
      });

      //檢查是否為舊客戶
      let endMonth = moment(moment(this.$refs.child.ruleForm.depDate).format('YYYY-MM'));
      let startMonth = moment(endMonth).subtract(120,'months').format('YYYY-MM')
      let monthLength = endMonth.diff(startMonth, 'month')+1;  

      for(let j=0;j<monthLength;j++){
        console.log(startMonth)
        ref = db.collection(startMonth);
        ref.where('people','==',this.$refs.child.ruleForm.people).get().then(querySnapshot => { 
          querySnapshot.forEach(doc => {  
            this.$refs.child.ruleForm.regularCustomer = true
            console.log(doc.data().people)
            this.$refs.child.$forceUpdate()
          }); 
        });
        startMonth = moment(startMonth).add(1,'months').format('YYYY-MM')
      }

      this.$refs.child.submitShow = true
      this.$refs.child.$forceUpdate() // 重新渲染dom
    }
  },
  computed: {
    
  },mounted(){
    this.$refs.child.adminShow = false
    this.$refs.child.opShow = false
    this.$refs.child.readNumber = true
    this.$refs.child.submitNew = true
  }
  
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
