<script lang="ts">
    import { onMount } from "svelte";
    import GameCard from "./GameCard.svelte";
    import GameFilters from "./GameFilters.svelte";
    import LoadingSkeleton from "./LoadingSkeleton.svelte";
    import ErrorMessage from "./ErrorMessage.svelte";
    import EmptyState from "./EmptyState.svelte";

    interface Game {
        id: number;
        title: string;
        description: string;
        publisher_name?: string;
        category_name?: string;
    }

    interface Publisher {
        id: number;
        name: string;
    }

    interface Category {
        id: number;
        name: string;
    }

    let { games = $bindable([]) }: { games?: Game[] } = $props();
    let loading = $state(true);
    let error = $state<string | null>(null);
    let publishers = $state<Publisher[]>([]);
    let categories = $state<Category[]>([]);
    let selectedPublisherId = $state<number | null>(null);
    let selectedCategoryId = $state<number | null>(null);

    const fetchGames = async () => {
        loading = true;
        try {
            // Build URL with filter parameters
            const params = new URLSearchParams();
            if (selectedPublisherId !== null) {
                params.append('publisher_id', selectedPublisherId.toString());
            }
            if (selectedCategoryId !== null) {
                params.append('category_id', selectedCategoryId.toString());
            }
            
            const url = params.toString() ? `/api/games?${params}` : '/api/games';
            const response = await fetch(url);
            if(response.ok) {
                games = await response.json();
            } else {
                error = `Failed to fetch data: ${response.status} ${response.statusText}`;
            }
        } catch (err) {
            error = `Error: ${err instanceof Error ? err.message : String(err)}`;
        } finally {
            loading = false;
        }
    };

    const fetchFilterOptions = async () => {
        try {
            const [publishersRes, categoriesRes] = await Promise.all([
                fetch('/api/publishers'),
                fetch('/api/categories')
            ]);
            
            if (publishersRes.ok) {
                publishers = await publishersRes.json();
            }
            if (categoriesRes.ok) {
                categories = await categoriesRes.json();
            }
        } catch (err) {
            console.error('Failed to fetch filter options:', err);
        }
    };

    onMount(() => {
        fetchFilterOptions();
        fetchGames();
    });
</script>

<div>
    <h2 class="text-2xl font-medium mb-6 text-slate-100">Featured Games</h2>
    
    <GameFilters
        {publishers}
        {categories}
        bind:selectedPublisherId
        bind:selectedCategoryId
        onFilterChange={fetchGames}
    />
    
    {#if loading}
        <LoadingSkeleton count={6} />
    {:else if error}
        <ErrorMessage error={error} />
    {:else if games.length === 0}
        <EmptyState message="No games match your filters." />
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="games-grid">
            {#each games as game (game.id)}
                <GameCard {game} />
            {/each}
        </div>
    {/if}
</div>