<script lang="ts">
  import '../app.css';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Welcome to Full Text Search</h1>

<label class="mx-auto my-6 flex max-w-[30rem] flex-col gap-2 rounded-md border border-gray-600 p-2">
  <span class="font-medium">Procurar</span>
  <input type="text" placeholder="Procurar" class="w-full bg-transparent" />
</label>

<section class="grid grid-cols-3 gap-4">
  {#each data.products as product}
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-lg border border-gray-600 p-2"
    >
      <p class="line-clamp-1 font-semibold">{product.name}</p>
      <p class="mt-3 line-clamp-3">{product.description}</p>
    </a>
  {/each}
</section>
