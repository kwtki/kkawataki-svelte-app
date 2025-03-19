<script lang="ts">
    import { marked } from "marked";
    export let md: string; // Passed from load function
    let parsedMd = marked.parse(md);
</script>

<article class="container">
    <div class="markdown-body nullfy-style">
        {@html parsedMd}
    </div>
</article>