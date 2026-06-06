import { logEvent, setUserProperties } from 'firebase/analytics';
import { getAnalyticsClient } from './firebase';

/**
 * Fire-and-forget analytics event. Resolves immediately even if analytics isn't
 * ready or configured — never blocks UI.
 */
export async function track(event: string, params?: Record<string, unknown>) {
  try {
    const analytics = await getAnalyticsClient();
    if (!analytics) return;
    logEvent(analytics, event, params as Record<string, string | number | boolean>);
  } catch {
    // analytics is best-effort — never throw to UI
  }
}

export async function trackPageView(path: string, title?: string) {
  return track('page_view', {
    page_path: path,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
    page_title: title ?? (typeof document !== 'undefined' ? document.title : ''),
  });
}

export async function setAnalyticsProperties(props: Record<string, string>) {
  try {
    const analytics = await getAnalyticsClient();
    if (!analytics) return;
    setUserProperties(analytics, props);
  } catch {
    // ignore
  }
}
