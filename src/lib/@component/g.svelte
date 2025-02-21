<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount, afterUpdate } from "svelte";

  let images = [
    "https://pagedone.io/asset/uploads/1713943683.png",
    "https://pagedone.io/asset/uploads/1713943709.png",
    "https://pagedone.io/asset/uploads/1713943720.png",
    "https://pagedone.io/asset/uploads/1713943731.png",
    "https://pagedone.io/asset/uploads/1713943720.png",
    "https://pagedone.io/asset/uploads/1713943731.png",
    "https://pagedone.io/asset/uploads/1713943720.png",
    "https://pagedone.io/asset/uploads/1713943731.png",
  ];

  let selectedImageIndex = 0;
  let thumbnailContainer: HTMLDivElement;

  function selectImage(index: number) {
    selectedImageIndex = index;
    scrollThumbnails();
  }

  function nextImage() {
    selectedImageIndex = (selectedImageIndex + 1) % images.length;
    scrollThumbnails();
  }

  function prevImage() {
    selectedImageIndex =
      (selectedImageIndex - 1 + images.length) % images.length;
    scrollThumbnails();
  }

  function scrollThumbnails() {
    if (thumbnailContainer) {
      const activeThumbnail = thumbnailContainer.children[
        selectedImageIndex
      ] as HTMLDivElement;
      if (activeThumbnail) {
        thumbnailContainer.scrollTo({
          left:
            activeThumbnail.offsetLeft -
            thumbnailContainer.clientWidth / 2 +
            activeThumbnail.clientWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }

  let startX = 0;
  function handleTouchStart(event: TouchEvent) {
    startX = event.touches[0].clientX;
  }

  function handleTouchEnd(event: TouchEvent) {
    let endX = event.changedTouches[0].clientX;
    if (startX - endX > 50) nextImage();
    if (endX - startX > 50) prevImage();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") prevImage();
    if (!thumbnailContainer) return;

    const step = 50; // Adjust scrolling speed

    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft":
        event.preventDefault(); // Prevent default horizontal scrolling
        thumbnailContainer.scrollBy({
          top: event.key === "ArrowRight" ? step : -step,
          behavior: "smooth",
        });
        break;
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        thumbnailContainer.scrollBy({
          top: event.key === "ArrowDown" ? step : -step,
          behavior: "smooth",
        });
        break;
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });
</script>

<section class="py-24 relative overflow-hidden">
  <div class="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
    <div class="flex flex-col-reverse lg:flex-row gap-8 mx-auto">
      <div class="slider-box flex flex-col xl:flex-row gap-8 w-full">
        <div
          class="box xl:w-[1062px] w-full relative h-[627px] rounded-3xl overflow-hidden"
          on:touchstart={handleTouchStart}
          on:touchend={handleTouchEnd}
        >
          <img
            src={images[selectedImageIndex]}
            alt="Gallery image"
            class="absolute inset-0 w-full h-full rounded-3xl object-cover transition-opacity duration-500"
            in:fade
            out:fade
          />
        </div>

        <div
          bind:this={thumbnailContainer}
          class="xl:w-[126px] w-full flex lg:flex-col lg:overflow-y-auto lg:max-h-[627px] sm:flex-row overflow-x-auto max-w-full items-center gap-4 sm:mt-4 lg:mt-0 overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300"
        >
          {#each images as img, i}
            <div
              class="w-[90px] h-[90px] sm:w-[126px] sm:h-[126px] flex-shrink-0 rounded-2xl border-2 cursor-pointer transition-all duration-300"
              class:selected={selectedImageIndex === i}
              on:click={() => selectImage(i)}
              style="border-color: {selectedImageIndex === i
                ? 'rgb(79,70,229)'
                : 'transparent'}"
            >
              <img
                src={img}
                alt="Gallery image"
                class="w-full h-full rounded-2xl object-cover"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .selected {
    border: 2px solid rgb(79, 70, 229);
    border-radius: 12px;
  }

  @media (max-width: 1280px) {
    .flex.flex-col-reverse.lg\:flex-row {
      flex-direction: column;
    }
    .slider-box {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .lg\:max-h-\[627px\] {
      max-height: unset;
    }
    .lg\:overflow-y-auto {
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .xl\:w-\[126px\] {
      width: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      overflow-x: auto;
      scroll-behavior: smooth;
    }
  }

  /* Hide scrollbar but show on scroll */
  ::-webkit-scrollbar {
    height: 4px;
    width: 6px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar:hover {
    opacity: 1;
  }
</style>
