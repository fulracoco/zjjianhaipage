# 镇江舰海船舶配件有限公司网站

镇江舰海船舶配件有限公司的多语言企业展示网站，主要介绍船用发动机气阀、阀座、阀杆、适配机型、制造能力、质量认证和联系方式。

项目使用 Vue 3 与 Vite 构建，可生成纯静态文件并部署到 Cloudflare Pages 等静态托管平台。

## 主要功能

- 中文、英文、日文与韩文界面切换
- 响应式桌面和移动端布局
- 产品参数、适配机型和制造流程展示
- URL 锚点导航与移动端菜单
- SEO 元数据、站点地图和爬虫配置
- Cloudflare Pages 响应头、缓存和重定向配置

## 技术栈

- Vue 3
- Vite 7
- 原生 CSS
- 原生浏览器 `localStorage` 和 URL API

建议使用 Node.js 20.19+ 或 22.12+。

## 本地开发

安装依赖：

```powershell
npm install
```

启动开发服务器：

```powershell
npm run dev
```

Vite 默认提供的访问地址通常为 `http://localhost:5173/`。

生成生产文件：

```powershell
npm run build
```

本地预览生产构建：

```powershell
npm run preview
```

构建结果写入 `dist/`。`vite.config.js` 会在构建时将 `_headers`、`_redirects`、`404.html`、`robots.txt` 和 `sitemap.xml` 一并复制到输出目录。

## 项目结构

```text
.
|-- assets/                   # 网站图片资源
|-- src/
|   |-- components/            # 页面组件
|   |-- composables/           # 语言状态与翻译逻辑
|   |-- data/                  # 图片资源映射
|   |-- App.vue                # 页面主体与内容区块
|   |-- main.js                # Vue 应用入口
|   `-- styles.css             # 全局样式和响应式规则
|-- 404.html                   # 独立 404 页面
|-- i18n.js                    # 中英文文案字典
|-- index.html                 # Vite HTML 入口和默认 SEO 元数据
|-- vite.config.js             # Vite 与部署文件复制配置
|-- _headers                   # Cloudflare Pages 响应头和缓存策略
|-- _redirects                 # 静态重定向规则
|-- robots.txt                 # 搜索引擎抓取规则
`-- sitemap.xml                # 站点地图
```

## 国际化

`i18n.js` 中的 `zh`、`en`、`ja` 和 `ko` 对象保存界面文案。修改或增加文案时，应在四个语言对象中使用相同的键。

语言选择逻辑位于 `src/composables/useSiteI18n.js`：

- `?lang=zh`、`?lang=en`、`?lang=ja` 或 `?lang=ko` 优先指定当前语言
- 用户选择保存在 `localStorage` 的 `jianhai_language` 键中
- 首次访问且没有已保存选择时，根据浏览器首选语言选择中文、日文或韩文，其他语言默认使用英文
- 切换语言时同步更新页面 `lang`、`data-lang`、标题和描述

图片统一在 `src/data/assets.js` 中注册，再由组件引用。请勿直接修改构建生成的带哈希资源路径。

## 部署

Cloudflare Pages 推荐配置：

- Build command：`npm run build`
- Build output directory：`dist`

部署前请确认 `_headers`、`_redirects`、`robots.txt` 和 `sitemap.xml` 中的域名、缓存及安全策略仍符合生产环境要求。

## 验证清单

每次内容或界面修改后至少检查：

- `npm run build` 成功完成
- 中文、英文、日文和韩文文案均正确显示
- 桌面端与窄屏移动端无溢出或遮挡
- 顶部导航、移动菜单和页面锚点可用
- 语言切换及刷新后的语言记忆正常
- 图片、联系电话和其他资源链接可访问
- 浏览器控制台无 JavaScript 错误或资源 404
- 独立 `404.html` 和部署配置仍被复制到 `dist/`

## 内容维护注意事项

- 公司名称、电话、证书编号、产品参数等业务信息应经过确认后再修改。
- `dist/`、`node_modules/` 和 `.vite/` 为生成目录，不应提交或手工维护。
- 更新站点正式域名或页面更新时间时，同步检查 `robots.txt` 与 `sitemap.xml`。
