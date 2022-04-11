<template>
  <div class="app-container">
      
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-position="left" label-width="70px" class="demo-ruleForm">
        <el-row :gutter="20">
          <div class="sub_title">基本資料</div>
        </el-row>
        <el-card class="box-card">
          <el-form-item label="團號" prop="number" label-width="85px">
            <span class="form-font-xl" v-if="(ruleForm.lock||readNumber)&&!adminShow">{{ruleForm.number}}</span>
            <el-input v-model.trim="ruleForm.number" v-else :disabled="readNumber"></el-input>
          </el-form-item>            
          <el-form-item label="團名" prop="name">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.name}}</span>
            <el-input v-model.trim="ruleForm.name" v-else></el-input>
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
          <el-form-item label="公司" prop="company" >
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.company}}</span>
            <el-input v-model="ruleForm.company" v-else></el-input>
          </el-form-item>

          <el-row></el-row>

          <el-form-item label="代表人" prop="people" label-width="90px">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.people}}</span>
            <el-input v-model.trim="ruleForm.people" v-else></el-input>
          </el-form-item>            
          <el-form-item label="人數" prop="amount">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.amount}}</span>
            <el-input v-model.trim="ruleForm.amount" v-else></el-input>
          </el-form-item>
          <el-form-item label="電話" prop="phone">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.phone}}</span>
            <el-input v-model.trim="ruleForm.phone" v-else></el-input>
          </el-form-item>

          <el-row></el-row>

          <el-form-item label="出發日期" prop="depDate" label-width="110px">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.depDate}}</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.depDate" v-else style="width: 190px;" @change="endDateCheck"></el-date-picker>
          </el-form-item>
          <el-form-item label="結束日期" prop="endDate" label-width="110px">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.endDate}}</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.endDate" v-else style="width: 190px;" :picker-options="endDateDisable" :disabled="ruleForm.depDate == null"></el-date-picker>
          </el-form-item>
          <el-form-item label="報帳日期" prop="createDate" label-width="110px">
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
          <el-form-item label="退業績日期" label-width="110px">
            <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.cancelDate}}</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.cancelDate" v-else style="width: 205px;"></el-date-picker>
          </el-form-item>
          <!-- 刪除 -->
          <el-form-item>
            <el-button type="danger" @click="dialogDeleteCheck = true" style="width:100px" v-if="adminShow && submitShow">刪除</el-button>
          </el-form-item>
          <el-dialog title="確定是否進行刪除？" class = "sub_title" :visible.sync="dialogDeleteCheck">
            <el-row>
              <div class = "font">團號：{{ruleForm.number}}</div>
            </el-row>
            <el-row>
              <div class = "font">團號：{{ruleForm.name}}</div>
            </el-row>
            <el-row>
              <div class = "font">代表人：{{ruleForm.people}}</div>
            </el-row>
            <el-row>
              <div class = "font">出發日期：{{ruleForm.depDate}}</div>
            </el-row>
            <el-row>
              <div class = "font">結束日期：{{ruleForm.endDate}}</div>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogDeleteCheck = false">取 消</el-button>
              <el-button type="danger" @click="dialogDelete = true">確 定</el-button>
            </span>
            <el-dialog
              title="一經刪除無法復原？"
              :visible.sync="dialogDelete"
              append-to-body
              class = "sub_title">
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDelete = false">取 消</el-button>
                <el-button type="danger" @click="deleted">確 定</el-button>
              </span>
            </el-dialog>
          </el-dialog>
          <!-- 刪除 -->
        </el-card>
        <!-- 合約 -->
        <!-- <el-card class="box-card">
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
        </el-card> -->
        
        <el-row :gutter="20">
          <div class="sub_title">估價單</div>
        </el-row>
        <el-card class="box-card">
          <el-row :gutter="20">
            <span class="font">團費</span>

          </el-row>

          <el-row :gutter="20">
            <el-col class ="el-col el-col-xs-24 el-col-sm-24 el-col-md-10 el-col-lg-8 el-col-xl-8">
              <font class ="font"><span>客報</span></font>
              <el-upload
                class="upload-demo"
                action= ""
                ref="priceUrl"
                :on-remove="handleRemove"
                list-type="picture"
                :file-list="ruleForm.priceUrl"
                :on-preview="imagePreview"
                :auto-upload="false"
                multiple
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG">
                <el-button slot="trigger" size="small" type="primary">選取照片</el-button>
              </el-upload>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col class ="el-col el-col-xs-24 el-col-sm-24 el-col-md-10 el-col-lg-8 el-col-xl-8">
              <font class ="font"><span>NET</span></font>
              <el-upload
                class="upload-demo"
                action= ""
                ref="netUrl"
                :on-remove="handleRemove"
                list-type="picture"
                :file-list="ruleForm.netUrl"
                :on-preview="imagePreview"
                :auto-upload="false"
                multiple
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG">
                <el-button slot="trigger" size="small" type="primary">選取照片</el-button>
              </el-upload>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col class ="el-col el-col-xs-24 el-col-sm-24 el-col-md-10 el-col-lg-8 el-col-xl-8">
              <font class ="font"><span>行程</span></font>
              <el-upload
                class="upload-demo"
                action= ""
                ref="itineraryUrl"
                :on-remove="handleRemove"
                list-type="picture"
                :file-list="ruleForm.itineraryUrl"
                :on-preview="imagePreview"
                :auto-upload="false"
                multiple
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG">
                <el-button slot="trigger" size="small" type="primary">選取照片</el-button>
              </el-upload>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col class ="el-col el-col-xs-24 el-col-sm-24 el-col-md-10 el-col-lg-8 el-col-xl-8">
              <font class ="font"><span>尾款</span></font>
              <el-upload
                class="upload-demo"
                action= ""
                ref="finalPayUrl"
                :on-remove="handleRemove"
                list-type="picture"
                :file-list="ruleForm.finalPayUrl"
                :on-preview="imagePreview"
                :auto-upload="false"
                multiple
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG">
                <el-button slot="trigger" size="small" type="primary">選取照片</el-button>
              </el-upload>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col class ="el-col el-col-xs-24 el-col-sm-24 el-col-md-10 el-col-lg-8 el-col-xl-8">
              <font class ="font"><span>團費攜出表</span></font>
              <el-upload
                class="upload-demo"
                action= ""
                ref="priceOutUrl"
                :on-remove="handleRemove"
                list-type="picture"
                :file-list="ruleForm.priceOutUrl"
                :on-preview="imagePreview"
                :auto-upload="false"
                multiple
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG">
                <el-button slot="trigger" size="small" type="primary">選取照片</el-button>
              </el-upload>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-button style="margin-left: 10px;" size="small" type="success" @click="imgUploadAll()" >全部上傳</el-button>
          </el-row>
          <el-form-item label="總團費">
              <span class="form-font-xl" v-if="ruleForm.lock&&!adminShow">{{ruleForm.price}}</span>
              <el-input v-model="ruleForm.price" @input="count" v-else></el-input>
          </el-form-item>
          <el-dialog :visible.sync="dialogVisible" width="80%">
            <img width="100%"  :src="dialogImageUrl" alt="">
          </el-dialog>
          
        </el-card>

        <el-row :gutter="20">
          <div class="sub_title">收入</div>
        </el-row>
        <el-card class="box-card">
          <span v-for="(incomeDetailItem,index) in ruleForm.incomeDetailItem.length">
            <el-row :gutter="20">
              <div class="font">{{index+1}}.</div>
            </el-row>
            
            <el-form-item label="報帳日期" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.incomeDetailDate[index]" v-else style="width: 160px;" :picker-options="createDateDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="品項" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailItem[index]}}</span>
              <el-input v-model="ruleForm.incomeDetailItem[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="收入">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailIncome[index]}}</span>
              <el-input v-model="ruleForm.incomeDetailIncome[index]" v-else @input="count" ></el-input>
            </el-form-item> 
            <el-form-item label="收款方式" label-width="100px">
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

            <el-form-item label="收款日期" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailReceiveDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.incomeDetailReceiveDate[index]" v-else style="width: 160px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="收款證明" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailProve[index]}}</span>
              <el-input v-model="ruleForm.incomeDetailProve[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="備註">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.incomeDetailOpCheck[index]||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailOther[index]}}</span>
              <el-input v-model="ruleForm.incomeDetailOther[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="OP核實" label-width="100px" class="op">
              <span class="form-font-sm" v-if="(!opShow||ruleForm.lock||ruleForm.incomeDetailAdminCheck[index])&&!adminShow">{{ruleForm.incomeDetailOpCheck[index]}}</span>
              <el-select v-model="ruleForm.incomeDetailOpCheck[index]" v-else placeholder="OP核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" label-width="100px" class="admin">
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
            
            <el-form-item label="報帳日期" label-width="100px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDate[index]" v-else style="width: 160px;" :picker-options="createDateDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="廠商">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailCompany[index]}}</span>
              <el-input v-model.trim="ruleForm.payDetailCompany[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="品項">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailItem[index]}}</span>
              <el-input v-model="ruleForm.payDetailItem[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="支出">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailPay[index]}}</span>
              <el-input v-model="ruleForm.payDetailPay[index]" v-else @input="count" style="width: 130px;" ></el-input>
            </el-form-item> 
            <el-form-item label="報帳單號" label-width="100px">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailAccountNumber[index]}}</span>
              <el-input v-model="ruleForm.payDetailAccountNumber[index]" v-else @input="count"></el-input>
            </el-form-item> 

            <el-row></el-row>     

            <el-form-item label="付款日期" label-width="100px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailPayDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailPayDate[index]" v-else style="width: 160px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="付款方式" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailType[index]}}</span>
              <el-select v-model="ruleForm.payDetailType[index]" v-else placeholder="付款方式" style="width: 130px;">
                <el-option label="轉帳" value="轉帳"></el-option>
                <el-option label="郵局" value="郵局"></el-option>
                <el-option label="刷卡" value="刷卡"></el-option>
                <el-option label="現金" value="現金"></el-option>
                <el-option label="支票" value="支票"></el-option>
                <el-option label="儲值金" value="儲值金"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款證明" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailProve[index]}}</span>
              <el-input v-model="ruleForm.payDetailProve[index]" v-else></el-input>
            </el-form-item>
            <el-form-item label="OP核實" label-width="100px" class="op" >
              <span class="form-font-sm" v-if="(!opShow||ruleForm.lock||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailOpCheck[index]}}</span>
              <el-select v-model="ruleForm.payDetailOpCheck[index]" v-else placeholder="OP核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" label-width="100px" class="admin">
              <span class="form-font-sm" v-if="!adminShow">{{ruleForm.payDetailAdminCheck[index]}}</span>
              <el-select v-model="ruleForm.payDetailAdminCheck[index]" v-else placeholder="財務核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
            <el-form-item label="明細">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.payDetailOpCheck[index]||ruleForm.payDetailAdminCheck[index])&&!adminShow">{{ruleForm.payDetailDetail[index]}}</span>
              <el-input type="textarea" autosize resize style="width: 300px;" v-model="ruleForm.payDetailDetail[index]" v-else></el-input>
            </el-form-item>
            <el-row></el-row>
            <el-divider></el-divider>
            <!-- 第一筆 -->     
            <el-form-item label="第一筆DL" label-width="100px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDl1[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDl1[index]" v-else style="width: 160px;" :picker-options="dlDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="匯費 $15" label-width="100px">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailFee1[index]}}</span>
              <el-checkbox v-model="ruleForm.payDetailFee1[index]" v-else @input="count"></el-checkbox>
            </el-form-item>
            <el-row></el-row>
            <el-form-item label="付款日期" label-width="100px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDlPayDate1[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDlPayDate1[index]" v-else style="width: 160px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="金額">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDlPay1[index]}}</span>
              <el-input v-model="ruleForm.payDetailDlPay1[index]" @input="count" v-else style="width: 130px;" ></el-input>
            </el-form-item> 
            <el-form-item label="付款方式" label-width="100px">
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
            
            <el-form-item label="付款證明" label-width="100px">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck1[index]||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDlProve1[index]}}</span>
              <el-input v-model="ruleForm.payDetailDlProve1[index]" @input="count" v-else style="width: 110px;"></el-input>
            </el-form-item>
            <el-form-item label="OP核實" label-width="100px" class="op">
              <span class="form-font-sm" v-if="(!opShow||ruleForm.lock||ruleForm.payDetailDlAdminCheck1[index])&&!adminShow">{{ruleForm.payDetailDlOpCheck1[index]}}</span>
              <el-select v-model="ruleForm.payDetailDlOpCheck1[index]" placeholder="OP核實" v-else style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" label-width="100px" class="admin">
              <span class="form-font-sm" v-if="!adminShow">{{ruleForm.payDetailDlAdminCheck1[index]}}</span>
              <el-select v-model="ruleForm.payDetailDlAdminCheck1[index]" v-else placeholder="財務核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-row></el-row>
            <!-- 第二筆 -->
            <el-form-item label="第二筆DL" label-width="100px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDl2[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDl2[index]" v-else style="width: 160px;" :picker-options="dlDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="匯費 $15" label-width="100px">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailFee2[index]}}</span>
              <el-checkbox v-model="ruleForm.payDetailFee2[index]" @input="count" v-else></el-checkbox>
            </el-form-item>
            <el-row></el-row> 
            <el-form-item label="付款日期" label-width="100px">
              <span class="form-font-md" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDlPayDate2[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.payDetailDlPayDate2[index]" v-else style="width: 160px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="金額">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDlPay2[index]}}</span>
              <el-input v-model="ruleForm.payDetailDlPay2[index]" v-else style="width: 130px;" ></el-input>
            </el-form-item> 
            <el-form-item label="付款方式" label-width="100px">
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
            <el-form-item label="付款證明" label-width="100px">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.payDetailDlOpCheck2[index]||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDlProve2[index]}}</span>
              <el-input v-model="ruleForm.payDetailDlProve2[index]" v-else style="width: 110px;"></el-input>
            </el-form-item>
            <el-form-item label="OP核實" label-width="100px" class="op">
              <span class="form-font-sm" v-if="(!opShow||ruleForm.lock||ruleForm.payDetailDlAdminCheck2[index])&&!adminShow">{{ruleForm.payDetailDlOpCheck2[index]}}</span>
              <el-select v-model="ruleForm.payDetailDlOpCheck2[index]" placeholder="OP核實" v-else style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" label-width="100px" class="admin">
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
          <el-form-item label="是否保旅責險" label-width="140px">
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
          <el-row></el-row>
          <el-form-item label="是否已保旅責險" label-width="140px">
            <span class="form-font-sm" v-if="(!opShow||ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock)&&!adminShow">{{ruleForm.insuranceComplete1}}</span>
            <el-select v-model="ruleForm.insuranceComplete1" @input="count" placeholder="請選擇" style="width: 110px;" v-else>
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="已保旅責險日期" label-width="140px">
            <span class="form-font-md" v-if="(!opShow||ruleForm.insuranceOpCheck1||ruleForm.insuranceAdminCheck1||ruleForm.lock)&&!adminShow">{{ruleForm.insuranceCompleteDate1}}</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.insuranceCompleteDate1" v-else style="width: 160px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="OP核實" label-width="100px" class="op">
            <span class="form-font-sm" v-if="(!opShow||ruleForm.lock||ruleForm.insuranceAdminCheck1)&&!adminShow">{{ruleForm.insuranceOpCheck1}}</span>
            <el-select v-model="ruleForm.insuranceOpCheck1" placeholder="OP核實" v-else style="width: 110px;">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" label-width="100px" class="admin">
            <span class="form-font-sm" v-if="!adminShow">{{ruleForm.insuranceAdminCheck1}}</span>
            <el-select v-model="ruleForm.insuranceAdminCheck1" placeholder="財務核實" v-else style="width: 110px;">
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-row></el-row>
          <!-- 旅平險 -->
          <el-form-item label="是否保旅平險" label-width="140px">
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
          <el-row></el-row>
          <el-form-item label="是否已保旅平險" label-width="140px">
            <span class="form-font-sm" v-if="(!opShow||ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock)&&!adminShow">{{ruleForm.insuranceComplete2}}</span>
            <el-select v-model="ruleForm.insuranceComplete2" @input="count" placeholder="請選擇" style="width: 110px;" v-else>
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="已保旅平險日期" label-width="140px">
            <span class="form-font-md" v-if="(!opShow||ruleForm.insuranceOpCheck2||ruleForm.insuranceAdminCheck2||ruleForm.lock)&&!adminShow">{{ruleForm.insuranceCompleteDate2}}</span>
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.insuranceCompleteDate2" v-else style="width: 160px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="OP核實" label-width="100px" class="op">
            <span class="form-font-sm" v-if="(!opShow||ruleForm.lock||ruleForm.insuranceAdminCheck2)&&!adminShow">{{ruleForm.insuranceOpCheck2}}</span>
            <el-select v-model="ruleForm.insuranceOpCheck2" placeholder="OP核實" style="width: 110px;" v-else>
              <el-option label="否" :value= false></el-option>
              <el-option label="是" :value= true></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="財務核實" label-width="100px" class="admin">
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
            
            <el-form-item label="報帳日期" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.refundDetailDate[index]" v-else style="width: 160px;" :picker-options="createDateDisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="品項" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailItem[index]}}</span>
              <el-input v-model="ruleForm.refundDetailItem[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="金額">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailRefund[index]}}</span>
              <el-input v-model="ruleForm.refundDetailRefund[index]" v-else @input="count" ></el-input>
            </el-form-item> 
            <el-form-item label="退款方式" label-width="100px">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailType[index]}}</span>
              <el-select v-model="ruleForm.refundDetailType[index]" placeholder="退款方式" v-else @input="count" style="width: 110px;">
                <el-option label="轉帳" value="轉帳"></el-option>
                <el-option label="郵局" value="郵局"></el-option>
                <el-option label="刷卡" value="刷卡"></el-option>
                <el-option label="現金" value="現金"></el-option>
                <el-option label="支票" value="支票"></el-option>
                <el-option label="LINEPAY" value="LINEPAY"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>

            <el-row></el-row>

            <el-form-item label="退款日期" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailRefundDate[index]}}</span>
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="選擇日期" v-model="ruleForm.refundDetailRefundDate[index]" v-else style="width: 160px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="退款證明" label-width="100px">
              <span class="form-font-xl" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailProve[index]}}</span>
              <el-input v-model="ruleForm.refundDetailProve[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="備註">
              <span class="form-font-sm" v-if="(ruleForm.lock||ruleForm.refundDetailOpCheck[index]||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailOther[index]}}</span>
              <el-input v-model="ruleForm.refundDetailOther[index]" v-else></el-input>
            </el-form-item> 
            <el-form-item label="OP核實" label-width="100px" class="op">
              <span class="form-font-sm" v-if="(!opShow||ruleForm.lock||ruleForm.refundDetailAdminCheck[index])&&!adminShow">{{ruleForm.refundDetailOpCheck[index]}}</span>
              <el-select v-model="ruleForm.refundDetailOpCheck[index]" v-else placeholder="OP核實" style="width: 110px;">
                <el-option label="否" :value= false></el-option>
                <el-option label="是" :value= true></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="財務核實" label-width="100px" class="admin">
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
          <el-form-item label="進項代收轉付" label-width="120px">
            <el-input v-model="ruleForm.incollectpay" type="textarea" autosize style="width: 300px;"></el-input>
          </el-form-item> 
          <el-form-item label="銷項代收轉付" label-width="120px">
            <el-input v-model="ruleForm.outcollectpay" type="textarea" autosize style="width: 300px;"></el-input>
          </el-form-item> 
          <el-form-item label="其他項目備註" label-width="120px">
            <el-input v-model="ruleForm.other" type="textarea" autosize style="width: 300px;"></el-input>
          </el-form-item> 
        </el-card>
        <el-row :gutter="20">
          <div class="sub_title">費用統計</div>
        </el-row>
        <el-card class="box-card">
          <el-form-item label="總團費" label-width="100px">
            <span class="form-font-xl">{{ruleForm.price}}</span>
          </el-form-item> 
          <el-form-item label="總NET" label-width="100px">
            <span class="form-font-xl">{{ruleForm.net}}</span>
          </el-form-item> 
          <el-form-item label="利潤" label-width="100px">
            <span class="form-font-xl">{{ruleForm.profit}}</span>
          </el-form-item> 
          <el-row></el-row>
          <el-form-item label="總收入" label-width="100px">
            <span class="form-font-xl">{{ruleForm.income}}</span>
          </el-form-item> 
          <el-form-item label="5%稅金" label-width="100px">
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
      submitNew:false,
      endDateDisable:{
        disabledDate:(time=>{
          return time.getTime() <= new Date(this.ruleForm.depDate).getTime()-24*60*60*1000;
        })
      },
      createDateDisable:{
        disabledDate(time) {
          if(moment().format('HH') >= moment('18').format('HH')){
            return time.getTime() < new Date().getTime() || time.getTime() > new Date().getTime() + 24*60*60*1000
          }
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
        payDetailAccountNumber:[],
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
        insuranceComplete1:false,
        insuranceComplete2:false,
        insuranceCompleteDate1:'',
        insuranceCompleteDate2:'',

        refundDetailDate:[],
        refundDetailItem:[],
        refundDetailRefund:[],
        refundDetailType:[],
        refundDetailRefundDate:[],
        refundDetailProve:[],
        refundDetailOther:[],
        refundDetailOpCheck:[],
        refundDetailAdminCheck:[],

        priceUrl:[],
        netUrl:[],
        itineraryUrl:[],
        finalPayUrl:[],
        priceOutUrl:[],

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
      rules: {
          number: [
              // { required: true, message: '必填', trigger: 'blur'},
          ],
          name: [
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
      submitShow:false,
      createDate:false,
      dialogImageUrl: '',
      dialogVisible: false,
      dialogDelete:false,
      dialogDeleteCheck:false,
    }
  },
  created() {
     
  },
  methods: {
    endDateCheck(){
      if(this.ruleForm.endDate < this.ruleForm.depDate){
        this.ruleForm.endDate = this.ruleForm.depDate
      }
    },
    async deleted(){
      let ref = db.collection(moment(this.ruleForm.depDate).format('YYYY-MM')+'G').doc(this.ruleForm.number);
      await ref.delete().then(()=>{
        console.log("Document successfully deleted!");
        this.$message.success('刪除成功');
        this.$router.push({ path: '/profile' })
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    },
    async imgUploadAll(){
      await this.$notify({
        title: '上傳中，請稍後',
        message: '喝杯咖啡，休息一會兒！',
        type: 'warning',
      });
      
      const oldCount = [this.ruleForm.priceUrl.length,this.ruleForm.netUrl.length,this.ruleForm.itineraryUrl.length,this.ruleForm.finalPayUrl.length,this.ruleForm.priceOutUrl.length]
      const newRefs = [this.$refs.priceUrl.uploadFiles,this.$refs.netUrl.uploadFiles,this.$refs.itineraryUrl.uploadFiles,this.$refs.finalPayUrl.uploadFiles,this.$refs.priceOutUrl.uploadFiles]
      const ruleFormUrl = [this.ruleForm.priceUrl,this.ruleForm.netUrl,this.ruleForm.itineraryUrl,this.ruleForm.finalPayUrl,this.ruleForm.priceOutUrl]

      for(let j=0;j<5;j++){
        try { // statements to try
          for(let i=0;i<newRefs[j].length-oldCount[j];i++){
            const name = newRefs[j][oldCount[j]+i].name;
            const storageRef = firebaseApp.storage().ref(moment(this.ruleForm.depDate).format('YYYY-MM')+'/'+this.ruleForm.number+'/'+name); //路徑測試 尚未修正
            const task = await storageRef.put(newRefs[j][oldCount[j]+i].raw);
            
            task.ref.getDownloadURL().then((downloadURL)=>{
              ruleFormUrl[j].push({'name':name,'url':downloadURL})
            });
          }
        }
        catch (e) {
          await this.$notify.error({
            title: '上傳失敗',
            message: '不要動！請通知Leo來！',
          });
          console.log(e)
          return 0
        }
      }
      this.ruleForm.priceUrl = ruleFormUrl[0]
      this.ruleForm.netUrl = ruleFormUrl[1]
      this.ruleForm.itineraryUrl = ruleFormUrl[2]
      this.ruleForm.finalPayUrl = ruleFormUrl[3]
      this.ruleForm.priceOutUrl = ruleFormUrl[4]

      await this.$notify({
        title: '上傳成功',
        message: '挖呼！上傳成功！',
        type: 'success',
      });
    },
    async handleRemove(file, fileList) {
      if(file.status == 'success'){
        try { // statements to try
          let storageRef = firebaseApp.storage().ref(moment(this.ruleForm.depDate).format('YYYY-MM')+'/'+this.ruleForm.number+'/'+file.name); //尚未修改路徑
          await storageRef.delete().then(doc =>{
            if(this.ruleForm.priceUrl.some(arr=> arr.name === file.name)){
              this.ruleForm.priceUrl.length = 0
              this.ruleForm.priceUrl = fileList
            }else if(this.ruleForm.netUrl.some(arr=> arr.name === file.name)){
              this.ruleForm.netUrl.length = 0
              this.ruleForm.netUrl = fileList
            }else if(this.ruleForm.itineraryUrl.some(arr=> arr.name === file.name)){
              this.ruleForm.itineraryUrl.length = 0
              this.ruleForm.itineraryUrl = fileList
            }else if(this.ruleForm.finalPayUrl.some(arr=> arr.name === file.name)){
              this.ruleForm.finalPayUrl.length = 0
              this.ruleForm.finalPayUrl = fileList
            }else if(this.ruleForm.priceOutUrl.some(arr=> arr.name === file.name)){
              this.ruleForm.priceOutUrl.length = 0
              this.ruleForm.priceOutUrl = fileList
            }
            this.$notify({
              title: '刪除成功',
              type: 'success',
              message: '挖呼！刪除成功！',
            });
          })
        } 
        catch (e) {
          this.$notify.error({
            title: '刪除失敗',
            message: '不要動！請通知Leo來！',
          });
          console.log(e)
        }
      }
      console.log(fileList);
    },
    imagePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    setContract(){
      //尚未新增
    },
    refundDetailAdd(){
      this.ruleForm.refundDetailDate.push('');
      this.ruleForm.refundDetailItem.push('');
      this.ruleForm.refundDetailRefund.push('');
      this.ruleForm.refundDetailType.push('轉帳');
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
      this.ruleForm.payDetailAccountNumber.push('');
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
      this.ruleForm.payDetailFee1.push(false);

      this.ruleForm.payDetailDl2.push('');
      this.ruleForm.payDetailDlPayDate2.push('');
      this.ruleForm.payDetailDlPay2.push('');
      this.ruleForm.payDetailDlType2.push('');
      this.ruleForm.payDetailDlProve2.push('');
      this.ruleForm.payDetailDlOpCheck2.push(false);
      this.ruleForm.payDetailDlAdminCheck2.push(false);
      this.ruleForm.payDetailFee2.push(false);
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
      this.ruleForm.payDetailAccountNumber.pop();
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
    },
    count(){
      this.ruleForm.income = 0
      this.ruleForm.net = 0
      this.ruleForm.tax = 0
      this.ruleForm.insuranceTotalPrice1 = 0
      this.ruleForm.insuranceTotalPrice2 = 0
      let cardTotal = 0
      let linepayTotal = 0
      let refundTotal = 0
      let refundCardTotal = 0
      let refundLinepayTotal = 0
      //總退款
      for(let i=0;i<this.ruleForm.refundDetailRefund.length;i++){
        if(this.ruleForm.refundDetailType[i] == '刷卡'){
          refundCardTotal = refundCardTotal + parseFloat(this.ruleForm.refundDetailRefund[i])*0.02
        }else if(this.ruleForm.refundDetailType[i] == 'LINEPAY'){
          refundLinepayTotal = refundLinepayTotal + parseFloat(this.ruleForm.refundDetailRefund[i])*0.0231
        }
        if(!(isNaN(this.ruleForm.refundDetailRefund[i])||this.ruleForm.refundDetailRefund[i] == '')){
          refundTotal = parseFloat(this.ruleForm.refundDetailRefund[i]) + parseFloat(refundTotal)
        }
      }
      //總收入
      for(let i=0;i<this.ruleForm.incomeDetailIncome.length;i++){
        if(this.ruleForm.incomeDetailType[i] == '刷卡'){
          cardTotal = cardTotal + parseFloat(this.ruleForm.incomeDetailIncome[i])*0.02
        }else if(this.ruleForm.incomeDetailType[i] == 'LINEPAY'){
          linepayTotal = linepayTotal + parseFloat(this.ruleForm.incomeDetailIncome[i])*0.0231
        }
        if(!(isNaN(this.ruleForm.incomeDetailIncome[i])||this.ruleForm.incomeDetailIncome[i] == '')){
          this.ruleForm.income = parseFloat(this.ruleForm.incomeDetailIncome[i]) + parseFloat(this.ruleForm.income)
        }
      }
      //總支出
      for(let i=0;i<this.ruleForm.payDetailPay.length;i++){
        if(this.ruleForm.payDetailFee1[i]){
          this.ruleForm.net = parseFloat(this.ruleForm.net) + 15
        }
        if(this.ruleForm.payDetailFee2[i]){
          this.ruleForm.net = parseFloat(this.ruleForm.net) + 15
        }
        if(!(isNaN(this.ruleForm.payDetailPay[i])||this.ruleForm.payDetailPay[i] == '')){
          this.ruleForm.net = parseFloat(this.ruleForm.payDetailPay[i]) + parseFloat(this.ruleForm.net)
        }
      }
      //保險計算
      if(this.ruleForm.insurance1){
        this.ruleForm.insuranceTotalPrice1 = parseFloat(this.ruleForm.insurancePrice1)*parseFloat(this.ruleForm.insuranceDays1)*parseFloat(this.ruleForm.insuranceAmount1)
        if(isNaN(this.ruleForm.insuranceTotalPrice1)){
          this.ruleForm.insuranceTotalPrice1 = 0
        }
        this.ruleForm.insuranceTotalPrice1 = parseFloat((this.ruleForm.insuranceTotalPrice1).toFixed(1))
      }
      if(this.ruleForm.insurance2){
        this.ruleForm.insuranceTotalPrice2 = parseFloat(this.ruleForm.insurancePrice2)*parseFloat(this.ruleForm.insuranceDays2)*parseFloat(this.ruleForm.insuranceAmount2)
        if(isNaN(this.ruleForm.insuranceTotalPrice2)){
          this.ruleForm.insuranceTotalPrice2 = 0
        }
        this.ruleForm.insuranceTotalPrice2 = parseFloat((this.ruleForm.insuranceTotalPrice2).toFixed(1))
      }
      this.ruleForm.income = this.ruleForm.income - refundTotal 
      //總收扣除退款
      this.ruleForm.net = Math.ceil(this.ruleForm.net + cardTotal + linepayTotal + this.ruleForm.insuranceTotalPrice1 + this.ruleForm.insuranceTotalPrice2 - refundCardTotal - refundLinepayTotal)
      //NET = NET + 卡手續費 + 保險
      this.ruleForm.profit = parseFloat(this.ruleForm.price) - parseFloat(this.ruleForm.net)
      if(this.ruleForm.profit > 9999){
        this.ruleForm.tax = (this.ruleForm.profit*0.05).toFixed(0);
        this.ruleForm.profit = (this.ruleForm.profit*0.95).toFixed(0);
      }
      //利潤>9999 5%稅金
    },
    async submit(validRuleForm){
      // this.ruleForm.recordAccount.push(this.email)
      // this.ruleForm.recordTime.push(moment().format('YYYY-MM-DD HH:mm'))

      let ref = db.collection(moment(this.ruleForm.depDate).format('YYYY-MM')+'G').doc(this.ruleForm.number);
      console.log(ref)

      await ref.get().then(doc => { 
        if(typeof(doc.data()) != 'undefined' && this.submitNew == true){
          if (doc.exists && this.submitNew == true) {
            this.$message.error('此團號已存在！請重新讀取一次團號！')
            return 0;
          }   
        }else{
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
      })
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



