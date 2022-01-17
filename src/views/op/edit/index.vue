<template>
  <div class="app-container" style="background-color:#fbf2e6">
    <Input @readChildEvent="readParentEvent" @transferChildEvent="transfer" ref="child"></Input>
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
      if(this.$refs.child.ruleForm.depDate == null || this.$refs.child.ruleForm.number == null){
        this.$message.error('請輸入團號及出發日期')
        return 0
      }
      let ref = db.collection(moment(this.$refs.child.ruleForm.depDate).format('YYYY-MM')).doc(this.$refs.child.ruleForm.number);
      
      await ref.onSnapshot(doc => { 
        if(typeof(doc.data()) == 'undefined'){
          this.$message.error('請輸入正確團號')
          return 0;
        }
        this.$refs.child.ruleForm = doc.data()
        this.$refs.child.readNumber = true
        this.$refs.child.createDate = true
        this.$refs.child.submitShow = true
        this.$message.success('讀取成功');
      })
      this.$refs.child.$forceUpdate() // 重新渲染dom
    },
    transfer(){
      console.log(this.$refs.child.transferNumber)
      let transferLength = parseInt(this.$refs.child.transferIncomeTo)-parseInt(this.$refs.child.transferIncomeFrom)+1
      let transferQuery = {
        'number':this.$refs.child.transferNumber,
        'depDate':this.$refs.child.ruleForm.depDate,
        'transfer':true,
        'transferLength':transferLength,
        'transferIncomeDetailDate':[],
        'transferIncomeDetailItem':[],
        'transferIncomeDetailIncome':[],
        'transferIncomeDetailType':[],
        'transferIncomeDetailCard':[],
        'transferIncomeDetailReceiveDate':[],
        'transferIncomeDetailProve':[],
        'transferIncomeDetailOther':[],
      }
      
      for(let i=0;i<parseInt(this.$refs.child.transferIncomeTo)-parseInt(this.$refs.child.transferIncomeFrom)+1;i++){
        transferQuery.transferIncomeDetailDate.push(this.$refs.child.ruleForm.incomeDetailDate[i]) 
        transferQuery.transferIncomeDetailItem.push(this.$refs.child.ruleForm.incomeDetailItem[i])
        transferQuery.transferIncomeDetailIncome.push(this.$refs.child.ruleForm.incomeDetailIncome[i])
        transferQuery.transferIncomeDetailType.push(this.$refs.child.ruleForm.incomeDetailType[i])
        transferQuery.transferIncomeDetailCard.push(this.$refs.child.ruleForm.incomeDetailCard[i])
        transferQuery.transferIncomeDetailReceiveDate.push(this.$refs.child.ruleForm.incomeDetailReceiveDate[i])
        transferQuery.transferIncomeDetailProve.push(this.$refs.child.ruleForm.incomeDetailProve[i])
        transferQuery.transferIncomeDetailOther.push(this.$refs.child.ruleForm.incomeDetailOther[i])
      }
      console.log(transferQuery)
      let route = this.$router.resolve({
        path: '/admin/edit/group',
        query: transferQuery
      })
      window.open(route.href, '_blank');
    }
  },
  computed: {
    
  },mounted(){
    this.$refs.child.adminShow = false
    this.$refs.child.opShow = true
    if(Object.keys(this.$route.query).length > 0){
      this.$refs.child.ruleForm.depDate = this.$route.query.depDate
      this.$refs.child.ruleForm.number = this.$route.query.number
      this.readParentEvent()
    }
    // this.email = firebaseApp.auth().currentUser.email
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
