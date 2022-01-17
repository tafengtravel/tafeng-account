<template>
  <div class="app-container" style="background-color:#fbf2e6">
    <InputGroup @readChildEvent="readParentEvent" ref="child"></InputGroup>
  </div>
</template>

<script>
import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import InputGroup from '@/components/InputGroup.vue'

export default {
  name: 'new',
  components: {
    InputGroup
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
      let ref = db.collection(moment(this.$refs.child.ruleForm.depDate).format('YYYY-MM')+'G').doc(this.$refs.child.ruleForm.number);
      
      await ref.onSnapshot(doc => { 
        if(typeof(doc.data()) == 'undefined'){
          this.$message.error('請輸入正確團號')
          return 0;
        }
        this.$refs.child.ruleForm = doc.data()
        this.$refs.child.submitShow = true
        this.$message.success('讀取成功');

        // 判斷是否有transfer項目
        if(this.$route.query.transfer == 'true' && !this.$refs.child.ruleForm.lock){ //必須等於'true' route.query傳送皆為字串
          let transferIncomeDetailCard
          if(this.$route.query.transferLength == '1'){
            if(this.$route.query.transferIncomeDetailCard == 'true'){
              transferIncomeDetailCard = true
            }else if(this.$route.query.transferIncomeDetailCard == 'false'){
              transferIncomeDetailCard = false
            }
            this.$refs.child.ruleForm.incomeDetailDate.push(this.$route.query.transferIncomeDetailDate)
            this.$refs.child.ruleForm.incomeDetailItem.push(this.$route.query.transferIncomeDetailItem)
            this.$refs.child.ruleForm.incomeDetailIncome.push(this.$route.query.transferIncomeDetailIncome)
            this.$refs.child.ruleForm.incomeDetailType.push(this.$route.query.transferIncomeDetailType)
            this.$refs.child.ruleForm.incomeDetailCard.push(transferIncomeDetailCard)
            this.$refs.child.ruleForm.incomeDetailReceiveDate.push(this.$route.query.transferIncomeDetailReceiveDate)
            this.$refs.child.ruleForm.incomeDetailProve.push(this.$route.query.transferIncomeDetailProve)
            this.$refs.child.ruleForm.incomeDetailOther.push(this.$route.query.transferIncomeDetailOther)
            this.$refs.child.ruleForm.incomeDetailOpCheck.push(false)
            this.$refs.child.ruleForm.incomeDetailAdminCheck.push(false)
          }else{
            transferIncomeDetailCard = this.$route.query.transferIncomeDetailCard.map(function(item, index, array){
              if(item == 'true'){
                return true
              }
              if(item == 'false'){
                return false
              }
            });
            for(let i=0;i<parseInt(this.$route.query.transferLength);i++){
              this.$refs.child.ruleForm.incomeDetailDate.push(this.$route.query.transferIncomeDetailDate[i])
              this.$refs.child.ruleForm.incomeDetailItem.push(this.$route.query.transferIncomeDetailItem[i])
              this.$refs.child.ruleForm.incomeDetailIncome.push(this.$route.query.transferIncomeDetailIncome[i])
              this.$refs.child.ruleForm.incomeDetailType.push(this.$route.query.transferIncomeDetailType[i])
              this.$refs.child.ruleForm.incomeDetailCard.push(transferIncomeDetailCard[i])
              this.$refs.child.ruleForm.incomeDetailReceiveDate.push(this.$route.query.transferIncomeDetailReceiveDate[i])
              this.$refs.child.ruleForm.incomeDetailProve.push(this.$route.query.transferIncomeDetailProve[i])
              this.$refs.child.ruleForm.incomeDetailOther.push(this.$route.query.transferIncomeDetailOther[i])
              this.$refs.child.ruleForm.incomeDetailOpCheck.push(false)
              this.$refs.child.ruleForm.incomeDetailAdminCheck.push(false)
            }
          }
          this.$refs.child.$forceUpdate() // 重新渲染dom
        }
      })
    }
  },
  computed: {
    
  },mounted(){
    this.$refs.child.adminShow = false
    this.$refs.child.opShow = true
    this.$refs.child.createDateDisable = 0 //報帳日期不上鎖
    if(Object.keys(this.$route.query).length > 0){
      this.$refs.child.ruleForm.depDate = this.$route.query.depDate
      this.$refs.child.ruleForm.number = this.$route.query.number
      this.readParentEvent()
    }
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
