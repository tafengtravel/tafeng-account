<template>
  <div class="app-container">
    
    <el-input v-model="rules" type="textarea" autosize style="width: 300px;"></el-input>
    <el-button type="primary" @click="word">輸出</el-button>

    
  </div>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import * as docx from "docx";
import * as fs from "fs";
import { Document, Packer, TextRun, Paragraph, BorderStyle, PageBorderDisplay, VerticalAlign,
PageBorderOffsetFrom, PageBorderZOrder,AlignmentType,ImageRun,Header,Table,TableRow,TableCell,WidthType   } from "docx";

import { saveAs } from 'file-saver';

import tafeng from '@/images/tafeng.jpg';


export default {
  components: {
    
  },
  
  data() {
    return {
      listLoading: false,
      itemData:[],
      month:'',
      company:'',
      rules:'',
    }
  },
  created() {
    
  },
  methods: {
  
    async word() {
      const tafenglogo = await fetch(tafeng);
      const tafengLogoBlob = tafenglogo.blob()
      let csName = '黃雅君'
      let csPhone = '0933341442'
      let location ='蘭嶼'
      let airport ='台東'
      let airline ='德安'
      let depDate = '2022-01-20'
      let endDate = '2022-01-22'
      let lanyuRules = '＊如果會暈船.請先至藥房買適合自已的暈船藥 ~~避免暈船.不要熬夜、早餐正常食用\n ＊活動需行走朝間帶或浮潛等活動，建議您著平底防滑涼鞋\n ＊禁止游泳的海濱、溪流，請勿下水，風浪大時，切勿行走於海濱\n ＊戲水時要特別注意個人及孩童安全，【尤其要小心防滑】，時間不宜太長，請在安全水域內活動，才能玩的安全又盡興\n ＊無當地專業人員帶領，請勿獨自前往海邊弄潮戲水釣魚；請珍惜自己與同伴的安全\n ＊在蘭嶼，請勿請勿請勿!!在沒有詢問前給當地人拍照，未經允許禁止觸摸拼板舟、地下屋、以及曝曬中的飛魚。\n \n 搭船\n (1) 注意聽船公司的廣播，不要離櫃臺太遠，開船時間要守時『請避免脫隊』\n (2) 請注意救生衣擺放位置，並『請依規定，穿著救生衣』正面吊帶扣上~背後吊帶，務必跨過大腿內側，並扣上下方扣環\n (3) 船身會隨潮流上下左右晃動，上下船要小心跨越縫隙，航行中避免走動、如需行走請小心安全，風浪大時請避免待在舺板，應於座位上坐好\n 游泳戲水 從事水上活動安全時，安全第一\n (1)浮潛時不要單獨下海，入水前一定先做足夠的暖身運動，一定要有教練帶領，同時裝備齊全才下海。\n (2)在水中不停留過久的時間，以免過度疲勞。通常半小時即應上岸休息一次。\n (3)避免夜間在海裡游泳，以免不諳地形而發生意外或遭生物攻擊。\n (4) 不在過冷、過熱的天氣游泳，以免身體無法負荷。 \n\n 潮間帶\n (1)各島海域，潮汐漲退落差頗大，從事潮間帶活動請注意安全。\n (2)隨時注意海面及天候狀況。\n (3)不認識的生物不隨意用手捉。\n \n ◎騎乘摩托車注意事項：\n ※小心慢行、注意安全\n ※需戴安全帽！勿酒駕！！\n ※天氣炎熱，注意自身體力，適時補充水分，不要猛衝快騎。\n ※租車並非買車，請不要選太久，請確實檢查剎車、胎壓，如有損害，請應付賠償責任、並遵守交通規則，禁止行駛快車道，絕不可有超載、並騎、蛇行…等危險行為，請特別留意小孩、長輩 的安全。\n ※下坡請減速並特別小心，只能在車道上騎，勿飆車。\n ※正確煞車：應先煞後輪再煞前輪，下坡處先減速以免滑倒受傷。\n ※車子若臨時故障，請聯絡店家，車子前方皆有電話，等待救援。\n ※車道上，勿突然停車，以免追撞，拍照請靠邊。\n'
      let airportCounter = airport+'機場 - 國內線'+airline+'航空櫃台'
      let boatCounter = airport+'漁港 - '+airline+'航運櫃台'
      const rulesSplit = lanyuRules.split("\n").map(line=>new TextRun({break:1,text:line}))
      
      const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            name: 'normal',
              run: {
                color: '#272727',
                bold: true,
                font: 'Microsoft JhengHei'
            },
          },
          {
            name: 'red',
              run: {
                color: '#FF0000',
                bold: true,
                font: 'Microsoft JhengHei'
            },
          },
        ],
      },
      sections: [
        { 
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: tafengLogoBlob ,
                      transformation: {
                          width: 147,
                          height: 46,
                      },
                      floating: {
                        horizontalPosition: {
                            offset: 214400,
                        },
                        verticalPosition: {
                            offset: 214400,
                        },
                      },
                    }),
                  ],
                }),
              ],
            }),
          },
          children: [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: location+' 旅 遊 須 知 ',
                    size: 30,
                  }),
                ],
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: '行  程  住  宿  一  覽  表',
                    size: 30,
                  }),
                ],
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: '緊急聯絡電話：',
                    size: 25,
                  }),
                  new TextRun({
                    text: csName + csPhone,
                    size: 25,
                  }),
                ],
            }),
            new Table({
              width: {
                size: 9000,
                type: WidthType,
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      rowSpan: 2,
                      columnSpan: 3,
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '集合',
                            }),
                          ],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '時間地點',
                            }),
                          ],
                        }),
                        ],
                      width: {
                        size: 2000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      columnSpan: 2,
                      children: [new Paragraph(depDate)],
                      width: {
                        size: 6000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      columnSpan: 2,
                      rowSpan: 2,
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: '無送機人員',
                            }),
                          ],
                          style: "red",
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: '請直接至櫃檯辦理登機',
                            }),
                          ],
                          style: "red",
                        }),
                      ],
                      width: {
                        size: 6000,
                        type: WidthType,
                      },
                    }),

                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                        columnSpan: 2,
                        children: [new Paragraph(airportCounter)],
                        width: {
                          size: 6000,
                          type: WidthType,
                        },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                        children: [new Paragraph('月')],
                        width: {
                          size: 1000,
                          type: WidthType,
                        },
                    }),
                    new TableCell({
                        children: [new Paragraph('日')],
                        width: {
                          size: 1000,
                          type: WidthType,
                        },
                    }),
                    new TableCell({
                        children: [new Paragraph('週')],
                        width: {
                          size: 1500,
                          type: WidthType,
                        },
                    }),
                    new TableCell({
                        children: [new Paragraph('行程')],
                        width: {
                          size: 4000,
                          type: WidthType,
                        },
                    }),
                    new TableCell({
                        children: [new Paragraph('航/船班')],
                        width: {
                          size: 4000,
                          type: WidthType,
                        },
                    }),
                    new TableCell({
                        children: [new Paragraph('出發時間')],
                        width: {
                          size: 3000,
                          type: WidthType,
                        },
                    }),
                    new TableCell({
                        children: [new Paragraph('抵達時間')],
                        width: {
                          size: 3000,
                          type: WidthType,
                        },
                    }),
                  ],
                }),
                //去
                new TableRow({
                  children: [
                    new TableCell({
                        children: [new Paragraph(moment(depDate).format('MM'))],
                    }),
                    new TableCell({
                        children: [new Paragraph(moment(depDate).format('DD'))],
                    }),
                    new TableCell({
                        children: [new Paragraph(moment(depDate).locale('zh-tw').format('dddd'))],
                    }),
                    new TableCell({
                        children: [new Paragraph(airport+' - '+location)],
                    }),
                    new TableCell({
                        children: [new Paragraph(airline)],
                    }),
                    new TableCell({
                        children: [new Paragraph('')],
                    }),
                    new TableCell({
                        children: [new Paragraph('')],
                    }),
                  ],
                }),
                //回
                new TableRow({
                  children: [
                    new TableCell({
                        children: [new Paragraph(moment(endDate).format('MM'))],
                    }),
                    new TableCell({
                        children: [new Paragraph(moment(endDate).format('DD'))],
                    }),
                    new TableCell({
                        children: [new Paragraph(moment(endDate).locale('zh-tw').format('dddd'))],
                    }),
                    new TableCell({
                        children: [new Paragraph(location+' - '+airport)],
                    }),
                    new TableCell({
                        children: [new Paragraph(airline)],
                    }),
                    new TableCell({
                        children: [new Paragraph('')],
                    }),
                    new TableCell({
                        children: [new Paragraph('')],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                    text: '注意事項：請務必詳閱！',
                    size: 30,
                    
                }),
              ],
              style: "red",
            }),
            new Paragraph({
                children: rulesSplit
            }),

          ],
        },
      ],
});

    


      docx.Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
      });
    },
    
  },
  mounted(){
    
  }
}
</script>



