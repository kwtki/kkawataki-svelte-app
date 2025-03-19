<script lang="ts">
  import "$lib/style/nullify.css";
  import "$lib/style/github.css";// Import last to ensure priority
  
  import { onMount } from "svelte";
  import { marked } from "marked";
  import markdown from "$lib/markdown/intro.md?raw";

  const md = marked.parse(markdown);

  onMount(() => {
      document.querySelectorAll(".markdown-body a").forEach(link => {
          if (!link.hasAttribute("target")) {
              link.setAttribute("target", "_blank");
              link.setAttribute("rel", "noopener noreferrer");
          }
      });
  });
</script>


<!-- GitHub Markdown styling applied -->
<article class="container">

  <div class="markdown-body nullfy-style">
      {@html md}
  </div>
</article>