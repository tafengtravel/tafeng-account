<template>
  <div class="app-container">
      
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <el-row :gutter="20">
          <div class="sub_title">基本資料</div>
        </el-row>
        <el-card class="box-card">
          <el-form-item label="團號" prop="number">
              <el-input v-model="ruleForm.number" disabled></el-input>
          </el-form-item>            
          <el-form-item label="團名" prop="name">
              <el-input v-model="ruleForm.name" :disabled="ruleForm.lock"></el-input>
          </el-form-item>
          <el-form-item label="客服" prop="cs" >
              <el-select v-model="ruleForm.cs" placeholder="客服" style="width:100px" :disabled="ruleForm.lock">
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
              <el-select v-model="ruleForm.location" placeholder="地點" :disabled="ruleForm.lock">
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
              <el-input v-model="ruleForm.people" :disabled="ruleForm.lock"></el-input>
          </el-form-item>            
          <el-form-item label="人數" prop="amount">
              <el-input v-model="ruleForm.amount" :disabled="ruleForm.lock"></el-input>
          </el-form-item>
          <el-form-item label="電話" prop="phone">
              <el-input v-model="ruleForm.phone" :disabled="ruleForm.lock"></el-input>
          </el-form-item>

          <el-row></el-row>

          <el-form-item label="出發日期" prop="depDate" label-width="80px">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.depDate" :disabled="ruleForm.lock" style="width: 190px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="結束日期" prop="endDate" label-width="80px">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.endDate" :disabled="ruleForm.lock" style="width: 190px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="報帳日期" prop="createDate" label-width="80px">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.createDate" :disabled="ruleForm.lock" style="width: 190px;"></el-date-picker>
          </el-form-item>

          <el-row></el-row>

          <el-form-item label="總團費" prop="totalPrice">
              <el-input v-model="ruleForm.totalPrice" disabled></el-input>
          </el-form-item> 
          <el-form-item label="退業績" prop="cancel" >
              <el-select v-model="ruleForm.cancel" placeholder="退業績" :disabled="ruleForm.lock" style="width: 185px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="退業績日期" prop="cancelDate" label-width="90px">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.cancelDate" :disabled="ruleForm.lock" style="width: 205px;"></el-date-picker>
          </el-form-item>
        </el-card>
        <el-card class="box-card">
          <el-row :gutter="20">
            <div class="font">合約</div>
          </el-row>
          <el-form-item label="合約備註項" label-width="100px">
            <el-input v-model="ruleForm.contractOther" type="textarea" autosize :disabled="ruleForm.lock" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="定金">
              <el-input v-model="ruleForm.contractDownPayment" :disabled="ruleForm.lock"></el-input>
          </el-form-item>
          <el-form-item label="合約項目" prop="cancel" >
            <el-select v-model="ruleForm.contractType" placeholder="合約項目" :disabled="ruleForm.lock" style="width: 165px;">
              <el-option label="國內個別" value="國內個別"></el-option>
              <el-option label="國內團體" value="國內個別"></el-option>
              <el-option label="國外個別" value="國內個別"></el-option>
              <el-option label="國外團體" value="國內個別"></el-option>
              <el-option label="代訂車" value="代訂車"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setContract" :disabled="ruleForm.lock">生成合約</el-button>
          </el-form-item>
          <el-row></el-row>
        </el-card>
        
        <el-row :gutter="20">
          <div class="sub_title">估價單</div>
        </el-row>
        <el-card class="box-card">
          <el-row :gutter="20">
            <div class="font">團費</div>
          </el-row>
          <span v-for="(priceDetailItem,index) in ruleForm.priceDetailItem.length">
            <el-form-item :label="'品項'+(index+1).toString()" label-width="50px">
              <el-input v-model="ruleForm.priceDetailItem[index]" style="width: 250px;" @input="count" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-input>
            </el-form-item>            
            <el-form-item label="單價">
              <el-input v-model="ruleForm.priceDetailPrice[index]" style="width: 100px;" @input="count" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-input>
            </el-form-item>
            <el-form-item label="x 人數">
              <el-input v-model="ruleForm.priceDetailAmount[index]" style="width: 100px;" @input="count" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-input>
            </el-form-item>
            <el-form-item label="= 費用" @input="count">
              <el-input v-model="ruleForm.priceDetailTotalPrice[index]" disabled ></el-input>
            </el-form-item>
            <el-row></el-row>
          </span>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="priceDetailAdd();count()" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-button>
          <el-button type="danger" icon="el-icon-remove-outline" @click="priceDetailRemove();count()" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-button>
        
          <el-row></el-row>
        </el-card>
        <el-card class="box-card">
          <el-row :gutter="20">
            <div class="font">加購項目</div>
          </el-row>
          <span v-for="(extraDetailItem,index) in ruleForm.extraDetailItem.length">
            <el-form-item :label="'品項'+(index+1).toString()" label-width="50px">
              <el-input v-model="ruleForm.extraDetailItem[index]" style="width: 250px;" @input="count" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-input>
            </el-form-item>            
            <el-form-item label="單價">
              <el-input v-model="ruleForm.extraDetailPrice[index]" style="width: 100px;" @input="count" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-input>
            </el-form-item>
            <el-form-item label="x 數量">
              <el-input v-model="ruleForm.extraDetailAmount[index]" style="width: 100px;" @input="count" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-input>
            </el-form-item>
            <el-form-item label="x 天數">
              <el-input v-model="ruleForm.extraDetailDays[index]" style="width: 100px;" @input="count" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-input>
            </el-form-item>
            <el-form-item label="= 費用">
              <el-input v-model="ruleForm.extraDetailTotalPrice[index]" disabled ></el-input>
            </el-form-item>
            <el-row></el-row>
          </span>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="priceExtraDetailAdd();count()" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-button>
          <el-button type="danger" icon="el-icon-remove-outline" @click="priceExtraDetailRemove();count()" :disabled="ruleForm.priceDetailAdminCheck||ruleForm.lock"></el-button>
          <el-row></el-row>
          <el-form-item label="主管核實">
            <el-select v-model="ruleForm.priceDetailAdminCheck" placeholder="核實" style="width: 110px;" :disabled="ruleForm.lock">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-row></el-row>
        </el-card>
        <el-row :gutter="20">
          <div class="sub_title">收入</div>
        </el-row>
        <el-card class="box-card">
          <span v-for="(incomeDetailItem,index) in ruleForm.incomeDetailItem.length">
            <el-row :gutter="20">
              <div class="font">{{index+1}}.</div>
            </el-row>
            
            <el-form-item label="報帳日期">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.incomeDetailDate[index]" :disabled="ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index]" style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="品項">
              <el-input v-model="ruleForm.incomeDetailItem[index]" :disabled="ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index]"></el-input>
            </el-form-item> 
            <el-form-item label="收入">
              <el-input v-model="ruleForm.incomeDetailIncome[index]" :disabled="ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index]" @input="count" ></el-input>
            </el-form-item> 
            <el-form-item label="收款方式">
              <el-select v-model="ruleForm.incomeDetailType[index]" placeholder="收款方式" :disabled="ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index]" style="width: 110px;">
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
              <el-select v-model="ruleForm.incomeDetailCard[index]" placeholder="國旅卡" :disabled="ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index]" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>

            <el-row></el-row>

            <el-form-item label="收款日期">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.incomeDetailReceiveDate[index]" :disabled="ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index]" style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="收款證明">
              <el-input v-model="ruleForm.incomeDetailProve[index]" :disabled="ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index]" ></el-input>
            </el-form-item> 
            <el-form-item label="備註">
              <el-input v-model="ruleForm.incomeDetailOther[index]" :disabled="ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index]" ></el-input>
            </el-form-item> 
            <el-form-item label="OP核實" class="op">
              <el-select v-model="ruleForm.incomeDetailOpCheck[index]" placeholder="OP核實" :disabled="ruleForm.lock||ruleForm.incomeDetailAdminCheck[index]" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" class="admin">
              <el-select v-model="ruleForm.incomeDetailAdminCheck[index]" placeholder="財務核實" :disabled="ruleForm.lock" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
          </span>
          

          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="incomeDetailAdd();count()" :disabled="ruleForm.lock"></el-button>
          <el-button type="danger" icon="el-icon-remove-outline" @click="incomeDetailRemove();count()" :disabled="ruleForm.lock"></el-button>
        </el-card>
        <el-row></el-row>

        <el-row :gutter="20">
          <div class="sub_title">支出</div>
        </el-row>
        <el-card class="box-card">
          <span v-for="(payDetailCompany,index) in ruleForm.payDetailCompany.length">
            <el-row :gutter="20">
              <div class="font">{{index+1}}.</div>
            </el-row>
            
            <el-form-item label="報帳日期">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDate[index]" :disabled="ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index]" style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="廠商">
              <el-input v-model="ruleForm.payDetailCompany[index]" :disabled="ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index]"></el-input>
            </el-form-item> 
            <el-form-item label="品項">
              <el-input v-model="ruleForm.payDetailItem[index]" :disabled="ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index]" @input="count" ></el-input>
            </el-form-item> 
            <el-form-item label="明細">
              <el-input v-model="ruleForm.payDetailDetail[index]" :disabled="ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index]" @input="count" ></el-input>
            </el-form-item> 
            <el-form-item label="支出">
              <el-input v-model="ruleForm.payDetailPay[index]" :disabled="ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index]" @input="count" style="width: 130px;" ></el-input>
            </el-form-item> 

            <el-row></el-row>     

            <el-form-item label="付款日期">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailPayDate[index]" :disabled="ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index]" style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="付款方式">
              <el-select v-model="ruleForm.payDetailType[index]" :disabled="ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index]" placeholder="收款方式">
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
              <el-input v-model="ruleForm.payDetailProve[index]" :disabled="ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index]" @input="count" ></el-input>
            </el-form-item>
            <el-form-item label="OP核實" class="op">
              <el-select v-model="ruleForm.payDetailOpCheck[index]" :disabled="ruleForm.lock||ruleForm.payDetailAdminCheck[index]" placeholder="OP核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" class="admin">
              <el-select v-model="ruleForm.payDetailAdminCheck[index]" :disabled="ruleForm.lock" placeholder="財務核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
            <el-divider></el-divider>
            <!-- 第一筆 -->     
            <el-form-item label="第一筆DL" label-width="85px">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDl1[index]" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index]" style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-row></el-row>
            <el-form-item label="付款日期" label-width="80px">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDlPayDate1[index]" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index]" style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="金額">
              <el-input v-model="ruleForm.payDetailDlPay1[index]" @input="count" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index]" style="width: 130px;" ></el-input>
            </el-form-item> 
            <el-form-item label="付款方式">
              <el-select v-model="ruleForm.payDetailDlType1[index]" placeholder="付款方式" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index]" style="width: 110px;">
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
              <el-input v-model="ruleForm.payDetailDlProve1[index]" @input="count" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index]" style="width: 110px;"></el-input>
            </el-form-item>

            <el-form-item label="OP核實" class="op">
              <el-select v-model="ruleForm.payDetailDlOpCheck1[index]" placeholder="OP核實" :disabled="ruleForm.lock||ruleForm.payDetailDlAdminCheck1[index]" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" class="admin">
              <el-select v-model="ruleForm.payDetailDlAdminCheck1[index]" placeholder="財務核實" :disabled="ruleForm.lock" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
            <!-- 第二筆 -->
            <el-form-item label="第二筆DL" label-width="85px">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDl2[index]" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index]" style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-row></el-row> 
            <el-form-item label="付款日期" label-width="80px">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDlPayDate2[index]" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index]" style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="金額">
              <el-input v-model="ruleForm.payDetailDlPay2[index]" @input="count" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index]" style="width: 130px;" ></el-input>
            </el-form-item> 
            <el-form-item label="付款方式">
              <el-select v-model="ruleForm.payDetailDlType2[index]" placeholder="付款方式" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index]" style="width: 110px;">
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
              <el-input v-model="ruleForm.payDetailDlProve2[index]" @input="count" :disabled="ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index]" style="width: 110px;"></el-input>
            </el-form-item>
            <el-form-item label="OP核實" class="op">
              <el-select v-model="ruleForm.payDetailDlOpCheck2[index]" placeholder="OP核實" :disabled="ruleForm.lock||ruleForm.payDetailDlAdminCheck2[index]" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" class="admin">
              <el-select v-model="ruleForm.payDetailDlAdminCheck2[index]" placeholder="財務核實" :disabled="ruleForm.lock" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
          </span>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="payDetailAdd();count()" :disabled="ruleForm.lock"></el-button>
          <el-button type="danger" icon="el-icon-remove-outline" @click="payDetailRemove();count()" :disabled="ruleForm.lock"></el-button>
        </el-card>  
        <!-- 保險 -->
        <el-row :gutter="20">
          <div class="sub_title">保險</div>
        </el-row>
        <el-card class="box-card">
          <!-- 旅責險 -->
          <el-form-item label="是否保旅責險" label-width="100px">
            <el-select v-model="ruleForm.insurance1" placeholder="請選擇" style="width: 110px;" :disabled="ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金額">
            <el-input v-model="ruleForm.insurancePrice1" @input="count" style="width: 100px;" :disabled="ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock" ></el-input>
          </el-form-item> 
          <el-form-item label="x 天數">
            <el-input v-model="ruleForm.insuranceDays1" @input="count" style="width: 80px;" :disabled="ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock"></el-input>
          </el-form-item> 
          <el-form-item label="x 人數">
            <el-input v-model="ruleForm.insuranceAmount1" @input="count" style="width: 80px;" :disabled="ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock"></el-input>
          </el-form-item> 
          <el-form-item label="= 費用">
            <el-input v-model="ruleForm.insuranceTotalPrice1" @input="count" style="width: 100px;" disabled></el-input>
          </el-form-item> 
          <el-form-item label="OP核實" class="op">
            <el-select v-model="ruleForm.insuranceOpCheck1" placeholder="OP核實" :disabled="ruleForm.insuranceAdminCheck1||ruleForm.lock" style="width: 110px;">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" class="admin">
            <el-select v-model="ruleForm.insuranceAdminCheck1" placeholder="財務核實" :disabled="ruleForm.lock" style="width: 110px;">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <!-- 旅平險 -->
          <el-form-item label="是否保旅平險" label-width="100px">
            <el-select v-model="ruleForm.insurance2" placeholder="請選擇" style="width: 110px;" :disabled="ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金額">
            <el-input v-model="ruleForm.insurancePrice2" @input="count" style="width: 100px;" :disabled="ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock"></el-input>
          </el-form-item> 
          <el-form-item label="x 天數">
            <el-input v-model="ruleForm.insuranceDays2" @input="count" style="width: 80px;" :disabled="ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock"></el-input>
          </el-form-item> 
          <el-form-item label="x 人數">
            <el-input v-model="ruleForm.insuranceAmount2" @input="count" style="width: 80px;" :disabled="ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock"></el-input>
          </el-form-item> 
          <el-form-item label="= 費用">
            <el-input v-model="ruleForm.insuranceTotalPrice2" @input="count" style="width: 100px;" disabled></el-input>
          </el-form-item> 
          <el-form-item label="OP核實" class="op">
            <el-select v-model="ruleForm.insuranceOpCheck2" placeholder="OP核實" style="width: 110px;" :disabled="ruleForm.insuranceAdminCheck2||ruleForm.lock">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" class="admin">
            <el-select v-model="ruleForm.insuranceAdminCheck2" placeholder="財務核實" style="width: 110px;" :disabled="ruleForm.lock">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
        </el-card>
        <el-row :gutter="20">
          <div class="sub_title">其他</div>
        </el-row>
        <el-card class="box-card">
          <el-form-item label="進項代收轉付" label-width="100px">
            <el-input v-model="ruleForm.incollectpay" type="textarea" autosize style="width: 300px;"></el-input>
          </el-form-item> 
          <el-form-item label="進項代收轉付" label-width="100px">
            <el-input v-model="ruleForm.outcollectpay" type="textarea" autosize style="width: 300px;"></el-input>
          </el-form-item> 
          <el-form-item label="其他項目備註" label-width="100px">
            <el-input v-model="ruleForm.other" type="textarea" autosize style="width: 300px;"></el-input>
          </el-form-item> 
        </el-card>
        <el-row :gutter="20">
          <div class="sub_title">費用統計</div>
        </el-row>
        <el-card class="box-card">
          <el-form-item label="總團費">
            <el-input v-model="ruleForm.totalPrice" disabled></el-input>
          </el-form-item> 
          <el-form-item label="總NET">
            <el-input v-model="ruleForm.net" disabled></el-input>
          </el-form-item> 
          <el-form-item label="利潤">
            <el-input v-model="ruleForm.profit" disabled></el-input>
          </el-form-item> 
          <el-row></el-row>
          <el-form-item label="總收入">
            <el-input v-model="ruleForm.totalIncome" disabled></el-input>
          </el-form-item> 
          <el-form-item label="5%稅金">
            <el-input v-model="ruleForm.tax" disabled></el-input>
          </el-form-item> 
        </el-card>
        <el-form-item>
          <el-form-item label="鎖定" class="admin">
            <el-select v-model="ruleForm.lock" placeholder="鎖定" style="width: 110px;">
              <el-option label="否" :value= false ></el-option>
              <el-option label="是" :value= true ></el-option>
            </el-select>
          </el-form-item>
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
      false:false,
      true:true,
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

        priceDetailAdminCheck:false,
        insurance1:false,
        insurance2:false,
        insuranceOpCheck1:false,
        insuranceAdminCheck1:false,
        insuranceOpCheck2:false,
        insuranceAdminCheck2:false,
        cancel:false,
        lock:false,
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
    setContract(){

    },
    payDetailAdd(){
      this.ruleForm.payDetailDate.push('');
      this.ruleForm.payDetailCompany.push('');
      this.ruleForm.payDetailItem.push('');
      this.ruleForm.payDetailDetail.push('');
      this.ruleForm.payDetailPay.push('');
      this.ruleForm.payDetailPayDate.push('');
      this.ruleForm.payDetailType.push('');
      this.ruleForm.payDetailProve.push('');
      this.ruleForm.payDetailOpCheck.push(false);
      this.ruleForm.payDetailAdminCheck.push(false);

      this.ruleForm.payDetailDl1.push('');
      this.ruleForm.payDetailDlPayDate1.push('');
      this.ruleForm.payDetailDlPay1.push('');
      this.ruleForm.payDetailDlType1.push('');
      this.ruleForm.payDetailDlProve1.push('');
      this.ruleForm.payDetailDlOpCheck1.push(false);
      this.ruleForm.payDetailDlAdminCheck1.push(false);

      this.ruleForm.payDetailDl2.push('');
      this.ruleForm.payDetailDlPayDate2.push('');
      this.ruleForm.payDetailDlPay2.push('');
      this.ruleForm.payDetailDlType2.push('');
      this.ruleForm.payDetailDlProve2.push('');
      this.ruleForm.payDetailDlOpCheck2.push(false);
      this.ruleForm.payDetailDlAdminCheck2.push(false);
    },
    payDetailRemove(){
      if(this.ruleForm.payDetailOpCheck[this.ruleForm.payDetailOpCheck.length-1]
      || this.ruleForm.payDetailAdminCheck[this.ruleForm.payDetailAdminCheck.length-1]
      || this.ruleForm.payDetailDlOpCheck1[this.ruleForm.payDetailDlOpCheck1.length-1] 
      || this.ruleForm.payDetailDlAdminCheck1[this.ruleForm.payDetailDlAdminCheck1.length-1]
      || this.ruleForm.payDetailDlOpCheck2[this.ruleForm.payDetailDlOpCheck2.length-1]
      || this.ruleForm.payDetailDlAdminCheck2[this.ruleForm.payDetailDlAdminCheck2.length-1]){
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
      this.ruleForm.incomeDetailCard.push(false);
      this.ruleForm.incomeDetailReceiveDate.push('');
      this.ruleForm.incomeDetailProve.push('');
      this.ruleForm.incomeDetailOther.push('');
      this.ruleForm.incomeDetailOpCheck.push(false);
      this.ruleForm.incomeDetailAdminCheck.push(false);
    },
    incomeDetailRemove(){
      if(this.ruleForm.incomeDetailOpCheck[this.ruleForm.incomeDetailOpCheck.length-1]|| this.ruleForm.incomeDetailAdminCheck[this.ruleForm.incomeDetailAdminCheck.length-1]){
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
      if(this.ruleForm.priceDetailAdminCheck){
        this.$message.error('該項目已核實，無法刪除');
        return 0;
      }
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
      if(this.ruleForm.priceDetailAdminCheck){
        this.$message.error('該項目已核實，無法刪除');
        return 0;
      }
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
  .el-card{
    margin-bottom:20px; 
  }
  .app-container {
    padding: 7px;
  }
</style>



