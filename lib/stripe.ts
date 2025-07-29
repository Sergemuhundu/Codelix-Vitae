export interface StripeConfig {
  publishableKey: string;
  priceIds: {
    monthly: string;
    yearly: string;
  };
}

export const stripeConfig: StripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  priceIds: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || '',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY || '',
  },
};

export interface CheckoutSessionRequest {
  priceId: string;
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
}

export class StripeService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost:3000';
  }

  async createCheckoutSession(request: CheckoutSessionRequest) {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      return sessionId;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }
  }

  async createPortalSession(customerId: string) {
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      return url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw new Error('Failed to create portal session');
    }
  }

  async getCustomerSubscription(customerId: string) {
    try {
      const response = await fetch(`/api/stripe/subscription?customerId=${customerId}`);

      if (!response.ok) {
        throw new Error('Failed to get subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting subscription:', error);
      throw new Error('Failed to get subscription');
    }
  }

  redirectToCheckout(sessionId: string) {
    // This would use Stripe's client-side library
    // For now, we'll redirect to a placeholder
    window.location.href = `${this.baseUrl}/checkout?session_id=${sessionId}`;
  }
}

export const stripeService = new StripeService();