import { createContext, useContext, createSignal, createMemo, ParentProps, Accessor, Setter, onMount } from "solid-js";
import { themes as sampleThemes, Theme, websiteTemplatespagestype, WebsiteTemplatepagestype, themeOwners, ThemeOwner } from "../lib/theme-data";

type ActiveSection = "" | "myprofile" | "globalalert" | "mynotification" | "mymessage" | "ThemeDetails" | "otherProfile" | "ThemeCollection";

interface ThemeContextType {
  themes: Accessor<Theme[]>;
  filteredThemes: Accessor<Theme[]>;
  selectedTheme: Accessor<WebsiteTemplatepagestype | null>;
  setSelectedTheme: Setter<WebsiteTemplatepagestype | null>;
  SelectedThemeDetail: (id: string) => void;
  selectedProfile: Accessor<ThemeOwner | null>;
  selectProfile: (ownerId: string) => void;
  activeSection: Accessor<ActiveSection>;
  setActiveSection: Setter<ActiveSection>;
  showMyProfile: () => void;
  showGlobalAlert: () => void;
  showMyNotification: () => void;
  showMyMessage: () => void;
  filterCategory: Accessor<string>;
  setFilterCategory: Setter<string>;
  filterSearch: Accessor<string>;
  setFilterSearch: Setter<string>;
  filterTag: Accessor<string>;
  setFilterTag: Setter<string>;
  filterMinPrice: Accessor<number | null>;
  setFilterMinPrice: Setter<number | null>;
  filterMaxPrice: Accessor<number | null>;
  setFilterMaxPrice: Setter<number | null>;
  filterSalesCount: Accessor<number | null>;
  setFilterSalesCount: Setter<number | null>;
  filterImpression: Accessor<number | null>;
  setFilterImpression: Setter<number | null>;
  filterCreated: Accessor<string>;
  setFilterCreated: Setter<string>;
  filterVersion: Accessor<string>;
  setFilterVersion: Setter<string>;
}

const ThemeContext = createContext<ThemeContextType>();

export function ThemeProvider(props: ParentProps) {
  // signals
  const [themes, setThemes] = createSignal<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = createSignal<WebsiteTemplatepagestype | null>(null);
  const [selectedProfile, setSelectedProfile] = createSignal<ThemeOwner | null>(null);
  const [activeSection, setActiveSection] = createSignal<ActiveSection>("");

  const [filterCategory, setFilterCategory] = createSignal("");
  const [filterSearch, setFilterSearch] = createSignal("");
  const [filterTag, setFilterTag] = createSignal("");
  const [filterMinPrice, setFilterMinPrice] = createSignal<number | null>(null);
  const [filterMaxPrice, setFilterMaxPrice] = createSignal<number | null>(null);
  const [filterSalesCount, setFilterSalesCount] = createSignal<number | null>(null);
  const [filterImpression, setFilterImpression] = createSignal<number | null>(null);
  const [filterCreated, setFilterCreated] = createSignal("");
  const [filterVersion, setFilterVersion] = createSignal("");

  // run only on client
  onMount(() => {
    setThemes(sampleThemes);
  });

  const filteredThemes = createMemo(() =>
    themes().filter(theme => {
      if (filterCategory() && !theme.categories.includes(filterCategory())) return false;
      if (filterSearch() && !(
        theme.name.toLowerCase().includes(filterSearch().toLowerCase()) ||
        theme.description.toLowerCase().includes(filterSearch().toLowerCase())
      )) return false;
      if (filterTag() && !theme.tags.includes(filterTag())) return false;
      if (filterMinPrice() !== null && theme.minprice < filterMinPrice()!) return false;
      if (filterMaxPrice() !== null && theme.maxprice > filterMaxPrice()!) return false;
      if (filterSalesCount() !== null && theme.numberofsalescount < filterSalesCount()!) return false;
      if (filterImpression() !== null && theme.impressions < filterImpression()!) return false;
      if (filterCreated() && !theme.createdAt.startsWith(filterCreated())) return false;
      if (filterVersion() && !theme.versions.includes(filterVersion())) return false;
      return true;
    })
  );

  const SelectedThemeDetail = (id: string) => {
    setSelectedTheme(websiteTemplatespagestype[id] || null);
    setSelectedProfile(null);
    setActiveSection("ThemeDetails");
  };

  const selectProfile = (ownerId: string) => {
    setSelectedProfile(themeOwners[ownerId] || null);
    setSelectedTheme(null);
    setActiveSection("otherProfile");
  };

  const showMyProfile = () => {
    setActiveSection("myprofile");
    setSelectedTheme(null);
    setSelectedProfile(null);
  };
  const showGlobalAlert = () => {
    setActiveSection("globalalert");
    setSelectedTheme(null);
    setSelectedProfile(null);
  };
  const showMyNotification = () => {
    setActiveSection("mynotification");
    setSelectedTheme(null);
    setSelectedProfile(null);
  };
  const showMyMessage = () => {
    setActiveSection("mymessage");
    setSelectedTheme(null);
    setSelectedProfile(null);
  };

  return (
    <ThemeContext.Provider
      value={{
        themes,
        filteredThemes,
        selectedTheme,
        setSelectedTheme,
        SelectedThemeDetail,
        selectedProfile,
        selectProfile,
        activeSection,
        setActiveSection,
        showMyProfile,
        showGlobalAlert,
        showMyNotification,
        showMyMessage,
        filterCategory,
        setFilterCategory,
        filterSearch,
        setFilterSearch,
        filterTag,
        setFilterTag,
        filterMinPrice,
        setFilterMinPrice,
        filterMaxPrice,
        setFilterMaxPrice,
        filterSalesCount,
        setFilterSalesCount,
        filterImpression,
        setFilterImpression,
        filterCreated,
        setFilterCreated,
        filterVersion,
        setFilterVersion
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}
