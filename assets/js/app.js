/**
 * ============================================================================
 * 瞎分享导航 - 首页交互逻辑 (纯原生 JavaScript, 无需任何构建工具/框架)
 * ============================================================================
 * 依赖:
 *   - assets/js/data.js   必须在本文件之前加载,提供 window.NAV_DATA
 *
 * 本文件分为几个部分,从上到下依次是:
 *   1. 小工具函数 (图标库 / 网站favicon多级回退 / 转义 / 去抖动)
 *   2. 分类强调色 (每个分类一个主题色,视觉上更丰富,对应原站每个分类不同配色)
 *   3. 渲染分类卡片 + 子标签 (tab) 切换
 *   4. 侧边栏联动高亮 (scrollspy)
 *   5. 搜索功能 (站内过滤 + 切换百度/谷歌/必应等外部搜索 + 顶部搜索图标展开)
 *   6. 深色模式
 *   7. 悬浮按钮 (回到顶部 / 微信 / TG 弹出二维码)
 *   8. 启动入口 (DOMContentLoaded)
 * ==========================================================================*/

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * 0. 简单开关配置
   * ------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------
   * 1. 小工具函数
   * ------------------------------------------------------------------- */

  // 极简图标库:每个分类的 "icon" 字段对应下面一个 key。
  // 想要新增图标,直接在这里加一条 24x24 的 svg path 字符串即可,
  // 找图标可以去 https://feathericons.com 抄它的 <path>。
  var ICONS = {
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    grid: '<path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/>',
    film: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 9h5M2 15h5M17 9h5M17 15h5"/>',
    tool: '<path d="M14.7 6.3a5 5 0 0 0-6.4 6.4l-6 6 2 2 6-6a5 5 0 0 0 6.4-6.4l-3-3-2 2z"/>',
    package: '<path d="M21 8L12 3 3 8l9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5V4.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2a10 10 0 1 0 3.16 19.5c.7-.24 1.05-1.02.63-1.63-.3-.44-.24-1.03.15-1.4A2.5 2.5 0 0 0 14 14h2.5A3.5 3.5 0 0 0 20 10.5C20 5.81 16.19 2 12 2z"/>',
    code: '<path d="M8 18l-6-6 6-6M16 6l6 6-6 6"/>',
    "trending-up": '<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
    "chevron-up": '<path d="M18 15l-6-6-6 6"/>',
    "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    send: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'
  };

  function icon(name, size) {
    var body = ICONS[name] || ICONS.link;
    return (
      '<svg width="' + (size || 18) + '" height="' + (size || 18) +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round">' + body + "</svg>"
    );
  }

  // 简单的 HTML 转义,避免数据里如果出现 <, > 之类字符破坏页面结构
  function esc(str) {
    return String(str || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---- 网站图标(favicon)多级回退 --------------------------------------
  // 完整的 4 级回退逻辑说明见 assets/js/icon-fallback.js 文件顶部注释,
  // 这里只负责拼出 <img onerror="__iconFallback(...)"> 这段 HTML 字符串,
  // 初始 src 永远先指向"本地图标文件夹",这是回退链的第 0 级。
  //
  // 本地图标文件名的计算规则(域名 -> 文件名),和
  // assets/icons/README.md 里写的规则必须保持一致:
  //   mail.qq.com     -> assets/icons/mail-qq-com.png
  //   www.taobao.com  -> assets/icons/taobao-com.png (自动去掉开头的 www.)
  function iconSlugFromHost(host) {
    return host.replace(/^www\./, "").replace(/\./g, "-");
  }

  function faviconChainHtml(pageUrl, letter) {
    var host = "";
    try { host = new URL(pageUrl).hostname; } catch (e) { /* 网址格式异常,直接走文字兜底 */ }
    if (!host) return '<span class="icon-letter">' + letter + "</span>";
    var slug = iconSlugFromHost(host);
    // 初始 src 先试本地 .png(本地图标支持的格式列表见 icon-fallback.js 的
    // LOCAL_ICON_EXTS,新格式想加/改顺序改那里就行,这里固定从下标 0 开始试)。
    return (
      '<img src="assets/icons/' + slug + '.png" alt="" loading="lazy" ' +
      'onerror="__iconFallback(this,\'' + host + "','" + slug + "',1)\">" +
      '<span class="icon-letter" style="display:none">' + letter + "</span>"
    );
  }

  function renderIcon(link) {
    var letter = esc((link.title || "?").trim().charAt(0).toUpperCase());
    return faviconChainHtml(link.url, letter);
  }

  // 防抖:搜索框输入时不用每敲一个字都重新渲染一次
  function debounce(fn, wait) {
    var t;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  /* ---------------------------------------------------------------------
   * 2. 分类强调色
   * ------------------------------------------------------------------- */
  // 给每个分类轮流分配一个主题色,分类图标、选中的子标签胶囊都会用这个颜色,
  // 页面看起来更丰富一些(对应原站里每个分类图标颜色都不一样的效果)。
  // 想改配色,直接改这个数组里的色值即可,顺序对应分类出现的顺序,
  // 分类数量超过数组长度时会自动循环使用。
  var ACCENT_COLORS = [
    "#3762ff", "#e0472c", "#0ea472", "#a855f7",
    "#f59e0b", "#0891b2", "#ec4899", "#65a30d",
    "#7c3aed", "#dc2626", "#0284c7"
  ];
  function accentColor(index) {
    return ACCENT_COLORS[index % ACCENT_COLORS.length];
  }

  /* ---------------------------------------------------------------------
   * 3. 渲染分类卡片 + 子标签(tab)切换
   * ------------------------------------------------------------------- */

  var DATA = window.NAV_DATA || { categories: [] };

  function cardHtml(link) {
    return (
      '<a class="site-card" href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer" ' +
      'title="' + esc(link.title) + '">' +
        '<span class="site-card__icon">' + renderIcon(link) + "</span>" +
        '<span class="site-card__body">' +
          '<span class="site-card__title">' + esc(link.title) + "</span>" +
          '<span class="site-card__desc">' + esc(link.desc || "") + "</span>" +
        "</span>" +
      "</a>"
    );
  }

  function renderSidebar() {
    if (!document.getElementById("sidebar-list")) return; // 简易占位页(about/rankings等)没有侧边栏,直接跳过
    var html = DATA.categories.map(function (cat, i) {
      return (
        '<li class="sidebar__item" data-target="cat-' + cat.id + '" style="--accent:' + accentColor(i) + '">' +
          icon(cat.icon) +
          "<span>" + esc(cat.name) + "</span>" +
          '<span class="sidebar__count">' + cat.links.length + "</span>" +
        "</li>"
      );
    }).join("");
    document.getElementById("sidebar-list").innerHTML = html;
  }

  // 一个分类区块内容(网站卡片网格),按当前选中的子标签过滤后渲染
  function cardsForGroup(cat, group) {
    var links = group ? cat.links.filter(function (l) { return l.group === group; }) : cat.links;
    if (!links.length) {
      return (
        '<div class="empty-state empty-state--tab">' +
          '<div class="empty-state__emoji">🚧</div>该子分类内容建设中,欢迎投稿好站' +
        "</div>"
      );
    }
    return '<div class="card-grid">' + links.map(cardHtml).join("") + "</div>";
  }

  function renderCategories() {
    if (!document.getElementById("normal-view")) return; // 简易占位页没有分类内容区,直接跳过
    var html = DATA.categories.map(function (cat, i) {
      var accent = accentColor(i);
      var tabsHtml = "";
      var bodyHtml;

      if (cat.subgroups && cat.subgroups.length) {
        tabsHtml =
          '<div class="tab-row" role="tablist">' +
          cat.subgroups.map(function (g, gi) {
            // 提前算出这个子标签下有几个网站,数量直接显示在标签上(比如"图库素材 0")。
            // 这样还没点开就知道哪些子分类是空的、还在等你往 data.js 里加内容,
            // 不用点进去才发现是"建设中",体验上不容易被误以为切换没生效。
            // 数字本身不显示了(之前试过在标签上直接标数量,比如"编程常用3",
            // 反而让这一排标签更容易挤到换行、不好看),但"这个子分类是不是空的"
            // 这件事还是继续算出来,用来给空标签一个更淡的颜色(is-empty),
            // 不然点进去发现"建设中"容易让人以为是切换失效了。
            var cnt = cat.links.filter(function (l) { return l.group === g; }).length;
            return (
              '<button class="tab-pill' + (gi === 0 ? " is-active" : "") + (cnt === 0 ? " is-empty" : "") + '" ' +
              'data-cat="' + cat.id + '" data-group="' + esc(g) + '" style="--accent:' + accent + '">' +
              esc(g) + "</button>"
            );
          }).join("") +
          "</div>";
        bodyHtml = cardsForGroup(cat, cat.subgroups[0]);
      } else {
        bodyHtml = cardsForGroup(cat, null);
      }

      return (
        '<section class="category-section" id="cat-' + cat.id + '">' +
          '<div class="category-section__head">' +
            '<h2 class="category-section__title" style="--accent:' + accent + '">' +
              '<span class="category-section__icon">' + icon(cat.icon, 18) + "</span>" +
              esc(cat.name) +
              '<span class="count">[' + cat.links.length + "]</span>" +
            "</h2>" +
            tabsHtml +
            '<span class="category-section__rule" aria-hidden="true"></span>' +
          "</div>" +
          '<div class="category-section__body" data-cat-body="' + cat.id + '">' + bodyHtml + "</div>" +
        "</section>"
      );
    }).join("");
    document.getElementById("normal-view").innerHTML = html;
  }

  // 点击子标签胶囊:切换当前分类展示哪个子分组的卡片
  function initTabSwitching() {
    var normalView = document.getElementById("normal-view");
    if (!normalView) return; // 简易占位页没有分类内容区,直接跳过
    normalView.addEventListener("click", function (e) {
      var btn = e.target.closest(".tab-pill");
      if (!btn) return;
      var catId = btn.getAttribute("data-cat");
      var group = btn.getAttribute("data-group");
      var cat = DATA.categories.filter(function (c) { return c.id === catId; })[0];
      if (!cat) return;

      var row = btn.parentElement;
      Array.prototype.forEach.call(row.querySelectorAll(".tab-pill"), function (el) {
        el.classList.toggle("is-active", el === btn);
      });

      var body = document.querySelector('[data-cat-body="' + catId + '"]');
      if (body) body.innerHTML = cardsForGroup(cat, group);
    });
  }

  /* ---------------------------------------------------------------------
   * 4. 侧边栏联动高亮 (滚动到哪个分类,侧边栏对应项就高亮)
   * ------------------------------------------------------------------- */

  function initScrollSpy() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".sidebar__item"));
    var sections = Array.prototype.slice.call(document.querySelectorAll(".category-section"));
    if (!items.length || !sections.length) return;

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        var target = document.getElementById(item.getAttribute("data-target"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          items.forEach(function (item) { item.classList.remove("is-active"); });
          var match = document.querySelector('.sidebar__item[data-target="' + entry.target.id + '"]');
          if (match) match.classList.add("is-active");
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------------------------------------------------------------------
   * 5. 搜索功能
   * ------------------------------------------------------------------- */

  // 外部搜索引擎模板:key 对应 <select id="search-engine"> 的 option value
  var ENGINES = {
    site: null, // 站内搜索,特殊处理
    baidu: "https://www.baidu.com/s?wd=",
    google: "https://www.google.com/search?q=",
    bing: "https://www.bing.com/search?q=",
    taobao: "https://s.taobao.com/search?q="
  };

  function allLinksFlat() {
    var out = [];
    DATA.categories.forEach(function (cat) {
      cat.links.forEach(function (link) {
        out.push({ link: link, categoryName: cat.name });
      });
    });
    return out;
  }
  var ALL_LINKS = allLinksFlat();

  function runSiteSearch(keyword) {
    var normal = document.getElementById("normal-view");
    var resultSection = document.getElementById("search-results-section");
    var resultGrid = document.getElementById("search-results-grid");
    var resultTitle = document.getElementById("search-results-title");

    // 站内搜索的结果区域只存在于首页(index.html)。如果是在 about.html 这类
    // 简易占位页上发起"站内搜索",这里就没有地方展示结果,于是跳转回首页,
    // 并把关键词带在网址上(?q=xxx),首页加载后会自动帮你把这次搜索接着做完。
    if (!normal || !resultSection || !resultGrid || !resultTitle) {
      if (keyword) window.location.href = "index.html?q=" + encodeURIComponent(keyword);
      return;
    }

    if (!keyword) {
      normal.classList.remove("is-hidden");
      resultSection.classList.remove("is-active");
      return;
    }

    var kw = keyword.trim().toLowerCase();
    var matched = ALL_LINKS.filter(function (item) {
      return (
        item.link.title.toLowerCase().indexOf(kw) !== -1 ||
        (item.link.desc || "").toLowerCase().indexOf(kw) !== -1
      );
    });

    normal.classList.add("is-hidden");
    resultSection.classList.add("is-active");
    resultTitle.textContent = '搜索 "' + keyword + '" 共找到 ' + matched.length + " 个结果";

    resultGrid.innerHTML = matched.length
      ? matched.map(function (item) { return cardHtml(item.link); }).join("")
      : '<div class="empty-state"><div class="empty-state__emoji">🔍</div>暂无匹配结果,换个关键词试试,' +
        "或者切换右侧的搜索引擎去全网搜索。</div>";
  }

  // 一套搜索逻辑,绑定给"一组"输入框/下拉框/表单——头部那个精简搜索栏、
  // 首页专属的大搜索区,用的是完全一样的这套逻辑,只是元素 id 不一样。
  // ids 里的 toggle/panel 是可选的(首页大搜索区没有"点图标展开/收起"这一步,
  // 一直是展开状态,所以不用传)。
  function bindSearchInstance(ids) {
    var input = document.getElementById(ids.input);
    var select = document.getElementById(ids.select);
    var form = document.getElementById(ids.form);
    var toggleBtn = ids.toggle ? document.getElementById(ids.toggle) : null;
    var panel = ids.panel ? document.getElementById(ids.panel) : null;
    if (!input || !select || !form) return; // 这个页面没有这组搜索栏,直接跳过

    // 顶部窄导航条上的搜索图标:点一下展开/收起下面的搜索栏
    if (toggleBtn && panel) {
      toggleBtn.addEventListener("click", function () {
        var isOpen = panel.classList.toggle("is-open");
        toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (isOpen) setTimeout(function () { input.focus(); }, 150);
      });
    }

    input.addEventListener("input", debounce(function () {
      // 只有选择"站内"时,才做实时过滤;选择外部引擎时交给表单提交处理
      if (select.value === "site") runSiteSearch(input.value);
    }, 120));

    form.addEventListener("submit", function (e) {
      var engine = select.value;
      var kw = input.value.trim();
      if (engine === "site") {
        e.preventDefault();
        runSiteSearch(kw);
        return;
      }
      if (!kw) { e.preventDefault(); return; }
      e.preventDefault();
      window.open(ENGINES[engine] + encodeURIComponent(kw), "_blank", "noopener");
    });

    select.addEventListener("change", function () {
      if (select.value === "site") {
        runSiteSearch(input.value);
      } else {
        var normalView = document.getElementById("normal-view");
        var resultSection = document.getElementById("search-results-section");
        if (normalView) normalView.classList.remove("is-hidden");
        if (resultSection) resultSection.classList.remove("is-active");
      }
    });
  }

  // 首页大搜索区上面那排"站内/百度/Google/必应/淘宝"标签:点哪个就把隐藏的
  // <select id="hero-search-engine"> 切成对应的值,再手动触发一次 change 事件——
  // 这样不用另外写一套"切换搜索方式"的逻辑,跟下拉框完全复用同一套判断。
  function initHeroTabs() {
    var tabs = document.querySelectorAll(".hero-tab");
    var select = document.getElementById("hero-search-engine");
    var input = document.getElementById("hero-search-input");
    if (!tabs.length || !select) return;
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabs.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        select.value = btn.getAttribute("data-engine");
        select.dispatchEvent(new Event("change"));
        if (input) input.focus();
      });
    });
  }

  // 首页(index.html)头部的搜索图标:这个页面没有 #search-panel 可以展开/收起
  // (搜索框已经在下面的大搜索区里了),点这个图标改成"滚动到大搜索区并聚焦
  // 输入框",而不是 bindSearchInstance 里那套"展开面板"的逻辑——所以这里单独
  // 处理,只在页面上有 #search-toggle 但没有 #search-panel 时才生效(即首页;
  // 其它 4 个占位页有 #search-panel,交给 bindSearchInstance 处理,这里跳过)。
  function initHeaderSearchScrollToHero() {
    var btn = document.getElementById("search-toggle");
    var panel = document.getElementById("search-panel");
    var heroInput = document.getElementById("hero-search-input");
    if (!btn || panel || !heroInput) return;
    btn.addEventListener("click", function () {
      // focus 必须在点击事件里同步调用,不能像之前那样放进 setTimeout 延迟——
      // 很多手机浏览器(尤其移动端 Safari)只认"用户手势直接触发"的 focus,
      // 延迟一点调用就不会弹出键盘,点了跟没点一样。加 preventScroll 避免
      // focus 自己先跳一次,跟紧接着这行 scrollIntoView 的平滑滚动打架。
      heroInput.focus({ preventScroll: true });
      heroInput.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // 手机端汉堡菜单:点击展开/收起面板 + 一层半透明背景遮罩,展开时按钮图标
  // 从"≡"变成"✕"(参考老站点的交互)。首页(index.html)有分类侧边栏
  // .sidebar,汉堡菜单点开的就是它(分类列表 + 底部站内其它页面链接 +
  // "收起"按钮,一个入口搞定"跳分类"和"看其它页面"两件事,解决移动端列表
  // 拉长之后没法快速跳分类、只能划回顶部重选的问题);其它没有分类的占位页
  // 点开的是 #mobile-nav-panel 那个纯链接面板。两种情况共用同一套开关/
  // 遮罩/图标切换逻辑,只是展开的目标元素不一样。
  function initMobileMenu() {
    var toggle = document.getElementById("mobile-menu-toggle");
    var backdrop = document.getElementById("mobile-menu-backdrop");
    var panel = document.querySelector(".sidebar") || document.getElementById("mobile-nav-panel");
    if (!toggle || !backdrop || !panel) return;

    var ICON_BARS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    var ICON_CLOSE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    function setOpen(isOpen) {
      panel.classList.toggle("is-open", isOpen);
      backdrop.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.innerHTML = isOpen ? ICON_CLOSE : ICON_BARS;
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!panel.classList.contains("is-open"));
    });
    backdrop.addEventListener("click", function () { setOpen(false); });

    // 点面板里任意链接、点分类(.sidebar__item)、或者点底部的"收起"按钮,
    // 都自动收起——不用用户点完之后还得自己再去点一次遮罩或汉堡图标关掉。
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.closest(".sidebar__item") || e.target.closest("#sidebar-collapse")) {
        setOpen(false);
      }
    });
  }

  function initSearch() {
    bindSearchInstance({
      input: "search-input", select: "search-engine", form: "search-form",
      toggle: "search-toggle", panel: "search-panel"
    });
    bindSearchInstance({ input: "hero-search-input", select: "hero-search-engine", form: "hero-search-form" });
    initHeroTabs();
    initHeaderSearchScrollToHero();

    // 支持从别的页面(比如占位页)跳转过来的 ?q=关键词,自动展开搜索栏并执行搜索。
    // 头部搜索栏、首页大搜索区,只要页面上有就都同步填上关键词。
    var params = new URLSearchParams(window.location.search);
    var q = params.get("q");
    if (q) {
      var headerPanel = document.getElementById("search-panel");
      var headerInput = document.getElementById("search-input");
      var heroInput = document.getElementById("hero-search-input");
      if (headerPanel) headerPanel.classList.add("is-open");
      if (headerInput) headerInput.value = q;
      if (heroInput) heroInput.value = q;
      runSiteSearch(q);
    }
  }

  /* ---------------------------------------------------------------------
   * 6. 深色模式
   * ------------------------------------------------------------------- */

  var THEME_KEY = "xiafenxiang-theme"; // localStorage 里的存储键名

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.innerHTML = icon(theme === "dark" ? "sun" : "moon", 18);
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* 隐私模式下可能报错,忽略即可 */ }
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));

    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* 忽略 */ }
    });
  }

  /* ---------------------------------------------------------------------
   * 7. 悬浮按钮:回到顶部 / 微信 / TG 二维码弹出
   * ------------------------------------------------------------------- */

  function initFloatingButtons() {
    var topBtn = document.getElementById("fab-top");
    if (topBtn) {
      window.addEventListener("scroll", debounce(function () {
        topBtn.classList.toggle("is-visible", window.scrollY > 400);
      }, 80));
      topBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // 微信 / TG 按钮:点击弹出对应二维码小气泡,再点一次关闭
    Array.prototype.forEach.call(document.querySelectorAll(".fab[data-popover]"), function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var popoverId = btn.getAttribute("data-popover");
        var popover = document.getElementById(popoverId);
        if (!popover) return;
        var wasOpen = popover.classList.contains("is-open");
        Array.prototype.forEach.call(document.querySelectorAll(".fab-popover"), function (p) {
          p.classList.remove("is-open");
        });
        if (!wasOpen) popover.classList.add("is-open");
      });
    });
    document.addEventListener("click", function () {
      Array.prototype.forEach.call(document.querySelectorAll(".fab-popover"), function (p) {
        p.classList.remove("is-open");
      });
    });
  }

  /* ---------------------------------------------------------------------
   * 7.5 顶部标语:从 assets/js/slogans.js 里随机挑一句
   * ------------------------------------------------------------------- */
  function initTopbarSlogan() {
    var el = document.querySelector(".topbar-slogan");
    if (!el) return;
    var list = window.TOPBAR_SLOGANS;
    if (!list || !list.length) return; // slogans.js 没加载成功或数组是空的,保留 HTML 里原有的文字兜底
    var pick = list[Math.floor(Math.random() * list.length)];
    el.textContent = pick;
  }

  /* ---------------------------------------------------------------------
   * 8. 启动入口
   * ------------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initTopbarSlogan();
    renderSidebar();
    renderCategories();
    initTabSwitching();
    initScrollSpy();
    initSearch();
    initFloatingButtons();
    initMobileMenu();

    // 页脚年份自动更新,不用每年手动改
    var yEls = document.querySelectorAll(".footer-year");
    yEls.forEach(function (y) { y.textContent = new Date().getFullYear(); });
  });
})();
