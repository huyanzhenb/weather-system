

enum Locale {
  EN = "en",
  ZH = "zh",
  TC = "tw",
}

type LangDictKey = Locale.EN | Locale.ZH;

const API_KEY = "7zG5cwqA0e0ocRK";
const IP_API_BASE_URL = "https://pro.ip-api.com";
const IP_API_FIELDS =
  "status,message,continent,country,countryCode,regionName,city,lat,lon,timezone,offset,mobile,proxy,hosting,query";

const langDict: Record<LangDictKey, string> = {
  [Locale.EN]: "en",
  [Locale.ZH]: "zh-CN"
};

interface IpInfo {
  status: string;
  query: string;
  country?: string;
  city?: string;
  timezone?: string;
}

interface GetJsonOptions {
  url: string;
  params?: Record<string, string>;
  baseUrl?: string;
  cache?: RequestCache;
  isRawJson?: boolean;
}

async function getJson<T>({ url, params, baseUrl = "", cache = "default", isRawJson = false }: GetJsonOptions): Promise<T> {
  const queryString = params
    ? "?" + new URLSearchParams(params).toString()
    : "";

  const fullUrl = `${baseUrl}${url}${queryString}`;

  const response = await fetch(fullUrl, { cache });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return isRawJson ? response.json() : response.text().then(JSON.parse);
}


/**
 * 获取 IP 信息
 * @param lang 语言
 * @param ip IP 地址 (可选，默认获取当前客户端 IP)
 * @returns Promise<IpInfo> IP 信息
 */
export const getIpInfo = async (lang: Locale, ip?: string): Promise<IpInfo> => {
  const url = `/json${ip ? `/${ip}` : ""}`;

  return getJson<IpInfo>({
    url,
    params: {
      key: API_KEY,
      fields: IP_API_FIELDS,
      lang: langDict[lang as Locale.EN | Locale.ZH]
    },
    baseUrl: IP_API_BASE_URL,
    cache: "no-store",
    isRawJson: true
  }).catch(() => ({
    status: "fail" as IpInfo["status"],
    query: ip || "N/A"
  }));
};

