<template>
  <div class="app-container">
      
      <el-row :gutter="20">
        <div class="sub_title">基本資料</div>
      </el-row>
      
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">

        <el-form-item label="團號" prop="number">
            <el-input v-model="ruleForm.number" disabled></el-input>
        </el-form-item>            
        <el-form-item label="團名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="客服" prop="cs" >
            <el-select v-model="ruleForm.cs" placeholder="客服" style="width:100px">
              <el-option
                v-for="item in csOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getNumber">圖取團號</el-button>
        </el-form-item>
        <el-form-item label="地點" prop="location" >
            <el-select v-model="ruleForm.location" placeholder="地點">
              <el-option-group
                v-for="group in locationOptions"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
        </el-form-item>

        <el-row></el-row>

        <el-form-item label="代表人" prop="people">
            <el-input v-model="ruleForm.people" disabled></el-input>
        </el-form-item>            
        <el-form-item label="人數" prop="amount">
            <el-input v-model="ruleForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="電話" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>

        <el-row></el-row>

        <el-form-item label="出發日期" prop="depDate" label-width="80px">
          <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.depDate" style="width: 190px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="結束日期" prop="endDate" label-width="80px">
          <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.endDate" style="width: 190px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="報帳日期" prop="createDate" label-width="80px">
          <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.createDate" style="width: 190px;"></el-date-picker>
        </el-form-item>

        <el-row></el-row>

        <el-form-item label="總團費" prop="totalPrice">
            <el-input v-model="ruleForm.totalPrice" disabled></el-input>
        </el-form-item> 
        <el-form-item label="退業績" prop="cancel" >
            <el-select v-model="ruleForm.cancel" placeholder="退業績" style="width: 185px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="退業績日期" prop="cancelDate" label-width="90px">
          <el-date-picker type="date" placeholder="選擇日期" v-model="ruleForm.cancelDate" style="width: 205px;"></el-date-picker>
        </el-form-item>

        <el-row></el-row>

        <el-row :gutter="20">
          <div class="sub_title">估價單</div>
        </el-row>

        <el-row :gutter="20">
          <div class="font">團費</div>
        </el-row>
        <span v-for="(priceDetail,index) in ruleForm.priceDetail">
          <el-form-item :label="'品項'+(index+1).toString()" prop="item" label-width="60px">
            <el-input v-model="priceDetail.item" style="width: 250px;" @input="count" ></el-input>
          </el-form-item>            
          <el-form-item label="單價" prop="itemPrice">
            <el-input v-model="priceDetail.itemPrice" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="x 人數" prop="itemAmount">
            <el-input v-model="priceDetail.itemAmount" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="= 費用" prop="itemTotalPrice" @input="count">
            <el-input v-model="priceDetail.itemTotalPrice" disabled ></el-input>
          </el-form-item>
          <el-row></el-row>
        </span>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="priceDetailAdd();count()"></el-button>
        <el-button type="danger" icon="el-icon-remove-outline" @click="priceDetailRemove();count()"></el-button>
      
        <el-row></el-row>

        <el-row :gutter="20">
          <div class="font">加購項目</div>
        </el-row>
        <span v-for="(priceExtraDetail,index) in ruleForm.priceExtraDetail">
          <el-form-item :label="'品項'+(index+1).toString()" prop="item" label-width="60px">
            <el-input v-model="priceExtraDetail.item" style="width: 250px;" @input="count" ></el-input>
          </el-form-item>            
          <el-form-item label="單價" prop="itemPrice">
            <el-input v-model="priceExtraDetail.itemPrice" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="x 數量" prop="itemAmount">
            <el-input v-model="priceExtraDetail.itemAmount" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="x 天數" prop="itemDays">
            <el-input v-model="priceExtraDetail.itemDays" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="= 費用" prop="itemTotalPrice">
            <el-input v-model="priceExtraDetail.itemTotalPrice" disabled ></el-input>
          </el-form-item>
          <el-row></el-row>
        </span>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="priceExtraDetailAdd();count()"></el-button>
        <el-button type="danger" icon="el-icon-remove-outline" @click="priceExtraDetailRemove();count()"></el-button>

        <el-row></el-row>

        <el-form-item>
          <el-button @click="count">試算</el-button>
          <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
        </el-form-item>

      </el-form>
      

  </div>
</template>

<script>

