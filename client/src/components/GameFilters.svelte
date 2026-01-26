<script lang="ts">
    interface Publisher {
        id: number;
        name: string;
    }

    interface Category {
        id: number;
        name: string;
    }

    let {
        publishers = [],
        categories = [],
        selectedPublisherId = $bindable<number | null>(null),
        selectedCategoryId = $bindable<number | null>(null),
        onFilterChange
    }: {
        publishers: Publisher[];
        categories: Category[];
        selectedPublisherId?: number | null;
        selectedCategoryId?: number | null;
        onFilterChange: () => void;
    } = $props();

    function handlePublisherChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        selectedPublisherId = target.value ? parseInt(target.value) : null;
        onFilterChange();
    }

    function handleCategoryChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        selectedCategoryId = target.value ? parseInt(target.value) : null;
        onFilterChange();
    }

    function clearFilters() {
        selectedPublisherId = null;
        selectedCategoryId = null;
        onFilterChange();
    }

    let hasActiveFilters = $derived(selectedPublisherId !== null || selectedCategoryId !== null);
</script>

<div class="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700" data-testid="game-filters">
    <div class="flex flex-wrap gap-4 items-end">
        <div class="flex-1 min-w-[200px]">
            <label for="publisher-filter" class="block text-sm font-medium text-slate-300 mb-2">
                Publisher
            </label>
            <select
                id="publisher-filter"
                class="w-full bg-slate-700 text-slate-100 rounded-lg px-3 py-2 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedPublisherId ?? ''}
                onchange={handlePublisherChange}
                data-testid="publisher-filter"
            >
                <option value="">All Publishers</option>
                {#each publishers as publisher (publisher.id)}
                    <option value={publisher.id}>{publisher.name}</option>
                {/each}
            </select>
        </div>

        <div class="flex-1 min-w-[200px]">
            <label for="category-filter" class="block text-sm font-medium text-slate-300 mb-2">
                Category
            </label>
            <select
                id="category-filter"
                class="w-full bg-slate-700 text-slate-100 rounded-lg px-3 py-2 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategoryId ?? ''}
                onchange={handleCategoryChange}
                data-testid="category-filter"
            >
                <option value="">All Categories</option>
                {#each categories as category (category.id)}
                    <option value={category.id}>{category.name}</option>
                {/each}
            </select>
        </div>

        {#if hasActiveFilters}
            <button
                onclick={clearFilters}
                class="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-slate-100 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500"
                data-testid="clear-filters-button"
            >
                Clear Filters
            </button>
        {/if}
    </div>
</div>
