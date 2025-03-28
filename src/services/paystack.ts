import { PAYSTACK_CONFIG } from '@/config/paystack';

export interface PaystackTransactionResponse {
  reference: string;
  status: 'success' | 'failed' | 'abandoned';
  message?: string;
  transaction: string;
  trxref: string;
}

export interface PaystackCustomField {
  display_name: string;
  variable_name: string;
  value: string | number | boolean;
}

export interface PaystackMetadata {
  custom_fields: PaystackCustomField[];
}

export interface PaystackTransaction {
  amount: number;
  email: string;
  name?: string;
  phone?: string;
  metadata?: Record<string, any>;
  onSuccess?: (response: PaystackTransactionResponse) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

export const initializePaystack = async ({
  amount,
  email,
  name,
  phone,
  metadata,
  onSuccess,
  onError,
  onCancel
}: PaystackTransaction): Promise<void> => {
  try {
    if (!PAYSTACK_CONFIG.PUBLIC_KEY) {
      throw new Error('Paystack public key not configured');
    }

    // Convert amount to pesewas and ensure it's an integer
    const amountInPesewas = Math.round(amount * 100);

    if (!Number.isInteger(amountInPesewas)) {
      throw new Error('Invalid amount: Amount must convert to a valid integer in pesewas');
    }

    // Load Paystack script if not already loaded
    if (!window.PaystackPop) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Paystack script'));
        document.body.appendChild(script);
      });
    }

    const reference = `ref_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_CONFIG.PUBLIC_KEY,
      email,
      amount: amountInPesewas, // Now using the converted amount
      currency: PAYSTACK_CONFIG.CURRENCY,
      ref: reference,
      firstname: name?.split(' ')[0],
      lastname: name?.split(' ').slice(1).join(' '),
      phone,
      metadata: {
        custom_fields: [
          {
            display_name: "Payment For",
            variable_name: "payment_for",
            value: "BuyShea Products"
          },
          ...Object.entries(metadata || {}).map(([key, value]) => ({
            display_name: key,
            variable_name: key.toLowerCase(),
            value
          }))
        ]
      },
      channels: PAYSTACK_CONFIG.CHANNELS,
      callback: (response: PaystackTransactionResponse) => {
        if (response.status === 'success') {
          onSuccess?.(response);
        } else {
          onError?.(new Error(response.message || 'Payment failed'));
        }
      },
      onClose: () => {
        onCancel?.();
      }
    });

    handler.openIframe();
  } catch (error) {
    onError?.(error);
  }
};
