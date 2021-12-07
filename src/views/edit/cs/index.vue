<template>
  <div class="app-container">
    客服 edit
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
      if(this.$refs.child.ruleForm.depDate == null || this.$refs.child.ruleForm.number == null){
        this.$message.error('請輸入團號及出發日期')
        return 0
      }
      let ref = db.collection((this.$refs.child.ruleForm.depDate).substring(0,7).toString()).doc(this.$refs.child.ruleForm.number);
      
      await ref.onSnapshot(doc => { 
        if(typeof(doc.data()) == 'undefined'){
          this.$message.error('請輸入正確團號')
          return 0;
        }
        this.$refs.child.ruleForm = doc.data()
        this.$refs.child.readNumber = true
        this.$refs.child.createDate = true

      })
      this.$refs.child.$forceUpdate() // 重新渲染dom
    }
  },
  computed: {
    
  },mounted(){
    this.$refs.child.adminShow = false
    this.$refs.child.opShow = false
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
