export const formatAmount = (amount: number, currency: string) => {
    
    if (currency === 'BIF') {
        // For BIF, use normal comma-separated number and "FBu" manually
        return `${amount.toLocaleString('en-US')} Fbu`;
    }
    if (currency === 'USD' && amount >= 1_000_000) {
        return `${amount / 1_000_000}M $`
    } else if (currency === 'USD' && amount >= 1_000) {
        return `${amount / 1_000}K $`
    }

    console.log('Formatting:', { amount, currency });

    // Default fallback: just show plain number
    return amount.toLocaleString('en-US');
}
