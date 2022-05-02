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
    <el-autocomplete v-model.trim="company" style="width: 250px;" @input="(val) => (company = company.toUpperCase())" :fetch-suggestions="queryCompanySuggest">
      <template slot-scope="{ item }" style="">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.other }}</span>
        <!-- 自動選擇及備註欄位 -->
      </template>
    </el-autocomplete>
    <el-button type="primary" @click="search">搜尋</el-button>

    <CompanySuggest ref="child"></CompanySuggest>
  </div>
</template>

<script>
import CompanySuggest from '@/components/CompanySuggest.vue';

export default {
  components: {
    CompanySuggest
  },
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
    //廠商輸入建議
    queryCompanySuggest(queryString, cb) {
      let companys = this.$refs.child.companySuggest;
      let results = queryString ? companys.filter(this.createFilter(queryString)) : companys;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (company) => {
        return (company.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
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
.el-autocomplete-suggestion li {
    padding: 0 20px;
    margin: 0;
    line-height: normal;
    cursor: pointer;
    color: #606266;
    font-size: 14px;
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 7px;
    padding-bottom: 7px;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.addr {
  font-size: 12px;
  color: #b4b4b4;
}

.highlighted .addr {
  color: #ddd;
}
</style>


