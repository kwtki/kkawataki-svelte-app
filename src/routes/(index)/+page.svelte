<script>
    import DetailsSection from "$lib/@component/DetailsSection.svelte";

</script>


<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
  <div class="mx-auto max-w-4xl">
    <!-- Responsive YouTube Embed -->
    <div class="relative w-full pt-[56.25%]">
      <iframe
        class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        src="https://www.youtube.com/embed/yo1vacRLWZU"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</div>

<!-- <DetailsSection/> -->