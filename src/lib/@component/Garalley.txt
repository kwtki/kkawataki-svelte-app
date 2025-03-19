<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

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
      selectedImageIndex = (selectedImageIndex - 1 + images.length) % images.length;
      scrollThumbnails();
    }

    function scrollThumbnails() {
      if (thumbnailContainer) {
        const activeThumbnail = thumbnailContainer.children[selectedImageIndex] as HTMLDivElement;
        if (activeThumbnail) {
          thumbnailContainer.scrollTo({
            left: activeThumbnail.offsetLeft - (thumbnailContainer.clientWidth / 2) + (activeThumbnail.clientWidth / 2),
            top: activeThumbnail.offsetTop - (thumbnailContainer.clientHeight / 2) + (activeThumbnail.clientHeight / 2),
            behavior: 'smooth'
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
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextImage();
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') prevImage();
    }
    
    onMount(() => {
      window.addEventListener('keydown', handleKeydown);
      return () => window.removeEventListener('keydown', handleKeydown);
    });
  </script>
  
  <section class="relative overflow-hidden">
    <div class="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
      
      <div class="flex flex-col-reverse lg:flex-row gap-8 mx-auto">
        <div class="slider-box flex flex-col xl:flex-row gap-8 w-full">
          <div class="box xl:w-[1062px] w-full relative h-[627px] rounded-3xl overflow-hidden"
               on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
            <img src={images[selectedImageIndex]} alt="Gallery image" class="absolute inset-0 w-full h-full rounded-3xl object-cover transition-opacity duration-500" in:fade out:fade />
          </div>
          
          <div bind:this={thumbnailContainer} class="xl:w-[150px] w-full flex lg:flex-col lg:overflow-y-auto lg:max-h-[627px] sm:flex-row sm:overflow-x-auto sm:max-w-full items-center gap-4 sm:mt-4 lg:mt-0 overflow-auto w-full">
            {#each images as img, i}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div class="w-[90px] h-[90px] sm:w-[126px] sm:h-[126px] flex-shrink-0 rounded-2xl border-2 cursor-pointer transition-all duration-300"
                   class:selected={selectedImageIndex === i}
                   on:click={() => selectImage(i)}
                   style="border-color: {selectedImageIndex === i ? 'rgb(79,70,229)' : 'transparent'}">
                <!-- svelte-ignore a11y_img_redundant_alt -->
                <img src={img} alt="Gallery image" class="w-full h-full rounded-2xl object-cover" />
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
    
    @media (max-width: 1270px) {
      .lg\:flex-col {
        flex-direction: row;
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        display: flex;
        justify-content: center;
        scroll-behavior: smooth;
      }
    }
  </style>
