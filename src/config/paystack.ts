const REQUIRED_ENV_VARS = ['VITE_PAYSTACK_PUBLIC_KEY'] as const;

const missingEnvVars = REQUIRED_ENV_VARS.filter(
  (envVar) => !import.meta.env[envVar]
);

if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
}

export const PAYSTACK_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  CURRENCY: "GHS",
  CHANNELS: ["card", "mobile_money", "bank_transfer"] as const,
  MOBILE_MONEY_NETWORKS: ["mtn", "vod", "tgo", "airteltigo"] as const
} as const;

// Type guard to check if Paystack is properly configured
export const isPaystackConfigured = (): boolean => {
  return Boolean(PAYSTACK_CONFIG.PUBLIC_KEY);
};
