import { getIpInfo, Locale } from '@/api/client';
import { getDetailData, getGeoapiData, getWeatherData } from '@/api/localWeather';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Time from './compoents/Time';
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
  const detailData = await getDetailData(geoapiData?.location[0].id || "北京")
  // console.log(location)
  // console.log(geoapiData)
  console.log(weatherData)
  // console.log(detailData)

  return (
    <div className="p-4 bg-[#202124] h-full">
      <div className="flex h-[60%] gap-4 m-2">
        <div className="bg-[#2D2E32] rounded-[16px] w-[70%] p-6">
          <div className='flex h-full flex-col justify-between'>
            <div className="flex justify-between items-end">
              <div className='flex items-end gap-4 justify-between'>
                <h1 className='text-3xl'>{geoapiData?.location[0]?.adm2}</h1>
                <span className='text-xl'>{geoapiData?.location[0]?.adm1}/{geoapiData?.location[0]?.country}</span>
              </div>
              <Time />
            </div>
            <div className='mx-auto gap-6 flex'>
              <img src={`/icons/${weatherData?.now?.icon}.svg`} className='w-20 h-20 text-white' alt="111" />
              <div className='flex h-16 justify-between flex-col'>
                <div className='text-[48px] leading-[50px] flex'>
                  {weatherData?.now?.temp}
                  <p className='text-[40px]'>°</p>
                </div>
                <div className='text-[30px]'>{weatherData?.now?.text}</div>
              </div>
            </div>
            <div className='mx-auto text-[20px]'>{detailData?.daily[0]?.text}</div>
            <div className='w-[90%] mx-auto h-[120px] rounded-xl bg-[rgba(255,255,255,0.03)] flex items-center justify-around'>
              <div className='flex text-[18px] flex-col items-center'>
                <div className='text-white'>{weatherData?.now?.cloud}级</div>
                <div className='text-[rgba(255,255,255,0.6)]'>{weatherData?.now?.windDir}</div>
              </div>
              <div className='flex text-[18px] flex-col items-center'>
                <div className='text-white'>{weatherData?.now?.humidity}%</div>
                <div className='text-[rgba(255,255,255,0.6)]'>相对湿度</div>
              </div>
              <div className='flex text-[18px] flex-col items-center'>
                <div className='text-white'>{weatherData?.now?.feelsLike}°</div>
                <div className='text-[rgba(255,255,255,0.6)]'>体感温度</div>
              </div>
              <div className='flex text-[18px] flex-col items-center'>
                <div className='text-white'>{weatherData?.now?.vis}公里</div>
                <div className='text-[rgba(255,255,255,0.6)]'>能见度</div>
              </div>
              <div className='flex text-[18px] flex-col items-center'>
                <div className='text-white'>{weatherData?.now?.pressure}级</div>
                <div className='text-[rgba(255,255,255,0.6)]'>大气压强</div>
              </div>
              <div className='flex text-[18px] flex-col items-center'>
                <div className='text-white'>{weatherData?.now?.precip}毫米</div>
                <div className='text-[rgba(255,255,255,0.6)]'>降水量</div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="bg-[#2D2E32] rounded-[16px] w-auto flex-1 p-6"></div>
      </div>
    </div>
  );
}
