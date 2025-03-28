
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "@/lib/sonner-toast";
import { initializePaystack, PaystackTransactionResponse } from '@/services/paystack';

interface PaystackButtonProps {
  amount: number;
  email: string;
  name?: string;
  phone?: string;
  metadata?: Record<string, any>;
  onSuccess?: (response: PaystackTransactionResponse) => void;
  onCancel?: () => void;
  onError?: (error: any) => void;
  className?: string;
}

const PaystackButton = ({
  amount,
  email,
  name,
  phone,
  metadata,
  onSuccess,
  onCancel,
  onError,
  className
}: PaystackButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      await initializePaystack({
        amount,
        email,
        name,
        phone,
        metadata,
        onSuccess: (response) => {
          setIsLoading(false);
          toast.success("Payment successful!", {
            description: `Reference: ${response.reference}`
          });
          onSuccess?.(response);
        },
        onError: (error) => {
          setIsLoading(false);
          const errorMessage = error instanceof Error ? error.message : "Payment failed";
          toast.error(errorMessage, {
            description: "Please try again or contact support."
          });
          onError?.(error);
        },
        onCancel: () => {
          setIsLoading(false);
          toast.info("Payment cancelled", {
            description: "You have cancelled the payment"
          });
          onCancel?.();
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to initialize payment", {
        description: "Please try again later."
      });
      onError?.(error);
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      disabled={isLoading}
      className={className}
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
