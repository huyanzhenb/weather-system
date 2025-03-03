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
    <div className="p-4 bg-primary h-full">
      <div className="grid h-full grid-cols-2 gap-4">
        {/* 顶部横跨两列的大块 */}
        <div className="col-span-2 bg-blue-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg text-[#4791ff] font-semibold">{t('title')}</h2>
          <p className="text-[#4791ff]">{t('details')}</p>
          <div className='flex'>
            <div>1111{geoapiData?.location[0]?.name}{weatherData?.now.windDir}</div>
          </div>
        </div>

        {/* 左侧块 */}
        <div className="bg-green-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg text-[#4791ff] font-semibold">{t('today')}</h2>
          <p className="text-[#4791ff]">{t('current')}</p>
        </div>

        {/* 右侧块 */}
        <div className="bg-yellow-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg text-[#4791ff] font-semibold">{t('forecast')}</h2>
          <p className="text-[#4791ff]">{t('future')}</p>
        </div>

        {/* 底部两个横跨两列的块 */}
        <div className="col-span-2 bg-purple-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg text-[#4791ff] font-semibold">{t('warning')}</h2>
          <p className="text-[#4791ff]">{t('warningInfo')}</p>
        </div>

        <div className="col-span-2 bg-pink-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg text-[#4791ff] font-semibold">{t('lifeIndex')}</h2>
          <p className="text-[#4791ff]">{t('lifeAdvice')}</p>
        </div>
      </div>
    </div>
  );
}
