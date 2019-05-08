import Vue from "vue";
import Router from "vue-router";

// 404，403页面
import NotFound from "./views/404";
import Forbidden from "./views/403";

// 引入nprogress进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { notification } from "ant-design-vue";

// 引入权限判断
import { checkCurrentAuthority, isLogin } from "./utils/auth";
// 引入lodash方法
import findLast from "lodash/findLast";

Vue.use(Router);

// const pip = (chunkName, path, page) => () =>
//   import(`/* webpackChunkName: "${chunkName}" */ "./${path}/${page}"`);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // 用户登录和注册
    {
      path: "/user",
      // 不在菜单中显示，包括子元素
      hideInMenu: true,
      // 直接使用render函数渲染路由渲染页面，要比直接编写一个路由渲染页面要方便
      // component: { render: h => h("router-view") },
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      // component: pip("layout", "layouts", "UserLayout"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          // 异步加载组件提高效率(路由懒加载)
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register")
        }
      ]
    },
    {
      path: "/",
      meta: {
        authority: ["admin", "user"]
      },
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: {
            title: "仪表盘",
            icon: "dashboard"
          },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: {
                title: "分析页"
              },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis")
            }
          ]
        },
        {
          path: "/form",
          name: "form",
          meta: {
            title: "表单",
            icon: "form",
            authority: ["admin"]
          },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: {
                title: "基础表单"
              },
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
            },
            {
              path: "/form/step-form",
              hideChildrenInMenu: true,
              name: "stepform",
              meta: {
                title: "分步表单"
              },
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1")
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2")
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3")
                }
              ]
            }
          ]
        }
      ]
    },
    // 配置404页面
    {
      path: "*",
      hideInMenu: true,
      name: "404",
      component: NotFound
    },
    // 配置403页面
    {
      path: "/403",
      hideInMenu: true,
      name: "403",
      component: Forbidden
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

// 结合路由守卫配置进度条动画，权限过滤
// 注意参数：to, from, next
router.beforeEach((to, from, next) => {
  // console.log("beforeEach");
  // 有路由改变时才显示进度条
  if (to.path !== from.path) {
    NProgress.start();
    next();
  }

  // 权限过滤
  // console.log(to);
  // 获取需要权限的项目
  // const authorityItem = to.matched.find(i => i.meta.authority);
  // 要从后往前find否则一直都是第一个
  const authorityItem = findLast(to.matched, i => i.meta.authority);
  // 校验权限
  // 没有通过校验的情况
  // console.log(authorityItem);
  if (authorityItem && !checkCurrentAuthority(authorityItem.meta.authority)) {
    // 没有登陆的情况
    if (!isLogin && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
      // 登录了的情况
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "您暂时还无权访问，请联系管理员"
      });
      next({
        path: "/403"
      });
    }
  }
});

router.afterEach(() => {
  // console.log("afterEach");
  NProgress.done();
});

export default router;
