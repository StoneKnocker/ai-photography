# 多语言路由解决方案

本项目实现了一个优雅的多语言路由解决方案，支持不同语言下自动处理路由前缀。

## 方案概述

### 路由结构

- 英语 (en): 不带语言前缀，例如 `/about`, `/contact`
- 其他语言 (es): 带语言前缀，例如 `/es/about`, `/es/contact`

### 核心组件

#### 1. `useLocalizedLink` Hook

位置：`app/lib/use-localized-link.ts`

这个自定义 Hook 提供了路径本地化的核心功能：

```tsx
import { useLocalizedLink } from "@/lib/use-localized-link";

function MyComponent() {
  const { localizeRoute, currentLocale } = useLocalizedLink();

  // 自动根据当前语言本地化路径
  const localizedPath = localizeRoute("/about");
  // 英语: "/about"
  // 西班牙语: "/es/about"
}
```

#### 2. `LocalizedLink` 组件

位置：`app/components/localized-link.tsx`

这是一个封装了 React Router 的 `Link` 组件，自动处理多语言路由：

```tsx
import LocalizedLink from "@/components/localized-link";

function Navigation() {
  return (
    <nav>
      {/* 自动根据当前语言添加正确的路径前缀 */}
      <LocalizedLink to="/about">关于我们</LocalizedLink>
      <LocalizedLink to="/contact">联系我们</LocalizedLink>
      <LocalizedLink to="/pricing">价格</LocalizedLink>
    </nav>
  );
}
```

#### 3. `LocalizedNavLink` 组件

位置：`app/components/localized-navlink.tsx`

这是一个封装了 React Router 的 `NavLink` 组件，支持活动状态样式并自动处理多语言路由：

```tsx
import { LocalizedNavLink } from "@/components/localized-components";

function NavigationBar() {
  return (
    <nav className="flex space-x-4">
      {/* 支持 isActive 和 isPending 状态 */}
      <LocalizedNavLink
        to="/about"
        className={({ isActive }) =>
          isActive 
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "text-gray-600 hover:text-gray-900"
        }
      >
        关于我们
      </LocalizedNavLink>
      
      <LocalizedNavLink
        to="/pricing"
        className={({ isActive, isPending }) => 
          `px-3 py-2 ${isActive ? 'text-blue-600' : 'text-gray-600'} ${isPending ? 'opacity-50' : ''}`
        }
      >
        价格
      </LocalizedNavLink>
    </nav>
  );
}
```

#### 4. 辅助工具函数

位置：`app/lib/localeUtils.ts`

提供了一些实用的路径处理函数：

```tsx
import {
  localizePathWithLocale,
  extractLocaleFromPath,
  removeLocaleFromPath,
} from "@/lib/utils";

// 为特定语言本地化路径
const spanishPath = localizePathWithLocale("/about", "es"); // "/es/about"
const englishPath = localizePathWithLocale("/about", "en"); // "/about"

// 从路径中提取语言
const locale = extractLocaleFromPath("/es/about"); // "es"

// 移除语言前缀
const cleanPath = removeLocaleFromPath("/es/about"); // "/about"
```

## 使用示例

### 基本使用

替换原来的 `Link` 和 `NavLink` 组件：

```tsx
// 之前
import { Link, NavLink } from "react-router";
<Link to="/about">About</Link>
<NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>

// 现在
import { LocalizedLink, LocalizedNavLink } from "@/components/localized-components";
<LocalizedLink to="/about">About</LocalizedLink>
<LocalizedNavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</LocalizedNavLink>
```

### 导航菜单示例

```tsx
import { LocalizedNavLink } from "@/components/localized-components";

function MainNavigation() {
  return (
    <nav className="flex space-x-6">
      <LocalizedNavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 text-sm font-medium transition-colors ${
            isActive
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`
        }
      >
        首页
      </LocalizedNavLink>

      <LocalizedNavLink
        to="/about"
        className={({ isActive, isPending }) =>
          `px-3 py-2 text-sm font-medium transition-colors ${
            isActive && "text-blue-600 border-b-2 border-blue-600"
          } ${isPending && "text-gray-400"} ${
            !isActive && !isPending && "text-gray-600 hover:text-gray-900"
          }`
        }
      >
        关于我们
      </LocalizedNavLink>
    </nav>
  );
}
```

### 在函数中动态生成路径

```tsx
import { useLocalizedLink } from "@/lib/use-localized-link";

function ProductCard({ product }) {
  const { localizeRoute } = useLocalizedLink();

  const handleClick = () => {
    // 动态生成本地化路径
    const productPath = localizeRoute(\`/products/\${product.id}\`);
    window.open(productPath, '_blank');
  };

  return (
    <div onClick={handleClick}>
      {product.name}
    </div>
  );
}
```

### 编程式导航

```tsx
import { useNavigate } from "react-router";
import { useLocalizedLink } from "@/lib/use-localized-link";

function MyComponent() {
  const navigate = useNavigate();
  const { localizeRoute } = useLocalizedLink();

  const handleRedirect = () => {
    const localizedPath = localizeRoute("/success");
    navigate(localizedPath);
  };
}
```

## 优势

1. **开发简便**: 开发者只需要编写基础路径，无需关心语言前缀
2. **自动化**: 根据当前语言自动添加或移除路径前缀
3. **一致性**: 所有路由处理逻辑统一，避免重复代码
4. **可维护**: 路由结构变更时只需修改一处
5. **类型安全**: 完整的 TypeScript 支持

## 实际应用

这个解决方案已经在 Footer 组件中得到应用，替换了原来根据语言条件渲染不同链接的复杂逻辑。现在所有链接都使用 `LocalizedLink`，代码更简洁且更易维护。

## 扩展性

可以轻松扩展支持更多语言，只需要在 `i18n.ts` 配置文件中添加新的语言支持即可，无需修改任何路由相关代码。
