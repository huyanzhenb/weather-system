import { getIpInfo, Locale } from '@/api/client';
import { getGeoapiData, getWeatherData } from '@/api/localWeather';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
interface LayoutProps {
  params: Promise<{ locale: Locale }>; // 将类型明确为对象而不是 Promise<any>
}

export default async function WeatherPage({ params }: LayoutProps) {
  const { locale } = await params;
  const t = await getTranslations('Weather');
  const headersList = headers();
  const xForwardedFor = (await headersList).get("x-forwarded-for");
  const remoteAddress = (await headersList).get("x-real-ip");
  const publicIP = xForwardedFor ? xForwardedFor.split(",")[0] : remoteAddress;
  // const ip = "180.175.217.233";
  const ipInfo = await getIpInfo(locale, publicIP || "");
  const lat = ipInfo.lat ? ipInfo.lat.toFixed(2) : null;
  const lon = ipInfo.lon ? ipInfo.lon.toFixed(2) : null;
  const location = lat && lon ? `${lon},${lat}` : ipInfo?.regionName || ipInfo?.city;
  const geoapiData = await getGeoapiData(location || "北京")
  const weatherData = await getWeatherData(geoapiData?.location[0].id || "北京")
  console.log(location)
  console.log(geoapiData)
  console.log(weatherData)

  return (
    <div className="p-4 bg-[#636366] h-full">
      <div className="flex h-[60%] gap-4 m-2">
        <div className="bg-[#2D2E32] rounded-[16px] w-[70%] p-6">
          <div className="flex justify-between items-center">
            <div className='flex justify-between'>
              <h1>香港特别行政区</h1>
              <span>香港特别行政区/中国</span>
            </div>
            <p className="current-time">2025-03-05 02:26</p>
          </div>
          <div className="current-live">
            <div className="current-live__item">
              <a href="/weather/hong-kong-101320101.html">
                <img src="https://a.hecdn.net/img/common/icon/202106d/104.png" alt="QWeather" />
              </a>
            </div>
            <div className="current-live__item">
              <a href="/weather/hong-kong-101320101.html">
                <p>17°</p>
                <p>阴</p>
              </a>
              <a className="air-tag air-tag--1" href="/air/hong-kong-101320101.html">
                AQI 优
              </a>
            </div>
          </div>
          <div className="current-abstract">
            <a href="/weather/hong-kong-101320101.html">
              今晚中雨。明天多云，比昨天凉爽一些（20°），有风, 空气不错。
            </a>
          </div>
          <div className="current-basic flex justify-between items-center">
            <a href="/weather/hong-kong-101320101.html" className="current-basic___item">
              <p>3级</p>
              <p>东南风</p>
            </a>
            <a href="/weather/hong-kong-101320101.html" className="current-basic___item">
              <p>89%</p>
              <p>相对湿度</p>
            </a>
          </div>
        </div>
        <div className='bg-[#2D2E32] rounded-[16px] w-full flex-1'></div>

      </div>
    </div>
  );
}
