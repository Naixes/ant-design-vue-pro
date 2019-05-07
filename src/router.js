import Vue from "vue";
import Router from "vue-router";

import NotFound from "./views/404";

// 引入nprogress进度条
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

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
            icon: "form"
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

// 结合路由守卫配置进度条动画
router.beforeEach((from, to, next) => {
  // 有路由改变时才显示进度条
  if (to.path !== from.path) {
    Nprogress.start();
    next();
  }
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
