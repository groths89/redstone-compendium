import { test, expect } from '@playwright/test';

test.describe('Redstone Simulator & Gate API E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the simulator interface and available gates', async ({ page }) => {
     await expect(page).toHaveTitle(/Redstone/i);

     const andGate = page.locator('[data-gate-id="and-gate"]');
     await expect(andGate).toBeVisible();
     await expect(andGate.getByRole('heading', { name: 'AND Gate Circuit' })).toBeVisible();
     await expect(andGate.locator('[data-input="a"]')).toBeVisible();
     await expect(andGate.locator('[data-input="b"]')).toBeVisible();
     await expect(page.locator('[data-gate-id="xor-gate"]')).toBeVisible();
     await expect(page.locator('[data-gate-id="rs-nor-latch"]')).toBeVisible();
  });

  test('should evaluate an AND gate through the API when both inputs are active', async ({ page }) => {
     const andGate = page.locator('[data-gate-id="and-gate"]');
     const apiResponsePromise = page.waitForResponse((response) => {
       const request = response.request();
       if (!response.url().includes('/api/v1/components/simulate') || request.method() !== 'POST') {
         return false;
       }

       const payload = request.postDataJSON();
       return payload.componentId === 'and-gate' && payload.inputs?.a === 1 && payload.inputs?.b === 1;
     });

     await andGate.locator('[data-input="a"]').click();
     await andGate.locator('[data-input="b"]').click();

     const response = await apiResponsePromise;
     expect(response.status()).toBe(200);
     const responseData = await response.json();

     expect(responseData).toMatchObject({
       status: 'success',
       data: {
         componentId: 'and-gate',
         evaluation: 1,
         timing: {
           redstoneTicks: 2,
           gameTicks: 4,
         },
       },
     });

     await expect(andGate.locator('.output-val')).toHaveText('1 (HIGH)');
  });

  test('should display the AND gate redstone and game tick delays', async ({ page }) => {
     const andGate = page.locator('[data-gate-id="and-gate"]');

     const apiResponsePromise = page.waitForResponse((response) => {
       const request = response.request();
       if (!response.url().includes('/api/v1/components/simulate') || request.method() !== 'POST') {
         return false;
       }

       const payload = request.postDataJSON();
       return payload.componentId === 'and-gate' && payload.inputs?.a === 1 && payload.inputs?.b === 1;
     });

     await andGate.locator('[data-input="a"]').click();
     await andGate.locator('[data-input="b"]').click();

     const response = await apiResponsePromise;
     const responseData = await response.json();
     expect(responseData.data.timing).toMatchObject({
       redstoneTicks: 2,
       gameTicks: 4,
     });

     await expect(andGate.locator('.timing-val')).toContainText('2 RS Ticks / 4 Game Ticks');
  });
});