<template>
    <div class='f_loginBg'>
        <div class='f_loinContent'>
            <a-row>
                <a-col :span='12' class='f_loginPic'>
                    <img src='@/assets/image/login/login-left.png' width='100%' height="500" />
                </a-col>
                <a-col :span='12' class='f_loginForm'>
                    <img src="@/assets/image/login/login-right.png" alt="">
                    <a-form :form='form'>
                        <div class='f_loginTitle'>{{$t('lang.projectName')}}</div>
                        <a-form-item >
                            <a-input placeholder="用户名" v-decorator="['username',{ rules: [{ required: true, message: '请输入用户名！' }] }]" />
                        </a-form-item>
                        <a-form-item >
                            <a-input placeholder="密码" type="password" v-decorator="['password',{ rules: [{ required: true, message: '请输入密码！' }] }]" />
                        </a-form-item>
                        <a-button type="primary" class='marginT20' block size='large' :loading="isBtnLoading" @click="login">登录</a-button>
                    </a-form>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
    import api from '@/api/index'
    export default {
        data() {
            return {
                isBtnLoading: false,
                form: this.$form.createForm(this),
            };
        },
        methods: {
            login() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$axios.post(api.login, this.$qs.stringify(values)).then(res => {
                            if (res.data.code == 200) {
                                this.$message.info(res.data.msg)
                                this.$router.push('/');
                                this.$ls.set('user-token',res.data.data.username,7 * 24 * 60 * 60 * 1000)
                                this.$ls.set('infomation',res.data.data,7 * 24 * 60 * 60 * 1000)
                            } else {
                                this.$message.error(res.data.msg)
                                this.$router.replace('/login');
                            };
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                })
            },
        }
    };
</script>
<style scoped>
    .f_loginForm {
        position: relative;
        border-radius: 20px;
        padding-right: 200px;
    }
    .f_loginForm img {
        position: absolute;
        right: 0;
        top: 0;
        width: 200px;
        height: 190px;
    }
    .f_loinContent img {
        border-radius: 20px;
    }
</style>
