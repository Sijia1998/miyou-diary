<template>
    <div class="wrapper">
        <div>
            <div class="formField">
                <div>
                    <input v-model="username" type="text" placeholder="请输入用户名">
                </div>
                <div>
                    <input v-model="password" type="password" placeholder="请输入密码">
                </div>
                <div>
                    <button class="submit" @click="login()">登 &nbsp &nbsp &nbsp录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            let _this = this;
            let loginData = {
                username: _this.username,
                password: _this.password
            }
            _this.$axios({
                url: 'http://47.93.45.54:3000/login',
                method: 'post',
                data: loginData
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.status === '0') {
                        Toast.success('登陆成功！')
                        localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                        setTimeout(() => {
                            _this.$router.push('/app')
                        }, 2000);
                    } else {
                        Toast.fail('登录失败')
                    }
                })
        }
    },
}
</script>
<style lang="scss" scoped>
.formField > div {
    margin-top: 15%;
}
.formField {
    margin-top: 10%;
}
input::-ms-input-placeholder {
    text-align: center;
}
input::-webkit-input-placeholder {
    text-align: center;
}
input {
    width: 90%;
    color: #3f51b5;
    background: none;
    border: none;
    // border-bottom: 1px solid #ddd;
    text-align: center;
    // border: 1px solid #ccc;
    padding: 12px 0px;
    // border-radius: 3px;
    padding-left: 5px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
input:focus {
    border-color: #2196f3;
    outline: none;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
}
.submit {
    width: 90%;
    padding: 12px 0;
    font-size: 18px;
    color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    outline: none;
    border-width: 0px; /* 边框宽度 */
    border-radius: 3px; /* 边框半径 */
    background: #1e90ff; /* 背景颜色 */
}
</style>