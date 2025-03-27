
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "@/lib/sonner-toast";

interface PaystackButtonProps {
  amount: number;
  email: string;
  name?: string;
  phone?: string;
  onSuccess?: (reference: string) => void;
  onCancel?: () => void;
}

const PAYSTACK_PUBLIC_KEY = "pk_test_yourpaystackpublickey"; // Replace with your Paystack public key

const PaystackButton = ({
  amount,
  email,
  name,
  phone,
  onSuccess,
  onCancel
}: PaystackButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const initializePayment = () => {
    setIsLoading(true);
    
    // Load the Paystack inline script if it's not already loaded
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        processPayment();
      };
      script.onerror = () => {
        setIsLoading(false);
        toast.error("Failed to load payment gateway", {
          description: "Please check your internet connection and try again."
        });
      };
      document.body.appendChild(script);
    } else {
      processPayment();
    }
  };

  const processPayment = () => {
    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amount * 100, // Paystack amount is in kobo (pesewas for Ghana), so we multiply by 100
        currency: 'GHS', // Using Ghana Cedis
        ref: `ref_${Math.floor(Math.random() * 1000000000)}`, // Generate a unique reference
        firstname: name?.split(' ')[0],
        lastname: name?.split(' ').slice(1).join(' '),
        phone: phone,
        callback: function(response: any) {
          setIsLoading(false);
          if (onSuccess) {
            onSuccess(response.reference);
          }
          toast.success("Payment successful!", {
            description: `Reference: ${response.reference}`
          });
        },
        onClose: function() {
          setIsLoading(false);
          if (onCancel) {
            onCancel();
          }
          toast.info("Payment cancelled", {
            description: "You have cancelled the payment"
          });
        }
      });
      
      handler.openIframe();
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred", {
        description: "Unable to initiate payment. Please try again."
      });
      console.error("Paystack error:", error);
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
          Checkout
          <CreditCard className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
};

export default PaystackButton;
