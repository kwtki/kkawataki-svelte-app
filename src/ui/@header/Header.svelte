<script lang="ts">
    import { goto } from "$app/navigation";

    import Transition from "svelte-transition";
    import { createDialog } from "svelte-headlessui";
    import { MenuItems } from "./store";

    const dialog = createDialog({ label: "Open Menu Item" });

    const goToPage = (path: string) => {
        goto(path);
        dialog.close()
    };

</script>

<header class="sticky z-50 bg-white dark:bg-black" style="position: sticky; top: 0;">

    <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
    >
        <div class="flex lg:flex-1">
            <a href="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img
                    class="h-8 w-auto"
                    src={"/favicon.png"}
                    alt=""
                />
            </a>
        </div>
        <div class="flex lg:hidden">
            <button
                type="button"
                class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                on:click={dialog.open}
            >
                <span class="sr-only">Open main menu</span>
                <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
            {#each MenuItems as item}
                <button
                    on:click={() => {goToPage(item.href)}}
                    class="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                    >{item.name}</button
                >
            {/each}
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
            <!-- <ThemeSetting /> -->
        </div>
    </nav>


    <!-- Mobile menu, show/hide based on menu open state. -->
    <Transition show={$dialog.expanded} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
        <!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
        <button
            type="button"
            class="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity"
            on:click={dialog.close}
            on:keydown={(e) => e.key === 'Escape' && dialog.close()}
            aria-label="Close menu"
            role="dialog"
        ></button>
    </Transition>

    <Transition show={$dialog.expanded} enter="ease-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="ease-in duration-200" leaveFrom="translate-x-0" leaveTo="translate-x-full">
        <div class="fixed inset-y-0 right-0 z-10 w-[90%] overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
                <button on:click={() => goToPage("/")} class="-m-1.5 p-1.5">
                    <span class="sr-only">Your Company</span>
                    <img class="h-8 w-auto" src={"/favicon.png"} alt="" />
                </button>
                <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" on:click={dialog.close}>
                    <span class="sr-only">Close menu</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="mt-6 flow-root">
                <div class="-my-6 divide-y divide-gray-500/10">
                    <div class="space-y-2 py-6">
                        {#each MenuItems as item}
                            <button on:click={() => {goToPage(item.href)}} class="w-full text-left">
                                <span class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                                    {item.name}
                                </span>
                            </button>
                        {/each}
                    </div>
                    <div class="py-6">
                        <slot name="slot-2"/>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</header>
