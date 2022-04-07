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
      
      const doc = new jsPDF();
      doc.addFont('https://tafengtravel.github.io/tafengtravel/index/font/chinese.ttf', 'chinese', 'normal');
      doc.setFont('chinese')

      this.fotherItemData.forEach((itemData,index) => {

        //----------自動排版----------
        let newLineName = this.newLine(this.fotherItemData[index].name)
        this.fotherItemData[index].people = this.newLine(this.fotherItemData[index].people)
        
        if(this.fotherItemData[index].location != '代訂車'){
          this.fotherItemData[index].amount = this.fotherItemData[index].amount + 'P'
        }

        if(index%3 == 0 && index != 0){
          doc.addPage();     
        }  
        doc.addImage(img, "JPEG", 3, 3+index%3*96, 188, 96)  
        doc.setFontSize(8)
        doc.text((parseInt(moment(this.fotherItemData[index].depDate).format('YYYY'))-1911).toString() 
        +'/'+moment(this.fotherItemData[index].depDate).format('MM/DD')+' ~ '
        + (parseInt(moment(this.fotherItemData[index].endDate).format('YYYY'))-1911).toString()
        +'/'+moment(this.fotherItemData[index].endDate).format('MM/DD')
        , 21, 9+index%3*96)

        doc.setFontSize(11)
        doc.text(this.fotherItemData[index].people, 61, 10+index%3*96)
        doc.text(this.fotherItemData[index].amount, 87, 16+index%3*96)

        doc.text(this.fotherItemData[index].name, 21, 15+index%3*96); 
        doc.text(this.fotherItemData[index].number, 21, 22+index%3*96); 

        doc.line(191, 15+index%3*96, 205, 15+index%3*96)
        doc.line(191, 15+index%3*96, 191, 52+index%3*96)
        doc.line(205, 15+index%3*96, 205, 52+index%3*96)
        doc.line(191, 52+index%3*96, 205, 52+index%3*96)

        doc.line(191, 15+40+index%3*96, 205, 15+40+index%3*96)
        doc.line(191, 15+40+index%3*96, 191, 52+40+index%3*96)
        doc.line(205, 15+40+index%3*96, 205, 52+40+index%3*96)
        doc.line(191, 52+40+index%3*96, 205, 52+40+index%3*96)

        doc.setFontSize(7)
        doc.text((parseInt(moment(this.fotherItemData[index].depDate).format('YYYY'))-1911).toString() 
          +'/'+moment(this.fotherItemData[index].depDate).format('MM/DD')+'\n'
          +'        ｜'+'\n'
          +(parseInt(moment(this.fotherItemData[index].endDate).format('YYYY'))-1911).toString()
          +'/'+moment(this.fotherItemData[index].endDate).format('MM/DD')
          ,192, 19+index%3*96
        )

        doc.text((parseInt(moment(this.fotherItemData[index].depDate).format('YYYY'))-1911).toString() 
          +'/'+moment(this.fotherItemData[index].depDate).format('MM/DD')+'\n'
          +'        ｜'+'\n'
          +(parseInt(moment(this.fotherItemData[index].endDate).format('YYYY'))-1911).toString()
          +'/'+moment(this.fotherItemData[index].endDate).format('MM/DD')
          ,192, 19+index%3*96+40
        )

        doc.setFontSize(9)
        doc.text(newLineName
          +'\n'+'\n'+this.fotherItemData[index].people
          +'\n'+this.fotherItemData[index].amount
          ,192, 31+index%3*96
        )
        doc.text(newLineName
          +'\n'+'\n'+this.fotherItemData[index].people
          +'\n'+this.fotherItemData[index].amount
          ,192, 31+index%3*96+40
        )
        
      }); 
      doc.save("FolderCover.pdf");
    },
    newLine(oldLine){
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


