/**
 * ============================================================================
 * 网址榜单页面 —— 交互逻辑 (rankings.html 专用,只在这一页加载)
 * ============================================================================
 * 依赖:
 *   - assets/js/rankings-data.js  必须在本文件之前加载,提供 window.RANKINGS_DATA
 *   - assets/js/icon-fallback.js  首页也在用的图标多级回退逻辑(在 <head> 里已加载)
 *
 * 逻辑很简单:左边三个 tab 按钮(日榜/周榜/月榜),点哪个就把对应数组渲染
 * 到右边列表里,同时更新最上面大标题/副标题的文字。默认显示"日榜"。
 */
(function () {
  "use strict";

  var DATA = window.RANKINGS_DATA;
  if (!DATA) return; // rankings-data.js 没加载成功,直接放弃,不报错刷屏

  function esc(str) {
    return String(str || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // 跟首页 app.js 里的 iconSlugFromHost/faviconChainHtml 是同一套规则,
  // 保证同一个网站在首页和榜单页用的是同一张本地图标。
  function iconSlugFromHost(host) {
    return host.replace(/^www\./, "").replace(/\./g, "-");
  }

  function faviconChainHtml(pageUrl, letter) {
    var host = "";
    try { host = new URL(pageUrl).hostname; } catch (e) { /* 网址格式异常,直接走文字兜底 */ }
    if (!host) return '<span class="icon-letter">' + letter + "</span>";
    var slug = iconSlugFromHost(host);
    return (
      '<img src="assets/icons/' + slug + '.png" alt="" loading="lazy" ' +
      'onerror="__iconFallback(this,\'' + host + "','" + slug + "',1)\">" +
      '<span class="icon-letter" style="display:none">' + letter + "</span>"
    );
  }

  function rowHtml(item) {
    var letter = esc((item.name || "?").trim().charAt(0).toUpperCase());
    return (
      '<a class="site-card rank-row" href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer" ' +
      'title="' + esc(item.name) + '">' +
        '<span class="site-card__icon">' + faviconChainHtml(item.url, letter) + "</span>" +
        '<span class="site-card__body">' +
          '<span class="site-card__title">' + esc(item.name) + "</span>" +
          '<span class="site-card__desc">' + esc(item.desc || "") + "</span>" +
        "</span>" +
      "</a>"
    );
  }

  function render(tabId) {
    var tab = DATA.tabs.filter(function (t) { return t.id === tabId; })[0] || DATA.tabs[0];
    var items = DATA.items[tab.id] || [];

    document.getElementById("rankings-hero-title").textContent = tab.title;
    document.getElementById("rankings-hero-subtitle").textContent = tab.subtitle;

    var listEl = document.getElementById("rankings-list");
    if (!items.length) {
      listEl.innerHTML = '<p class="rankings-empty">这个榜还没有数据,去 assets/js/rankings-data.js 里加几条吧。</p>';
    } else {
      listEl.innerHTML = items.map(rowHtml).join("");
    }

    Array.prototype.forEach.call(document.querySelectorAll(".rankings-tab"), function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-tab") === tab.id);
    });
  }

  function initTabs() {
    var tabsEl = document.getElementById("rankings-tabs");
    if (!tabsEl) return;
    tabsEl.innerHTML = DATA.tabs.map(function (t, i) {
      return (
        '<button type="button" class="rankings-tab' + (i === 0 ? " is-active" : "") + '" data-tab="' + t.id + '">' +
          esc(t.label) +
        "</button>"
      );
    }).join("");
    tabsEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".rankings-tab");
      if (!btn) return;
      render(btn.getAttribute("data-tab"));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("rankings-tabs")) return; // 只在 rankings.html 上跑
    initTabs();
    render(DATA.tabs[0].id);
  });
})();
