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

/**
 * 获取实时天气数据
 * @param location - 地理位置的 Location ID
 * @returns Promise<WeatherData> - 天气数据
 */
export async function getWeatherData(location: string): Promise<WeatherData | null> {
  try {
    const apiKey ='777dc0a1f97544a1b5a4ea6e2d7019a2'; // 从环境变量获取 API Key
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