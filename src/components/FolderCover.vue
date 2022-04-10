<template>
  <div>
    <el-button type="primary" @click="generatePdf">輸出資料夾</el-button>
  </div>
</template>


<script>
import { jsPDF } from "jspdf";
import  {img}  from '@/components/Uri/folder.js';
import * as moment from "moment/moment";

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
      let offsetY = 93
      
      const doc = new jsPDF();
      doc.addFont('https://tafengtravel.github.io/tafengtravel/index/font/chinese.ttf', 'chinese', 'normal');
      doc.setFont('chinese')

      this.fotherItemData.forEach((itemData,index) => {

        let csName = ''
        switch(itemData.cs){
          case 'B1':csName = 'Rene'    ;break
          case 'B2':csName = 'Joy'     ;break
          case 'B4':csName = 'Carine'  ;break
          case 'B6':csName = 'Alin'    ;break
          case 'B8':csName = 'Jenny'   ;break
          case 'B10':csName = 'Eating' ;break
          case 'A4':csName = 'Jude'    ;break
        }

        //----------自動排版----------
        let newLineName = this.newLine(itemData.name)
        let newLinePeople = this.newLine(itemData.people)
        let amount

        if(itemData.location != '代訂車'){
          amount = itemData.amount + 'P'
        }else{
          amount = itemData.amount
        }

        if(index%3 == 0 && index != 0){
          doc.addPage();     
        }  
        //左側出發日期+團名
        doc.addImage(img, "JPEG", 3, 2.5+index%3*offsetY, 186, offsetY)  
        doc.setFontSize(8)
        doc.text((parseInt(moment(itemData.depDate).format('YYYY'))-1911).toString() 
        +'/'+moment(itemData.depDate).format('MM/DD')+' ~ '
        + (parseInt(moment(itemData.endDate).format('YYYY'))-1911).toString()
        +'/'+moment(itemData.endDate).format('MM/DD')
        , 21, 9+index%3*offsetY)

        //左側代表人+團號+業務
        doc.setFontSize(11)
        doc.text(itemData.people, 61, 10+index%3*offsetY)
        doc.text(amount, 87, 16+index%3*offsetY)
        doc.text(itemData.name, 21, 15+index%3*offsetY); 
        doc.text(itemData.number, 21, 22+index%3*offsetY); 
        doc.text(csName, 82, 22+index%3*offsetY); 

        // 側邊直貼邊框 x1 y1 x2 y2 
        doc.line(190, 11+index%3*offsetY, 206, 11+index%3*offsetY)
        doc.line(190, 11+index%3*offsetY, 190, 51+index%3*offsetY)
        doc.line(206, 11+index%3*offsetY, 206, 51+index%3*offsetY)
        doc.line(190, 51+index%3*offsetY, 206, 51+index%3*offsetY)

        doc.line(190, 11+42+index%3*offsetY, 206, 11+42+index%3*offsetY)
        doc.line(190, 11+42+index%3*offsetY, 190, 51+42+index%3*offsetY)
        doc.line(206, 11+42+index%3*offsetY, 206, 51+42+index%3*offsetY)
        doc.line(190, 51+42+index%3*offsetY, 206, 51+42+index%3*offsetY)

        // 側邊直貼日期 
        doc.setFontSize(12.5)
        doc.text(moment(itemData.depDate).format('MM/DD'),191.75, 15+index%3*offsetY)
        doc.text(moment(itemData.depDate).format('MM/DD'),191.75, 15+index%3*offsetY+42)
        doc.setFontSize(14)
        doc.text('~',199.25, 19.25+index%3*offsetY,null,90)
        doc.text('~',199.25, 19.25+index%3*offsetY+42,null,90)
        doc.setFontSize(12.5)
        doc.text(moment(itemData.endDate).format('MM/DD'),191.75, 23+index%3*offsetY)
        doc.text(moment(itemData.endDate).format('MM/DD'),191.75, 23+index%3*offsetY+42)

        // 側邊直貼文字 
        let regExp = /[a-z]/i;
        if(regExp.test(newLinePeople)){
          doc.setFontSize(9)
          console.log('eng')
        }else{
          doc.setFontSize(11)
        }
        doc.text(newLineName
          +'\n'+'\n'+newLinePeople
          +'\n'+amount
          ,190.25, 30+index%3*offsetY
        )
        doc.text(newLineName
          +'\n'+'\n'+newLinePeople
          +'\n'+amount
          ,190.25, 30+index%3*offsetY+42
        )

        //左側收入
        if(itemData.incomeDetailIncome != undefined){
          let incomeTypeX1 
          doc.setFontSize(10)
          doc.text(itemData.incomeDetailIncome[0],22, 29.5+index%3*offsetY)
          doc.setFontSize(9)
          doc.text(moment(itemData.incomeDetailDate[0]).format('MM/DD'),49, 29.5+index%3*offsetY)
          switch(itemData.incomeDetailType[0]){
            case '匯款':incomeTypeX1 = 58.25 ;break
            case '刷卡':incomeTypeX1 = 63    ;break
            case '現金':incomeTypeX1 = 67.75 ;break
            case '支票':incomeTypeX1 = 72.5  ;break
            case '其他':incomeTypeX1 = 77.25 ;break
          }
          doc.setFontSize(6)
          doc.text('●',incomeTypeX1, 29+index%3*offsetY)
        }

        //右側廠商支出
        doc.setFontSize(10)
        itemData.payDetailCompany.forEach((itemDataCompany,companyIndex) => {
          doc.text(itemDataCompany,105, 15+companyIndex*7.25+index%3*offsetY)
        })

        
      }); 
      doc.save("FolderCover.pdf");
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


