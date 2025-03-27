
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "@/lib/sonner-toast";
import { PAYSTACK_CONFIG } from '@/config/paystack';

export interface PaystackResponse {
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

export interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  metadata?: PaystackMetadata;
  channels?: string[];
  callback: (response: PaystackResponse) => void;
  onClose: () => void;
}

export interface PaystackHandler {
  openIframe: () => void;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => PaystackHandler;
    };
  }
}

interface PaystackButtonProps {
  amount: number;
  email: string;
  name?: string;
  phone?: string;
  metadata?: Record<string, any>;
  onSuccess?: (response: PaystackResponse) => void;
  onCancel?: () => void;
  onError?: (error: any) => void;
}

const PaystackButton = ({
  amount,
  email,
  name,
  phone,
  metadata,
  onSuccess,
  onCancel,
  onError
}: PaystackButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const initializePayment = () => {
    setIsLoading(true);
    
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        processPayment();
      };
      script.onerror = (error) => {
        setIsLoading(false);
        const errorMessage = "Failed to load payment gateway";
        toast.error(errorMessage, {
          description: "Please check your internet connection and try again."
        });
        onError?.(error);
      };
      document.body.appendChild(script);
    } else {
      processPayment();
    }
  };

  const processPayment = () => {
    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_CONFIG.PUBLIC_KEY,
        email,
        amount: amount * 100, // Convert to pesewas
        currency: PAYSTACK_CONFIG.CURRENCY,
        ref: `ref_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
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
        payment_options: true,
        callback: (response: PaystackResponse) => {
          setIsLoading(false);
          if (response.status === 'success') {
            onSuccess?.(response);
            toast.success("Payment successful!", {
              description: `Reference: ${response.reference}`
            });
          } else {
            const errorMessage = "Payment failed";
            toast.error(errorMessage, {
              description: response.message || "Please try again or contact support."
            });
            onError?.(response);
          }
        },
        onClose: () => {
          setIsLoading(false);
          onCancel?.();
          toast.info("Payment cancelled", {
            description: "You have cancelled the payment"
          });
        }
      });
      
      handler.openIframe();
    } catch (error) {
      setIsLoading(false);
      const errorMessage = "An error occurred";
      toast.error(errorMessage, {
        description: "Unable to initiate payment. Please try again."
      });
      console.error("Paystack error:", error);
      onError?.(error);
    }
  };

  return (
    <Button 
      onClick={initializePayment}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          Checkout with Paystack
          <CreditCard className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
};

export default PaystackButton;
