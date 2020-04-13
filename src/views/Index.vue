<template>
    <a-layout id="components-layout-demo-fixed">
        <a-layout-header style='display: flex;justify-content: space-between;align-items: center;'>
            <span class='fontSize20' style="display: flex;align-items: center;">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconlogo"></use>
                </svg>
                <span class="compony-tiltle">{{$t('lang.projectName')}}</span>
            </span>
            <div class='pull-right'>
                <a-icon type="bell" class='margin-r-l-10' />
                <span>欢迎您，{{userData.name || '访问者'}}</span>
                <span class='margin-r-l-20'>|</span>
                <a-popover placement="bottomLeft">
                    <template slot="content">
                        <p><a href="javascript:;">我的账户</a></p>
                        <p><a href="javascript:;" @click="logout">退出</a></p>
                    </template>
                    <template slot="title">
                        <span>个人中心</span>
                    </template>
                    <a href="javascript:;">个人中心</a>
                </a-popover>
            </div>
            <a-menu class='f_headMenu' mode="horizontal" :defaultSelectedKeys='defaultSelectedKeys' v-if='false'>
                <a-sub-menu v-for='(item,index) in topMenuData' :key="'topMain'+index">
                    <span slot="title" class="submenu-title-wrapper">
                        <a-icon type="setting" class='color2ED2C8' />{{item.name}}
                    </span>
                    <a-menu-item v-for='(element,num) in item.children' :key='"topChild"+num' @click='clickMenuTitle(item,element)'>
                        {{element.name}}
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width='256' style='background:rgba(41,103,102,1);'>
                <a-menu mode="inline" :defaultSelectedKeys="['child00']" :openKeys="openKeys" @openChange="onOpenChange">
                    <a-sub-menu v-for='(item,index) in leftMenuData' :key="item.id">
                        <span slot="title">
                            <a-icon :type="item.icon" /><span>{{item.name}}</span></span>
                        <a-menu-item @click='clickMenuTitle(item,element)' :title="element.name" v-for='(element,num) in item.children'
                            :key='"child"+index+num'>
                            {{element.name}}
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout class='padding20'>
                <a-layout-content>
                    <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                        <router-view :src='src'></router-view>
                    </a-layout-content>
                    <!-- <a-card style='minHeight:280px;margin-top: 20px;'></a-card> -->
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script>
    import { Layout,  Menu,  Button } from 'ant-design-vue';

    export default {
        data() {
            return {
                openKeys: [],
                defaultSelectedKeys: ['0'],
                topMenuData: [{
                    name: '数据管理',
                    path: '',
                    icon: '',
                    children: [{
                            name: '数据元',
                            path: 'iframeView',
                            src: '/demo.html'
                        },
                        {
                            name: '资源目录',
                            path: ''
                        },
                    ]
                }],
                leftMenuData: [{
                        id: '1',
                        name: '数据分级分类',
                        path: '',
                        icon: 'codepen-circle',
                        children: [{
                                name: '数据分类管理',
                                path: 'category'
                            },
                            {
                                name: '数据级别管理',
                                path: 'class'
                            },
                            {
                                name: '数据源采集配置',
                                path: 'collection'
                            },
                            {
                                name: '数据识别规则',
                                path: 'discern-rules'
                            },
                            {
                                name: '数据识别',
                                path: 'discern'
                            },
                        ]
                    },
                    {
                        id: '2',
                        name: '系统管理',
                        path: '',
                        icon: 'setting',
                        children: [{
                                name: '用户管理',
                                path: 'userManagementRoles'
                            },
                            {
                                name: '角色管理',
                                path: 'roleManagement'
                            },
                            {
                                name: '单位管理',
                                path: 'developmentManagement'
                            },
                            {
                                name: '菜单管理',
                                path: 'menuPowerManagement'
                            },
                        ]
                    },
                    {
                        id: '3',
                        name: '敏感数据安全防护',
                        path: '',
                        icon: 'setting',
                        children: [{
                                name: '数据权限管理',
                                path: 'permission'
                            },
                            {
                                name: '数据流量采集',
                                path: 'flow'
                            },
                            {
                                name: '数据脱敏任务',
                                path: 'task'
                            },
                            {
                                name: '数据加解密',
                                path: 'encrypt'
                            },
                            {
                                name: '数据溯源',
                                path: 'source'
                            },
                            {
                                name: '数据检测',
                                path: 'detection'
                            },
                        ]
                    },
                ],
                userData: {}, //用户数据
                src: '', //集成html页面地址
                isRouterAlive: true, //路由刷新判断
            }
        },
        created() {
            this.getSelectKeys()
            this.loadCurrentUser()
            this.$router.push('/category')
        },
        computed: {
            rootSubmenuKeys: function() {
                const keys = []
                this.leftMenuData.forEach((item, index) => keys.push(item.id))
                return keys
            }
        },
        methods: {
            loadCurrentUser(){
                this.$axios.get('/fline/currentUser').then((data) => {
                    if (data.data.code == 200) {
                        this.userData=data.data.data
                        if(this.userData&&this.userData.name!==''){
                            this.$router.push({name:'category'});
                        }else{
                            this.$router.push({name:'login'});
                        };
                    }
                });
            },
            getSelectKeys() {
                this.leftMenuData.filter((item, index) => index == 0 ? this.openKeys.push(item.id) : '')
            },
            clickMenuTitle(item, element) { //路由跳转，面包屑设置
                if (element && element.path !== '' || item.path !== '') {
                    this.$router.push({
                        name: element ? element.path : item.path
                    });
                } else {
                    this.$message.error('快马加班赶制中！')
                }
                //集成html
                if (element && element.src) {
                    this.src = element.src ? element.src : '';
                }
            },
            onOpenChange(openKeys) { //菜单只打开选中的
                const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
                if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                    this.openKeys = openKeys;
                } else {
                    this.openKeys = latestOpenKey ? [latestOpenKey] : [];
                }
            },
            //退出登录
            logout(){
                this.$axios.post('/fline/logout').then(res=>{
                    this.$router.push('/login');
                    this.$message.success('注销成功！');
                }).catch (err=>{
                    console.log(err)
                })
            },
            reload() {
                this.isRouterAlive = false
                this.$nextTick(() => (this.isRouterAlive = true))
            }
        },
    }
</script>

<style lang="less" scoped>
    .compony-tiltle {
        font-size: 24px;
        color: #4C6CEC;
        margin: 0 0 0 20px;
        font-weight: bold;
    }
</style>
