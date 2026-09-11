/**
 * ============================================================================
 *  瞎分享导航 - 网站数据源 (唯一需要手动维护的文件)
 * ============================================================================
 *
 *  【这是什么】
 *  本文件是整个导航站"内容"的唯一数据源。首页 (index.html) 和几个占位页
 *  通过 <script src="assets/js/data.js"></script> 直接加载本文件,
 *  读取全局变量 window.NAV_DATA 来渲染分类、子标签和网站卡片。
 *  加/删/改一个网站,只需要改这一个文件,不需要碰任何其它文件、
 *  也不需要跑任何脚本 —— 这也是这一版特意去掉"详情页"系统的原因,
 *  详见 README.md 里的说明。
 *
 *  本文件本质上就是一段 "变量名 = JSON数据" 的 JS 代码,所以:
 *    - 顶部的这些注释、以及后面用 // 写的说明,浏览器都会忽略,
 *      纯粹是给"人"看的维护说明,放心写、随便写。
 *    - 但是 `window.NAV_DATA = { ... };` 这个大括号 { } 里面的内容,
 *      必须是"纯 JSON"格式 —— 也就是说,大括号内部不能再写 // 注释,
 *      字符串必须用双引号,最后一个元素后面不能有多余的逗号。
 *
 *  【数据结构说明】
 *  {
 *    "categories": [                  // 分类数组,数组顺序 = 首页从上到下的顺序
 *      {
 *        "id":   "kuzhan",            // 分类唯一英文ID,用于生成锚点(#kuzhan),不能重复
 *        "name": "酷站推荐",           // 分类中文名称,显示在侧边栏和分类标题上
 *        "icon": "star",              // 图标名(见 assets/js/app.js 顶部 ICONS 表里的可选值)
 *
 *        // "subgroups" 是可选字段:如果这个分类下面还想再分"子标签"
 *        // (比如"软件工具"下面有[常用软件][软件资源]两个可切换的小标签),
 *        // 就把子标签名称按顺序写在这个数组里,第一个会默认展示。
 *        // 不需要子标签的分类(比如"酷站推荐"),直接不写这个字段就行。
 *        "subgroups": ["常用软件", "软件资源"],
 *
 *        "links": [                   // 该分类下的网站列表
 *          {
 *            "title": "QQ邮箱",                 // 网站名称,显示在卡片标题
 *            "url":   "https://mail.qq.com/",   // 网站真实地址,点击卡片跳转到这里
 *            "desc":  "腾讯家的邮箱",             // 一句话简介,显示在卡片副标题
 *            "group": "常用软件"                 // 可选:属于上面 subgroups 里的哪一个子标签。
 *                                                //  值必须和 subgroups 数组里的某一项完全一致(一字不差),
 *                                                //  如果这个分类没有写 subgroups,这个字段可以不要。
 *          },
 *          ... 更多网站
 *        ]
 *      },
 *      ... 更多分类
 *    ]
 *  }
 *
 *  【怎么增删改】(改完直接刷新 index.html 就能看到效果,不需要任何构建步骤)
 *  - 新增一个网站: 在对应分类的 "links" 数组里,照着已有的格式,
 *    复制一条 {"title": ..., "url": ..., "desc": ...} 粘贴修改即可。
 *    如果这个分类有 subgroups,记得给新条目也加一个 "group" 字段。
 *  - 新增一个子标签: 直接在该分类的 "subgroups" 数组里加一个新名字即可,
 *    这个子标签刚开始没有任何网站也没关系,页面会显示"内容建设中"的占位提示
 *    (标签上也会显示一个 0,提醒你这个子分类还没内容),
 *    以后想起来了再往 links 里加对应 "group" 的网站就行。
 *  - 新增一个分类: 在 "categories" 数组末尾(或任意位置)整段复制一个
 *    分类对象,改 id / name / icon,links 先给个空数组 [] 也可以。
 *  - 删除: 直接把对应的 { ... } 一整段(包括前后的逗号)删掉即可。
 *  - 调整顺序: 直接调整数组里对象的先后顺序,首页会跟着变。
 *
 *  【关于重复网站】
 *  同一个网站出现在多个分类里是允许的(和原网站行为一致),
 *  例如"淘宝"既在"酷站推荐"也在"常用网站"下的"生活日常"子标签里,
 *  这是正常现象,不用去重。
 *
 *  【这份数据是怎么来的】
 *  2026-09 这一版是从原站逐个分类 + 逐个子标签重新核对过的,
 *  之前的版本漏抓了不少"点击子标签才会异步加载"的内容(原站用 AJAX 懒加载
 *  每个子标签下的网站列表,首页静态内容只包含默认展开的那个子标签)。
 *  如果以后原站下线了、没法再回去核对,这份数据就是最新最全的底稿。
 * ============================================================================
 */
