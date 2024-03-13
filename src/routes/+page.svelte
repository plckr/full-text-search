<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import type { PageData } from './$types';
  import type { ActionReturn } from 'svelte/action';

  export let data: PageData;

  const autofocus = (node: HTMLElement): ActionReturn => {
    node.focus();

    return {};
  };
</script>

<h1 class="block w-fit text-2xl font-semibold md:mx-auto">Full Text Search</h1>

<form
  method="get"
  class="md:max-auto my-6 flex justify-between gap-4 rounded border bg-sky-100 p-2"
>
  <label class="flex max-w-[30rem] grow flex-col gap-2">
    <p class="p-2 font-medium">Search</p>
    <input
      use:autofocus
      type="search"
      data-sveltekit-keepfocus
      name="search"
      placeholder="Search"
      class="w-full rounded border bg-sky-50/50 p-2 outline-none ring-sky-200 focus-visible:ring"
      value={$page.url.searchParams.get('search')}
    />
  </label>

  <div class="flex flex-col gap-2">
    <select
      name="page"
      on:change={(evt) => {
        if (evt.target instanceof HTMLSelectElement) {
          evt.target.form?.requestSubmit();
        }
      }}
    >
      {#each Array(Math.ceil(data.count / data.perPage)) as _, idx}
        {@const cur = idx + 1}
        <option selected={cur === +($page.url.searchParams.get('page') || '1')} value={cur}>
          {cur}
        </option>
      {/each}
    </select>

    <button
      type="submit"
      class="h-fit w-fit self-end rounded border bg-sky-100 p-2 hover:bg-sky-200/50 active:bg-sky-200"
    >
      Submit
    </button>
  </div>
</form>

<section class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
  {#each data.products as product}
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      class="rounded border bg-sky-100 p-2 hover:bg-sky-200/50 active:bg-sky-200"
    >
      <p class="line-clamp-1 font-semibold">{product.name}</p>
      <p class="mt-3 line-clamp-3">{product.description}</p>
    </a>
  {/each}
</section>
