type UseUrlTabsReturn = {
  setTab: (tab: string) => void;
  currentTab: (tab: string) => void;
};

export const useUrlTabs = (
  baseUrl: string,
  initialTab: string,
  tabs: string[]
) => {};
