
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'https://unpkg.com/web-vitals@4?module';

function sendMetric(metric) {
  const result = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    page: window.location.href,
    timestamp: new Date().toISOString()
  };

  console.log('[Web Vitals]', result);
}

onCLS(sendMetric);
onFCP(sendMetric);
onINP(sendMetric);
onLCP(sendMetric);
onTTFB(sendMetric);
