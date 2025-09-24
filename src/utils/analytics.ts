interface AnalyticsEvent {
  domain: string;
  price?: number;
  bundle?: string;
  tags?: string[];
}

class Analytics {
  track(eventName: string, data: AnalyticsEvent) {
    // Console logging for development - replace with your analytics service
    console.log(`Analytics Event: ${eventName}`, data);
    
    // Example implementation for Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        custom_parameter: JSON.stringify(data),
        domain: data.domain,
        price: data.price,
        bundle: data.bundle,
        tags: data.tags
      });
    }
    
    // Example implementation for other analytics services
    // Mixpanel, Segment, etc. can be added here
  }
}

export const analytics = new Analytics();