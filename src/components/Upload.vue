<template>
  <div class="app-container">

    <el-row :gutter="20">
      <el-col class ="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-lg-8">
        <font class ="font"><span>封面電腦版照片</span></font>
        <el-upload
          class="upload-demo"
          action= ""
          ref="itinerary"
          :on-remove="handleRemove"
          list-type="picture"
          :file-list="itineraryUrl"
          :on-preview="handlePictureCardPreview"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">選取照片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" >上傳</el-button>
        </el-upload>
      </el-col>
    </el-row>
    
    <el-dialog :visible.sync="dialogVisible" width="80%">
      <img width="100%"  :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>
</template>

<script>
import { Upload } from 'element-ui';

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      itineraryUrl:[{
        name:"1500300 - 1.jpg",
        status:"success",
        uid:1622512681820,
        url:"https://firebasestorage.googleapis.com/v0/b/tafengtravel-web.appspot.com/o/product%2F6%2F1500300%20-%201.jpg?alt=media&token=ebc475ae-f939-4ba3-8a68-c62046d54376"
      }],
      isFullscreen:true
    }
  },
  created() {
    
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.itineraryUrl)
    },
    handleDownload(file) {
      console.log(file);


    }
  },
  mounted(){
    
  }
}
</script>



