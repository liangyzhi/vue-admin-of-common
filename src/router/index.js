import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 此Router是自己自定义引入暴露出来的，即是自定义的，以下的Router同样是这样
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  routes: [
		{
			/* 首先进行重新定向操作 */
			path: '/',
			redirect: {
				name: 'index'
			}
		},
		{
			path: '/index',
			name: 'index',
			component: () => import('@/views/Index.vue'),
			children: [

                // 数据分类分级
				{
					path: '/category',
					name: 'category',
					meta: {
						isLogin: true,
						title: '数据分类管理'
					},
					component: () => import('@/views/Data/CategoryData.vue')
				},
                {
                	path: '/class',
                	name: 'class',
                	meta: {
                		isLogin: true,
                		title: '数据级别管理'
                	},
                	component: () => import('@/views/Data/ClassData.vue')
                },
                {
                	path: '/collection',
                	name: 'collection',
                	meta: {
                		isLogin: true,
                		title: '数据源采集配置'
                	},
                	component: () => import('@/views/Data/CollectData.vue')
                },
                {
                	path: '/discern-rules',
                	name: 'discern-rules',
                	meta: {
                		isLogin: true,
                		title: '数据识别规则'
                	},
                	component: () => import('@/views/Data/DataRules.vue')
                },
                {
                	path: '/discern',
                	name: 'discern',
                	meta: {
                		isLogin: true,
                		title: '数据识别'
                	},
                	component: () => import('@/views/Data/DiscernData.vue')
                },

                // 用户
				{
					path: '/userManagement',
					name: 'userManagement',
					meta: {
						isLogin: false,
						title: '用户管理--单角色分配'
					},
					component: () => import('@/views/systemManage/UserManagement.vue')
				},
				{
					path: '/userManagementRoles',
					name: 'userManagementRoles',
					meta: {
						isLogin: true,
						title: '用户管理--多角色分配'
					},
					component: () => import('@/views/systemManage/UserManagementRoles.vue')
				},
				{
					path: '/roleManagement',
					name: 'roleManagement',
					meta: {
						isLogin: true,
						title: '角色管理'
					},
					component: () => import('@/views/systemManage/RoleManagement.vue')
				},
				{
					path: '/developmentManagement',
					name: 'developmentManagement',
					meta: {
						isLogin: true,
						title: '部门管理'
					},
					component: () => import('@/views/systemManage/DevelopmentManagement.vue')
				},
				{
					path: '/menuPowerManagement',
					name: 'menuPowerManagement',
					meta: {
						isLogin: true,
						title: '权限管理'
					},
					component: () => import('@/views/systemManage/MenuPowerManagement.vue')
				},
				{
					path: '/iframeView',
					name: 'iframeView',
					meta: {
						keepAlive: true,
						isLogin: true,
						title: '集成html'
					},
					component: () => import('@/views/vueHtml/IframeView.vue')
				},

                // 数据安全防护
                {
                	path: '/permission',
                	name: 'permission',
                	meta: {
                		isLogin: true,
                		title: '数据权限管理'
                	},
                	component: () => import('@/views/Safety/SafePermission.vue')
                },
                {
                	path: '/flow',
                	name: 'flow',
                	meta: {
                		isLogin: true,
                		title: '数据流量采集'
                	},
                	component: () => import('@/views/Safety/SafeFlow.vue')
                },
                {
                	path: '/task',
                	name: 'task',
                	meta: {
                		isLogin: true,
                		title: '数据脱敏任务'
                	},
                	component: () => import('@/views/Safety/SafeTask.vue')
                },
                {
                	path: '/encrypt',
                	name: 'encrypt',
                	meta: {
                		isLogin: true,
                		title: '数据加解密'
                	},
                	component: () => import('@/views/Safety/SafeEncrypt.vue')
                },
                {
                	path: '/source',
                	name: 'source',
                	meta: {
                		isLogin: true,
                		title: '数据溯源'
                	},
                	component: () => import('@/views/Safety/SafeSource.vue')
                },
                {
                	path: '/detection',
                	name: 'detection',
                	meta: {
                		isLogin: true,
                		title: '数据检测'
                	},
                	component: () => import('@/views/Safety/SafeDetection.vue')
                },
			]
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/Login.vue')
		}
	]
})
