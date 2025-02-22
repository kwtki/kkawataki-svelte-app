<script lang="ts">
    let { children } = $props();
    import "../app.css";
    import Header from "../lib/@component/@header/Header.svelte";

    import { page } from "$app/state";

    // Function to format slug into a title
    function formatTitle(slug: string): string {
        if (slug === "/") return "Home"; // Handle root case
        return slug
            .replace(/^\//, "") // Remove leading slash
            .replace(/-/g, " ") // Replace hyphens with spaces
            .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize first letter
    }

    // Correct usage of `$derived`
    const title = $derived(formatTitle(page.url.pathname));
</script>

<svelte:head>
    <title>{title}</title>
    <!-- Google tag (gtag.js) -->
    <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-986GV1T4CL"
    ></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-986GV1T4CL");
    </script>
    <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1225904822801997"
        crossorigin="anonymous"
    ></script>

    <!-- Site Data -->
    <meta property="og:site_name" content="kkawataki" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://kkawataki.com/" />
    <meta property="twitter:site" content="kkawataki" />
    <meta property="twitter:creator" content="kkawataki" />
    <meta property="og:image" content="https://i.sstatic.net/6plcYoBM.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="https://kkawataki.com/" />
</svelte:head>

<Header/>
<div class="py-3"></div>
{@render children()}
