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
        <span v-for="(priceDetailItem,index) in ruleForm.priceDetailItem.length">
          <el-form-item :label="'品項'+(index+1).toString()" label-width="50px">
            <el-input v-model="ruleForm.priceDetailItem[index]" style="width: 250px;" @input="count" ></el-input>
          </el-form-item>            
          <el-form-item label="單價">
            <el-input v-model="ruleForm.priceDetailPrice[index]" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="x 人數">
            <el-input v-model="ruleForm.priceDetailAmount[index]" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="= 費用" @input="count">
            <el-input v-model="ruleForm.priceDetailTotalPrice[index]" disabled ></el-input>
          </el-form-item>
          <el-row></el-row>
        </span>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="priceDetailAdd();count()"></el-button>
        <el-button type="danger" icon="el-icon-remove-outline" @click="priceDetailRemove();count()"></el-button>
      
        <el-row></el-row>

        <el-row :gutter="20">
          <div class="font">加購項目</div>
        </el-row>
        <span v-for="(extraDetailItem,index) in ruleForm.extraDetailItem.length">
          <el-form-item :label="'品項'+(index+1).toString()" label-width="50px">
            <el-input v-model="ruleForm.extraDetailItem[index]" style="width: 250px;" @input="count" ></el-input>
          </el-form-item>            
          <el-form-item label="單價">
            <el-input v-model="ruleForm.extraDetailPrice[index]" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="x 數量">
            <el-input v-model="ruleForm.extraDetailAmount[index]" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="x 天數">
            <el-input v-model="ruleForm.extraDetailDays[index]" style="width: 100px;" @input="count"></el-input>
          </el-form-item>
          <el-form-item label="= 費用">
            <el-input v-model="ruleForm.extraDetailTotalPrice[index]" disabled ></el-input>
          </el-form-item>
          <el-row></el-row>
        </span>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="priceExtraDetailAdd();count()"></el-button>
        <el-button type="danger" icon="el-icon-remove-outline" @click="priceExtraDetailRemove();count()"></el-button>

        <el-row></el-row>

        <el-row :gutter="20">
          <div class="font">收入</div>
        </el-row>
        <span v-for="(incomeDetailItem,index) in ruleForm.incomeDetailItem.length">
          <el-row :gutter="20">
            <div class="font">{{index+1}}.</div>
          </el-row>
          
          <el-form-item label="報帳日期">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.incomeDetailDate[index]" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="品項">
            <el-input v-model="ruleForm.incomeDetailItem[index]"></el-input>
          </el-form-item> 
          <el-form-item label="收入">
            <el-input v-model="ruleForm.incomeDetailIncome[index]" @input="count" ></el-input>
          </el-form-item> 
          <el-form-item label="收款方式">
            <el-select v-model="ruleForm.incomeDetailType[index]" placeholder="收款方式" style="width: 110px;">
              <el-option label="匯款" value="匯款"></el-option>
              <el-option label="刷卡" value="刷卡"></el-option>
              <el-option label="現金" value="現金"></el-option>
              <el-option label="支票" value="支票"></el-option>
              <el-option label="其他" value="其他"></el-option>
              <el-option label="五倍券" value="五倍券"></el-option>
              <el-option label="LINEPAY" value="LINEPAY"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="國旅卡">
            <el-select v-model="ruleForm.incomeDetailCard[index]" placeholder="國旅卡" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>

          <el-row></el-row>

          <el-form-item label="收款日期">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.incomeDetailReceiveDate[index]" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="收款證明">
            <el-input v-model="ruleForm.incomeDetailProve[index]" ></el-input>
          </el-form-item> 
          <el-form-item label="備註">
            <el-input v-model="ruleForm.incomeDetailOther[index]" ></el-input>
          </el-form-item> 
          <el-form-item label="OP核實" class="op">
            <el-select v-model="ruleForm.incomeDetailOpCheck[index]" placeholder="OP核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" class="admin">
            <el-select v-model="ruleForm.incomeDetailAdminCheck[index]" placeholder="財務核實" style="width: 110px;">
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
        <span v-for="(payDetailCompany,index) in ruleForm.payDetailCompany.length">
          <el-row :gutter="20">
            <div class="font">{{index+1}}.</div>
          </el-row>
          
          <el-form-item label="報帳日期">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDate[index]" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="廠商">
            <el-input v-model="ruleForm.payDetailCompany[index]"></el-input>
          </el-form-item> 
          <el-form-item label="品項">
            <el-input v-model="ruleForm.payDetailItem[index]" @input="count" ></el-input>
          </el-form-item> 
          <el-form-item label="明細">
            <el-input v-model="ruleForm.payDetailDetail[index]" @input="count" ></el-input>
          </el-form-item> 
          <el-form-item label="支出">
            <el-input v-model="ruleForm.payDetailPay[index]" @input="count" style="width: 130px;" ></el-input>
          </el-form-item> 

          <el-row></el-row>     

          <el-form-item label="付款日期">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailPayDate[index]" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="付款方式">
            <el-select v-model="ruleForm.payDetailType[index]" placeholder="收款方式">
              <el-option label="轉帳" value="轉帳"></el-option>
              <el-option label="郵局" value="郵局"></el-option>
              <el-option label="刷卡" value="刷卡"></el-option>
              <el-option label="現金" value="現金"></el-option>
              <el-option label="支票" value="支票"></el-option>
              <el-option label="儲值金" value="儲值金"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款證明">
            <el-input v-model="ruleForm.payDetailProve[index]" @input="count" ></el-input>
          </el-form-item>
          <el-form-item label="OP核實" class="op">
            <el-select v-model="ruleForm.payDetailOpCheck[index]" placeholder="OP核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" class="admin">
            <el-select v-model="ruleForm.payDetailAdminCheck[index]" placeholder="財務核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-row></el-row>
          <el-divider></el-divider>
          <!-- 第一筆 -->     
          <el-form-item label="第一筆DL" label-width="85px">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDl1[index]" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-row></el-row>
          <el-form-item label="付款日期" label-width="80px">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDlPayDate1[index]" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="金額">
            <el-input v-model="ruleForm.payDetailDlPay1[index]" @input="count" style="width: 130px;" ></el-input>
          </el-form-item> 
          <el-form-item label="付款方式">
            <el-select v-model="ruleForm.payDetailDlType1[index]" placeholder="付款方式" style="width: 110px;">
              <el-option label="轉帳" value="轉帳"></el-option>
              <el-option label="郵局" value="郵局"></el-option>
              <el-option label="刷卡" value="刷卡"></el-option>
              <el-option label="現金" value="現金"></el-option>
              <el-option label="支票" value="支票"></el-option>
              <el-option label="儲值金" value="儲值金"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款證明">
            <el-input v-model="ruleForm.payDetailDlProve1[index]" @input="count" style="width: 110px;"></el-input>
          </el-form-item>

          <el-form-item label="OP核實" class="op">
            <el-select v-model="ruleForm.payDetailDlOpCheck1[index]" placeholder="OP核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" class="admin">
            <el-select v-model="ruleForm.payDetailDlAdminCheck1[index]" placeholder="財務核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-row></el-row>
          <!-- 第二筆 -->
          <el-form-item label="第二筆DL" label-width="85px">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDl2[index]" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-row></el-row> 
          <el-form-item label="付款日期" label-width="80px">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDlPayDate2[index]" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="金額">
            <el-input v-model="ruleForm.payDetailDlPay2[index]" @input="count" style="width: 130px;" ></el-input>
          </el-form-item> 
          <el-form-item label="付款方式">
            <el-select v-model="ruleForm.payDetailDlType2[index]" placeholder="付款方式" style="width: 110px;">
              <el-option label="轉帳" value="轉帳"></el-option>
              <el-option label="郵局" value="郵局"></el-option>
              <el-option label="刷卡" value="刷卡"></el-option>
              <el-option label="現金" value="現金"></el-option>
              <el-option label="支票" value="支票"></el-option>
              <el-option label="儲值金" value="儲值金"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款證明">
            <el-input v-model="ruleForm.payDetailDlProve2[index]" @input="count" style="width: 110px;"></el-input>
          </el-form-item>
          <el-form-item label="OP核實" class="op">
            <el-select v-model="ruleForm.payDetailDlOpCheck2[index]" placeholder="OP核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" class="admin">
            <el-select v-model="ruleForm.payDetailDlAdminCheck2[index]" placeholder="財務核實" style="width: 110px;">
              <el-option label="否" value="false"></el-option>
              <el-option label="是" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-row></el-row>
        </span>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="payDetailAdd();count()"></el-button>
        <el-button type="danger" icon="el-icon-remove-outline" @click="payDetailRemove();count()"></el-button>

        <el-row></el-row>

        
        <el-row :gutter="20">
          <div class="font">保險</div>
        </el-row>

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
        priceDetailItem:[],
        priceDetailPrice:[],
        priceDetailAmount:[],
        priceDetailTotalPrice:[],

        extraDetailItem:[],
        extraDetailPrice:[],
        extraDetailAmount:[],
        extraDetailDays:[],
        extraDetailTotalPrice:[],

        incomeDetailDate:[],
        incomeDetailItem:[],
        incomeDetailIncome:[],
        incomeDetailType:[],
        incomeDetailCard:[],
        incomeDetailReceiveDate:[],
        incomeDetailProve:[],
        incomeDetailOther:[],
        incomeDetailOpCheck:[],
        incomeDetailAdminCheck:[],

        payDetailDate:[],
        payDetailCompany:[],
        payDetailItem:[],
        payDetailDetail:[],
        payDetailPay:[],
        payDetailPayDate:[],
        payDetailType:[],
        payDetailProve:[],
        payDetailOpCheck:[],
        payDetailAdminCheck:[],
        payDetailDl1:[],

        payDetailDl1:[],
        payDetailDlPayDate1:[],
        payDetailDlPay1:[],
        payDetailDlType1:[],
        payDetailDlProve1:[],
        payDetailDlOpCheck1:[],
        payDetailDlAdminCheck1:[],

        payDetailDl2:[],
        payDetailDlPayDate2:[],
        payDetailDlPay2:[],
        payDetailDlType2:[],
        payDetailDlProve2:[],
        payDetailDlOpCheck2:[],
        payDetailDlAdminCheck2:[],


        cancel:'false',
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
      this.ruleForm.payDetailDate.push('');
      this.ruleForm.payDetailCompany.push('');
      this.ruleForm.payDetailItem.push('');
      this.ruleForm.payDetailDetail.push('');
      this.ruleForm.payDetailPay.push('');
      this.ruleForm.payDetailPayDate.push('');
      this.ruleForm.payDetailType.push('');
      this.ruleForm.payDetailProve.push('');
      this.ruleForm.payDetailOpCheck.push('false');
      this.ruleForm.payDetailAdminCheck.push('false');

      this.ruleForm.payDetailDl1.push('');
      this.ruleForm.payDetailDlPayDate1.push('');
      this.ruleForm.payDetailDlPay1.push('');
      this.ruleForm.payDetailDlType1.push('');
      this.ruleForm.payDetailDlProve1.push('');
      this.ruleForm.payDetailDlOpCheck1.push('false');
      this.ruleForm.payDetailDlAdminCheck1.push('false');

      this.ruleForm.payDetailDl2.push('');
      this.ruleForm.payDetailDlPayDate2.push('');
      this.ruleForm.payDetailDlPay2.push('');
      this.ruleForm.payDetailDlType2.push('');
      this.ruleForm.payDetailDlProve2.push('');
      this.ruleForm.payDetailDlOpCheck2.push('false');
      this.ruleForm.payDetailDlAdminCheck2.push('false');
    },
    payDetailRemove(){
      if(this.ruleForm.payDetailOpCheck[this.ruleForm.payDetailOpCheck.length-1] == 'true' 
      || this.ruleForm.payDetailAdminCheck[this.ruleForm.payDetailAdminCheck.length-1] == 'true' 
      || this.ruleForm.payDetailDlOpCheck1[this.ruleForm.payDetailDlOpCheck1.length-1] == 'true'
      || this.ruleForm.payDetailDlAdminCheck1[this.ruleForm.payDetailDlAdminCheck1.length-1] == 'true'
      || this.ruleForm.payDetailDlOpCheck2[this.ruleForm.payDetailDlOpCheck2.length-1] == 'true'
      || this.ruleForm.payDetailDlAdminCheck2[this.ruleForm.payDetailDlAdminCheck2.length-1] == 'true'){
        this.$message.error('該項目已核實，無法刪除');
        return 0;
      }
      this.ruleForm.payDetailDate.pop();
      this.ruleForm.payDetailCompany.pop();
      this.ruleForm.payDetailItem.pop();
      this.ruleForm.payDetailDetail.pop();
      this.ruleForm.payDetailPay.pop();
      this.ruleForm.payDetailPayDate.pop();
      this.ruleForm.payDetailType.pop();
      this.ruleForm.payDetailProve.pop();
      this.ruleForm.payDetailOpCheck.pop();
      this.ruleForm.payDetailAdminCheck.pop();

      this.ruleForm.payDetailDl1.pop();
      this.ruleForm.payDetailDlPayDate1.pop();
      this.ruleForm.payDetailDlPay1.pop();
      this.ruleForm.payDetailDlType1.pop();
      this.ruleForm.payDetailDlProve1.pop();
      this.ruleForm.payDetailDlOpCheck1.pop();
      this.ruleForm.payDetailDlAdminCheck1.pop();

      this.ruleForm.payDetailDl2.pop();
      this.ruleForm.payDetailDlPayDate2.pop();
      this.ruleForm.payDetailDlPay2.pop();
      this.ruleForm.payDetailDlType2.pop();
      this.ruleForm.payDetailDlProve2.pop();
      this.ruleForm.payDetailDlOpCheck2.pop();
      this.ruleForm.payDetailDlAdminCheck2.pop();
    },
    incomeDetailAdd(){
      this.ruleForm.incomeDetailDate.push('');
      this.ruleForm.incomeDetailItem.push('');
      this.ruleForm.incomeDetailIncome.push('');
      this.ruleForm.incomeDetailType.push('匯款');
      this.ruleForm.incomeDetailCard.push('false');
      this.ruleForm.incomeDetailReceiveDate.push('');
      this.ruleForm.incomeDetailProve.push('');
      this.ruleForm.incomeDetailOther.push('');
      this.ruleForm.incomeDetailOpCheck.push('false');
      this.ruleForm.incomeDetailAdminCheck.push('false');
    },
    incomeDetailRemove(){
      if(this.ruleForm.incomeDetailOpCheck[this.ruleForm.incomeDetailOpCheck.length-1] == 'true' || this.ruleForm.incomeDetailAdminCheck[this.ruleForm.incomeDetailAdminCheck.length-1] == 'true'){
        this.$message.error('該項目已核實，無法刪除');
        return 0;
      }
      this.ruleForm.incomeDetailDate.pop();
      this.ruleForm.incomeDetailItem.pop();
      this.ruleForm.incomeDetailIncome.pop();
      this.ruleForm.incomeDetailType.pop();
      this.ruleForm.incomeDetailCard.pop();
      this.ruleForm.incomeDetailReceiveDate.pop();
      this.ruleForm.incomeDetailProve.pop();
      this.ruleForm.incomeDetailOther.pop();
      this.ruleForm.incomeDetailOpCheck.pop();
      this.ruleForm.incomeDetailAdminCheck.pop();
    },
    priceDetailAdd(){
      this.ruleForm.priceDetailItem.push('');
      this.ruleForm.priceDetailPrice.push('');
      this.ruleForm.priceDetailAmount.push('');
      this.ruleForm.priceDetailTotalPrice.push('');

    },
    priceDetailRemove(){
      this.ruleForm.priceDetailItem.pop();
      this.ruleForm.priceDetailPrice.pop();
      this.ruleForm.priceDetailAmount.pop();
      this.ruleForm.priceDetailTotalPrice.pop();
    },
    priceExtraDetailAdd(){
      this.ruleForm.extraDetailItem.push('');
      this.ruleForm.extraDetailPrice.push('');
      this.ruleForm.extraDetailAmount.push('');
      this.ruleForm.extraDetailDays.push('');
      this.ruleForm.extraDetailTotalPrice.push('');
    },
    priceExtraDetailRemove(){
      this.ruleForm.extraDetailItem.pop();
      this.ruleForm.extraDetailPrice.pop();
      this.ruleForm.extraDetailAmount.pop();
      this.ruleForm.extraDetailDays.pop();
      this.ruleForm.extraDetailTotalPrice.pop();
    },
    getNumber(){

    },
    search() {
      let searchChildEvent = {'cs':this.cs,'month':this.month}
      this.$emit("searchChildEvent", searchChildEvent);
    },
    count(){
      this.ruleForm.totalPrice = 0
      for(let i=0;i<this.ruleForm.priceDetailTotalPrice.length;i++){
        this.ruleForm.priceDetailTotalPrice[i] = parseInt(this.ruleForm.priceDetailPrice[i]) * parseInt(this.ruleForm.priceDetailAmount[i])
        this.ruleForm.totalPrice = parseInt(this.ruleForm.totalPrice) + parseInt(this.ruleForm.priceDetailTotalPrice[i])
      }
      for(let i=0;i<this.ruleForm.extraDetailItem.length;i++){
        this.ruleForm.extraDetailTotalPrice[i] = parseInt(this.ruleForm.extraDetailAmount[i]) * parseInt(this.ruleForm.extraDetailPrice[i]) * parseInt(this.ruleForm.extraDetailDays[i])
        this.ruleForm.totalPrice = parseInt(this.ruleForm.totalPrice) + parseInt(this.ruleForm.extraDetailTotalPrice[i])
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
<style>
  .op .el-form-item__label{
    color:rgb(84, 84, 255)
  }
  .admin .el-form-item__label{
    color:rgb(255, 86, 86)
  }
</style>



