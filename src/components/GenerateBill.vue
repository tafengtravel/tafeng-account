<template>
  <div>
    <el-button type="primary" @click="generatePdf">輸出報帳單</el-button>
  </div>
</template>


<script>
import { jsPDF } from "jspdf";
import * as moment from "moment/moment";
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';

export default {
  props:{
    fotherItemData:Array,
    fotherDate:String ,
  },
  data() {
    return {
      name:''
    }
  },
  created() {
    
  },
  methods: {
    async generatePdf() {
      const doc = new jsPDF({orientation: 'landscape'});
      doc.addFont('https://tafengtravel.github.io/tafengtravel/index/font/chinese.ttf', 'chinese', 'normal');
      doc.setFont('chinese')
      doc.setFontSize(8)

      let columns1 = ['團號','出發日期','結束日期','團名','代表人','廠商','品項','明細'];
      let columns2 = ['支出','第一筆DL','第一筆金額','付款日期','第二筆DL','第二筆金額','付款日期'];
      let columnStyles1 = {
        0: {
            cellWidth: 22
        },
        1: {
            cellWidth: 20
        },
        2: {
            cellWidth: 20
        },
        3: {
            cellWidth: 15
        },
        4: {
            cellWidth: 13
        },
        5: {
            cellWidth: 30
        },
        6: {
            cellWidth: 40
        },
        7: {
            cellWidth: 'auto'
        },
      }
      let columnStyles2 = {
        0: {
            cellWidth: 38
        },
        1: {
            cellWidth: 38
        },
        2: {
            cellWidth: 38
        },
        3: {
            cellWidth: 38
        },
        4: {
            cellWidth: 38
        },
        5: {
            cellWidth: 38
        },
        6: {
            cellWidth: 'auto'
        },
      }
      this.fotherItemData.sort((a,b)=>{ return a.company.localeCompare(b.company)})

      const companyArr = this.fotherItemData.map(item=>item.company)
      const allCompany = new Set(companyArr)
      allCompany.forEach(itemCompany=>{
        let arr = this.fotherItemData.filter(itemData=>itemData.company===itemCompany).map(itemData=>[
          itemData.number,
          itemData.depDate,
          itemData.endDate,
          itemData.name,
          itemData.people,
          itemData.company,
          itemData.item,
          itemData.detail,
        ])
        let arr1 = this.fotherItemData.filter(itemData=>itemData.company===itemCompany).map(itemData=>[
          itemData.pay,
          itemData.dl1,
          itemData.dlpay1,
          itemData.dlpaydate1,
          itemData.dl2,
          itemData.dlpay2,
          itemData.dlpaydate2
        ])
        addTable(arr,arr1,this.fotherDate)
      })

      function addTable(body1,body2,date){
        let todayPay = 0
        doc.setFontSize(15)
        doc.text('廠商：'+body1[0][5], 132, 11)
        body1.forEach((item,index)=>{
          doc.autoTable({
            theme : 'grid',
            headStyles :{fillColor : '#FFFFFF',textColor :'#000000',lineColor:'#000000',lineWidth:0.1},
            bodyStyles :{fillColor : '#FFFFFF',textColor :'#000000',lineColor:'#000000',lineWidth:0.1},
            styles: {
              font: 'chinese',
              fontStyle: 'normal',
              fontSize: 8,
            },
            theme : 'grid',
            columns:columns1,
            body:[body1[index]],
            columnStyles:columnStyles1,
          })
          doc.autoTable({
            theme : 'grid',
            headStyles :{fillColor : '#FFFFFF',textColor :'#000000',lineColor:'#000000',lineWidth:0.1},
            bodyStyles :{fillColor : '#FFFFFF',textColor :'#000000',lineColor:'#000000',lineWidth:0.1},
            startY: doc.lastAutoTable.finalY, 
            styles: {
              font: 'chinese',
              fontStyle: 'normal',
              fontSize: 8,
            },
            theme : 'grid',
            columns:columns2,
            body:[body2[index]],
            columnStyles:columnStyles2,
          })
          if(body2[index][1] == date){
            let number = parseInt(body2[index][2])|| 0
            todayPay = todayPay + number
          }else if(body2[index][4] == date){
            let number = parseInt(body2[index][5])|| 0
            todayPay = todayPay + number
          }
        })
        doc.text('DL日期：'+date, 20, doc.lastAutoTable.finalY+10)
        doc.text('當日總支出：'+todayPay, 20, doc.lastAutoTable.finalY+20)
        doc.text('主管：　　　　　'+'出納：　　　　　'+'登錄：　　　　　'+'OP：　　　　　'+'業務：　　　　　'+'報帳人：　　　　　', 20, doc.lastAutoTable.finalY+30)
        doc.addPage()
      }

      doc.save("Bill.pdf");
    },
    newLine(oldLine){
      let regExp = /[a-z]/i;
      let newLine
      if(regExp.test(oldLine)){
        newLine = oldLine
        oldLine = newLine.replaceAll(' ','\n')
      }else{
        //分割排版 中文>4換行
        let textNumber = 4
        let stringLength
        let str = ''
        newLine = oldLine.split(/\n/)
        for(let i=0;i<newLine.length;i++){
          stringLength = newLine[i].length
          if(stringLength > textNumber){
            for(let j=0;j<parseInt(stringLength/textNumber)+1;j++){
              if(j == parseInt(stringLength/textNumber)){
                str = str + newLine[i].substring(j*textNumber,j*textNumber+textNumber)
              }else{
                str = str + newLine[i].substring(j*textNumber,j*textNumber+textNumber) + '\n'
              }
            }
            newLine[i] = str
            str = ''
          }
        }
        oldLine = newLine.join('\n')
      }
      return oldLine
    }
  },
  mounted(){
    
  }
}
</script>


