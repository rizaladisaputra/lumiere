/**
 * Formats monetary amounts in either USD or Indonesian Rupiah (IDR).
 */
export function formatCurrency(
  amount: number,
  currency: 'USD' | 'IDR' = 'USD',
  options?: { showCents?: boolean }
): string {
  if (currency === 'IDR') {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: options?.showCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Standard USD to IDR conversion multiplier for demo purposes (1 USD ≈ 16,000 IDR)
 */
export const USD_TO_IDR_RATE = 16000;

export function convertUsdToIdr(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_IDR_RATE);
}
