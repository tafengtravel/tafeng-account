<template>
    <div>
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-position="left" label-width="70px" class="demo-ruleForm">
            <el-form-item label="團號" prop="number">
                <el-input v-model.trim="ruleForm.number" @input="(val) => (ruleForm.number = ruleForm.number.toUpperCase())" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="出發日期" prop="number" label-width="100px">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.depDate" style="width: 190px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="交通方式" label-width="100px">
                <el-select v-model="ruleForm.transportation" placeholder="搭機/搭船" style="width: 130px;">
                    <el-option label="搭機" value= 'plane'></el-option>
                    <el-option label="搭船" value= 'boat'></el-option>
                </el-select>
            </el-form-item>
            <el-button @click="read">讀取</el-button>
            <el-button type="primary" v-if="show" @click="word">輸出</el-button>

            <el-row></el-row>

            <el-form-item label="出發地(機場/港口)" v-if="show" label-width="160px">
                <el-input v-model.trim="ruleForm.airport" v-if="show" style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="旅遊地點" v-if="show" label-width="100px">
                <el-input v-model.trim="ruleForm.location" v-if="show" style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="航空/船班公司" v-if="show" label-width="160px">
                <el-input v-model.trim="ruleForm.airline" v-if="show" style="width: 150px;"></el-input>
            </el-form-item>
        </el-form>

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
      company:'',
      ruleForm:{
        transportation:'plane',
      },
      show:false,
    }
  },
  created() {
    
  },
  methods: {
    read() {
      let readChildEvent
      this.$emit("readChildEvent", readChildEvent);
    },
    word() {
      let wordChildEvent
      this.$emit("wordChildEvent", wordChildEvent);
    },
  },
  mounted(){
    
  }
}
</script>
<style>

</style>


