
# 南大家园新生注册页面

## 背景

原先只有云家园 PC 才能进行新生注册，缺少移动端注册，使移动端用户使用不是很舒适

现提供基于 mincu JS API 的南大家园新生注册页面，并统一应用容器，减少多端适配所带来的问题，对大部分用户较为方便

并且有助于推进 App 新生安装率，扩大工作室影响力
终端脱离于老云家园体系，定制更灵敏，开发更敏捷，基于 mincu，使其拥有对强大的 api 调用能力，并有助于团队 web 容器化（js bridge）技术演进

## 使用

本应用基于 [icejs](https://github.com/alibaba/ice) v1.8.3 进行开发，基于其状态管理、约定式路由、esbuild 压缩等能力进行构建

```bash
# 安装依赖
$ npm install

# 启动服务
$ npm start  # visit http://localhost:3333
```

[More docs](https://ice.work/docs/guide/about).

## 目录

```md
├── build/                         # 构建产物
├── public/
│   ├── index.html                 # 应用入口 HTML
│   └── favicon.png                # Favicon
├── src/                           # 源码路径
│   ├── image/                     # 图片
│   ├── request/                   # 请求
│   ├── utils/                     # 工具
│   ├── models/                    # 状态管理数据模型
│   ├── components/                # 自定义业务组件
│   ├── pages/                     # 页面
│   │   └── Completed/             # 最终完成页面（步骤六）
│   │       ├── index.tsx
│   │   └── Home/                  # 通过身份证和考生号获取学号（步骤二）
│   │       ├── index.tsx
│   │   └── Password/              # 设置密码（步骤五）
│   │       ├── index.tsx
│   │   └── Phone/                 # 验证手机号（步骤四）
│   │       ├── index.tsx
│   │       └── index.module.scss
│   │   └── StudentID/             # 展示学号（步骤三）
│   │       ├── index.tsx
│   │       └── index.module.scss
│   │   └──index.tsx               # 首页入口（步骤一）
│   ├── global.scss                # 全局样式
│   ├── typings.d.ts               # 类型定义文件
│   ├── store.ts                   # 状态管理 store 入口
│   └── app.tsx                    # 应用入口脚本
├── README.md
├── package.json
├── build.json
├── .editorconfig
├── .eslintignore
├── .eslintrc.[j,t]s
├── .gitignore
├── .stylelintignore
├── .stylelintrc.[j,t]s
├── .gitignore
└── tsconfig.json
```
