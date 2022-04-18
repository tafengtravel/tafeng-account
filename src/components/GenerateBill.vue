<template>
  <div>
    <el-button type="primary" @click="generatePdf">輸出資料夾</el-button>
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
      console.log(this.fotherItemData)
      
      const doc = new jsPDF({orientation: 'landscape'});
      doc.addFont('https://tafengtravel.github.io/tafengtravel/index/font/chinese.ttf', 'chinese', 'normal');
      doc.setFont('chinese')
      doc.setFontSize(8)

      let columns = ['團號', '出發日期', '結束日期', '團名', '代表人', '廠商', '品項', '支出', '第一筆DL', '第一筆金額', '付款日期', '第二筆DL', '第二筆金額', '付款日期'];
      let body = []
      let columnStyles = {
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
            cellWidth: 20
        },
        6: {
            cellWidth: 'auto'
        },
        7: {
            cellWidth: 15
        },
        8: {
            cellWidth: 20
        },
        9: {
            cellWidth: 15
        },
        10: {
            cellWidth: 20
        },
        11: {
            cellWidth: 20
        },
        12: {
            cellWidth: 15
        },
        13: {
            cellWidth: 20
        }
      }
      this.fotherItemData.sort((a,b)=>{ return a.company.localeCompare(b.company)})

      const companyArr = this.fotherItemData.map(item=>item.company)
      const allCompany = new Set(companyArr)
      allCompany.forEach(itemCompany=>{
        const arr = this.fotherItemData.filter(itemData=>itemData.company===itemCompany).map(itemData=>[
          itemData.number,
          itemData.depDate,
          itemData.endDate,
          itemData.name,
          itemData.people,
          itemData.company,
          itemData.item,
          itemData.pay,
          itemData.dl1,
          itemData.dlpay1,
          itemData.dlpaydate1,
          itemData.dl2,
          itemData.dlpay2,
          itemData.dlpaydate2
        ])
        addTable(arr)
      })

      function addTable(body){
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
          columns,
          body,
          columnStyles
        })
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


