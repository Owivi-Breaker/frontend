# Tie Breaker Frontend

## 安装

安装项目依赖

```shell
pnpm i
```

安装全局依赖

```shell
# 用于执行git cz命令，代替git commit
pnpm i -g commitizen
```

初始化 husky

```shell
pnpm prepare
```

## 常用方法

### iconify 用法

#### 静态用法

直接用图标的组件名称

1. 找图标：网址 https://icones.js.org/ 或者 vscode 安装 - [Icônes](https://marketplace.visualstudio.com/items?itemName=afzalsayed96.icones)
2. 确定图标名字：找到图标后复制名字 如：'mdi:emoticon'，则对应的 vue 的 template 为：

```HTML
<icon-mdi:emoticon />
```

> icon- 为预设的前缀

3. 设置样式：同 html 标签一样直接应用 style 属性或者 class 属性; 通过设置 color 和 font-size 属性设置对应的颜色和大小

#### 多个图标动态渲染

1. 确定图标名字，如：'mdi:emoticon'

2. 引入 Icon 组件：

    ```
    import { Icon } from '@iconify/vue';
    ```

3. 动态渲染

    ```
    <Icon icon="mdi:emoticon" />
    ```

#### 结合 naiveUI 组件动态渲染

1. 确定图标名字，如：**'mdi:emoticon'**

2. 引入 vue 的 h 函数：

    ```ts
    import { h } from 'vue';
    ```

3. 引入Icon组件

    ```ts
    import { Icon } from '@iconify/vue';
    ```

4. 动态渲染

    ```ts
    () => h(Icon, { icon: 'mdi:emoticon', style: { color: '#f00', fontSize: '16px' } })
    ```

> @/uitls 已封装好了函数：iconifyRender

### 路由跳转

```ts
const { routerPush } = useRouterPush();
import { useRouterPush } from '@/composables';
routerPush({ name: 'some-url' });
```

### 主题配置

```json
{
  /** 深色模式 */
  darkMode: boolean;
  /** 主题颜色 */
  themeColor: string;
  /** 主题颜色列表 */
  themeColorList: string[];
  /** 其他颜色 */
  otherColor: {
    /** 信息 */
  	info: string;
	  /** 成功 */
  	success: string;
	  /** 警告 */
  	warning: string;
	  /** 错误 */
  	error: string;
  };
}
```

主题相关的配置都会通过 themeStore 状态组合成 符合 naiveUI 框架的 NConfigProvider 组件的 themeOverrids;

#### themeStore 的 themeOverrides

通过 themeColor，info，success，warning，error 五种颜色，`''` | `'Suppl'` | `'Hover'` | `'Pressed'` | `'Active'` 五种颜色场景， 在函数 **
getThemeColors** 的作用下产生了 25 种不同的颜色注入到了 NConfigProvider 组件的 themeOverrids 中

#### 结合 windicss

将 themeOverrides 的 common 相关的颜色转换成 css vars，然后挂载到 html 上。

在 windicss 配置里面添加 extends colors，各个 css vars 就是 html 上的 css vars，在 vue 里面就能通过windicss 使用各种颜色在不同场景上。

例如： 下面的 class 里面就应用了不同的颜色

```css
class="border border-primary bg-success text-error"
colors: {
	primary: 'var(--primary-color)',
	'primary-hover': 'var(--primary-color-hover)',
	'primary-pressed': 'var(--primary-color-pressed)',
	'primary-active': 'var(--primary-color-active)',
	info: 'var(--info-color)',
	'info-hover': 'var(--info-color-hover)',
	'info-pressed': 'var(--info-color-pressed)',
	'info-active': 'var(--info-color-active)',
	success: 'var(--success-color)',
	'success-hover': 'var(--success-color-hover)',
	'success-pressed': 'var(--success-color-pressed)',
	'success-active': 'var(--success-color-active)',
	warning: 'var(--warning-color)',
	'warning-hover': 'var(--warning-color-hover)',
	'warning-pressed': 'var(--warning-color-pressed)',
	'warning-active': 'var(--warning-color-active)',
	error: 'var(--error-color)',
	'error-hover': 'var(--error-color-hover)',
	'error-pressed': 'var(--error-color-pressed)',
	'error-active': 'var(--error-color-active)',
},
```
