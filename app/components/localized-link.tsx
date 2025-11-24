import { Link as ReactRouterLink, type LinkProps } from "react-router";
import { useLocalizedLink } from "@/lib/use-localized-link";
import { forwardRef } from "react";

/**
 * 本地化的 Link 组件
 * 自动根据当前语言处理路由前缀
 */
export const LocalizedLink = forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "to"> & { to: string }
>(({ to, children, ...props }, ref) => {
  const { localizeRoute } = useLocalizedLink();
  const localizedTo = localizeRoute(to);

  return (
    <ReactRouterLink ref={ref} to={localizedTo} {...props}>
      {children}
    </ReactRouterLink>
  );
});

LocalizedLink.displayName = "LocalizedLink";

export default LocalizedLink;
