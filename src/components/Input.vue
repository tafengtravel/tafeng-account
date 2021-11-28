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
            <el-input v-model="ruleForm.people"></el-input>
        </el-form-item>            
        <el-form-item label="人數" prop="amount">
            <el-input v-model="ruleForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="電話" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>

        <el-row></el-row>

        <el-form-item label="出發日期" prop="depDate" label-width="80px">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.depDate" style="width: 190px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="結束日期" prop="endDate" label-width="80px">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.endDate" style="width: 190px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="報帳日期" prop="createDate" label-width="80px">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.createDate" style="width: 190px;"></el-date-picker>
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
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.cancelDate" style="width: 205px;"></el-date-picker>
        </el-form-item>

        <el-row></el-row>

        <el-row :gutter="20">
          <div class="sub_title">估價單</div>
        </el-row>

        <el-row :gutter="20">
          <div class="font">團費</div>
        </el-row>
        <span v-for="(priceDetail,index) in ruleForm.priceDetail">
          <el-form-item :label="'品項'+(index+1).toString()" prop="priceDetail.item" label-width="50px">
            <el-input v-model="priceDetail.item" style="width: 250px;" @input="count" ></el-input>
          </el-form-item>            
          <el-form-item label="單價" prop="priceDetail.price">
            <el-input v-model="priceDetail.price" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="x 人數" prop="priceDetail.amount">
            <el-input v-model="priceDetail.amount" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="= 費用" prop="priceDetail.totalPrice" @input="count">
            <el-input v-model="priceDetail.totalPrice" disabled ></el-input>
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
          <el-form-item :label="'品項'+(index+1).toString()" prop="priceExtraDetail.item" label-width="50px">
            <el-input v-model="priceExtraDetail.item" style="width: 250px;" @input="count" ></el-input>
          </el-form-item>            
          <el-form-item label="單價" prop="priceExtraDetail.price">
            <el-input v-model="priceExtraDetail.price" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="x 數量" prop="priceExtraDetail.amount">
            <el-input v-model="priceExtraDetail.amount" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="x 天數" prop="priceExtraDetail.days">
            <el-input v-model="priceExtraDetail.days" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="= 費用" prop="priceExtraDetail.totalPrice">
            <el-input v-model="priceExtraDetail.totalPrice" disabled ></el-input>
          </el-form-item>
          <el-row></el-row>
        </span>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="priceExtraDetailAdd();count()"></el-button>
        <el-button type="danger" icon="el-icon-remove-outline" @click="priceExtraDetailRemove();count()"></el-button>

        <el-row></el-row>

        <el-row :gutter="20">
          <div class="font">收入</div>
        </el-row>
        <span v-for="(incomeDetail,index) in ruleForm.incomeDetail">
          <el-row :gutter="20">
            <div class="font">{{index+1}}.</div>
          </el-row>
          
          <el-form-item label="報帳日期" prop="incomeDetail.date">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="incomeDetail.date" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="品項" prop="incomeDetail.item">
            <el-input v-model="incomeDetail.item"></el-input>
          </el-form-item> 
          <el-form-item label="收入" prop="incomeDetail.income">
            <el-input v-model="incomeDetail.income" @input="count" ></el-input>
          </el-form-item> 
          <el-form-item label="收款方式" prop="incomeDetail.type" >
            <el-select v-model="incomeDetail.type" placeholder="收款方式" style="width: 110px;">
              <el-option label="匯款" value="匯款"></el-option>
              <el-option label="刷卡" value="刷卡"></el-option>
              <el-option label="現金" value="現金"></el-option>
              <el-option label="支票" value="支票"></el-option>
              <el-option label="其他" value="其他"></el-option>
              <el-option label="五倍券" value="五倍券"></el-option>
              <el-option label="LINEPAY" value="LINEPAY"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="國旅卡" prop="incomeDetail.card" >
            <el-select v-model="incomeDetail.card" placeholder="國旅卡" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>

          <el-row></el-row>

          <el-form-item label="收款日期" prop="incomeDetail.receiveDate">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="incomeDetail.receiveDate" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="收款證明" prop="incomeDetail.prove">
            <el-input v-model="incomeDetail.prov" ></el-input>
          </el-form-item> 
          <el-form-item label="備註" prop="incomeDetail.other">
            <el-input v-model="incomeDetail.other" ></el-input>
          </el-form-item> 
          <el-form-item label="OP核實" prop="incomeDetail.opCheck" >
            <el-select v-model="incomeDetail.opCheck" placeholder="OP核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" prop="incomeDetail.adminCheck" >
            <el-select v-model="incomeDetail.adminCheck" placeholder="財務核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-row></el-row>
        </span>
        

        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="incomeDetailAdd();count()"></el-button>
        <el-button type="danger" icon="el-icon-remove-outline" @click="incomeDetailRemove();count()"></el-button>

        <el-row></el-row>

        <el-row :gutter="20">
          <div class="font">支出</div>
        </el-row>
        <span v-for="(payDetail,index) in ruleForm.payDetail">
          <el-row :gutter="20">
            <div class="font">{{index+1}}.</div>
          </el-row>
          
          <el-form-item label="報帳日期" prop="payDetail.date">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="payDetail.date" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="廠商" prop="payDetail.company">
            <el-input v-model="payDetail.company"></el-input>
          </el-form-item> 
          <el-form-item label="品項" prop="payDetail.item">
            <el-input v-model="payDetail.item" @input="count" ></el-input>
          </el-form-item> 
          <el-form-item label="明細" prop="payDetail.detail">
            <el-input v-model="payDetail.detail" @input="count" ></el-input>
          </el-form-item> 
          <el-form-item label="支出" prop="payDetail.pay">
            <el-input v-model="payDetail.pay" @input="count" style="width: 130px;" ></el-input>
          </el-form-item> 

          <el-row></el-row>     

          <el-form-item label="付款日期" prop="payDetail.paydate">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="payDetail.paydate" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="付款方式" prop="payDetail.type" >
            <el-select v-model="payDetail.type" placeholder="收款方式">
              <el-option label="轉帳" value="轉帳"></el-option>
              <el-option label="郵局" value="郵局"></el-option>
              <el-option label="刷卡" value="刷卡"></el-option>
              <el-option label="現金" value="現金"></el-option>
              <el-option label="支票" value="支票"></el-option>
              <el-option label="儲值金" value="儲值金"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款證明" prop="payDetail.prove">
            <el-input v-model="payDetail.prove" @input="count" ></el-input>
          </el-form-item>
          <el-form-item label="OP核實" prop="payDetail.opCheck" >
            <el-select v-model="payDetail.opCheck" placeholder="OP核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" prop="payDetail.adminCheck" >
            <el-select v-model="payDetail.adminCheck" placeholder="財務核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="第一筆DL" prop="payDetail.dl1">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="payDetail.dl1" style="width: 150px;"></el-date-picker>
          </el-form-item>

          <!-- 寫到這裡               資料編排需要重新編排 全部攤成arr 無法用arr-obj                      -->
          
          <el-row></el-row>
        </span>
        

        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="payDetailAdd();count()"></el-button>
        <el-button type="danger" icon="el-icon-remove-outline" @click="payDetailRemove();count()"></el-button>

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
        priceDetail:[],
        priceExtraDetail:[],
        incomeDetail:[],
        payDetail:[],
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
    payDetailAdd(){
      this.ruleForm.payDetail.push({opCheck:'false',adminCheck:'false'});
    },
    payDetailRemove(){
      this.ruleForm.payDetail.pop({});
    },
    incomeDetailAdd(){
      this.ruleForm.incomeDetail.push({opCheck:'false',adminCheck:'false',card:'false',type:'匯款'});
    },
    incomeDetailRemove(){
      this.ruleForm.incomeDetail.pop({});
    },
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
        this.ruleForm.priceDetail[i].totalPrice = parseInt(this.ruleForm.priceDetail[i].amount) * parseInt(this.ruleForm.priceDetail[i].price)
        this.ruleForm.totalPrice = parseInt(this.ruleForm.totalPrice) + parseInt(this.ruleForm.priceDetail[i].totalPrice)
      }
      for(let i=0;i<this.ruleForm.priceExtraDetail.length;i++){
        this.ruleForm.priceExtraDetail[i].totalPrice = parseInt(this.ruleForm.priceExtraDetail[i].amount) * parseInt(this.ruleForm.priceExtraDetail[i].price) * parseInt(this.ruleForm.priceExtraDetail[i].days)
        this.ruleForm.totalPrice = parseInt(this.ruleForm.totalPrice) + parseInt(this.ruleForm.priceExtraDetail[i].totalPrice)
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



