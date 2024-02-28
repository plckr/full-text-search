<script lang="ts">
  import '../app.css';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1 class="block w-fit text-2xl font-semibold md:mx-auto">Full Text Search</h1>

<form method="get" class="md:max-auto my-6 flex justify-between gap-4 border border-gray-600 p-2">
  <label class="flex max-w-[30rem] grow flex-col gap-2">
    <span class="font-medium">Procurar</span>
    <input
      type="search"
      data-sveltekit-keepfocus
      name="search"
      placeholder="Procurar"
      class="w-full bg-transparent"
    />
  </label>

  <button type="submit" class="w-fit">Submit</button>
</form>

<section class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
  {#each data.products as product}
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      class="border border-gray-600 p-2"
    >
      <p class="line-clamp-1 font-semibold">{product.name}</p>
      <p class="mt-3 line-clamp-3">{product.description}</p>
    </a>
  {/each}
</section>
