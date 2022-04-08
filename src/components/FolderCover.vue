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
        switch(this.fotherItemData[index].cs){
          case 'B1':csName = 'Rene'    ;break
          case 'B2':csName = 'Joy'     ;break
          case 'B4':csName = 'Carin'   ;break
          case 'B6':csName = 'Alin'    ;break
          case 'B8':csName = 'Jenny'   ;break
          case 'B10':csName = 'Eating' ;break
          case 'A4':csName = 'Jude'    ;break
        }

        //----------自動排版----------
        let newLineName = this.newLine(this.fotherItemData[index].name)
        this.fotherItemData[index].people = this.newLine(this.fotherItemData[index].people)
        let amount

        if(this.fotherItemData[index].location != '代訂車'){
          amount = this.fotherItemData[index].amount + 'P'
        }else{
          amount = this.fotherItemData[index].amount
        }

        if(index%3 == 0 && index != 0){
          doc.addPage();     
        }  
        //左側出發日期+團名
        doc.addImage(img, "JPEG", 3, 2.5+index%3*offsetY, 186, offsetY)  
        doc.setFontSize(8)
        doc.text((parseInt(moment(this.fotherItemData[index].depDate).format('YYYY'))-1911).toString() 
        +'/'+moment(this.fotherItemData[index].depDate).format('MM/DD')+' ~ '
        + (parseInt(moment(this.fotherItemData[index].endDate).format('YYYY'))-1911).toString()
        +'/'+moment(this.fotherItemData[index].endDate).format('MM/DD')
        , 21, 9+index%3*offsetY)

        //左側代表人+團號+業務
        doc.setFontSize(11)
        doc.text(this.fotherItemData[index].people, 61, 10+index%3*offsetY)
        doc.text(amount, 87, 16+index%3*offsetY)
        doc.text(this.fotherItemData[index].name, 21, 15+index%3*offsetY); 
        doc.text(this.fotherItemData[index].number, 21, 22+index%3*offsetY); 
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
        doc.setFontSize(9)
        doc.text((parseInt(moment(this.fotherItemData[index].depDate).format('YYYY'))-1911).toString() 
          +'/'+moment(this.fotherItemData[index].depDate).format('MM/DD')+'\n'
          +'        ｜'+'\n'
          +(parseInt(moment(this.fotherItemData[index].endDate).format('YYYY'))-1911).toString()
          +'/'+moment(this.fotherItemData[index].endDate).format('MM/DD')
          ,190.25, 16+index%3*offsetY
        )
        doc.text((parseInt(moment(this.fotherItemData[index].depDate).format('YYYY'))-1911).toString() 
          +'/'+moment(this.fotherItemData[index].depDate).format('MM/DD')+'\n'
          +'        ｜'+'\n'
          +(parseInt(moment(this.fotherItemData[index].endDate).format('YYYY'))-1911).toString()
          +'/'+moment(this.fotherItemData[index].endDate).format('MM/DD')
          ,190.25, 16+index%3*offsetY+42
        )

        // 側邊直貼文字 
        doc.setFontSize(11)
        doc.text(newLineName
          +'\n'+'\n'+this.fotherItemData[index].people
          +'\n'+amount
          ,190.25, 30+index%3*offsetY
        )
        doc.text(newLineName
          +'\n'+'\n'+this.fotherItemData[index].people
          +'\n'+amount
          ,190.25, 30+index%3*offsetY+42
        )

        //左側收入
        if(this.fotherItemData[index].incomeDetailIncome != undefined){
          let incomeTypeX1 
          doc.setFontSize(10)
          doc.text(this.fotherItemData[index].incomeDetailIncome[0],22, 29.5+index%3*offsetY)
          doc.setFontSize(9)
          doc.text(moment(this.fotherItemData[index].incomeDetailDate[0]).format('MM/DD'),49, 29.5+index%3*offsetY)
          switch(this.fotherItemData[index].incomeDetailType[0]){
            case '匯款':incomeTypeX1 = 58.25    ;break
            case '刷卡':incomeTypeX1 = 63     ;break
            case '現金':incomeTypeX1 = 67.75   ;break
            case '支票':incomeTypeX1 = 72.5    ;break
            case '其他':incomeTypeX1 = 77.25   ;break
          }
          doc.setFontSize(6)
          doc.text('●',incomeTypeX1, 29+index%3*offsetY)
        }

        //右側廠商支出
        doc.setFontSize(10)
        this.fotherItemData[index].payDetailCompany.forEach((itemDataCompany,companyIndex) => {
          doc.text(itemDataCompany,105, 15+companyIndex*7.25+index%3*offsetY)
        })

        
      }); 
      doc.save("FolderCover.pdf");
    },
    newLine(oldLine){
      //分割排版 >4換行
      let newLine = oldLine.split(/\n/)
        let stringLength
        let str = ''
        for(let i=0;i<newLine.length;i++){
          stringLength = newLine[i].length
          if(stringLength > 4){
            for(let j=0;j<parseInt(stringLength/4)+1;j++){
              if(j == parseInt(stringLength/4)){
                str = str + newLine[i].substring(j*4,j*4+4)
              }else{
                str = str + newLine[i].substring(j*4,j*4+4) + '\n'
              }
            }
            newLine[i] = str
            str = ''
          }
        }
      oldLine = newLine.join('\n')
      return oldLine
    }
  },
  mounted(){
    
  }
}
</script>


