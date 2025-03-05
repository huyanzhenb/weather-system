// 定义天气数据的接口
export interface WeatherData {
  code: string; // API 返回的状态码
  updateTime?: string; // 数据更新时间
  fxLink?: string; // 天气数据的响应式页面链接（可选）
  now: {
    obsTime?: string; // 数据观测时间
    temp: string; // 当前温度
    feelsLike: string; // 体感温度
    icon: string; // 天气状况的图标代码
    text: string; // 天气状况的文字描述
    wind360?: string; // 风向（360角度）
    windDir?: string; // 风向（文字描述）
    windScale?: string; // 风力等级
    windSpeed?: string; // 风速（公里/小时）
    humidity: string; // 相对湿度（百分比数值）
    precip?: string; // 过去1小时降水量（毫米）
    pressure?: string; // 大气压强（百帕）
    vis?: string; // 能见度（公里）
    cloud?: string; // 云量（百分比数值）
    dew?: string; // 露点温度
  };
  refer?: {
    sources?: string[]; // 原始数据来源
    license?: string[]; // 数据许可或版权声明
  };
}

export interface WeatherData {
  code: string; // API 返回的状态码
  updateTime?: string; // 数据更新时间
  fxLink?: string; // 天气数据的响应式页面链接（可选）
  now: {
    obsTime?: string; // 数据观测时间
    temp: string; // 当前温度
    feelsLike: string; // 体感温度
    icon: string; // 天气状况的图标代码
    text: string; // 天气状况的文字描述
    wind360?: string; // 风向（360角度）
    windDir?: string; // 风向（文字描述）
    windScale?: string; // 风力等级
    windSpeed?: string; // 风速（公里/小时）
    humidity: string; // 相对湿度（百分比数值）
    precip?: string; // 过去1小时降水量（毫米）
    pressure?: string; // 大气压强（百帕）
    vis?: string; // 能见度（公里）
    cloud?: string; // 云量（百分比数值）
    dew?: string; // 露点温度
  };
  refer?: {
    sources?: string[]; // 原始数据来源
    license?: string[]; // 数据许可或版权声明
  };
}

export interface Location {
  name: string;
  id: string;
  lat: string;
  lon: string;
  adm2: string;
  adm1: string;
  country: string;
  tz: string;
  utcOffset: string;
  isDst: string;
  type: string;
  rank: string;
  fxLink: string;
}

export interface GeoapiData {
  code: string;
  location: Location[];
  refer?: {
    sources: string[];
    license: string[];
  };
}



/**
 * 获取实时天气数据
 * @param location - 地理位置的 Location ID
 * @returns Promise<WeatherData> - 天气数据
 */
export async function getWeatherData(location: string): Promise<WeatherData | null> {
  try {
    const apiKey ='777dc0a1f97544a1b5a4ea6e2d7019a2'; // 从环境变量获取 API Key
    const apiUrl = `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // 正确设置 Authorization 请求头
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data: WeatherData = await response.json();
    if (data.code === "200") {
      return data;
    } else {
      console.warn("QWeather API Error:", data.code);
      return null;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export async function getGeoapiData(location: string): Promise<GeoapiData | null> {
  try {
    const apiKey ='777dc0a1f97544a1b5a4ea6e2d7019a2';
    const apiUrl = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // 正确设置 Authorization 请求头
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data: GeoapiData = await response.json();
    if (data.code === "200") {
      return data;
    } else {
      console.warn("QWeather API Error:", data.code);
      return null;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

interface DetailData {
  code: string; // API返回的状态码，例如 "200"
  updateTime?: string; // 数据更新时间，格式为 ISO 8601，例如 "2021-12-16T18:35+08:00"
  fxLink?: string; // 预报链接，可能为空
  daily: {
    date: string; // 日期，格式为 YYYY-MM-DD
    type: string; // 指数类型，例如 "1" 或 "2"
    name: string; // 指数名称，例如 "运动指数" 或 "洗车指数"
    level: string; // 指数等级，例如 "3"
    category: string; // 指数分类，例如 "较不宜"
    text: string; // 指数描述
  }[];
  refer: {
    sources: string[]; // 数据来源数组，例如 ["QWeather"]
    license: string[]; // 数据许可信息数组，例如 ["QWeather Developers License"]
  };
}

export async function getDetailData(location: string): Promise<DetailData | null> {
  try {
    const apiKey ='777dc0a1f97544a1b5a4ea6e2d7019a2';
    const apiUrl = `https://devapi.qweather.com/v7/indices/1d?type=1&location=${location}&key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // 正确设置 Authorization 请求头
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data: DetailData = await response.json();
    if (data.code === "200") {
      return data;
    } else {
      console.warn("QWeather API Error:", data.code);
      return null;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}