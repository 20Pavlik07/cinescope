import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'https://unpkg.com/web-vitals@4?module';

const ENDPOINT = 'https://webhook.site/ae1a0a57-c8d2-44ce-a4e8-0d73ed5faba1';

function sendMetric(metric) {
  const result = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    page: window.location.href,
    timestamp: new Date().toISOString()
  };

  const payload = JSON.stringify(result);

  try {
    const sent = navigator.sendBeacon(
      ENDPOINT,
      new Blob([payload], { type: 'text/plain;charset=UTF-8' })
    );

    if (sent) {
      console.log('[Web Vitals] Метрика отправлена:', result);
    } else {
      console.warn('[Web Vitals] Не удалось поставить метрику в очередь:', result);
      console.log('[Web Vitals] Данные метрики:', result);
    }
  } catch (error) {
    console.error('[Web Vitals] Ошибка отправки:', error);
    console.log('[Web Vitals] Данные метрики:', result);
  }
}

onCLS(sendMetric);
onFCP(sendMetric);
onINP(sendMetric);
onLCP(sendMetric);
onTTFB(sendMetric);