export default {
  data() {
    return {
      itemData:{},
      locationOptions:[{
          label: '國內離島',
          options: [{
            value: '澎湖',
            label: '澎湖'
          }, {
            value: '綠島',
            label: '綠島'
          }, {
            value: '蘭嶼',
            label: '蘭嶼'
          }, {
            value: '金門',
            label: '金門'
          }, {
            value: '馬祖',
            label: '馬祖'
          }]
        }, {
          label: '國旅',
          options: [{
            value: '代訂車',
            label: '代訂車'
          }, {
            value: '季節旅遊',
            label: '季節旅遊'
          }, {
            value: '跨年',
            label: '跨年'
          }, {
            value: '團體報帳',
            label: '團體報帳'
          }, {
            value: 'JOIN報帳',
            label: 'JOIN報帳'
          }]
        },{
          label: '中港澳',
          options: [{
            value: '香港',
            label: '香港'
          }, {
            value: '澳門',
            label: '澳門'
          }, {
            value: '中國',
            label: '中國'
          }]
        },{
          label: '日本',
          options: [{
            value: '東京',
            label: '東京'
          }, {
            value: '大阪',
            label: '大阪'
          }, {
            value: '沖繩',
            label: '沖繩'
          }, {
            value: '北九州',
            label: '北九州'
          }, {
            value: '福岡',
            label: '福岡'
          }, {
            value: '北海道',
            label: '北海道'
          }]
        },{
          label: '韓國',
          options: [{
            value: '首爾',
            label: '首爾'
          }, {
            value: '釜山',
            label: '釜山'
          }, {
            value: '大邱',
            label: '大邱'
          }, {
            value: '濟州島',
            label: '濟州島'
          }]
        },{
          label: '東南亞',
          options: [{
            value: '曼谷',
            label: '曼谷'
          }, {
            value: '胡志明',
            label: '胡志明'
          }, {
            value: '峴港',
            label: '峴港'
          }, {
            value: '清邁',
            label: '清邁'
          }, {
            value: '新加坡',
            label: '新加坡'
          }]
        },{
          label: '海島',
          options: [{
            value: '沙巴',
            label: '沙巴'
          }, {
            value: '長灘島',
            label: '長灘島'
          }, {
            value: '巴拉望',
            label: '巴拉望'
          }, {
            value: '宿霧',
            label: '宿霧'
          }, {
            value: '峇里島',
            label: '峇里島'
          }, {
            value: '帛琉',
            label: '帛琉'
          }]
        },{
          label: '郵輪',
          options: [{
            value: '郵輪',
            label: '郵輪'
          }]
        },{
          label: '其他',
          options: [{
            value: '其他',
            label: '其他'
          }]
        }],
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
      ruleForm: {
        cancel:'false',
        priceDetail:[{}],
        priceExtraDetail:[{}],
      },
      rules: {
          number: [
              // { required: true, message: '必填', trigger: 'blur'},
          ],
          name: [
              { required: true, message: '必填', trigger: 'blur'},
          ],
          location: [
              { required: true, message: '必填', trigger: 'blur'},
          ],
          cs:[
              { required: true, message: '必填', trigger: 'blur'},
          ],
          people:[
              { required: true, message: '必填', trigger: 'blur'},
          ],
          amount:[
              { required: true, message: '必填', trigger: 'blur'},
          ],
          phone:[
              { required: true, message: '必填', trigger: 'blur'},
          ],
          depDate:[
              { required: true, message: '必填', trigger: 'blur'},
          ],
          endDate:[
              { required: true, message: '必填', trigger: 'blur'},
          ],
          createDate:[
              { required: true, message: '必填', trigger: 'blur'},
          ]
      }
    }
  },
  created() {
     
  },
  methods: {
    priceDetailAdd(){
      this.ruleForm.priceDetail.push({});
    },
    priceDetailRemove(){
      this.ruleForm.priceDetail.pop({});
    },
    priceExtraDetailAdd(){
      this.ruleForm.priceExtraDetail.push({});
    },
    priceExtraDetailRemove(){
      this.ruleForm.priceExtraDetail.pop({});
    },
    getNumber(){

    },
    search() {
      let searchChildEvent = {'cs':this.cs,'month':this.month}
      this.$emit("searchChildEvent", searchChildEvent);
    },
    count(){
      this.ruleForm.totalPrice = 0
      for(let i=0;i<this.ruleForm.priceDetail.length;i++){
        this.ruleForm.priceDetail[i].itemTotalPrice = parseInt(this.ruleForm.priceDetail[i].itemAmount) * parseInt(this.ruleForm.priceDetail[i].itemPrice)
        this.ruleForm.totalPrice = parseInt(this.ruleForm.totalPrice) + parseInt(this.ruleForm.priceDetail[i].itemTotalPrice)
      }
      for(let i=0;i<this.ruleForm.priceExtraDetail.length;i++){
        this.ruleForm.priceExtraDetail[i].itemTotalPrice = parseInt(this.ruleForm.priceExtraDetail[i].itemAmount) * parseInt(this.ruleForm.priceExtraDetail[i].itemPrice) * parseInt(this.ruleForm.priceExtraDetail[i].itemDays)
        this.ruleForm.totalPrice = parseInt(this.ruleForm.totalPrice) + parseInt(this.ruleForm.priceExtraDetail[i].itemTotalPrice)
      }
      
    },
    submit(validRuleForm){
      this.$refs[validRuleForm].validate((valid) => {
        if (valid) {
          
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      
    }
  },
  mounted(){
    
  }
}
</script>


