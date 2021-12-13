<template>
  <div class="app-container">
      
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-position="left" label-width="70px" class="demo-ruleForm">
        <el-row :gutter="20">
          <div class="sub_title">基本資料</div>
        </el-row>
        <el-card class="box-card">
          <el-form-item label="團號" prop="number">
            <span class="form-font-xl" v-if="(ruleForm.lock||readNumber)&&!adminShow">{{ruleForm.number}}</span>
            <el-input v-model="ruleForm.number" v-else :disabled="readNumber"></el-input>
          </el-form-item>            
          <el-form-item label="團名" prop="name">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.name}}</span>
            <el-input v-model="ruleForm.name" v-else></el-input>
          </el-form-item>
          <el-form-item label="客服" prop="cs" >
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.cs}}</span>
            <el-select v-model="ruleForm.cs" v-else placeholder="客服" style="width:100px" >
              <el-option
                v-for="item in csOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="read">讀取團號</el-button>
          </el-form-item>
          <el-form-item label="地點" prop="location" >
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.location}}</span>
            <el-select v-model="ruleForm.location" style="width: 200px;" v-else placeholder="地點">
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
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.people}}</span>
            <el-input v-model="ruleForm.people" v-else></el-input>
          </el-form-item>            
          <el-form-item label="人數" prop="amount">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.amount}}</span>
            <el-input v-model="ruleForm.amount" v-else></el-input>
          </el-form-item>
          <el-form-item label="電話" prop="phone">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.phone}}</span>
            <el-input v-model="ruleForm.phone" v-else></el-input>
          </el-form-item>

          <el-row></el-row>

          <el-form-item label="出發日期" prop="depDate" label-width="80px">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.depDate}}</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.depDate" v-else style="width: 190px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="結束日期" prop="endDate" label-width="80px">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.endDate}}</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.endDate" v-else style="width: 190px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="報帳日期" prop="createDate" label-width="80px">
            <span class="form-font-xl" v-if="(ruleForm.lock||createDate)&&!adminShow">{{ruleForm.createDate}}</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.createDate" v-else style="width: 190px;" :picker-options="createDateDisable"></el-date-picker>
          </el-form-item>

          <el-row></el-row>

          <el-form-item label="總團費">
              <span class="form-font-xl">{{ruleForm.price}}</span>
          </el-form-item> 
          <el-form-item label="退業績">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.cancel}}</span>
            <el-select v-model="ruleForm.cancel" v-else placeholder="退業績" style="width: 185px;">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退業績日期" label-width="90px">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.cancelDate}}</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.cancelDate" v-else style="width: 205px;"></el-date-picker>
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
          <el-form-item label="合約項目">
            <el-select v-model="ruleForm.contractType" placeholder="合約項目" :disabled="ruleForm.lock" style="width: 165px;">
              <el-option label="國內個別" value="國內個別"></el-option>
              <el-option label="國內團體" value="國內團體"></el-option>
              <el-option label="國外個別" value="國外個別"></el-option>
              <el-option label="國外團體" value="國外團體"></el-option>
              <el-option label="代訂車" value="代訂車"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setContract" v-if="!ruleForm.lock||adminShow">生成合約</el-button>
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
              <span class="form-font-xl" v-if="(ruleForm.priceDetailAdminCheck||ruleForm.lock)&&!adminShow">{{ruleForm.priceDetailItem[index]}}</span>
              <el-input v-model="ruleForm.priceDetailItem[index]" v-else style="width: 250px;" @input="count" ></el-input>
            </el-form-item>            
            <el-form-item label="單價">
              <span class="form-font-sm" v-if="(ruleForm.priceDetailAdminCheck||ruleForm.lock)&&!adminShow">{{ruleForm.priceDetailPrice[index]}}</span>
              <el-input v-model="ruleForm.priceDetailPrice[index]" v-else style="width: 100px;" @input="count" ></el-input>
            </el-form-item>
            <el-form-item label="x 人數">
              <span class="form-font-sm" v-if="(ruleForm.priceDetailAdminCheck||ruleForm.lock)&&!adminShow">{{ruleForm.priceDetailAmount[index]}}</span>
              <el-input v-model="ruleForm.priceDetailAmount[index]" v-else style="width: 100px;" @input="count" ></el-input>
            </el-form-item>
            <el-form-item label="= 費用">
              <span class="form-font-sm">{{ruleForm.priceDetailTotalPrice[index]}}</span>
            </el-form-item>
            <el-row></el-row>
          </span>
          <el-button type="primary" icon="el-icon-circle-plus-outline"  v-if="!(ruleForm.priceDetailAdminCheck||ruleForm.lock)||adminShow" :disabled="ruleForm.lock" @click="priceDetailAdd();count()" ></el-button>
          <el-button type="danger" icon="el-icon-remove-outline" v-if="!(ruleForm.priceDetailAdminCheck||ruleForm.lock)||adminShow" :disabled="ruleForm.lock" @click="priceDetailRemove();count()" ></el-button>
        
          <el-row></el-row>
        </el-card>
        <el-card class="box-card">
          <el-row :gutter="20">
            <div class="font">加購項目</div>
          </el-row>
          <span v-for="(extraDetailItem,index) in ruleForm.extraDetailItem.length">
            <el-form-item :label="'品項'+(index+1).toString()" label-width="50px">
              <span class="form-font-xl" v-if="(ruleForm.priceDetailAdminCheck||ruleForm.lock)&&!adminShow">{{ruleForm.extraDetailItem[index]}}</span>
              <el-input v-model="ruleForm.extraDetailItem[index]" v-else style="width: 250px;" @input="count" ></el-input>
            </el-form-item>            
            <el-form-item label="單價">
              <span class="form-font-sm" v-if="(ruleForm.priceDetailAdminCheck||ruleForm.lock)&&!adminShow">{{ruleForm.extraDetailPrice[index]}}</span>
              <el-input v-model="ruleForm.extraDetailPrice[index]" v-else style="width: 100px;" @input="count" ></el-input>
            </el-form-item>
            <el-form-item label="x 數量">
              <span class="form-font-sm" v-if="(ruleForm.priceDetailAdminCheck||ruleForm.lock)&&!adminShow">{{ruleForm.extraDetailAmount[index]}}</span>
              <el-input v-model="ruleForm.extraDetailAmount[index]" v-else style="width: 100px;" @input="count" ></el-input>
            </el-form-item>
            <el-form-item label="x 天數">
              <span class="form-font-sm" v-if="(ruleForm.priceDetailAdminCheck||ruleForm.lock)&&!adminShow">{{ruleForm.extraDetailDays[index]}}</span>
              <el-input v-model="ruleForm.extraDetailDays[index]" v-else style="width: 100px;" @input="count" ></el-input>
            </el-form-item>
            <el-form-item label="= 費用">
              <span class="form-font-sm">{{ruleForm.extraDetailTotalPrice[index]}}</span>
            </el-form-item>
            <el-row></el-row>
          </span>
          <el-button type="primary" icon="el-icon-circle-plus-outline" v-if="!(ruleForm.priceDetailAdminCheck||ruleForm.lock)||adminShow" :disabled="ruleForm.lock" @click="priceExtraDetailAdd();count()" ></el-button>
          <el-button type="danger" icon="el-icon-remove-outline" v-if="!(ruleForm.priceDetailAdminCheck||ruleForm.lock)||adminShow" :disabled="ruleForm.lock" @click="priceExtraDetailRemove();count()" ></el-button>
          <el-row></el-row>
          <el-form-item label="主管核實">
            <!-- csShow false 顯示label opShow false 顯示label adminShow false 顯示label adminShow true 顯示select -->
            <span class="form-font-sm" v-if="!adminShow">{{ruleForm.priceDetailAdminCheck}}</span>
            <el-select v-model="ruleForm.priceDetailAdminCheck" placeholder="核實" style="width: 110px;" v-else >
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
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.incomeDetailDate[index]" v-else style="width: 150px;" :picker-options="createDateDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="品項">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailItem[index]}}</span>
              <el-input v-model="ruleForm.incomeDetailItem[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="收入">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailIncome[index]}}</span>
              <el-input v-model="ruleForm.incomeDetailIncome[index]" v-else @input="count" ></el-input>
            </el-form-item> 
            <el-form-item label="收款方式">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailType[index]}}</span>
              <el-select v-model="ruleForm.incomeDetailType[index]" placeholder="收款方式" v-else @input="count" style="width: 110px;">
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
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailCard[index]}}</span>
              <el-select v-model="ruleForm.incomeDetailCard[index]" placeholder="國旅卡" v-else style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>

            <el-row></el-row>

            <el-form-item label="收款日期">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailReceiveDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.incomeDetailReceiveDate[index]" v-else style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="收款證明">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailProve[index]}}</span>
              <el-input v-model="ruleForm.incomeDetailProve[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="備註">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailOther[index]}}</span>
              <el-input v-model="ruleForm.incomeDetailOther[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="OP核實" class="op">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index]||!opShow)&&!adminShow">{{ruleForm.incomeDetailOpCheck[index]}}</span>
              <el-select v-model="ruleForm.incomeDetailOpCheck[index]" v-else placeholder="OP核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" class="admin">
              <span class="form-font-sm" v-if="!adminShow">{{ruleForm.incomeDetailAdminCheck[index]}}</span>
              <el-select v-model="ruleForm.incomeDetailAdminCheck[index]" v-else placeholder="財務核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
          </span>
          
          <el-button type="primary" icon="el-icon-circle-plus-outline" v-if="!ruleForm.lock||adminShow" @click="incomeDetailAdd();count()" :disabled="ruleForm.lock"></el-button>
          <el-button type="danger" icon="el-icon-remove-outline" v-if="!ruleForm.lock||adminShow" @click="incomeDetailRemove();count()" :disabled="ruleForm.lock"></el-button>
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
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDate[index]" v-else style="width: 150px;" :picker-options="createDateDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="廠商">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailCompany[index]}}</span>
              <el-input v-model="ruleForm.payDetailCompany[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="品項">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailItem[index]}}</span>
              <el-input v-model="ruleForm.payDetailItem[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="明細">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailDetail[index]}}</span>
              <el-input v-model="ruleForm.payDetailDetail[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="支出">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailPay[index]}}</span>
              <el-input v-model="ruleForm.payDetailPay[index]" v-else @input="count" style="width: 130px;" ></el-input>
            </el-form-item> 

            <el-row></el-row>     

            <el-form-item label="付款日期">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailPayDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailPayDate[index]" v-else style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="付款方式">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailType[index]}}</span>
              <el-select v-model="ruleForm.payDetailType[index]" v-else placeholder="付款方式">
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
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailProve[index]}}</span>
              <el-input v-model="ruleForm.payDetailProve[index]" v-else></el-input>
            </el-form-item>
            <el-form-item label="OP核實" class="op">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index]||!opShow)&&!adminShow">{{ruleForm.payDetailOpCheck[index]}}</span>
              <el-select v-model="ruleForm.payDetailOpCheck[index]" v-else placeholder="OP核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" class="admin">
              <span class="form-font-sm" v-if="!adminShow">{{ruleForm.payDetailAdminCheck[index]}}</span>
              <el-select v-model="ruleForm.payDetailAdminCheck[index]" v-else placeholder="財務核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
            <el-divider></el-divider>
            <!-- 第一筆 -->     
            <el-form-item label="第一筆DL" label-width="85px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDl1[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDl1[index]" v-else style="width: 150px;" :picker-options="dlDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="匯費 $15">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailFee1[index]}}</span>
              <el-checkbox v-model="ruleForm.payDetailFee1[index]" v-else @input="count"></el-checkbox>
            </el-form-item>
            <el-row></el-row>
            <el-form-item label="付款日期" label-width="80px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDlPayDate1[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDlPayDate1[index]" v-else style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="金額">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDlPay1[index]}}</span>
              <el-input v-model="ruleForm.payDetailDlPay1[index]" @input="count" v-else style="width: 130px;" ></el-input>
            </el-form-item> 
            <el-form-item label="付款方式">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDlType1[index]}}</span>
              <el-select v-model="ruleForm.payDetailDlType1[index]" placeholder="付款方式" v-else style="width: 110px;">
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
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDlProve1[index]}}</span>
              <el-input v-model="ruleForm.payDetailDlProve1[index]" @input="count" v-else style="width: 110px;"></el-input>
            </el-form-item>
            <el-form-item label="OP核實" class="op">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index]||!opShow)&&!adminShow">{{ruleForm.payDetailDlOpCheck1[index]}}</span>
              <el-select v-model="ruleForm.payDetailDlOpCheck1[index]" placeholder="OP核實" v-else style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" class="admin">
              <span class="form-font-sm" v-if="!adminShow">{{ruleForm.payDetailDlAdminCheck1[index]}}</span>
              <el-select v-model="ruleForm.payDetailDlAdminCheck1[index]" v-else placeholder="財務核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
            <!-- 第二筆 -->
            <el-form-item label="第二筆DL" label-width="85px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDl2[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDl2[index]" v-else style="width: 150px;" :picker-options="dlDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="匯費 $15">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailFee2[index]}}</span>
              <el-checkbox v-model="ruleForm.payDetailFee2[index]" @input="count" v-else></el-checkbox>
            </el-form-item>
            <el-row></el-row> 
            <el-form-item label="付款日期" label-width="80px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDlPayDate2[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDlPayDate2[index]" v-else style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="金額">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDlPay2[index]}}</span>
              <el-input v-model="ruleForm.payDetailDlPay2[index]" v-else style="width: 130px;" ></el-input>
            </el-form-item> 
            <el-form-item label="付款方式">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDlType2[index]}}</span>
              <el-select v-model="ruleForm.payDetailDlType2[index]" placeholder="付款方式" v-else style="width: 110px;">
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
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDlProve2[index]}}</span>
              <el-input v-model="ruleForm.payDetailDlProve2[index]" v-else style="width: 110px;"></el-input>
            </el-form-item>
            <el-form-item label="OP核實" class="op">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index]||!opShow)&&!adminShow">{{ruleForm.payDetailDlOpCheck2[index]}}</span>
              <el-select v-model="ruleForm.payDetailDlOpCheck2[index]" placeholder="OP核實" v-else style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" class="admin">
              <span class="form-font-sm" v-if="!adminShow">{{ruleForm.payDetailDlAdminCheck2[index]}}</span>
              <el-select v-model="ruleForm.payDetailDlAdminCheck2[index]" placeholder="財務核實" v-else style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
          </span>
          <el-button type="primary" icon="el-icon-circle-plus-outline" v-if="!ruleForm.lock||adminShow" @click="payDetailAdd();count()" :disabled="ruleForm.lock"></el-button>
          <el-button type="danger" icon="el-icon-remove-outline" v-if="!ruleForm.lock||adminShow" @click="payDetailRemove();count()" :disabled="ruleForm.lock"></el-button>
        </el-card>  
        <!-- 保險 -->
        <el-row :gutter="20">
          <div class="sub_title">保險</div>
        </el-row>
        <el-card class="box-card">
          <!-- 旅責險 -->
          <el-form-item label="是否保旅責險" label-width="100px">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock)&&!adminShow">{{ruleForm.insurance1}}</span>
            <el-select v-model="ruleForm.insurance1" @input="count" placeholder="請選擇" style="width: 110px;" v-else>
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金額">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock)&&!adminShow">{{ruleForm.insurancePrice1}}</span>
            <el-input v-model="ruleForm.insurancePrice1" @input="count" style="width: 100px;" v-else ></el-input>
          </el-form-item> 
          <el-form-item label="x 天數">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock)&&!adminShow">{{ruleForm.insuranceDays1}}</span>
            <el-input v-model="ruleForm.insuranceDays1" @input="count" style="width: 80px;" v-else></el-input>
          </el-form-item> 
          <el-form-item label="x 人數">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock)&&!adminShow">{{ruleForm.insuranceAmount1}}</span>
            <el-input v-model="ruleForm.insuranceAmount1" @input="count" style="width: 80px;" v-else></el-input>
          </el-form-item> 
          <el-form-item label="= 費用">
            <span class="form-font-sm">{{ruleForm.insuranceTotalPrice1}}</span>
          </el-form-item> 
          <el-form-item label="OP核實" class="op">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock||!opShow)&&!adminShow">{{ruleForm.insuranceOpCheck1}}</span>
            <el-select v-model="ruleForm.insuranceOpCheck1" placeholder="OP核實" v-else style="width: 110px;">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" class="admin">
            <span class="form-font-sm" v-if="!adminShow">{{ruleForm.insuranceAdminCheck1}}</span>
            <el-select v-model="ruleForm.insuranceAdminCheck1" placeholder="財務核實" v-else style="width: 110px;">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-row></el-row>
          <!-- 旅平險 -->
          <el-form-item label="是否保旅平險" label-width="100px">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock)&&!adminShow">{{ruleForm.insurance2}}</span>
            <el-select v-model="ruleForm.insurance2" @input="count" placeholder="請選擇" style="width: 110px;" v-else>
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金額">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock)&&!adminShow">{{ruleForm.insurancePrice2}}</span>
            <el-input v-model="ruleForm.insurancePrice2" @input="count" style="width: 100px;" v-else></el-input>
          </el-form-item> 
          <el-form-item label="x 天數">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock)&&!adminShow">{{ruleForm.insuranceDays2}}</span>
            <el-input v-model="ruleForm.insuranceDays2" @input="count" style="width: 80px;" v-else></el-input>
          </el-form-item> 
          <el-form-item label="x 人數">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock)&&!adminShow">{{ruleForm.insuranceAmount2}}</span>
            <el-input v-model="ruleForm.insuranceAmount2" @input="count" style="width: 80px;" v-else></el-input>
          </el-form-item> 
          <el-form-item label="= 費用">
            <span class="form-font-sm">{{ruleForm.insuranceTotalPrice2}}</span>
          </el-form-item> 
          <el-form-item label="OP核實" class="op">
            <span class="form-font-sm" v-if="(ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock||!opShow)&&!adminShow">{{ruleForm.insuranceOpCheck2}}</span>
            <el-select v-model="ruleForm.insuranceOpCheck2" placeholder="OP核實" style="width: 110px;" v-else>
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" class="admin">
            <span class="form-font-sm" v-if="!adminShow">{{ruleForm.insuranceAdminCheck2}}</span>
            <el-select v-model="ruleForm.insuranceAdminCheck2" placeholder="財務核實" v-else style="width: 110px;">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
        </el-card>
        <!-- 退款 -->
        <el-row :gutter="20">
          <div class="sub_title">退款</div>
        </el-row>
        <el-card class="box-card">
          <span v-for="(refundDetailItem,index) in ruleForm.refundDetailItem.length">
            <el-row :gutter="20">
              <div class="font">{{index+1}}.</div>
            </el-row>
            
            <el-form-item label="報帳日期">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.refundDetailDate[index]" v-else style="width: 150px;" :picker-options="createDateDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="品項">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailItem[index]}}</span>
              <el-input v-model="ruleForm.refundDetailItem[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="金額">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailRefund[index]}}</span>
              <el-input v-model="ruleForm.refundDetailRefund[index]" v-else @input="count" ></el-input>
            </el-form-item> 
            <el-form-item label="退款方式">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailType[index]}}</span>
              <el-select v-model="ruleForm.refundDetailType[index]" placeholder="退款方式" v-else @input="count" style="width: 110px;">
                <el-option label="轉帳" value="轉帳"></el-option>
                <el-option label="郵局" value="郵局"></el-option>
                <el-option label="刷卡" value="刷卡"></el-option>
                <el-option label="現金" value="現金"></el-option>
                <el-option label="支票" value="支票"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>

            <el-row></el-row>

            <el-form-item label="退款日期">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailRefundDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.refundDetailRefundDate[index]" v-else style="width: 150px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="退款證明">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailProve[index]}}</span>
              <el-input v-model="ruleForm.refundDetailProve[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="備註">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailOther[index]}}</span>
              <el-input v-model="ruleForm.refundDetailOther[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="OP核實" class="op">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index]||!opShow)&&!adminShow">{{ruleForm.refundDetailOpCheck[index]}}</span>
              <el-select v-model="ruleForm.refundDetailOpCheck[index]" v-else placeholder="OP核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" class="admin">
              <span class="form-font-sm" v-if="!adminShow">{{ruleForm.refundDetailAdminCheck[index]}}</span>
              <el-select v-model="ruleForm.refundDetailAdminCheck[index]" v-else placeholder="財務核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
          </span>
          
          <el-button type="primary" icon="el-icon-circle-plus-outline" v-if="!ruleForm.lock||adminShow" @click="refundDetailAdd();count()" :disabled="ruleForm.lock"></el-button>
          <el-button type="danger" icon="el-icon-remove-outline" v-if="!ruleForm.lock||adminShow" @click="refundDetailRemove();count()" :disabled="ruleForm.lock"></el-button>
        </el-card>
        <el-row></el-row>

        <el-row :gutter="20">
          <div class="sub_title">其他</div>
        </el-row>
        <el-card class="box-card">
          <el-form-item label="進項代收轉付" label-width="100px">
            <el-input v-model="ruleForm.incollectpay" type="textarea" autosize style="width: 300px;"></el-input>
          </el-form-item> 
          <el-form-item label="銷項代收轉付" label-width="100px">
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
            <span class="form-font-xl">{{ruleForm.price}}</span>
          </el-form-item> 
          <el-form-item label="總NET">
            <span class="form-font-xl">{{ruleForm.net}}</span>
          </el-form-item> 
          <el-form-item label="利潤">
            <span class="form-font-xl">{{ruleForm.profit}}</span>
          </el-form-item> 
          <el-row></el-row>
          <el-form-item label="總收入">
            <span class="form-font-xl">{{ruleForm.income}}</span>
          </el-form-item> 
          <el-form-item label="5%稅金">
            <span class="form-font-xl">{{ruleForm.tax}}</span>
          </el-form-item> 
        </el-card>
        <el-form-item>
          <el-form-item label="鎖定" class="admin">
            <span class="form-font-sm" v-if="!adminShow">{{ruleForm.lock}}</span>
            <el-select v-model="ruleForm.lock" placeholder="鎖定" v-else style="width: 110px;">
              <el-option label="否" :value= false ></el-option>
              <el-option label="是" :value= true ></el-option>
            </el-select>
          </el-form-item>
          <el-button @click="count">試算</el-button>
          <el-button type="primary" v-if="submitShow" @click="submit('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>


      <!-- 估價單 收入 支出 保險 label 已完成 -->
      <!-- 各分頁權限(op 財務核實)尚未完成 -->
  </div>
