<template>
  <div class="app-container">
    
    <List @readChildEvent="read" @wordChildEvent="wordExport" ref="child"></List>
    
  </div>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import * as docx from "docx";
import * as fs from "fs";
import List from '@/components/List.vue'
import { Document, Packer, TextRun, Paragraph, BorderStyle, PageBorderDisplay, VerticalAlign,
PageBorderOffsetFrom, PageBorderZOrder,AlignmentType,ImageRun,Header,Table,TableRow,TableCell,WidthType   } from "docx";

import { saveAs } from 'file-saver';

import tafeng from '@/images/tafeng.jpg';


export default {
  components: {
    List
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
    async read(){
      if(this.$refs.child.ruleForm.depDate == null || this.$refs.child.ruleForm.number == null){
        this.$message.error('請輸入團號及出發日期')
        return 0
      }
      let ref = db.collection((this.$refs.child.ruleForm.depDate).substring(0,7).toString()).doc(this.$refs.child.ruleForm.number);
      
      await ref.onSnapshot(doc => { 
        if(typeof(doc.data()) == 'undefined'){
          this.$message.error('請輸入正確團號')
          return 0;
        }
        this.$refs.child.ruleForm = doc.data()
        this.$refs.child.show = true
        this.$message.success('讀取成功');
        this.$refs.child.ruleForm.transportation = 'plane'
      })
      this.$refs.child.$forceUpdate() // 重新渲染dom
    },
    async wordExport() {
      const tafenglogo = await fetch(tafeng);
      const tafengLogoBlob = tafenglogo.blob()

      let csName
      let csPhone
      let counter
      let airport = this.$refs.child.ruleForm.airport 
      let airline = this.$refs.child.ruleForm.airline
      let location = this.$refs.child.ruleForm.location
      let depDate = this.$refs.child.ruleForm.depDate
      let endDate = this.$refs.child.ruleForm.endDate

      let dateLength = moment(endDate).diff(moment(depDate), 'days')+1;  
      console.log(dateLength)

      // 注意事項
      let rulesSplit
      let lanyuRules = '＊如果會暈船.請先至藥房買適合自已的暈船藥~~避免暈船.不要熬夜、早餐正常食用\n＊活動需行走朝間帶或浮潛等活動，建議您著平底防滑涼鞋\n＊禁止游泳的海濱、溪流，請勿下水，風浪大時，切勿行走於海濱\n＊戲水時要特別注意個人及孩童安全，【尤其要小心防滑】，時間不宜太長，請在安全水域內活動，才能玩的安全又盡興\n＊無當地專業人員帶領，請勿獨自前往海邊弄潮戲水釣魚；請珍惜自己與同伴的安全\n＊在蘭嶼，請勿請勿請勿!!在沒有詢問前給當地人拍照，未經允許禁止觸摸拼板舟、地下屋、以及曝曬中的飛魚。\n\n搭船\n(1)注意聽船公司的廣播，不要離櫃臺太遠，開船時間要守時『請避免脫隊』\n(2)請注意救生衣擺放位置，並『請依規定，穿著救生衣』正面吊帶扣上~背後吊帶，務必跨過大腿內側，並扣上下方扣環\n(3)船身會隨潮流上下左右晃動，上下船要小心跨越縫隙，航行中避免走動、如需行走請小心安全，風浪大時請避免待在舺板，應於座位上坐好\n游泳戲水從事水上活動安全時，安全第一\n(1)浮潛時不要單獨下海，入水前一定先做足夠的暖身運動，一定要有教練帶領，同時裝備齊全才下海。\n(2)在水中不停留過久的時間，以免過度疲勞。通常半小時即應上岸休息一次。\n(3)避免夜間在海裡游泳，以免不諳地形而發生意外或遭生物攻擊。\n(4)不在過冷、過熱的天氣游泳，以免身體無法負荷。\n\n潮間帶\n(1)各島海域，潮汐漲退落差頗大，從事潮間帶活動請注意安全。\n(2)隨時注意海面及天候狀況。\n(3)不認識的生物不隨意用手捉。\n\n◎騎乘摩托車注意事項：\n※小心慢行、注意安全\n※需戴安全帽！勿酒駕！！\n※天氣炎熱，注意自身體力，適時補充水分，不要猛衝快騎。\n※租車並非買車，請不要選太久，請確實檢查剎車、胎壓，如有損害，請應付賠償責任、並遵守交通規則，禁止行駛快車道，絕不可有超載、並騎、蛇行…等危險行為，請特別留意小孩、長輩的安全。\n※下坡請減速並特別小心，只能在車道上騎，勿飆車。\n※正確煞車：應先煞後輪再煞前輪，下坡處先減速以免滑倒受傷。\n※車子若臨時故障，請聯絡店家，車子前方皆有電話，等待救援。\n※車道上，勿突然停車，以免追撞，拍照請靠邊。\n'
      let kinmenRules
      let matsuRules
      let penghuRules
      let greenRules

      let accommodation= []

      switch(this.$refs.child.ruleForm.cs){
        case 'B1':csName = '王若涵',csPhone = '0938912597';break
        case 'B2':csName = '黃雅君',csPhone = '0933341442';break
        case 'B4':csName = '何佳錂',csPhone = '0989234244';break
        case 'B6':csName = '謝雅琳',csPhone = '0956506511';break
        case 'B8':csName = '陳姿竹',csPhone = '0975209055';break
        case 'A4':csName = '巫子勤',csPhone = '0934161302';break
      }
      switch(this.$refs.child.ruleForm.transportation){
        case 'plane':counter = airport+'機場 - 國內線'+airline+'航空櫃台' ,console.log(counter);break
        case 'boat':counter = airport+'漁港 - '+airline+'航運櫃台',console.log(counter);break
      }
      switch(this.$refs.child.ruleForm.location){
        case '金門': rulesSplit = kinmenRules.split("\n").map(line=>new TextRun({break:1,text:line}));break
        case '馬祖': rulesSplit = matsuRules.split("\n").map(line=>new TextRun({break:1,text:line}));break
        case '澎湖': rulesSplit = penghuRules.split("\n").map(line=>new TextRun({break:1,text:line}));break
        case '蘭嶼': rulesSplit = lanyuRules.split("\n").map(line=>new TextRun({break:1,text:line}));break
        case '綠島': rulesSplit = greenRules.split("\n").map(line=>new TextRun({break:1,text:line}));break
      }
      console.log(rulesSplit)

      for(let i=0;i<dateLength;i++){
        accommodation.push(new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: moment(depDate).add(i,'days').format('MM'),
                      size: 25,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: moment(depDate).add(i,'days').format('DD'),
                      size: 25,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: moment(depDate).add(i,'days').locale('zh-tw').format('dddd'),
                      size: 25,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: '',
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: '',
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: '',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }))
      }
      
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
            //航班表格
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
                      verticalAlign: VerticalAlign.CENTER,
                      columnSpan: 2,
                      children: [new Paragraph(depDate)],
                      width: {
                        size: 6000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
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
                      verticalAlign: VerticalAlign.CENTER,
                      columnSpan: 2,
                      children: [new Paragraph(counter)],
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
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '月',
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 1000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '日',
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 1000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '週',
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 1500,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '行程',
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 4000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '航/船班',
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 4000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '出發時間',
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 3000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '抵達時間',
                            }),
                          ],
                        }),
                      ],
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
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: moment(depDate).format('MM'),
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: moment(depDate).format('DD'),
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: moment(depDate).locale('zh-tw').format('dddd'),
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: airport+' - '+location,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: airline,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '',
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                //回
                new TableRow({
                  children: [
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: moment(endDate).format('MM'),
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: moment(endDate).format('DD'),
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: moment(endDate).locale('zh-tw').format('dddd'),
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: location+' - '+airport,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: airline,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '',
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph(''),
            //票號表格
            new Table({
              width: {
                size: 9000,
                type: WidthType,
              },
              rows: [
                new TableRow({
                  
                  children: [
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '訂位代號',
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 3000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '旅客姓名',
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 3000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '機票/船票號碼',
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 12000,
                        type: WidthType,
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '',
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '',
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph(''),
            //住宿表格
            new Table({
              width: {
                size: 9000,
                type: WidthType,
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      columnSpan:6,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '住宿表',
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '月',
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 1000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '日',
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 1000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '週',
                              size: 25,
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 1500,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '飯店',
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 8000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '電話',
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 4000,
                        type: WidthType,
                      },
                    }),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: '早餐',
                            }),
                          ],
                        }),
                      ],
                      width: {
                        size: 2000,
                        type: WidthType,
                      },
                    }),
                  ],
                }),
                ...accommodation
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



