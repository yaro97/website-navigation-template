/**
 * ============================================================================
 * 网站图标(favicon)多级回退 - 独立小文件
 * ============================================================================
 * 为什么单独拆一个文件、还要放在 <head> 里最早加载:
 * 网站卡片上的 <img onerror="__iconFallback(...)"> 是在 HTML 一解析到
 * 就会立刻开始尝试加载的,有可能在 </body> 底部的 app.js 真正执行之前
 * 就触发了 onerror。所以把这个函数单独拎出来放最前面加载,保证 onerror
 * 触发时它一定已经存在。
 *
 * 图标的完整回退顺序,按顺序尝试:
 *   0. assets/icons/<域名>.png   —— 本地图标,优先级最高
 *   1. assets/icons/<域名>.jpg   —— 本地图标,支持的格式不止 png,
 *   2. assets/icons/<域名>.jpeg     万一你手头是 jpg/jpeg/webp/ico,直接
 *   3. assets/icons/<域名>.webp     原样存进去就行,不需要先转成 png。
 *   4. assets/icons/<域名>.ico      (这几个格式按顺序试一遍,只要有一个
 *      文件存在就会用上,同一个域名如果同时存了多个格式,只会用排在
 *      前面的那个,也就是 png 优先。)
 *   5. 网站自己域名下的 /favicon.ico —— 本地都没有,不依赖第三方
 *   6. 一个免费的第三方图标接口兜底 (api.iowen.cn)
 *   7. 都失败:隐藏图片,显示旁边"标题首字母"的纯色小图标,不会裂图
 *
 * 首页卡片用的是这一套逻辑(见 assets/js/app.js 的 renderIcon /
 * faviconChainHtml),以后想调整顺序、加新格式或换掉某一级,
 * 改这一个文件就够了 —— 比如想支持 .gif,只需要把它加进
 * LOCAL_ICON_EXTS 数组里。
 */
var LOCAL_ICON_EXTS = ["png", "jpg", "jpeg", "webp", "ico"];

window.__iconFallback = function (imgEl, host, slug, step) {
  if (step < LOCAL_ICON_EXTS.length) {
    // 本地还有别的格式没试过 -> 试下一个格式
    imgEl.setAttribute("onerror", "__iconFallback(this,'" + host + "','" + slug + "'," + (step + 1) + ")");
    imgEl.src = "assets/icons/" + slug + "." + LOCAL_ICON_EXTS[step];
  } else if (step === LOCAL_ICON_EXTS.length) {
    // 本地几种格式都没有 -> 试网站自己的 favicon.ico
    imgEl.setAttribute("onerror", "__iconFallback(this,'" + host + "','" + slug + "'," + (step + 1) + ")");
    imgEl.src = "https://" + host + "/favicon.ico";
  } else if (step === LOCAL_ICON_EXTS.length + 1) {
    // 网站自己的 favicon.ico 也没有 -> 试第三方图标接口兜底
    imgEl.setAttribute("onerror", "__iconFallback(this,'" + host + "','" + slug + "'," + (step + 1) + ")");
    imgEl.src = "https://api.iowen.cn/favicon/" + host + ".ico";
  } else {
    // 全部失败 -> 显示首字母兜底,隐藏图片本身
    imgEl.style.display = "none";
    if (imgEl.nextElementSibling) imgEl.nextElementSibling.style.display = "flex";
  }
};