</template>

<script>
import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import * as moment from "moment/moment";

export default {
  data() {
    return {
      createDateDisable:{
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 24*60*60*1000 || time.getTime() > new Date().getTime()
        }
      },
      dlDisable:{
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 24*60*60*1000 
        }
      },
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
        payDetailFee1:[],
        payDetailDlType1:[],
        payDetailDlProve1:[],
        payDetailDlOpCheck1:[],
        payDetailDlAdminCheck1:[],

        payDetailDl2:[],
        payDetailDlPayDate2:[],
        payDetailDlPay2:[],
        payDetailFee2:[],
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

        refundDetailDate:[],
        refundDetailItem:[],
        refundDetailRefund:[],
        refundDetailType:[],
        refundDetailRefundDate:[],
        refundDetailProve:[],
        refundDetailOther:[],
        refundDetailOpCheck:[],
        refundDetailAdminCheck:[],

        cancel:false,
        lock:false,
        price:0,
        tax:0,
        profit:0,
        income:0,  
        net:0,
        recordAccount:[],
        recordTime:[],
      },
      email:'',
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
      },
      readNumber:false,
      opShow:true,
      adminShow:true,
      createDate:false,
      submitShow:false,
    }
  },
  created() {
     
  },
  methods: {
    setContract(){
      let ref = db.collection('contract').doc(this.ruleForm.number);
      let contract = {
        'amount':this.ruleForm.amount,
        'people':this.ruleForm.people,
        'depDate':this.ruleForm.depDate,
        'endDate':this.ruleForm.endDate,
        'contractOther':this.ruleForm.contractOther,
        'year':moment().format('YYYY'),
        'month':moment().format('MM'),
        'day':moment().format('DD'),
        'name':this.ruleForm.name,
        'price':this.ruleForm.price,
        'location':this.ruleForm.location,
        'contractDownPayment':this.ruleForm.contractDownPayment,
        'contractType':this.ruleForm.contractType,
      }
      this.$refs[validRuleForm].validate((valid) => {
        if (valid) {
          ref.set(contract).then(() => {
            console.log('set data successful');
            this.$message.success('新增合約成功');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    refundDetailAdd(){
      this.ruleForm.refundDetailDate.push('');
      this.ruleForm.refundDetailItem.push('');
      this.ruleForm.refundDetailRefund.push('');
      this.ruleForm.refundDetailType.push('匯款');
      this.ruleForm.refundDetailRefundDate.push('');
      this.ruleForm.refundDetailProve.push('');
      this.ruleForm.refundDetailOther.push('');
      this.ruleForm.refundDetailOpCheck.push(false);
      this.ruleForm.refundDetailAdminCheck.push(false);
    },
    refundDetailRemove(){
      if(this.ruleForm.refundDetailOpCheck[this.ruleForm.refundDetailOpCheck.length-1]|| this.ruleForm.refundDetailAdminCheck[this.ruleForm.refundDetailAdminCheck.length-1]){
        this.$message.error('該項目已核實，無法刪除');
        return 0;
      }
      this.ruleForm.refundDetailDate.pop();
      this.ruleForm.refundDetailItem.pop();
      this.ruleForm.refundDetailRefund.pop();
      this.ruleForm.refundDetailType.pop();
      this.ruleForm.refundDetailRefundDate.pop();
      this.ruleForm.refundDetailProve.pop();
      this.ruleForm.refundDetailOther.pop();
      this.ruleForm.refundDetailOpCheck.pop();
      this.ruleForm.refundDetailAdminCheck.pop();
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
    read() {
      let readChildEvent = {'cs':this.cs,'month':this.month}
      this.$emit("readChildEvent", readChildEvent);
      console.log(this.email + ' '+moment().format('YYYY-MM-DD HH:mm'))
    },
    count(){
      this.ruleForm.price = 0
      this.ruleForm.income = 0
      this.ruleForm.net = 0
      this.ruleForm.tax = 0
      this.ruleForm.insuranceTotalPrice1 = 0
      this.ruleForm.insuranceTotalPrice2 = 0
      let cardTotal = 0
      let linepayTotal = 0
      let refundTotal = 0
      for(let i=0;i<this.ruleForm.priceDetailTotalPrice.length;i++){
        this.ruleForm.priceDetailTotalPrice[i] = parseFloat(this.ruleForm.priceDetailPrice[i]) * parseFloat(this.ruleForm.priceDetailAmount[i])
        this.ruleForm.price = parseFloat(this.ruleForm.price) + parseFloat(this.ruleForm.priceDetailTotalPrice[i])
      }
      for(let i=0;i<this.ruleForm.extraDetailItem.length;i++){
        this.ruleForm.extraDetailTotalPrice[i] = parseFloat(this.ruleForm.extraDetailAmount[i]) * parseFloat(this.ruleForm.extraDetailPrice[i]) * parseFloat(this.ruleForm.extraDetailDays[i])
        this.ruleForm.price = parseFloat(this.ruleForm.price) + parseFloat(this.ruleForm.extraDetailTotalPrice[i])
      }
      for(let i=0;i<this.ruleForm.refundDetailRefund.length;i++){
        refundTotal = parseFloat(this.ruleForm.refundDetailRefund[i]) + parseFloat(refundTotal)
      }
      for(let i=0;i<this.ruleForm.incomeDetailIncome.length;i++){
        if(this.ruleForm.incomeDetailType[i] == '刷卡'){
          cardTotal = cardTotal + parseFloat(this.ruleForm.incomeDetailIncome[i])*0.02
        }else if(this.ruleForm.incomeDetailType[i] == 'LINEPAY'){
          linepayTotal = linepayTotal + parseFloat(this.ruleForm.incomeDetailIncome[i])*0.0231
        }
        this.ruleForm.income = parseFloat(this.ruleForm.incomeDetailIncome[i]) + parseFloat(this.ruleForm.income)
      }
      for(let i=0;i<this.ruleForm.payDetailPay.length;i++){
        if(this.ruleForm.payDetailFee1[i]){
          this.ruleForm.net = parseFloat(this.ruleForm.net) + 15
        }
        if(this.ruleForm.payDetailFee2[i]){
          this.ruleForm.net = parseFloat(this.ruleForm.net) + 15
        }
        this.ruleForm.net = parseFloat(this.ruleForm.payDetailPay[i]) + parseFloat(this.ruleForm.net)
      }
      //保險計算
      if(this.ruleForm.insurance1){
        this.ruleForm.insuranceTotalPrice1 = parseFloat(this.ruleForm.insurancePrice1)*parseFloat(this.ruleForm.insuranceDays1)*parseFloat(this.ruleForm.insuranceAmount1)
        this.ruleForm.insuranceTotalPrice1 = parseFloat((this.ruleForm.insuranceTotalPrice1).toFixed(1))
      }
      if(this.ruleForm.insurance2){
        this.ruleForm.insuranceTotalPrice2 = parseFloat(this.ruleForm.insurancePrice2)*parseFloat(this.ruleForm.insuranceDays2)*parseFloat(this.ruleForm.insuranceAmount2)
        this.ruleForm.insuranceTotalPrice2 = parseFloat((this.ruleForm.insuranceTotalPrice2).toFixed(1))
      }
      this.ruleForm.income = this.ruleForm.income - refundTotal 
      //總收扣除退款
      this.ruleForm.net = Math.ceil(this.ruleForm.net + cardTotal + linepayTotal + this.ruleForm.insuranceTotalPrice1 + this.ruleForm.insuranceTotalPrice2)
      //NET = NET + 卡手續費 + 保險
      this.ruleForm.profit = parseFloat(this.ruleForm.price) - parseFloat(this.ruleForm.net)
      if(this.ruleForm.profit > 9999){
        this.ruleForm.tax = (this.ruleForm.profit*0.05).toFixed(0);
        this.ruleForm.profit = (this.ruleForm.profit*0.95).toFixed(0);
      }
      //利潤>9999 5%稅金
    },
    submit(validRuleForm){
      // this.ruleForm.recordAccount.push(this.email)
      // this.ruleForm.recordTime.push(moment().format('YYYY-MM-DD HH:mm'))

      let ref = db.collection(moment(this.ruleForm.depDate).format('YYYY-MM')).doc(this.ruleForm.number);
      
      console.log(ref)
      this.$refs[validRuleForm].validate((valid) => {
        if (valid) {
          ref.set(this.ruleForm).then(() => {
            console.log('set data successful');
            this.$message.success('新增成功');
            this.$router.push({ path: '/profile' })
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      
    }
  },
  mounted(){
    firebaseApp.auth().onAuthStateChanged(user=>{
      if (user) {
        this.email = user.email
      }else{
        
      }
    });
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
  .form-font-xl{
    width: 205px; 
    display: inline-block;
    font-size: 20px;
    color:#606266;
  }
  .form-font-md{
    width: 170px; 
    display: inline-block;
    font-size: 20px;
    color:#606266;
  }
  .form-font-sm{
    width: 110px; 
    display: inline-block;
    font-size: 20px;
    color:#606266;
  }
</style>



