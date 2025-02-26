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

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* 顶部横跨两列的大块 */}
        <div className="col-span-2 bg-blue-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{t('title')}</h2>
          <p>{t('details')}</p>
          <h1 className='text-[50px]'>{locale}</h1>
        </div>

        {/* 左侧块 */}
        <div className="bg-green-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{t('today')}</h2>
          <p>{t('current')}</p>
        </div>

        {/* 右侧块 */}
        <div className="bg-yellow-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{t('forecast')}</h2>
          <p>{t('future')}</p>
        </div>

        {/* 底部两个横跨两列的块 */}
        <div className="col-span-2 bg-purple-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{t('warning')}</h2>
          <p>{t('warningInfo')}</p>
        </div>

        <div className="col-span-2 bg-pink-200 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{t('lifeIndex')}</h2>
          <p>{t('lifeAdvice')}</p>
        </div>
      </div>
    </div>
  );
}
  