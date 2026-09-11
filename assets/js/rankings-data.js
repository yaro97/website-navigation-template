/**
 * ============================================================================
 * 网址榜单页面 —— 数据源 (rankings.html 专用)
 * ============================================================================
 * 这份数据跟首页的 assets/js/data.js 是同一个思路:纯 JSON,改这一个文件
 * 就能更新榜单,不需要碰任何 HTML/JS。
 *
 * 原网站的榜单是"根据实际访问量自动统计、实时刷新"
 * 的,但这一版是纯静态站点,没有后端来统计点击量,所以没法做到真正的自动
 * 统计。这里改成了"你自己维护的静态榜单"——下面这三份列表是 2026-09
 * 从原网站抓的一份快照,以后想调整排名、换掉某个网站,直接编辑对应数组
 * 就行,顺序就是排名(第一个是第 1 名)。
 *
 * 三个榜(日榜/周榜/月榜)结构完全一样,每一项:
 *   {
 *     "name": "网站名称",
 *     "url": "https://example.com/",
 *     "desc": "一句话简介"
 *   }
 *
 * 加/删/调整排名:跟首页 data.js 一样,直接在对应数组里增删/剪切粘贴顺序。
 * 图标:跟首页用的是完全同一套本地图标优先、自动抓取兜底的逻辑,不需要
 * 额外配置——想自定义某个网站的图标,去 assets/icons/ 文件夹放对应文件名
 * 的图片就行,规则见 assets/icons/README.md。
 */
