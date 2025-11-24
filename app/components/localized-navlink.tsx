import { NavLink as ReactRouterNavLink, type NavLinkProps } from "react-router";
import { useLocalizedLink } from "@/lib/use-localized-link";
import { forwardRef } from "react";

/**
 * 本地化的 NavLink 组件
 * 自动根据当前语言处理路由前缀，支持活动状态样式
 */
export const LocalizedNavLink = forwardRef<
  HTMLAnchorElement,
  Omit<NavLinkProps, "to"> & { to: string }
>(({ to, children, className, ...props }, ref) => {
  const { localizeRoute } = useLocalizedLink();
  const localizedTo = localizeRoute(to);

  return (
    <ReactRouterNavLink
      ref={ref}
      to={localizedTo}
      className={className}
      {...props}
    >
      {children}
    </ReactRouterNavLink>
  );
});

LocalizedNavLink.displayName = "LocalizedNavLink";

export default LocalizedNavLink;
