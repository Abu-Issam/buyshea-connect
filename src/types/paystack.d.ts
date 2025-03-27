
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => PaystackHandler;
    };
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  label?: string;
  metadata?: Record<string, any>;
  onClose?: () => void;
  callback?: (response: PaystackResponse) => void;
}

interface PaystackHandler {
  openIframe: () => void;
}

interface PaystackResponse {
  reference: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}

export {};
