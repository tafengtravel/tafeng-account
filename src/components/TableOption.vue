<template>
  <div class="app-container">
    

      
      <el-date-picker
        v-model="month"
        type="month"
        placeholder="選擇月份">
      </el-date-picker>
      <el-select v-model="cs" placeholder="請選擇客服" style="width:120px">
        <el-option
          v-for="item in csOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      


  </div>
</template>

<script>

export default {
  data() {
    return {
      month:'',
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
      cs: 'all'
    }
  },
  created() {
    
  },
  methods: {
    
  },
  mounted(){
    
  }
}
</script>


