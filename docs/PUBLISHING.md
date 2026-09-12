# 发布到 GitHub + 部署上线,详细步骤

这份文档假设你已经有一个 GitHub 账号,项目文件都在你本地的某个文件夹
里(下面统一用 `你的项目文件夹路径` 代指,换成你自己电脑上的实际路径
就行,比如 `D:\Projects\site-nav-template`)。分两大部分:
**一、把代码传到 GitHub**;**二、让 `nav.xiafenxiang.com` 能访问到这个站**。

---

## 第一部分:把代码发布到 GitHub

### 方式 A:命令行(推荐,跟着敲一遍就懂了)

在 Windows 上,建议安装 [Git for Windows](https://git-scm.com/download/win)
(装好之后右键文件夹会有"Git Bash Here"选项,下面的命令都在 Git Bash
或者 PowerShell 里执行)。

**1. 检查/配置 Git 身份信息(只需要做一次,全局生效)**

```bash
git config --global user.name "你的名字或昵称"
git config --global user.email "你的邮箱"
```

**2. 进入项目文件夹,初始化 git 仓库**

```bash
cd "你的项目文件夹路径"
git init
```

**3. 查看会被提交的文件,确认没有不该传的东西**

```bash
git status
```

确认列表里**没有** `_to_delete/` 目录(已经在 `.gitignore` 里排除了),
如果看到了,先检查 `.gitignore` 是否在项目根目录。

**4. 添加文件并创建第一个提交**

```bash
git add .
git commit -m "Initial commit: 瞎分享导航静态站点"
```

**5. 在 GitHub 网站上创建一个新仓库**

1. 打开 https://github.com/new
2. 填写仓库名,比如 `site-nav-template`(名字随意,不影响最终域名)
3. **不要**勾选"Add a README file"、"Add .gitignore"、"Choose a license"
   这几个选项(本地已经有这些文件了,勾选了反而会导致推送时冲突)
4. Public(公开)还是 Private(私有)都可以,想让别人看到代码就选
   Public
5. 点击 "Create repository"
6. 仓库建好后,建议顺手把首页右上角齿轮图标(仓库设置)旁边的
   **Description** 填一句带关键词的简介,比如"简约纯静态网址导航站
   模板 / Site Nav Template",再点旁边的齿轮加几个 **Topics**,比如
   `nav`、`navigation`、`site-nav`、`bookmarks`、`homepage`、
   `导航`、`网址导航`——这些是 GitHub 搜索会用来匹配的关键词,别人
   搜"网址导航"、"site nav"之类的词更容易找到这个项目。

**6. 把本地仓库关联到 GitHub,并推送**

创建完仓库后,GitHub 会显示一段命令,类似这样(把 `你的用户名` 和
`仓库名` 换成实际的):

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

第一次推送时会弹出浏览器要求登录 GitHub 账号授权,登录一下就行。
推送完成后,刷新 GitHub 仓库页面,应该能看到所有文件了。

**以后每次改完文件,想同步到 GitHub,只需要:**

```bash
git add .
git commit -m "描述一下这次改了什么,比如:新增 5 个网站"
git push
```

### 方式 B:GitHub Desktop(图形界面,不想用命令行的话)

1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录你的 GitHub 账号
3. 左上角 "File" → "Add Local Repository",选择你的项目文件夹
4. 如果提示"这不是一个 git 仓库,是否要创建",点确认创建
5. 左下角写一句提交说明,点 "Commit to main"
6. 右上角点 "Publish repository",选择公开或私有,完成发布
7. 以后改完文件,回到 GitHub Desktop,写提交说明 → Commit → Push

### 方式 C:纯网页操作,不装任何软件(连 Git、GitHub Desktop 都不用)

这个方式最简单,全程在浏览器里完成,适合不想装任何工具、只想把文件
传上去的情况。**注意**:GitHub 网页端不会自动帮你解压 zip,所以要先在
自己电脑上把 zip 解压好,上传的是解压出来的文件/文件夹,不是 zip 本身。

1. 打开 https://github.com/new,填仓库名(比如 `site-nav-template`),
   下面几个"Add a README file / .gitignore / license"选项**都不要勾**,
   选好 Public/Private,点 "Create repository"。
2. 新建好的仓库是空的,页面上会有一行提示文字,点其中的
   **"uploading an existing file"** 这个链接(没看到的话,点页面上的
   "Add file" 按钮 → "Upload files" 也是同一个页面)。
3. 打开你电脑上解压好的项目文件夹,全选里面**所有文件和子文件夹**
   (`Ctrl+A`),直接拖进浏览器这个上传
   区域。GitHub 会保留子文件夹结构(`assets/`、`docs/` 这些文件夹会
   原样传上去),不用一个个建文件夹。
   - 项目里 `assets/icons/` 下有 260 多个小图标文件,文件数比较多,
     如果一次全拖进去卡住或报错,分两次传也没问题:先拖除了
     `assets/icons` 之外的所有内容,提交一次;再单独打开
     `assets/icons` 文件夹,把里面的图标文件拖进去,再提交一次。
   - `.gitignore` 这种以点开头的文件,Windows 资源管理器里正常能看到
     (不是隐藏文件),一起拖进去就行。
4. 等页面上的上传进度都跑完("Uploading" 变成文件列表),滚动到最下面,
   在 "Commit changes" 那一栏随便写一句说明(比如 "Initial commit"),
   点绿色的 **"Commit changes"** 按钮。
5. 等它跳转回仓库主页,刷新一下,确认所有文件、文件夹都在了——发布
   就完成了。
6. **以后想更新**:改完本地文件后,回到仓库页面,点 "Add file" →
   "Upload files",把改动过的文件/文件夹再拖进去一次,GitHub 会提示
   "这些文件已存在,是否替换",确认替换、提交,就同步好了。

---

## 第二部分:让 `nav.xiafenxiang.com` 能访问到这个站

推荐用 **GitHub Pages**(免费、跟代码仓库在一起、维护最简单),下面是
具体步骤;文末也列了几个同样免费的替代方案。

### 用 GitHub Pages + 自定义子域名

**1. 开启 GitHub Pages**

1. 打开你的仓库页面 → 上方 "Settings" → 左侧菜单 "Pages"
2. "Build and deployment" → "Source" 选择 "Deploy from a branch"
3. "Branch" 选择 `main`,文件夹选择 `/ (root)`,点 "Save"
4. 稍等一两分钟,页面会显示一个类似
   `https://你的用户名.github.io/仓库名/` 的地址,这个先能正常打开
   说明部署成功了(先不用管这个默认地址,下一步换成你自己的子域名)。

**2. 在仓库里添加 `CNAME` 文件,绑定自定义子域名**

在 GitHub Pages 的设置页面,"Custom domain" 那一栏,填入:

```
nav.xiafenxiang.com
```

点 Save。GitHub 会自动在你的仓库根目录生成一个叫 `CNAME` 的文件
(内容就是这一行域名),以后不要手动删除或改乱它。

> 如果你更喜欢手动创建:在项目根目录新建一个没有后缀名的文件,文件名
> 就叫 `CNAME`,里面只写一行 `nav.xiafenxiang.com`,保存后 `git add` /
> `commit` / `push` 上去也是一样的效果。

**3. 去你的域名 DNS 服务商(`xiafenxiang.com` 的解析后台)添加一条记录**

添加一条 **CNAME 记录**:

| 类型  | 主机记录(子域名前缀) | 记录值(指向) |
|-------|----------------------|----------------|
| CNAME | `nav`                | `你的用户名.github.io` |

注意记录值**不要**带 `https://`,也不要带仓库名和结尾的斜杠,就是
`你的用户名.github.io` 这一段。

DNS 生效一般几分钟到几小时不等(取决于你的服务商和 TTL 设置)。

**4. 等 DNS 生效后,回到 GitHub Pages 设置页面**

- "Custom domain" 那一栏应该会显示一个绿色的勾,表示 DNS 验证通过
- 勾选 **"Enforce HTTPS"**(强制 HTTPS),GitHub 会自动帮你申请免费的
  HTTPS 证书,这个选项通常要等 DNS 验证通过一段时间后才能勾上,如果
  一开始是灰的,过一会儿刷新页面再试

**5. 完成**

访问 `https://nav.xiafenxiang.com`,应该就能看到网站了。以后每次
`git push` 到 `main` 分支,GitHub Pages 会在一两分钟内自动重新部署,
不需要任何额外操作。

### 其它免费静态托管选择(效果类似,任选一个即可,不需要都用)

如果不想用 GitHub Pages,以下几个平台效果类似,也都支持绑定自定义
子域名 + 自动 HTTPS,操作方式大同小异(注册账号 → 关联 GitHub 仓库 →
在项目设置里添加自定义域名 → 按提示在 DNS 里加一条记录):

- **Cloudflare Pages** — https://pages.cloudflare.com/
- **Vercel** — https://vercel.com/
- **Netlify** — https://www.netlify.com/

这几个平台部署纯静态站点(没有构建步骤,Build command 留空,
Publish directory 填项目根目录 `/` 或者留空)都非常简单,跟 GitHub
仓库关联后,以后 `git push` 也会自动重新部署。

### 自己的服务器 + Nginx(不依赖任何平台,自己管)

如果你已经有一台云服务器(阿里云/腾讯云/Vultr 之类都行),想自己管理
而不借助上面那几个平台,思路很简单:**把这份代码放到服务器上的某个
目录,让 Nginx 把这个目录当成网站根目录**。这个项目是纯静态文件,不需要
Node、不需要 `npm install`、不需要任何"构建"这一步。

**1. 把代码传到服务器上**

任选一种方式都可以,效果一样:

```bash
# 方式一:服务器上直接 git clone(需要服务器能访问 GitHub)
git clone https://github.com/你的用户名/仓库名.git /var/www/site-nav-template

# 方式二:本地用 scp/rsync 直接传文件,不依赖 GitHub
rsync -avz --exclude '.git' ./ 用户名@服务器IP:/var/www/site-nav-template/
```

**2. 安装并配置 Nginx**

```bash
# Ubuntu/Debian 系统安装 Nginx
sudo apt update && sudo apt install -y nginx
```

新建一个配置文件,比如 `/etc/nginx/sites-available/site-nav-template`:

```nginx
server {
    listen 80;
    server_name nav.xiafenxiang.com;      # 换成你自己的域名

    root /var/www/site-nav-template;        # 上一步代码放的位置
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

启用这份配置并让 Nginx 重新加载:

```bash
sudo ln -s /etc/nginx/sites-available/site-nav-template /etc/nginx/sites-enabled/
sudo nginx -t              # 检查配置文件语法有没有写错
sudo systemctl reload nginx
```

**3. 把域名指过来**

去域名的 DNS 解析后台,添加一条 **A 记录**,指向服务器的公网 IP:

| 类型 | 主机记录(子域名前缀) | 记录值 |
|------|----------------------|--------|
| A    | `nav`                | 服务器的公网 IP |

**4. (可选)申请免费 HTTPS 证书**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d nav.xiafenxiang.com
```

跟着命令行提示走一遍就行,certbot 会自动改好 Nginx 配置并设置证书
到期自动续期。

**5. 以后怎么更新**

如果用的是方式一(`git clone`),以后更新只需要在服务器上:

```bash
cd /var/www/site-nav-template
git pull
```

如果用的是方式二(`rsync`/`scp`),重新执行一次同步命令,把改动过的
文件覆盖上去即可,Nginx 不需要重启(纯静态文件改了直接生效)。

---

## 小提示

- `sitemap.xml` 和 `robots.txt` 里的域名已经在这一轮改成了
  `https://nav.xiafenxiang.com`,如果以后又换了域名,记得同步更新这
  两个文件。
- 上线之后,可以去 [Google Search Console](https://search.google.com/search-console)
  和百度搜索资源平台分别提交一下 `sitemap.xml`,让搜索引擎更快收录。
- 仓库设为 Public 之后,任何人都能看到代码和提交历史,注意不要把
  密码、密钥之类的敏感信息提交进去(这个项目目前没有任何这类信息,
  正常使用不会有风险)。
