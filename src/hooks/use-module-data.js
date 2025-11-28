import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useModuleData = (path) => {
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    import(`src/constants/${path}.json`)
      .then((json) => setData(json.default))
      .catch((err) => console.error("Error loading module data:", err));
  }, [path]);

  // helper để tự lấy text từ key/default
  const tr = (item) => {
    if (!item) return "";
    if (typeof item === "string") return t(item);
    return t(item.key, { defaultValue: item.default });
  };

  return { data, tr };
};
