<script lang="ts">
    import { onMount } from "svelte";
    import { marked } from "marked";
    import markdown from "$lib/markdown/goal.md?raw";

    const md = marked.parse(markdown);

    onMount(() => {
        // Select all links inside the Markdown container AFTER rendering
        document.querySelectorAll(".markdown-body a").forEach(link => {
            if (!link.hasAttribute("target")) {
                link.setAttribute("target", "_blank");
                link.setAttribute("rel", "noopener noreferrer"); // Security best practice
            }
        });
    });
</script>

<!-- GitHub Markdown styling applied -->
<article class="container">
    <div class="markdown-body">
        {@html md}
    </div>
</article>