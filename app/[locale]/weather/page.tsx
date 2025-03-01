import { getWeatherData } from '@/api/localWeather';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function WeatherPage({
  params
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('Weather');

  let latitude: number | null = null;
  let longitude: number | null = null;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = parseFloat(position.coords.latitude.toFixed(2));
        longitude = parseFloat(position.coords.longitude.toFixed(2));
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        console.error('Error getting geolocation: ', error);
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }

  const fullLocation = `${latitude},${longitude}`
  const weatherData = await getWeatherData(fullLocation);
  console.log(weatherData)
  console.log(latitude, longitude)

  return (
    <div className="p-4 bg-primary h-full">
      <div className="grid h-full grid-cols-2 gap-4">
        {/* 顶部横跨两列的大块 */}
        <div className="col-span-2 bg-blue-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg text-[#4791ff] font-semibold">{t('title')}</h2>
          <p className="text-[#4791ff]">{t('details')}</p>
          <div className='flex'>
            <div>{weatherData?.now?.feelsLike}</div>
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