window.NAV_DATA = {
  "categories": [
    {
      "id": "kuzhan",
      "name": "酷站推荐",
      "icon": "star",
      "links": [
        {
          "title": "QQ邮箱",
          "url": "https://mail.qq.com/",
          "desc": "腾讯家的邮箱"
        },
        {
          "title": "163邮箱",
          "url": "https://mail.163.com/",
          "desc": "网易邮箱"
        },
        {
          "title": "虎扑NBA",
          "url": "https://nba.hupu.com/",
          "desc": "虎扑篮球社区"
        },
        {
          "title": "京东",
          "url": "https://www.jd.com/",
          "desc": "综合网上购物商城"
        },
        {
          "title": "淘宝",
          "url": "https://www.taobao.com/",
          "desc": "早期成功的购物平台"
        },
        {
          "title": "网易云音乐",
          "url": "https://music.163.com/",
          "desc": "发现与分享音乐"
        },
        {
          "title": "CCTV官网",
          "url": "https://tv.cctv.com/live/index.shtml",
          "desc": "没事在线看电视"
        },
        {
          "title": "腾讯视频",
          "url": "https://v.qq.com/",
          "desc": "在线视频媒体平台"
        },
        {
          "title": "B站",
          "url": "https://www.bilibili.com/",
          "desc": "国内知名视频弹幕网站"
        },
        {
          "title": "知乎",
          "url": "https://www.zhihu.com/explore",
          "desc": "国内问答网站"
        },
        {
          "title": "新浪微博",
          "url": "https://weibo.com/",
          "desc": "微博你还在用么?"
        },
        {
          "title": "豆瓣",
          "url": "https://www.douban.com/",
          "desc": "电影、图书、音乐评论、推荐"
        },
        {
          "title": "人民网",
          "url": "http://www.people.com.cn/",
          "desc": "权威正能量媒体"
        },
        {
          "title": "腾讯网",
          "url": "https://www.qq.com/",
          "desc": "新闻资讯"
        },
        {
          "title": "今日热榜",
          "url": "https://tophub.today/",
          "desc": "网上热点跟踪"
        }
      ]
    },
    {
      "id": "changyong",
      "name": "常用网站",
      "icon": "grid",
      "subgroups": [
        "生活日常",
        "新闻资讯"
      ],
      "links": [
        {
          "title": "折购库",
          "url": "http://www.zhegouku.com/",
          "desc": "购物先领优惠券!",
          "group": "生活日常"
        },
        {
          "title": "快递100",
          "url": "https://m.kuaidi100.com/",
          "desc": "快递查询跟踪",
          "group": "生活日常"
        },
        {
          "title": "快递投诉",
          "url": "http://sswz.spb.gov.cn/",
          "desc": "邮政官方处理效率很快",
          "group": "生活日常"
        },
        {
          "title": "微信网页版",
          "url": "https://wx.qq.com/",
          "desc": "网页上的微信",
          "group": "生活日常"
        },
        {
          "title": "淘宝",
          "url": "https://www.taobao.com/",
          "desc": "购物上淘宝",
          "group": "生活日常"
        },
        {
          "title": "淘宝特卖",
          "url": "https://temai.taobao.com/",
          "desc": "淘宝打折的商品",
          "group": "生活日常"
        },
        {
          "title": "天猫精选",
          "url": "https://www.tmall.com/",
          "desc": "天猫精选",
          "group": "生活日常"
        },
        {
          "title": "京东",
          "url": "https://www.jd.com/",
          "desc": "京东购物",
          "group": "生活日常"
        },
        {
          "title": "百度网盘",
          "url": "https://pan.baidu.com/",
          "desc": "虽然限速, 还得用",
          "group": "生活日常"
        },
        {
          "title": "12306",
          "url": "https://www.12306.cn/index/",
          "desc": "买火车票官网",
          "group": "生活日常"
        },
        {
          "title": "Bypass",
          "url": "https://www.bypass.cn/",
          "desc": "分流抢票",
          "group": "生活日常"
        },
        {
          "title": "携程",
          "url": "https://www.ctrip.com/",
          "desc": "酒店预订、旅行购票",
          "group": "生活日常"
        },
        {
          "title": "百度地图",
          "url": "https://map.baidu.com/",
          "desc": "百度家的地图",
          "group": "生活日常"
        },
        {
          "title": "高德地图",
          "url": "https://ditu.amap.com/",
          "desc": "阿里家的地图",
          "group": "生活日常"
        },
        {
          "title": "查天气",
          "url": "http://www.weather.com.cn/",
          "desc": "中国天气网",
          "group": "生活日常"
        },
        {
          "title": "音乐热歌榜",
          "url": "https://music.163.com/#/discover/toplist?id=3778678",
          "desc": "网易云音乐",
          "group": "生活日常"
        },
        {
          "title": "优惠券实时销量榜",
          "url": "https://www.zhegouku.com/index.php?r=p",
          "desc": "优惠券实时销量榜",
          "group": "生活日常"
        },
        {
          "title": "今日热榜",
          "url": "https://tophub.today/",
          "desc": "网上热点跟踪",
          "group": "新闻资讯"
        },
        {
          "title": "知微事见",
          "url": "https://ef.zhiweidata.com/",
          "desc": "最全的互联网社会热点聚合平台",
          "group": "新闻资讯"
        },
        {
          "title": "腾讯网",
          "url": "https://www.qq.com/",
          "desc": "腾讯新闻资讯",
          "group": "新闻资讯"
        },
        {
          "title": "人民网",
          "url": "http://www.people.com.cn/",
          "desc": "权威正能量媒体",
          "group": "新闻资讯"
        },
        {
          "title": "36氪",
          "url": "https://www.36kr.com/",
          "desc": "深度剖析最前沿的资讯",
          "group": "新闻资讯"
        },
        {
          "title": "少数派",
          "url": "https://sspai.com/",
          "desc": "高品质数字消费指南",
          "group": "新闻资讯"
        },
        {
          "title": "小众软件",
          "url": "https://www.appinn.com/",
          "desc": "小众软件分享",
          "group": "新闻资讯"
        },
        {
          "title": "虎嗅网",
          "url": "https://www.huxiu.com/",
          "desc": "个性化的商业资讯",
          "group": "新闻资讯"
        },
        {
          "title": "DoNews",
          "url": "https://www.donews.com/",
          "desc": "互联网从业人士交流的平台",
          "group": "新闻资讯"
        }
      ]
    },
    {
      "id": "yingyin",
      "name": "影音娱乐",
      "icon": "film",
      "subgroups": [
        "在线视频",
        "资源下载",
        "直播网站"
      ],
      "links": [
        {
          "title": "豆瓣",
          "url": "https://movie.douban.com/tv/",
          "desc": "先瞅瞅有啥好看的电影/电视剧",
          "group": "在线视频"
        },
        {
          "title": "腾讯视频",
          "url": "https://v.qq.com/",
          "desc": "在线视频媒体平台",
          "group": "在线视频"
        },
        {
          "title": "B站",
          "url": "https://www.bilibili.com/",
          "desc": "国内知名视频弹幕网站",
          "group": "在线视频"
        },
        {
          "title": "电影先生",
          "url": "https://dianyi.ng/",
          "desc": "免费在线视频播放",
          "group": "在线视频"
        },
        {
          "title": "华为吧",
          "url": "https://huawei8.live/",
          "desc": "免费影视资源采集站",
          "group": "在线视频"
        },
        {
          "title": "360资源站",
          "url": "https://360zy.com/",
          "desc": "免费影视资源采集站",
          "group": "在线视频"
        },
        {
          "title": "6080电影网",
          "url": "https://www.fjyftech.com/",
          "desc": "在线视频播放",
          "group": "在线视频"
        },
        {
          "title": "Dailymotion",
          "url": "https://www.dailymotion.com/us",
          "desc": "VIP破解视频免费看, 需要科学上网",
          "group": "在线视频"
        },
        {
          "title": "奈菲影视",
          "url": "https://www.nfyingshi.com/",
          "desc": "奈飞, HBO等全球流媒体播放",
          "group": "在线视频"
        },
        {
          "title": "555电影",
          "url": "https://www.5wuzq.wiki/",
          "desc": "在线vip视频播放网站",
          "group": "在线视频"
        },
        {
          "title": "VIP视频解析",
          "url": "https://www.aidouer.cc/",
          "desc": "走过大荒VIP视频解析",
          "group": "在线视频"
        },
        {
          "title": "VIP视频解析",
          "url": "https://tool.liumingye.cn/video/",
          "desc": "免费vip视频解析",
          "group": "在线视频"
        },
        {
          "title": "低端影视",
          "url": "https://ddys.pro/",
          "desc": "超清在线视频",
          "group": "在线视频"
        },
        {
          "title": "无极磁链",
          "url": "https://cilian.site/",
          "desc": "ØMagnet磁力搜索",
          "group": "资源下载"
        },
        {
          "title": "磁力多",
          "url": "https://hn.cilido.top/",
          "desc": "磁力链接资源搜索, 你懂的",
          "group": "资源下载"
        },
        {
          "title": "QB常见资源汇集",
          "url": "https://github.com/qbittorrent/search-plugins/wiki/Unofficial-search-plugins",
          "desc": "国外常见的资源搜索网站, 啥都有",
          "group": "资源下载"
        },
        {
          "title": "迅雷电影天堂",
          "url": "https://xunlei8.cc/",
          "desc": "支持迅雷下载的电影高清资源",
          "group": "资源下载"
        },
        {
          "title": "音范丝",
          "url": "https://www.yinfans.cc/",
          "desc": "蓝光高清电影资源网站",
          "group": "资源下载"
        },
        {
          "title": "比特大雄",
          "url": "https://www.btdx8.vip/",
          "desc": "高清电影BT种子下载",
          "group": "资源下载"
        },
        {
          "title": "电影天堂",
          "url": "https://dydytt.net/index.htm",
          "desc": "高清电影电视剧下载",
          "group": "资源下载"
        },
        {
          "title": "韩饭网",
          "url": "https://www.hanfan.cc/hanju",
          "desc": "韩剧资讯下载网",
          "group": "资源下载"
        },
        {
          "title": "SubHD",
          "url": "https://subhd.tv/",
          "desc": "字幕下载交流平台",
          "group": "资源下载"
        },
        {
          "title": "射手网(伪)",
          "url": "https://assrt.net/",
          "desc": "老牌字幕下载网站",
          "group": "资源下载"
        },
        {
          "title": "MyFreeMP3",
          "url": "https://tool.liumingye.cn/music/#/",
          "desc": "免费音乐MP3下载",
          "group": "资源下载"
        },
        {
          "title": "歌曲宝",
          "url": "https://www.gequbao.com/",
          "desc": "MP3在线音乐搜索下载",
          "group": "资源下载"
        },
        {
          "title": "爱给网",
          "url": "https://www.aigei.com/",
          "desc": "音乐素材免费下载",
          "group": "资源下载"
        },
        {
          "title": "黑白直播",
          "url": "https://www.heibaizhibo.cc/",
          "desc": "NBA/足球高清直播赛事",
          "group": "直播网站"
        },
        {
          "title": "JRS直播",
          "url": "https://www.zb06.com/",
          "desc": "篮球/足球体育直播平台",
          "group": "直播网站"
        },
        {
          "title": "JRKAN直播",
          "url": "http://www.jrkan.com/",
          "desc": "免费篮球/足球/电竞平台",
          "group": "直播网站"
        },
        {
          "title": "球迷汇",
          "url": "https://www.qiumihui.tv/",
          "desc": "NBA/足球/体育直播",
          "group": "直播网站"
        },
        {
          "title": "88直播",
          "url": "http://www.88kq.cc/",
          "desc": "网址发布页_找到最新网站",
          "group": "直播网站"
        },
        {
          "title": "NBA Streams Reddit",
          "url": "https://v2.nbastreams.to/",
          "desc": "国外直播源",
          "group": "直播网站"
        },
        {
          "title": "斗鱼直播",
          "url": "https://www.douyu.com/",
          "desc": "斗鱼直播",
          "group": "直播网站"
        },
        {
          "title": "虎牙直播",
          "url": "https://www.huya.com/",
          "desc": "虎牙在线直播",
          "group": "直播网站"
        }
      ]
    },
    {
      "id": "zaixian",
      "name": "在线工具",
      "icon": "tool",
      "links": [
        {
          "title": "油猴脚本",
          "url": "https://greasyfork.org/zh-CN",
          "desc": "突破网站各种限制, 懂得都懂"
        },
        {
          "title": "草料二维码",
          "url": "https://cli.im/",
          "desc": "二维码生成/解析工具, 功能丰富"
        },
        {
          "title": "在线二维码",
          "url": "https://cn.online-qrcode-generator.com/",
          "desc": "在线二维码生成器工具, 挺好用"
        },
        {
          "title": "ProcessOn",
          "url": "https://www.processon.com/",
          "desc": "在线思维导图/流程图等制作"
        },
        {
          "title": "TinyPNG",
          "url": "https://tinypng.com/",
          "desc": "老牌在线图片压缩工具"
        },
        {
          "title": "Squoosh",
          "url": "https://squoosh.app/",
          "desc": "另一款图片压缩工具"
        },
        {
          "title": "SM图床",
          "url": "https://sm.ms/",
          "desc": "在线免费图床工具,现在要注册了"
        },
        {
          "title": "路过图床",
          "url": "https://imgse.com/",
          "desc": "免费公共图床, 也还不错"
        },
        {
          "title": "m3u8播放器",
          "url": "https://m3u8-player.com/",
          "desc": "免费无广m3u8在线播放器"
        },
        {
          "title": "M3U8在线播放器",
          "url": "http://tool.liumingye.cn/m3u8/",
          "desc": "在线解析播放m3u8资源"
        },
        {
          "title": "蛙蛙工具",
          "url": "https://www.iamwawa.cn/",
          "desc": "便捷在线工具合集"
        },
        {
          "title": "程序员工具箱",
          "url": "https://tool.lu/",
          "desc": "程序员在线工具箱"
        },
        {
          "title": "123apps",
          "url": "https://123apps.com/cn/",
          "desc": "在线小工具合集"
        },
        {
          "title": "iLoveIMG",
          "url": "https://www.iloveimg.com/zh-cn",
          "desc": "在线图片处理转换工具"
        },
        {
          "title": "iLovePDF",
          "url": "https://www.ilovepdf.com/zh-cn",
          "desc": "PDF在线处理工具"
        },
        {
          "title": "Aconvert",
          "url": "https://www.aconvert.com/cn/",
          "desc": "在线格式转换工具"
        },
        {
          "title": "Hipdf",
          "url": "https://www.hipdf.cn/",
          "desc": "万兴出品的PDF在线工具集"
        },
        {
          "title": "Snapdrop",
          "url": "https://snapdrop.net/",
          "desc": "局域网在线传输文件神器, 不注册, 不下载"
        },
        {
          "title": "Snapdrop",
          "url": "https://snapdrop.fairysoft.net/",
          "desc": "国人优化版, 可指定对方ID接收文件"
        },
        {
          "title": "Wormhole",
          "url": "https://wormhole.app/",
          "desc": "临时文件分享, 在线传输"
        },
        {
          "title": "Filemail",
          "url": "https://www.filemail.com/",
          "desc": "大文件在线分享传输"
        },
        {
          "title": "文叔叔",
          "url": "https://www.wenshushu.cn/",
          "desc": "文件在线分享传输"
        },
        {
          "title": "Google翻译",
          "url": "https://translate.google.com/",
          "desc": "GG家的翻译, 需科学上网"
        },
        {
          "title": "DeepL翻译",
          "url": "https://www.deepl.com/en/translator",
          "desc": "据说准确性更高"
        },
        {
          "title": "腾讯翻译",
          "url": "https://transmart.qq.com/zh-CN/index",
          "desc": "腾讯家出的在线翻译工具, 还不错"
        },
        {
          "title": "Qwerty Learner",
          "url": "https://qwerty.kaiyi.cool/",
          "desc": "键盘打字练习, 还能学习单词"
        },
        {
          "title": "PasteMe",
          "url": "https://paste.liumingye.cn/",
          "desc": "加密文本分享平台(阅后即焚)"
        },
        {
          "title": "在线排版",
          "url": "http://www.yan-wei.net/",
          "desc": "清除网页复制格式"
        },
        {
          "title": "AlternativeTo",
          "url": "https://alternativeto.net/",
          "desc": "寻找更好的替换软件"
        },
        {
          "title": "Slant",
          "url": "https://www.slant.co/",
          "desc": "同类软件对比"
        },
        {
          "title": "语雀",
          "url": "https://www.yuque.com/",
          "desc": "优雅高效的在线文档编辑与知识管理库"
        },
        {
          "title": "麦客CRM",
          "url": "http://www.mikecrm.com/",
          "desc": "在线表单制作工具、市调必备"
        },
        {
          "title": "Temp Mail",
          "url": "https://mail.tm/zh/",
          "desc": "另一款临时邮箱, 备用"
        },
        {
          "title": "临时邮箱",
          "url": "https://www.suiyongsuiqi.com/zh/",
          "desc": "随用随弃临时邮箱, 临时注册账号用"
        },
        {
          "title": "Bezier",
          "url": "https://bezier.method.ac/",
          "desc": "在线钢笔练习工具"
        },
        {
          "title": "十万个为什么",
          "url": "https://10why.net/",
          "desc": "青少年百科全书, 大人也可学习"
        },
        {
          "title": "清图",
          "url": "https://qingtu.cn/",
          "desc": "模糊图片秒转高清图在线工具"
        }
      ]
    },
    {
      "id": "ruanjian",
      "name": "软件工具",
      "icon": "package",
      "subgroups": [
        "常用软件",
        "软件资源"
      ],
      "links": [
        {
          "title": "Win好软列表",
          "url": "https://github.com/Awesome-Windows/Awesome/blob/master/README-cn.md",
          "desc": "Github速度有点慢",
          "group": "常用软件"
        },
        {
          "title": "Mac好软列表",
          "url": "https://github.com/jaywcjlove/awesome-mac/blob/master/README-zh.md",
          "desc": "Github速度有点慢",
          "group": "常用软件"
        },
        {
          "title": "Everything",
          "url": "https://www.voidtools.com/zh-cn/",
          "desc": "本地搜索神器",
          "group": "常用软件"
        },
        {
          "title": "Ag",
          "url": "https://github.com/JFLarvoire/the_silver_searcher",
          "desc": "Win文件内容搜索,比Grep好用",
          "group": "常用软件"
        },
        {
          "title": "MPV",
          "url": "https://mpv.io/",
          "desc": "简约不简单的视频播放器",
          "group": "常用软件"
        },
        {
          "title": "PotPlayer",
          "url": "https://potplayer.org/",
          "desc": "另一款视频播放器",
          "group": "常用软件"
        },
        {
          "title": "7-Zip",
          "url": "https://www.7-zip.org/",
          "desc": "简约压缩软件",
          "group": "常用软件"
        },
        {
          "title": "Cmder",
          "url": "https://cmder.app/",
          "desc": "比CMD好用太多",
          "group": "常用软件"
        },
        {
          "title": "CCleaner",
          "url": "https://www.ccleaner.com/",
          "desc": "系统清理工具",
          "group": "常用软件"
        },
        {
          "title": "Dism++",
          "url": "http://chuyu.me/en-US/",
          "desc": "Windows系统工具",
          "group": "常用软件"
        },
        {
          "title": "Adobe家族",
          "url": "https://www.adobe.com/cn/downloads.html",
          "desc": "设计师都知道",
          "group": "常用软件"
        },
        {
          "title": "Jetbrains系列",
          "url": "https://www.jetbrains.com/",
          "desc": "程序员都知道的IDE工具",
          "group": "常用软件"
        },
        {
          "title": "OBS",
          "url": "https://obsproject.com/",
          "desc": "开源的录屏、推流软件",
          "group": "常用软件"
        },
        {
          "title": "Bandicam",
          "url": "https://www.bandicam.cn/",
          "desc": "录屏软件",
          "group": "常用软件"
        },
        {
          "title": "Recuva",
          "url": "https://www.ccleaner.com/recuva/download",
          "desc": "文件恢复工具",
          "group": "常用软件"
        },
        {
          "title": "FS Image",
          "url": "https://www.ghxi.com/faststoneiw.html",
          "desc": "好用的看图软件",
          "group": "常用软件"
        },
        {
          "title": "SumatraPDF",
          "url": "https://www.sumatrapdfreader.org/free-pdf-reader.html",
          "desc": "小巧极速PDF阅读器",
          "group": "常用软件"
        },
        {
          "title": "网易云",
          "url": "https://music.163.com/",
          "desc": "音乐播放器",
          "group": "常用软件"
        },
        {
          "title": "Obsidian",
          "url": "https://obsidian.md/",
          "desc": "近期很火热的MD笔记软件",
          "group": "常用软件"
        },
        {
          "title": "OneNote",
          "url": "https://www.onenote.com/download/",
          "desc": "微软家的笔记本",
          "group": "常用软件"
        },
        {
          "title": "VSCode",
          "url": "https://code.visualstudio.com/",
          "desc": "微软家的文本编辑器,推荐!",
          "group": "常用软件"
        },
        {
          "title": "嘀嗒清单",
          "url": "https://www.dida365.com/",
          "desc": "待办事项, 日程规划",
          "group": "常用软件"
        },
        {
          "title": "坚果云",
          "url": "https://www.jianguoyun.com/",
          "desc": "国内同步盘",
          "group": "常用软件"
        },
        {
          "title": "Chrome",
          "url": "https://www.google.cn/chrome/",
          "desc": "国内可以用Cent Browser代替",
          "group": "常用软件"
        },
        {
          "title": "WinSCP",
          "url": "https://winscp.net/eng/index.php",
          "desc": "FTP工具，比FileZilla更顺手",
          "group": "常用软件"
        },
        {
          "title": "Xshell",
          "url": "https://www.netsarang.com/zh/free-for-home-school/",
          "desc": "经典SSH连接工具",
          "group": "常用软件"
        },
        {
          "title": "MobaXterm",
          "url": "https://mobaxterm.mobatek.net/",
          "desc": "不仅仅是SSH连接工具",
          "group": "常用软件"
        },
        {
          "title": "Xmind",
          "url": "https://www.xmind.cn/",
          "desc": "著名思维导图软件",
          "group": "常用软件"
        },
        {
          "title": "Mindmaster",
          "url": "https://www.edrawsoft.cn/mindmaster/",
          "desc": "个人更喜欢这款",
          "group": "常用软件"
        },
        {
          "title": "Rufus",
          "url": "https://rufus.ie/",
          "desc": "USB启动盘制作工具",
          "group": "常用软件"
        },
        {
          "title": "Saladict",
          "url": "https://saladict.crimx.com/",
          "desc": "沙拉查词在线词典工具",
          "group": "常用软件"
        },
        {
          "title": "Goldendict",
          "url": "https://github.com/goldendict/goldendict/wiki/Early-Access-Builds-for-Windows",
          "desc": "本地词典工具, 会用就超级好用",
          "group": "常用软件"
        },
        {
          "title": "VirtualBox",
          "url": "https://www.virtualbox.org/",
          "desc": "跨平台免费虚拟机软件",
          "group": "常用软件"
        },
        {
          "title": "PixPin",
          "url": "https://pixpinapp.com/",
          "desc": "超好用的截图/贴图/长截图工具",
          "group": "常用软件"
        },
        {
          "title": "FS Capture",
          "url": "https://www.puresys.net/",
          "desc": "经典、强大截图工具",
          "group": "常用软件"
        },
        {
          "title": "Snipaste",
          "url": "https://zh.snipaste.com/",
          "desc": "国产贴图工具",
          "group": "常用软件"
        },
        {
          "title": "ZY Player",
          "url": "http://zyplayer.fun/",
          "desc": "跨平台开源观影神器",
          "group": "常用软件"
        },
        {
          "title": "黑鸟播放器",
          "url": "https://guihet.com/blackbird-player.html",
          "desc": "全球网络电视直播利器",
          "group": "常用软件"
        },
        {
          "title": "HelloWindows",
          "url": "https://hellowindows.cn/",
          "desc": "Windows纯净原版系统下载站",
          "group": "软件资源"
        },
        {
          "title": "MSDN",
          "url": "https://next.itellyou.cn/",
          "desc": "微软原装系统、Office等下载",
          "group": "软件资源"
        },
        {
          "title": "Office Tool Plus",
          "url": "https://otp.landian.vip/zh-cn/",
          "desc": "MS Office安装激活",
          "group": "软件资源"
        },
        {
          "title": "Microsoft Activation Scripts",
          "url": "https://github.com/massgravel/Microsoft-Activation-Scripts",
          "desc": "MS系统、Office激活工具",
          "group": "软件资源"
        },
        {
          "title": "吾爱破解",
          "url": "https://www.52pojie.cn/",
          "desc": "破解软件,资源分享",
          "group": "软件资源"
        },
        {
          "title": "Xclient",
          "url": "https://xclient.info/",
          "desc": "精品MAC应用分享",
          "group": "软件资源"
        },
        {
          "title": "极简插件",
          "url": "https://chrome.zzzmh.cn/",
          "desc": "收录国内热门Chrome插件",
          "group": "软件资源"
        },
        {
          "title": "瞎分享",
          "url": "https://xiafenxiang.com/",
          "desc": "各类资源分享, 含软件",
          "group": "软件资源"
        },
        {
          "title": "果核剥壳",
          "url": "https://www.ghxi.com/",
          "desc": "还原破解软件本质",
          "group": "软件资源"
        },
        {
          "title": "懒得勤快",
          "url": "https://masuit.net/",
          "desc": "软件/资源分享",
          "group": "软件资源"
        },
        {
          "title": "芊芊精典",
          "url": "https://myqqjd.com/",
          "desc": "资源软件分享",
          "group": "软件资源"
        },
        {
          "title": "423Down",
          "url": "https://www.423down.com/",
          "desc": "去广告绿色破解软件",
          "group": "软件资源"
        },
        {
          "title": "六音软件",
          "url": "https://www.sixyin.com/",
          "desc": "多平台软件分享网站",
          "group": "软件资源"
        },
        {
          "title": "清华镜像",
          "url": "https://mirrors.tuna.tsinghua.edu.cn/",
          "desc": "很多系统/软件国内加速",
          "group": "软件资源"
        },
        {
          "title": "阿里镜像",
          "url": "https://developer.aliyun.com/mirror/",
          "desc": "阿里出品的镜像加速",
          "group": "软件资源"
        },
        {
          "title": "腾讯软件中心",
          "url": "https://pc.qq.com/",
          "desc": "请选择“直接下载”",
          "group": "软件资源"
        },
        {
          "title": "360软件宝库",
          "url": "https://baoku.360.cn/",
          "desc": "请选择“普通下载”",
          "group": "软件资源"
        }
      ]
    },
    {
      "id": "jineng",
      "name": "技能提升",
      "icon": "book",
      "subgroups": [
        "在线教程",
        "教程资源"
      ],
      "links": [
        {
          "title": "学习强国",
          "url": "https://www.xuexi.cn/",
          "desc": "跟党走,实现中华民族伟大复兴",
          "group": "在线教程"
        },
        {
          "title": "哔哩哔哩",
          "url": "https://www.bilibili.com/",
          "desc": "B站也有内部教程流出",
          "group": "在线教程"
        },
        {
          "title": "网易云课堂",
          "url": "https://study.163.com/",
          "desc": "成人终身在线学习",
          "group": "在线教程"
        },
        {
          "title": "腾讯课堂",
          "url": "https://ke.qq.com/",
          "desc": "腾讯在线教程",
          "group": "在线教程"
        },
        {
          "title": "网易公开课",
          "url": "https://open.163.com/",
          "desc": "全球名校公开课",
          "group": "在线教程"
        },
        {
          "title": "学堂在线",
          "url": "https://www.xuetangx.com/",
          "desc": "国家精品课程",
          "group": "在线教程"
        },
        {
          "title": "中国大学MOOC网",
          "url": "https://www.icourse163.org/",
          "desc": "中国大学慕课网",
          "group": "在线教程"
        },
        {
          "title": "慕课网",
          "url": "https://www.imooc.com/",
          "desc": "程序员文字教程",
          "group": "在线教程"
        },
        {
          "title": "菜鸟教程",
          "url": "https://www.runoob.com/",
          "desc": "程序员文字教程",
          "group": "在线教程"
        },
        {
          "title": "SCI-Hub论文下载",
          "url": "https://tool.yovisun.com/scihub/",
          "desc": "SCI-Hub论文下载镜像站",
          "group": "在线教程"
        },
        {
          "title": "思谋学术",
          "url": "https://ac.scmor.com/",
          "desc": "Google学术镜像",
          "group": "在线教程"
        },
        {
          "title": "吾爱破解",
          "url": "https://www.52pojie.cn/",
          "desc": "破解软件,资源分享",
          "group": "教程资源"
        },
        {
          "title": "小云搜索",
          "url": "https://www.yunso.net/",
          "desc": "各网盘资源混合搜索",
          "group": "教程资源"
        },
        {
          "title": "阿里搜",
          "url": "https://aliso.cc/",
          "desc": "阿里云盘资源搜索",
          "group": "教程资源"
        },
        {
          "title": "学霸盘",
          "url": "https://www.xuebapan.com/",
          "desc": "百度网盘学习资源搜索",
          "group": "教程资源"
        },
        {
          "title": "优聚搜",
          "url": "https://jujuso.com/",
          "desc": "夸克盘资源搜索(需登录)",
          "group": "教程资源"
        },
        {
          "title": "橘子盘搜",
          "url": "https://www.nmme.icu/",
          "desc": "在线网盘影视搜索",
          "group": "教程资源"
        },
        {
          "title": "Anna's Archive",
          "url": "https://annas-archive.org/",
          "desc": "号称世界最大电子书库",
          "group": "教程资源"
        },
        {
          "title": "大圣盘",
          "url": "https://www.dashengpan.com/",
          "desc": "网盘搜索引擎",
          "group": "教程资源"
        },
        {
          "title": "超能搜",
          "url": "https://www.chaonengsou.com/",
          "desc": "百度网盘聚合搜索",
          "group": "教程资源"
        },
        {
          "title": "鸠摩搜书",
          "url": "https://www.jiumodiary.com/",
          "desc": "Jiumo鸠摩电子图书搜索",
          "group": "教程资源"
        },
        {
          "title": "TheFuture",
          "url": "https://bks.thefuture.top/",
          "desc": "电子图书搜索引擎",
          "group": "教程资源"
        }
      ]
    },
    {
      "id": "sheji",
      "name": "设计素材",
      "icon": "palette",
      "subgroups": [
        "热门推荐",
        "图库素材",
        "Logo图标",
        "字体资源",
        "配色工具",
        "PPT模板"
      ],
      "links": [
        {
          "title": "花瓣网",
          "url": "https://huaban.com/",
          "desc": "国内设计师寻找灵感的必备站点",
          "group": "热门推荐"
        },
        {
          "title": "站酷ZCOOL",
          "url": "https://www.zcool.com.cn/",
          "desc": "综合性设计分享交流平台",
          "group": "热门推荐"
        },
        {
          "title": "优设网",
          "url": "https://www.uisdc.com/",
          "desc": "设计师交流平台",
          "group": "热门推荐"
        },
        {
          "title": "阿里图标库",
          "url": "https://www.iconfont.cn/",
          "desc": "国内最著名的图标库",
          "group": "热门推荐"
        },
        {
          "title": "标小智",
          "url": "https://www.logosc.cn/so/",
          "desc": "免版权图片一键搜",
          "group": "热门推荐"
        },
        {
          "title": "Freepik",
          "url": "https://www.freepik.com/?ref=uisdc.com",
          "desc": "知名设计素材站！PSD、矢量图、图库应有尽有",
          "group": "热门推荐"
        },
        {
          "title": "Dribbble",
          "url": "https://dribbble.com/",
          "desc": "国际知名设计站点！",
          "group": "热门推荐"
        },
        {
          "title": "Behance",
          "url": "https://www.behance.net/",
          "desc": "世界著名的设计社区",
          "group": "热门推荐"
        },
        {
          "title": "Canva可画",
          "url": "https://www.canva.cn/",
          "desc": "在线设计超多素材(收费)",
          "group": "热门推荐"
        },
        {
          "title": "Designspiration",
          "url": "https://www.designspiration.com/",
          "desc": "设计灵感、插画摄影、时尚以及艺术相关",
          "group": "热门推荐"
        },
        {
          "title": "Pinterest",
          "url": "https://www.pinterest.com/",
          "desc": "全球最大创意图片网站(科学上网)",
          "group": "热门推荐"
        },
        {
          "title": "OnePageLove",
          "url": "https://onepagelove.com/",
          "desc": "单页面网站展示、模板",
          "group": "热门推荐"
        },
        {
          "title": "PNG素材库",
          "url": "http://pngimg.com/",
          "desc": "PNG海量素材库",
          "group": "图库素材"
        },
        {
          "title": "500px",
          "url": "https://500px.com/popular",
          "desc": "国外图库(科学上网)",
          "group": "图库素材"
        },
        {
          "title": "Pexels",
          "url": "https://www.pexels.com/",
          "desc": "百万张免费高清图片可商用",
          "group": "图库素材"
        },
        {
          "title": "FreeImages",
          "url": "https://www.freeimages.com/",
          "desc": "PSD模板等设计素材下载",
          "group": "图库素材"
        },
        {
          "title": "StockSnap",
          "url": "https://stocksnap.io/",
          "desc": "精美的免费无版权图片素材",
          "group": "图库素材"
        },
        {
          "title": "Stockio",
          "url": "https://www.stockio.com/",
          "desc": "Download free Vectors, Photos, Icons, Fonts and Videos and more. We're constantly expanding our content with exclusive Stockio.com files",
          "group": "图库素材"
        },
        {
          "title": "Unsplash",
          "url": "https://unsplash.com/",
          "desc": "免费商用高清图库",
          "group": "图库素材"
        },
        {
          "title": "Bing图库",
          "url": "https://cn.bing.com/images/trending",
          "desc": "大众化的图片库",
          "group": "图库素材"
        },
        {
          "title": "Wallhaven",
          "url": "https://wallhaven.cc/",
          "desc": "高质量壁纸, 啥都有",
          "group": "图库素材"
        },
        {
          "title": "全历史",
          "url": "https://www.allhistory.com/",
          "desc": "名画学历史",
          "group": "图库素材"
        },
        {
          "title": "Pixabay",
          "url": "https://pixabay.com/",
          "desc": "大量高清免费图片",
          "group": "图库素材"
        },
        {
          "title": "IconFont",
          "url": "https://www.iconfont.cn/",
          "desc": "阿里出品的知名Icon图标库",
          "group": "Logo图标"
        },
        {
          "title": "IconPark",
          "url": "https://iconpark.oceanengine.com/official",
          "desc": "ByteDance字节跳动图标库",
          "group": "Logo图标"
        },
        {
          "title": "Yesicon",
          "url": "https://yesicon.app/",
          "desc": "高质量开源免费Icon库",
          "group": "Logo图标"
        },
        {
          "title": "Font Awesome",
          "url": "https://fontawesome.com/icons",
          "desc": "世界知名Icon图标库",
          "group": "Logo图标"
        },
        {
          "title": "Flaticon",
          "url": "https://www.flaticon.com/",
          "desc": "1800W+偏平Icon免费下载",
          "group": "Logo图标"
        },
        {
          "title": "World Vector Logo",
          "url": "https://worldvectorlogo.com/",
          "desc": "世界知名Logo矢量图库",
          "group": "Logo图标"
        },
        {
          "title": "IconFinder",
          "url": "https://www.iconfinder.com/",
          "desc": "500W+图标,SVG等",
          "group": "Logo图标"
        },
        {
          "title": "IconScout",
          "url": "https://iconscout.com/",
          "desc": "10.1 Million+免费icon",
          "group": "Logo图标"
        },
        {
          "title": "Icons8",
          "url": "https://icons8.com/icons",
          "desc": "不只是Icon",
          "group": "Logo图标"
        },
        {
          "title": "Icon Archive",
          "url": "https://iconarchive.com/",
          "desc": "80W+免费Icon",
          "group": "Logo图标"
        },
        {
          "title": "猫啃网",
          "url": "https://www.maoken.com/",
          "desc": "免费商用中英文字体",
          "group": "字体资源"
        },
        {
          "title": "优优网",
          "url": "https://uiiiuiii.com/tool/typeface",
          "desc": "免费可商用中文+英文字体，含应用场景",
          "group": "字体资源"
        },
        {
          "title": "DaFont",
          "url": "https://www.dafont.com/",
          "desc": "国际知名大量的免费英文字体",
          "group": "字体资源"
        },
        {
          "title": "字由",
          "url": "https://www.hellofont.cn/",
          "desc": "国内外上千款精选字体",
          "group": "字体资源"
        },
        {
          "title": "求字体",
          "url": "http://www.qiuziti.com/",
          "desc": "找字体神器、可以通过图片找字体",
          "group": "字体资源"
        },
        {
          "title": "字体天下",
          "url": "http://www.fonts.net.cn/",
          "desc": "超过3万个中英文字体免费下载",
          "group": "字体资源"
        },
        {
          "title": "字体传奇",
          "url": "http://www.ziticq.com/",
          "desc": "字体品牌设计师交流网",
          "group": "字体资源"
        },
        {
          "title": "Font Squirrel",
          "url": "https://www.fontsquirrel.com/",
          "desc": "英文免费可商用、专为设计师挑选",
          "group": "字体资源"
        },
        {
          "title": "360查字体",
          "url": "https://fonts.safe.360.cn/",
          "desc": "字体版权商用查询",
          "group": "字体资源"
        },
        {
          "title": "Color Wheel",
          "url": "https://color.adobe.com/zh/",
          "desc": "Adobe家的配色工具, 好用",
          "group": "配色工具"
        },
        {
          "title": "Coolors",
          "url": "https://coolors.co/",
          "desc": "配色板生成器",
          "group": "配色工具"
        },
        {
          "title": "uiGradients",
          "url": "https://uigradients.com/",
          "desc": "漂亮渐变色",
          "group": "配色工具"
        },
        {
          "title": "Color Hunt",
          "url": "https://colorhunt.co/",
          "desc": "每天收集并策划发布美丽的配色方案",
          "group": "配色工具"
        },
        {
          "title": "配色导航",
          "url": "https://color.uisdc.com/pick.html",
          "desc": "推荐！流行配色方案，一键复制！",
          "group": "配色工具"
        },
        {
          "title": "ColorDrop",
          "url": "https://colordrop.io/",
          "desc": "让寻找配色方案成为信手拈来的事情",
          "group": "配色工具"
        },
        {
          "title": "Web Gradients",
          "url": "https://webgradients.com/",
          "desc": "网页渐变色",
          "group": "配色工具"
        },
        {
          "title": "Encycolorpedia",
          "url": "https://encycolorpedia.cn/",
          "desc": "颜色百科-各种颜色的详细介绍",
          "group": "配色工具"
        },
        {
          "title": "Officeplus",
          "url": "http://www.officeplus.cn/",
          "desc": "微软Office官方模板",
          "group": "PPT模板"
        },
        {
          "title": "优品PPT",
          "url": "https://www.ypppt.com/",
          "desc": "PPT模板/素材免费下载",
          "group": "PPT模板"
        },
        {
          "title": "第一PPT",
          "url": "http://www.1ppt.com/",
          "desc": "网站内容很不错都是免费下载",
          "group": "PPT模板"
        },
        {
          "title": "逼格PPT",
          "url": "http://www.tretars.com/",
          "desc": "PPT模板, 首页挺有B格的",
          "group": "PPT模板"
        },
        {
          "title": "PPT宝藏",
          "url": "http://www.pptbz.com/",
          "desc": "免费的PPT模板下载",
          "group": "PPT模板"
        },
        {
          "title": "51PPT模板",
          "url": "http://www.51pptmoban.com/ppt/",
          "desc": "不只是PPT模板还有素材",
          "group": "PPT模板"
        },
        {
          "title": "SlideModel",
          "url": "https://slidemodel.com/",
          "desc": "Create attractive presentations with professional PowerPoint templates and slide designs. Use PPT templates to give unique appearance to your presentation.",
          "group": "PPT模板"
        },
        {
          "title": "SlideHunter",
          "url": "https://slidehunter.com/",
          "desc": "Download free presentation templates compatible with Microsoft PowerPoint, creative PPT backgrounds and 100% editable slide designs",
          "group": "PPT模板"
        },
        {
          "title": "UnDraw",
          "url": "https://undraw.co/illustrations",
          "desc": "各种插图/剪贴画、可定义颜色",
          "group": "PPT模板"
        }
      ]
    },
    {
      "id": "bianchen",
      "name": "编程开发",
      "icon": "code",
      "subgroups": [
        "编程常用",
        "前端开发",
        "Python",
        "Linux运维",
        "编程其他"
      ],
      "links": [
        {
          "title": "Stack Overflow",
          "url": "https://stackoverflow.com/",
          "desc": "国外知名IT问答社区",
          "group": "编程常用"
        },
        {
          "title": "GitHub",
          "url": "https://github.com/",
          "desc": "开源集散地",
          "group": "编程常用"
        },
        {
          "title": "Regulex",
          "url": "https://jex.im/regulex/",
          "desc": "推荐!正则不易读,试试这个!",
          "group": "编程常用"
        },
        {
          "title": "正则参考表",
          "url": "https://tool.oschina.net/uploads/apidocs/jquery/regexp.html",
          "desc": "忘了就查这个",
          "group": "编程常用"
        },
        {
          "title": "Regex101",
          "url": "https://regex101.com/",
          "desc": "在线正则工具",
          "group": "编程常用"
        },
        {
          "title": "JS Bin",
          "url": "https://jsbin.com/",
          "desc": "程序员在线编辑器",
          "group": "编程常用"
        },
        {
          "title": "菜鸟教程",
          "url": "https://www.runoob.com/",
          "desc": "入门的编程教程, 手册查询",
          "group": "编程常用"
        },
        {
          "title": "OverAPI",
          "url": "https://overapi.com/",
          "desc": "CheatSheet 大合集",
          "group": "编程常用"
        },
        {
          "title": "W3C词典库",
          "url": "https://www.w3cschool.cn/dict/",
          "desc": "中文作弊单大合集",
          "group": "编程常用"
        },
        {
          "title": "DevDocs",
          "url": "https://devdocs.io/",
          "desc": "开发者在线文档合集",
          "group": "编程常用"
        },
        {
          "title": "jsDelivr",
          "url": "https://www.jsdelivr.com/",
          "desc": "CDN静态资源库",
          "group": "编程常用"
        },
        {
          "title": "字节静态资源库",
          "url": "https://cdn.bytedance.com/",
          "desc": "国内字节跳动静态资源库",
          "group": "编程常用"
        },
        {
          "title": "手册网",
          "url": "http://www.shouce.ren/",
          "desc": "网站开发手册",
          "group": "编程常用"
        },
        {
          "title": "Lodash",
          "url": "https://www.lodashjs.com/",
          "desc": "函数式编程库",
          "group": "前端开发"
        },
        {
          "title": "Webpack",
          "url": "https://webpack.js.org/",
          "desc": "构建工具",
          "group": "前端开发"
        },
        {
          "title": "Gulp.js",
          "url": "https://www.gulpjs.com.cn/",
          "desc": "基于流的自动化构建工具",
          "group": "前端开发"
        },
        {
          "title": "Babel",
          "url": "https://babeljs.io/",
          "desc": "编写js最新规范",
          "group": "前端开发"
        },
        {
          "title": "Fiddler",
          "url": "https://www.telerik.com/fiddler",
          "desc": "抓包工具",
          "group": "前端开发"
        },
        {
          "title": "Less",
          "url": "https://lesscss.org/",
          "desc": "CSS扩展语言",
          "group": "前端开发"
        },
        {
          "title": "Sass",
          "url": "https://sass-lang.com/",
          "desc": "另一个CSS扩展语言",
          "group": "前端开发"
        },
        {
          "title": "Can I use",
          "url": "https://caniuse.com/",
          "desc": "浏览器兼容检测",
          "group": "前端开发"
        },
        {
          "title": "jQuery",
          "url": "https://jquery.com/",
          "desc": "经典流行JS库",
          "group": "前端开发"
        },
        {
          "title": "Bootstrap中文",
          "url": "https://www.bootcss.com/",
          "desc": "前端Bootstrap界面框架库",
          "group": "前端开发"
        },
        {
          "title": "Vue.js",
          "url": "https://cn.vuejs.org/",
          "desc": "国内流行的JS框架",
          "group": "前端开发"
        },
        {
          "title": "React",
          "url": "https://react.dev/",
          "desc": "另一款框架",
          "group": "前端开发"
        },
        {
          "title": "JS参考教程",
          "url": "https://wangdoc.com/javascript/",
          "desc": "阮一峰的教程",
          "group": "前端开发"
        },
        {
          "title": "Chrome开发工具说明",
          "url": "https://developer.chrome.com/docs/devtools/overview?hl=zh-cn",
          "desc": "Chrome开发者工具中文文档",
          "group": "前端开发"
        },
        {
          "title": "Python3",
          "url": "https://docs.python.org/3/",
          "desc": "Py官方手册",
          "group": "Python"
        },
        {
          "title": "Python Cheatsheet",
          "url": "https://www.pythoncheatsheet.org/",
          "desc": "官网手册乱?试试这个!",
          "group": "Python"
        },
        {
          "title": "Methods参考",
          "url": "https://www.programiz.com/python-programming/methods",
          "desc": "各Class对应Method清单及使用说明",
          "group": "Python"
        },
        {
          "title": "PyFormat",
          "url": "https://pyformat.info/",
          "desc": "Format格式化介绍,比官网好太多",
          "group": "Python"
        },
        {
          "title": "Python3作弊单",
          "url": "https://perso.limsi.fr/pointal/_media/python:cours:mementopython3-english.pdf",
          "desc": "Python基本内容都在这里了",
          "group": "Python"
        },
        {
          "title": "Cookbook手册",
          "url": "https://python3-cookbook.readthedocs.io/zh-cn/latest/index.html",
          "desc": "Cookbook中文在线版",
          "group": "Python"
        },
        {
          "title": "Django",
          "url": "https://www.djangoproject.com/",
          "desc": "全能Web框架",
          "group": "Python"
        },
        {
          "title": "Flask官方手册",
          "url": "https://flask.palletsprojects.com/en/stable/",
          "desc": "Welcome to Flask — Flask Documentation (3.1.x)",
          "group": "Python"
        },
        {
          "title": "Requests",
          "url": "https://requests.readthedocs.io/en/latest/",
          "desc": "\"人类\"用的请求库",
          "group": "Python"
        },
        {
          "title": "Pyquery",
          "url": "https://pythonhosted.org/pyquery/api.html",
          "desc": "类似JQuery的解析库",
          "group": "Python"
        },
        {
          "title": "Scrapy",
          "url": "https://doc.scrapy.org/en/latest/",
          "desc": "爬虫框架",
          "group": "Python"
        },
        {
          "title": "Distrowatch",
          "url": "https://distrowatch.com/",
          "desc": "实时监控Linux版本流行度排名",
          "group": "Linux运维"
        },
        {
          "title": "Linux命令库",
          "url": "https://wangchujiang.com/linux-command/",
          "desc": "中文版命令库",
          "group": "Linux运维"
        },
        {
          "title": "CMD命令速查",
          "url": "https://www.jb51.net/help/cmd.htm",
          "desc": "WindowsCmd命令速查",
          "group": "Linux运维"
        },
        {
          "title": "Bash语法作弊单",
          "url": "https://devhints.io/bash",
          "desc": "Bash命令常用参考",
          "group": "Linux运维"
        },
        {
          "title": "Linux命令手册",
          "url": "https://www.freecodecamp.org/chinese/news/the-linux-commands-handbook/",
          "desc": "常用命令快查查询",
          "group": "Linux运维"
        },
        {
          "title": "Debian手册",
          "url": "https://www.debian.org/doc/manuals/debian-reference/index.zh-cn.html",
          "desc": "中文版在线使用手册",
          "group": "Linux运维"
        },
        {
          "title": "HestiaCP",
          "url": "https://hestiacp.com/",
          "desc": "国外开源Linux运维面板",
          "group": "Linux运维"
        },
        {
          "title": "1Panel",
          "url": "https://1panel.cn/",
          "desc": "现代化Linux运维面板(Docker)",
          "group": "Linux运维"
        },
        {
          "title": "aaPanel",
          "url": "https://www.aapanel.com/",
          "desc": "宝塔国际版",
          "group": "Linux运维"
        },
        {
          "title": "宝塔面板",
          "url": "https://www.bt.cn/new/index.html",
          "desc": "让运维傻瓜化",
          "group": "Linux运维"
        },
        {
          "title": "Jetbrains软件教程",
          "url": "https://github.com/judasn/IntelliJ-IDEA-Tutorial",
          "desc": "毕竟他家的IDE真心好用",
          "group": "编程其他"
        },
        {
          "title": "HackerRank",
          "url": "https://www.hackerrank.com/",
          "desc": "刷题吧!少年!",
          "group": "编程其他"
        },
        {
          "title": "LeetCode",
          "url": "https://leetcode.cn/",
          "desc": "算法演练,面试题库",
          "group": "编程其他"
        },
        {
          "title": "V2EX",
          "url": "https://www.v2ex.com/",
          "desc": "程序员社区/话题",
          "group": "编程其他"
        },
        {
          "title": "编程帮",
          "url": "https://www.biancheng.net/",
          "desc": "计算机基础知识",
          "group": "编程其他"
        },
        {
          "title": "C语言中文网",
          "url": "https://c.biancheng.net/",
          "desc": "C语言中文门户网",
          "group": "编程其他"
        },
        {
          "title": "Gitee",
          "url": "https://gitee.com/explore",
          "desc": "国内的Github",
          "group": "编程其他"
        },
        {
          "title": "牛客网",
          "url": "https://www.nowcoder.com/",
          "desc": "刷题吧，程序猿",
          "group": "编程其他"
        },
        {
          "title": "Oschina",
          "url": "https://www.oschina.net/",
          "desc": "中文开源技术交流社区",
          "group": "编程其他"
        },
        {
          "title": "CSDN",
          "url": "https://www.csdn.net/",
          "desc": "专业开发者社区",
          "group": "编程其他"
        },
        {
          "title": "Navicat教程",
          "url": "https://www.navicat.com.cn/support/online-manual",
          "desc": "数据库工具我还是喜欢这个",
          "group": "编程其他"
        }
      ]
    },
    {
      "id": "jinrong",
      "name": "金融投资",
      "icon": "trending-up",
      "links": [
        {
          "title": "集思录",
          "url": "https://jisi.lu/",
          "desc": "数据为本的投资社区-挺另类"
        },
        {
          "title": "雪球网",
          "url": "https://xueqiu.com/",
          "desc": "投资江湖-啥人都有"
        },
        {
          "title": "异动股揭秘",
          "url": "https://yuanchuang.10jqka.com.cn/mrnxgg_list/",
          "desc": "瞅瞅市场有啥风吹草动"
        },
        {
          "title": "且慢",
          "url": "https://www.qieman.com/",
          "desc": "基金估值实时更新"
        },
        {
          "title": "华尔街见闻",
          "url": "https://wallstreetcn.com/",
          "desc": "首页比较干净"
        },
        {
          "title": "中证指数有限公司",
          "url": "https://www.csindex.com.cn/zh-CN#/",
          "desc": "中证指数官网"
        },
        {
          "title": "国证指数网",
          "url": "https://www.cnindex.com.cn/",
          "desc": "深交所全资指数运营机构"
        },
        {
          "title": "晨星网",
          "url": "https://www.morningstar.cn/",
          "desc": "基金评级机构"
        },
        {
          "title": "Financial Times",
          "url": "https://www.ft.com/",
          "desc": "News, analysis and comment"
        }
      ]
    },
    {
      "id": "qita",
      "name": "其他网站",
      "icon": "settings",
      "subgroups": [
        "站长工具",
        "有趣网站"
      ],
      "links": [
        {
          "title": "爱站网工具",
          "url": "https://www.aizhan.com/",
          "desc": "站长工具合集",
          "group": "站长工具"
        },
        {
          "title": "站长之家工具",
          "url": "https://tool.chinaz.com/tools/nav",
          "desc": "站长工具合集",
          "group": "站长工具"
        },
        {
          "title": "ITDog",
          "url": "https://www.itdog.cn/",
          "desc": "站长运维工具集合",
          "group": "站长工具"
        },
        {
          "title": "5188",
          "url": "https://www.5118.com/",
          "desc": "5118站长工具",
          "group": "站长工具"
        },
        {
          "title": "阿里云",
          "url": "https://www.aliyun.com/",
          "desc": "江湖人称套路云",
          "group": "站长工具"
        },
        {
          "title": "腾讯云",
          "url": "https://cloud.tencent.com/",
          "desc": "江湖人称良心云",
          "group": "站长工具"
        },
        {
          "title": "友盟+",
          "url": "https://www.umeng.com/",
          "desc": "网站流量统计",
          "group": "站长工具"
        },
        {
          "title": "百度统计",
          "url": "https://tongji.baidu.com/",
          "desc": "百度家的流量统计",
          "group": "站长工具"
        },
        {
          "title": "ALAPI",
          "url": "https://www.alapi.cn/",
          "desc": "免费WEB数据API服务",
          "group": "站长工具"
        },
        {
          "title": "熊猫关键词工具",
          "url": "https://www.5guanjianci.com/",
          "desc": "在线关键词挖掘工具",
          "group": "站长工具"
        },
        {
          "title": "Ping.pe",
          "url": "https://ping.pe/",
          "desc": "多个位置检查Ping，mtr，dig和TCP端口",
          "group": "站长工具"
        },
        {
          "title": "Silk",
          "url": "http://weavesilk.com/",
          "desc": "在线绘制特效",
          "group": "有趣网站"
        },
        {
          "title": "纪妖",
          "url": "https://www.cbaigui.com/",
          "desc": "收集中国古今妖怪(百科)",
          "group": "有趣网站"
        },
        {
          "title": "MeteorShowers",
          "url": "https://www.meteorshowers.org/",
          "desc": "3D观看流星雨形成过程",
          "group": "有趣网站"
        },
        {
          "title": "Zoom Earth",
          "url": "https://zoom.earth/",
          "desc": "地球实时天气,飓风跟踪",
          "group": "有趣网站"
        },
        {
          "title": "虚拟乐器",
          "url": "https://www.virtualmusicalinstruments.com/",
          "desc": "虚拟乐器在线演奏",
          "group": "有趣网站"
        },
        {
          "title": "Ventusky",
          "url": "https://www.ventusky.com/",
          "desc": "实时交互天气、气温地图",
          "group": "有趣网站"
        },
        {
          "title": "致美化",
          "url": "https://zhutix.com/",
          "desc": "专业的桌面美化网站",
          "group": "有趣网站"
        },
        {
          "title": "小霸王其乐无穷",
          "url": "https://www.yikm.net/",
          "desc": "红白机、街机童年回忆",
          "group": "有趣网站"
        }
      ]
    },
    {
      "id": "youqing",
      "name": "友情链接",
      "icon": "link",
      "links": [
        {
          "title": "折购库",
          "url": "http://www.zhegouku.com/",
          "desc": "内部优惠券分享(淘宝/京东等)"
        },
        {
          "title": "阿杰潮鞋",
          "url": "https://ajchaoxie.com/",
          "desc": "卖靠谱的PT鞋"
        },
        {
          "title": "瞎分享",
          "url": "https://xiafenxiang.com/",
          "desc": "分享各种免费资源的圈子"
        }
      ]
    }
  ]
};
