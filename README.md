# 网址导航模板 · Site Nav Template

一个简洁、响应式、纯静态的 **网址导航 / 网站导航 / 导航网站模板**。

适合搭建个人网址导航、常用网站收藏页、在线工具导航、资源导航或 Bookmark / Web Directory。  
无需后端、数据库或构建工具，只有 HTML + CSS + 原生 JavaScript，下载后即可修改和部署。

🔗 在线演示：**https://nav.xiafenxiang.com**

---

## 🔗 在线演示 Demo

**https://nav.xiafenxiang.com**

这是本项目的在线 Demo，你可以先查看实际效果，再下载代码搭建自己的网址导航站。

---

## 📸 截图

### 桌面端

![网址导航首页桌面端](./docs/screenshots/home-01.png)

![网址导航首页桌面端第二屏](./docs/screenshots/home-02.png)

### 深色模式

![网址导航深色模式](./docs/screenshots/dark-01.png)

### 移动端

<p align="center">
  <img src="./docs/screenshots/mobile-01.png" alt="网址导航移动端首页" width="360">
</p>

<p align="center">
  <img src="./docs/screenshots/mobile-02.png" alt="网址导航移动端菜单" width="360">
</p>

<p align="center">
  <img src="./docs/screenshots/mobile-03.png" alt="网址导航移动端深色模式" width="360">
</p>

---

## 功能特点

### 分类网址导航

支持常用网站、影音娱乐、在线工具、软件工具、技能提升、设计素材、编程开发、金融投资等分类。

每个主分类还可以设置子分类，方便快速筛选和查找网站。

### 网址热度榜单

包含独立榜单页面，可展示：

- 日榜
- 周榜
- 月榜

### 站内搜索 + 搜索引擎切换

支持直接搜索本站收录的网址，也可以切换到：

- 百度
- Google
- Bing
- 淘宝

适合作为浏览器主页、个人导航页或常用网站入口。

### 深色模式

支持浅色 / 深色主题切换，并自动保存用户选择。

Logo、网站图标等视觉元素也针对深色模式进行了适配。

### 响应式布局

支持：

- Desktop
- Tablet
- Mobile

移动端使用独立的抽屉式导航菜单，并针对手机屏幕重新调整布局和交互。

### 本地网站图标

项目内置数百个常用网站图标，存放于：

`assets/icons/`

优先加载本地图标，减少对第三方 favicon 服务的依赖。

当本地图标不存在时，会按照以下方式自动兜底：

`本地图标 → 网站 favicon → 第三方图标服务 → 文字首字母`

### 随机标语

每次进入首页可以从预设内容中随机显示一句标语。

标语内容可以直接在：

`assets/js/slogans.js`

中修改。

### 零依赖

这是一个纯静态 Website Navigation 项目：

- 无 Node.js
- 无 npm
- 无数据库
- 无后端
- 无构建步骤

下载项目文件后即可直接使用。

---

## 适合哪些用途？

这份网址导航源码可以用来搭建：

- 个人网址导航
- 浏览器主页
- 常用网站收藏
- 在线工具导航
- 软件资源导航
- 设计资源导航
- 开发者导航
- Bookmark Homepage
- Website Navigation
- Site Nav
- Web Directory

如果你正在寻找一个可以直接修改的 **网址导航模板 / 网站导航源码 / Site Nav Template**，可以直接基于本项目进行二次开发。

---

## 如何使用

### 在线查看

直接访问：

**https://nav.xiafenxiang.com**

即可查看项目实际运行效果。

### 下载到本地

1. 点击 GitHub 页面右上角的 `Code`
2. 选择 `Download ZIP`
3. 解压文件
4. 打开项目目录

因为部分浏览器会限制本地 `file://` 环境下的 JavaScript 请求，建议使用一个简单的本地 HTTP Server 预览。

例如：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000/
```

---

## 部署上线

这是一个纯静态网站，不需要服务器端程序。

只需要把完整项目文件上传到支持静态网站托管的平台即可。

常见方式包括：

- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify
- Nginx
- Caddy

### GitHub Pages

如果你不想配置服务器，GitHub Pages 是最简单的部署方式之一。

上传代码后，在 GitHub Repository：

`Settings → Pages`

中即可配置。

### 自己的服务器

如果使用 VPS，也可以直接使用 Nginx 或 Caddy 托管项目文件。

最简单的 Nginx 示例：

```nginx
server {
    listen 80;

    server_name nav.example.com;

    root /var/www/site-nav;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

将：

```text
nav.example.com
```

替换成你的域名，并将：

```text
/var/www/site-nav
```

替换成项目实际目录即可。

更完整的 GitHub 上传、GitHub Pages、服务器部署和 DNS 配置教程，请查看：

[`docs/PUBLISHING.md`](./docs/PUBLISHING.md)

---

## 修改成自己的网址导航

### 修改网站分类和网址

编辑：

```text
assets/js/data.js
```

可以增加、删除或修改：

- 分类
- 子分类
- 网站名称
- 网站链接
- 网站图标

### 修改首页标语

编辑：

```text
assets/js/slogans.js
```

### 修改网站样式

主要样式文件：

```text
assets/css/style.css
```

可以修改：

- 主色
- 背景
- 字体
- 间距
- 卡片样式
- 深色模式

### 修改 Logo 和图标

可以替换项目中的 Logo、favicon 和相关图片资源，制作属于自己的导航网站。

### 增加网站图标

新增网址后，可以将图标保存到：

```text
assets/icons/
```

图标命名规则请查看：

[`assets/icons/README.md`](./assets/icons/README.md)

---

## 项目结构

```text
/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── icons/
│   └── img/
├── docs/
│   └── PUBLISHING.md
├── LICENSE
└── README.md
```

---

## 开源许可证

本项目代码基于 **MIT License** 开源。

你可以：

- 使用
- 修改
- 复制
- 分发
- 用于个人项目
- 用于商业项目

使用时请保留原始版权声明和 MIT License。

完整许可证：

[`LICENSE`](./LICENSE)

---

## 声明

1. 本项目是一个网址导航 / 网站导航聚合项目，收录的第三方网站链接仅用于分类和访问便利，不代表对第三方网站内容、安全性、合法性或可用性的背书。

2. 第三方网站名称、Logo 和商标均归各自权利人所有。本项目不主张这些第三方品牌的商标或版权。

3. 用户访问第三方网站时，请自行判断目标网站的安全性和可信度，尤其是在登录账号、支付或下载文件时。

4. 本项目代码按照 MIT License 以 “AS IS” 方式提供，不附带任何明示或暗示担保。

5. 榜单中的日榜、周榜、月榜数据为静态展示内容，并非实时访问统计。

---

## 反馈与贡献

如果你发现 Bug、有功能建议，或者希望改进这个网址导航模板，欢迎提交：

- Issue
- Pull Request

也欢迎 Fork 本项目，修改成属于自己的 Site Navigation / Bookmark Homepage。
