<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">大豐旅行社帳務系統</h3>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="Email"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
          prop="email"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <div style="margin-right:20px;">若您忘記密碼，請先輸入信箱，在<el-link type="primary" @click="resetPassword">點此重設</el-link></div>
        <br>
        <div style="margin-right:20px;">系統會發送重設連結至您的信箱</div>
      </div>

      <!-- <el-dialog title="重設密碼" class = "sub_title" :visible.sync="dialogResetPassword">
        <el-row>
          <el-form-item label="信箱" label-width="85px">
            <el-input v-model.trim="loginForm.email"></el-input>
          </el-form-item>   
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditRecord = false">取 消</el-button>
          <el-button type="primary" @click="submitRecord()">送 出</el-button>
        </span>
      </el-dialog> -->
      
    </el-form>

    
  </div>
</template>

<script>
import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', }],
        password: [{ required: true, trigger: 'blur',  }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogResetPassword:false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          firebaseApp.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(() => {
            // console.log(firebaseApp.auth())
            this.$router.push({ path: '/profile' })
            console.log('OK');
          }).catch((error) => {
            this.$message.error('帳密錯誤');
            console.log(error.message);
          });   
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetPassword(){
      if(this.loginForm.email == null ||this.loginForm.email == ''){
        this.$message.error('請填入信箱');
        return 0
      }
      firebaseApp.auth().sendPasswordResetEmail(this.loginForm.email).then(() => {
        this.$message.success('已發送重設連結至您的信箱');
        console.log('OK');
      }).catch((error) => {
        this.$message.error('查無信箱，該信箱並未註冊或已遭註銷');
        console.log(error.message);
      });
    }
  },
  mounted(){
    firebaseApp.auth().onAuthStateChanged(user=>{
    if (user) {
      this.$router.push({ path: '/profile' })
    }
  });
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
