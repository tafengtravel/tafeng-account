<template>
  <div>
      
    <el-date-picker
      v-model="month"
      type="month"
      placeholder="出發月份"
      style="width:150px"
      value-format="yyyy-MM"
      v-if="date==null||date==''"
      >
    </el-date-picker>
    <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="付款開始日期"
      end-placeholder="付款結束日期"
      value-format="yyyy-MM-dd"
      v-if="month==null||month==''">
    </el-date-picker>
    <el-input v-model="company" style="width:250px" placeholder="請輸入廠商名字"></el-input>
    <el-button type="primary" @click="search">搜尋</el-button>

  </div>
</template>

<script>

export default {
  data() {
    return {
      month:'',
      date:[],
      csOptions: [{
        value: 'all',
        label: '全部'
      },{
        value: 'A1',
        label: 'A1'
      },{
        value: 'A2',
        label: 'A2'
      },{
        value: 'A3',
        label: 'A3'
      },{
        value: 'A4',
        label: 'A4'
      },{
        value: 'B1',
        label: 'B1'
      },{
        value: 'B2',
        label: 'B2'
      },{
        value: 'B3',
        label: 'B3'
      },{
        value: 'B4',
        label: 'B4'
      },{
        value: 'B5',
        label: 'B5'
      },{
        value: 'B6',
        label: 'B6'
      },{
        value: 'B7',
        label: 'B7'
      },{
        value: 'B8',
        label: 'B8'
      },{
        value: 'B9',
        label: 'B9'
      },{
        value: 'B10',
        label: 'B10'
      },{
        value: 'B11',
        label: 'B11'
      },{
        value: 'B12',
        label: 'B12'
      }],
      cs: 'all',
      company:''
    }
  },
  created() {
    
  },
  methods: {
    search() {
      let searchChildEvent = {'cs':this.cs,'month':this.month}
      this.$emit("searchChildEvent", searchChildEvent);
    },
  },
  mounted(){
    
  }
}
</script>
<style>
@media (max-width: 768px) {
  .el-date-range-picker {
    width: 258px;
  }
  .el-date-range-picker__content {
    float: none;
  }
}
</style>