window.RANKINGS_DATA = {
  "tabs": [
    { "id": "daily", "label": "日榜", "title": "网址热度日榜", "subtitle": "根据今天的访问热度排列(静态快照,不会自动变化)" },
    { "id": "weekly", "label": "周榜", "title": "网址热度周榜", "subtitle": "根据本周的访问热度排列(静态快照,不会自动变化)" },
    { "id": "monthly", "label": "月榜", "title": "网址热度月榜", "subtitle": "根据本月的访问热度排列(静态快照,不会自动变化)" }
  ],
  "items": {
    "daily": [
      { "name": "MobaXterm", "url": "https://mobaxterm.mobatek.net/", "desc": "不仅仅是SSH连接工具" },
      { "name": "知乎", "url": "https://www.zhihu.com/explore", "desc": "国内问答网站" },
      { "name": "虎扑NBA", "url": "https://nba.hupu.com/", "desc": "虎扑篮球社区" },
      { "name": "淘宝", "url": "https://www.taobao.com/", "desc": "购物上淘宝" },
      { "name": "人民网", "url": "http://www.people.com.cn/", "desc": "权威正能量媒体" },
      { "name": "MyFreeMP3", "url": "https://tool.liumingye.cn/music/#/", "desc": "免费音乐MP3下载" },
      { "name": "迅雷电影天堂", "url": "https://xunlei8.cc/", "desc": "支持迅雷下载的电影高清资源" },
      { "name": "虎牙直播", "url": "https://www.huya.com/", "desc": "虎牙在线直播" },
      { "name": "Goldendict", "url": "https://github.com/goldendict/goldendict/wiki/Early-Access-Builds-for-Windows", "desc": "本地词典工具, 会用就超级好用" },
      { "name": "Win好软列表", "url": "https://github.com/Awesome-Windows/Awesome/blob/master/README-cn.md", "desc": "Github速度有点慢" },
      { "name": "腾讯软件中心", "url": "https://pc.qq.com/", "desc": "请选择\"直接下载\"" },
      { "name": "423Down", "url": "https://www.423down.com/", "desc": "去广告绿色破解软件" },
      { "name": "懒得勤快", "url": "https://masuit.net/", "desc": "软件/资源分享" },
      { "name": "吾爱破解", "url": "https://www.52pojie.cn/", "desc": "破解软件,资源分享" },
      { "name": "MSDN", "url": "https://next.itellyou.cn/", "desc": "微软原装系统、Office等下载" },
      { "name": "HelloWindows", "url": "https://hellowindows.cn/", "desc": "Windows纯净原版系统下载站" },
      { "name": "全历史", "url": "https://www.allhistory.com/", "desc": "名画学历史" },
      { "name": "Font Squirrel", "url": "https://www.fontsquirrel.com/", "desc": "英文免费可商用、专为设计师挑选" },
      { "name": "菜鸟教程", "url": "https://www.runoob.com/", "desc": "入门的编程教程, 手册查询" },
      { "name": "CSDN", "url": "https://www.csdn.net/", "desc": "专业开发者社区" }
    ],
    "weekly": [
      { "name": "百度地图", "url": "https://map.baidu.com/", "desc": "百度家的地图" },
      { "name": "淘宝特卖", "url": "https://temai.taobao.com/", "desc": "淘宝打折的商品" },
      { "name": "快递100", "url": "https://m.kuaidi100.com/", "desc": "快递查询跟踪" },
      { "name": "奈菲影视", "url": "https://www.nfyingshi.com/", "desc": "奈飞, HBO等全球流媒体播放" },
      { "name": "Dailymotion", "url": "https://www.dailymotion.com/us", "desc": "VIP破解视频免费看, 需要科学上网" },
      { "name": "Goldendict", "url": "https://github.com/goldendict/goldendict/wiki/Early-Access-Builds-for-Windows", "desc": "本地词典工具, 会用就超级好用" },
      { "name": "OBS", "url": "https://obsproject.com/", "desc": "开源的录屏、推流软件" },
      { "name": "知乎", "url": "https://www.zhihu.com/explore", "desc": "国内问答网站" },
      { "name": "虎扑NBA", "url": "https://nba.hupu.com/", "desc": "虎扑篮球社区" },
      { "name": "QQ邮箱", "url": "https://mail.qq.com/", "desc": "腾讯家的邮箱" },
      { "name": "Bypass", "url": "https://www.bypass.cn/", "desc": "分流抢票" },
      { "name": "百度网盘", "url": "https://pan.baidu.com/", "desc": "虽然限速, 还得用" },
      { "name": "淘宝", "url": "https://www.taobao.com/", "desc": "购物上淘宝" },
      { "name": "快递投诉", "url": "http://sswz.spb.gov.cn/", "desc": "邮政官方处理效率很快" },
      { "name": "豆瓣", "url": "https://movie.douban.com/tv/", "desc": "先瞅瞅有啥好看的电影/电视剧" },
      { "name": "Temp Mail", "url": "https://mail.tm/zh/", "desc": "另一款临时邮箱, 备用" },
      { "name": "PasteMe", "url": "https://paste.liumingye.cn/", "desc": "加密文本分享平台(阅后即焚)" },
      { "name": "MobaXterm", "url": "https://mobaxterm.mobatek.net/", "desc": "不仅仅是SSH连接工具" },
      { "name": "OneNote", "url": "https://www.onenote.com/download/", "desc": "微软家的笔记本" },
      { "name": "OverAPI", "url": "https://overapi.com/", "desc": "CheatSheet 大合集" }
    ],
    "monthly": [
      { "name": "SubHD", "url": "https://subhd.tv/", "desc": "字幕下载交流平台" },
      { "name": "电影先生", "url": "https://dianyi.ng/", "desc": "免费在线视频播放" },
      { "name": "无极磁链", "url": "https://cilian.site/", "desc": "磁力搜索" },
      { "name": "百度地图", "url": "https://map.baidu.com/", "desc": "百度家的地图" },
      { "name": "快递投诉", "url": "http://sswz.spb.gov.cn/", "desc": "邮政官方处理效率很快" },
      { "name": "快递100", "url": "https://m.kuaidi100.com/", "desc": "快递查询跟踪" },
      { "name": "奈菲影视", "url": "https://www.nfyingshi.com/", "desc": "奈飞, HBO等全球流媒体播放" },
      { "name": "Dailymotion", "url": "https://www.dailymotion.com/us", "desc": "VIP破解视频免费看, 需要科学上网" },
      { "name": "360资源站", "url": "https://360zy.com/", "desc": "免费影视资源采集站" },
      { "name": "知乎", "url": "https://www.zhihu.com/explore", "desc": "国内问答网站" },
      { "name": "折购库", "url": "https://www.zhegouku.com/index.php?r=p", "desc": "优惠券实时销量榜" },
      { "name": "淘宝特卖", "url": "https://temai.taobao.com/", "desc": "淘宝打折的商品" },
      { "name": "Goldendict", "url": "https://github.com/goldendict/goldendict/wiki/Early-Access-Builds-for-Windows", "desc": "本地词典工具" },
      { "name": "Xmind", "url": "https://www.xmind.cn/", "desc": "著名思维导图软件" },
      { "name": "网易云音乐", "url": "https://music.163.com/", "desc": "发现与分享音乐" },
      { "name": "淘宝", "url": "https://www.taobao.com/", "desc": "早期成功的购物平台" },
      { "name": "虎扑NBA", "url": "https://nba.hupu.com/", "desc": "虎扑篮球社区" },
      { "name": "百度网盘", "url": "https://pan.baidu.com/", "desc": "虽然限速, 还得用" },
      { "name": "文叔叔", "url": "https://www.wenshushu.cn/", "desc": "文件在线分享传输" },
      { "name": "Slant", "url": "https://www.slant.co/", "desc": "同类软件对比" }
    ]
  }
};
