<script lang="ts">
    import { onMount } from "svelte";

    // Get current date in YYYY-MM-DD format
    let today = new Date().toISOString().split('T')[0];

    let totalJPY = 1000000;  // Goal in JPY
    let currentJPY = 50000;  // Current savings in JPY
    let exchangeRate = 150;  // Default exchange rate (will be updated from API)

    let totalUSD = 0;
    let currentUSD = 0;
    let progress = 0; // Start at 0, will animate

    // Function to format currency
    function formatCurrency(value: number | bigint, currency: string) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 0
        }).format(value);
    }

    // Fetch live exchange rate from API
    async function fetchExchangeRate() {
        try {
            const res = await fetch("https://api.exchangerate.host/latest?base=JPY&symbols=USD");
            const data = await res.json();
            if (data && data.rates && data.rates.USD) {
                exchangeRate = data.rates.USD; // Update exchange rate
                updateValues();
            }
        } catch (error) {
            console.error("Failed to fetch exchange rate:", error);
        }
    }

    // Update USD values based on exchange rate
    function updateValues() {
        totalUSD = totalJPY * exchangeRate; // Convert JPY to USD (CORRECT FORMULA)
        currentUSD = currentJPY * exchangeRate; // Convert JPY to USD
        totalUSD = totalJPY / exchangeRate; // FIXED: Convert properly
        currentUSD = currentJPY / exchangeRate;
        animateProgress();
    }

    // Animate progress on page load
    function animateProgress() {
        const targetProgress = (currentUSD / totalUSD) * 100;
        let animationFrame: number;

        function animate() {
            if (progress < targetProgress) {
                progress += (targetProgress - progress) * 0.1; // Smooth transition effect
                animationFrame = requestAnimationFrame(animate);
            } else {
                progress = targetProgress; // Ensure exact match
                cancelAnimationFrame(animationFrame);
            }
        }
        animate();
    }

    // Fetch exchange rate and start progress animation on mount
    onMount(async () => {
        await fetchExchangeRate();
        updateValues();
    });
</script>

<div class="my-12 space-y-3">
    <!-- Date -->
    <div class="flex flex-col items-end text-right">
        <span class="text-lg font-semibold text-gray-700 dark:text-gray-300">{today}</span>
        <span class="text-sm text-gray-500">(YYYY-MM-DD)</span>
    </div>

    <!-- Progress Bar -->
    <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 shadow-inner">
        <div class="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out" style="width: {progress}%"></div>
    </div>

    <!-- Goal & Current Value (JPY + Converted USD) -->
    <div class="flex flex-col text-lg font-semibold text-gray-800 dark:text-gray-200">
        <div class="flex justify-between">
            <span>Current: {formatCurrency(currentJPY, "JPY")} (~{formatCurrency(currentUSD, "USD")})</span>
            <span>Goal: {formatCurrency(totalJPY, "JPY")} (~{formatCurrency(totalUSD, "USD")})</span>
        </div>
    </div>
</div>