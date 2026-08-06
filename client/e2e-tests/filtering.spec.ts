import { test, expect } from '@playwright/test';

test.describe('Game Filtering Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('games-grid')).toBeVisible();
  });

  test('should display filter controls on the page', async ({ page }) => {
    await test.step('Verify filter container is visible', async () => {
      await expect(page.getByTestId('game-filters')).toBeVisible();
    });

    await test.step('Verify publisher filter dropdown is available', async () => {
      const publisherFilter = page.getByTestId('publisher-filter');
      await expect(publisherFilter).toBeVisible();
      await expect(page.getByLabel('Publisher')).toBeVisible();
    });

    await test.step('Verify category filter dropdown is available', async () => {
      const categoryFilter = page.getByTestId('category-filter');
      await expect(categoryFilter).toBeVisible();
      await expect(page.getByLabel('Category')).toBeVisible();
    });
  });

  test('should filter games by publisher', async ({ page }) => {
    const initialGameCount = await page.getByTestId('game-card').count();

    await test.step('Select a publisher from the dropdown', async () => {
      const publisherFilter = page.getByTestId('publisher-filter');
      await publisherFilter.selectOption({ index: 1 });
    });

    await test.step('Verify games are filtered', async () => {
      // Wait for games grid to be visible after filter
      await expect(page.getByTestId('games-grid')).toBeVisible();
      const filteredGameCount = await page.getByTestId('game-card').count();
      expect(filteredGameCount).toBeLessThanOrEqual(initialGameCount);
      expect(filteredGameCount).toBeGreaterThan(0);
    });
  });

  test('should filter games by category', async ({ page }) => {
    const initialGameCount = await page.getByTestId('game-card').count();

    await test.step('Select a category from the dropdown', async () => {
      const categoryFilter = page.getByTestId('category-filter');
      await categoryFilter.selectOption({ index: 1 });
    });

    await test.step('Verify games are filtered', async () => {
      // Wait for games grid to be visible after filter
      await expect(page.getByTestId('games-grid')).toBeVisible();
      const filteredGameCount = await page.getByTestId('game-card').count();
      expect(filteredGameCount).toBeLessThanOrEqual(initialGameCount);
      expect(filteredGameCount).toBeGreaterThan(0);
    });
  });

  test('should filter games by both publisher and category', async ({ page }) => {
    await test.step('Select a publisher from the dropdown', async () => {
      const publisherFilter = page.getByTestId('publisher-filter');
      await publisherFilter.selectOption({ index: 1 });
    });

    await test.step('Wait for publisher filter to apply', async () => {
      await expect(page.getByTestId('games-grid')).toBeVisible();
    });

    await test.step('Select a category from the dropdown', async () => {
      const categoryFilter = page.getByTestId('category-filter');
      await categoryFilter.selectOption({ index: 1 });
    });

    await test.step('Verify games are filtered by both criteria', async () => {
      // Wait for either games grid or empty state to appear after filter
      await expect(page.getByTestId('games-grid').or(page.getByText('No games match your filters'))).toBeVisible();
    });
  });

  test('should show clear filters button when filters are active', async ({ page }) => {
    await test.step('Verify clear button is not visible initially', async () => {
      await expect(page.getByTestId('clear-filters-button')).not.toBeVisible();
    });

    await test.step('Apply a filter', async () => {
      const publisherFilter = page.getByTestId('publisher-filter');
      await publisherFilter.selectOption({ index: 1 });
    });

    await test.step('Verify clear button appears', async () => {
      await expect(page.getByTestId('clear-filters-button')).toBeVisible();
    });
  });

  test('should clear all filters when clicking clear button', async ({ page }) => {
    const initialGameCount = await page.getByTestId('game-card').count();

    await test.step('Apply a filter', async () => {
      const publisherFilter = page.getByTestId('publisher-filter');
      await publisherFilter.selectOption({ index: 1 });
      await expect(page.getByTestId('clear-filters-button')).toBeVisible();
    });

    await test.step('Click clear filters button', async () => {
      await page.getByTestId('clear-filters-button').click();
    });

    await test.step('Verify all games are shown again', async () => {
      // Wait for games to reload
      await expect(page.getByTestId('games-grid')).toBeVisible();
      await expect(page.getByTestId('game-card')).toHaveCount(initialGameCount);
    });

    await test.step('Verify dropdowns are reset to default', async () => {
      const publisherFilter = page.getByTestId('publisher-filter');
      const categoryFilter = page.getByTestId('category-filter');
      await expect(publisherFilter).toHaveValue('');
      await expect(categoryFilter).toHaveValue('');
    });

    await test.step('Verify clear button is hidden', async () => {
      await expect(page.getByTestId('clear-filters-button')).not.toBeVisible();
    });
  });

  test('should have accessible filter controls', async ({ page }) => {
    await test.step('Verify publisher filter has accessible label', async () => {
      const publisherLabel = page.getByLabel('Publisher');
      await expect(publisherLabel).toBeVisible();
    });

    await test.step('Verify category filter has accessible label', async () => {
      const categoryLabel = page.getByLabel('Category');
      await expect(categoryLabel).toBeVisible();
    });

    await test.step('Verify filters can be keyboard navigated', async () => {
      const publisherFilter = page.getByTestId('publisher-filter');
      await publisherFilter.focus();
      await expect(publisherFilter).toBeFocused();
    });
  });
});
