const {test, expect} = require('@playwright/test');

test.beforeEach(async ({page}) => {
  await page.route('**/assets/config/config.json', route => route.fulfill({json: {
    apiUrl: 'http://127.0.0.1:4201/test-api/',
    celebrationUrl: 'http://127.0.0.1:4201/test-api/celebrations',
    appStoreLink: '#app-store', facebookLink: '#facebook', twitterLink: '#twitter'
  }}));
  await page.route('**/test-api/**', async route => {
    const pathname = new URL(route.request().url()).pathname;
    if (pathname.endsWith('/celebrations')) return route.fulfill({json: {celebrations: []}});
    if (pathname.endsWith('/auth') || pathname.endsWith('/auth/authenticate')) {
      if (pathname.endsWith('/auth')) expect(route.request().headers().authorization).toBeUndefined();
      return route.fulfill({json: {user: {email: 'upgrade@example.com', token: 'upgrade-test-token', roles: []}}});
    }
    if (pathname.endsWith('/v2/shoppinglist')) {
      expect(route.request().headers().authorization).toBe('Bearer upgrade-test-token');
      return route.fulfill({json: {list_of_lists: [
        {list_id: '101', name: 'Upgrade groceries', item_count: 3, is_starter_list: false}
      ]}});
    }
    if (pathname.endsWith('/auth/logout')) return route.fulfill({json: {}});
    throw new Error('Unmocked API request: ' + pathname);
  });
});

test('login validates empty input without sending credentials', async ({page}) => {
  const credentials = [];
  page.on('request', request => { if (request.url().endsWith('/test-api/auth')) credentials.push(request); });
  await page.goto('/user/login');
  await expect(page.getByPlaceholder('password', {exact: true})).toBeVisible();
  await page.getByRole('button', {name: 'Login', exact: true}).click();
  await expect(page.getByText('Emails are required, sleepyhead.')).toBeVisible();
  expect(credentials).toHaveLength(0);
});

test('login stores the session, renders lists, survives reload and logs out', async ({page}) => {
  await page.goto('/user/login');
  await page.locator('[formControlName="email"]').fill('upgrade@example.com');
  await page.getByPlaceholder('password', {exact: true}).fill('UpgradePassword123');
  await page.getByRole('button', {name: 'Login', exact: true}).click();
  await expect(page).toHaveURL(/\/lists\/manage$/);
  await expect(page.getByText('Upgrade groceries', {exact: true})).toBeVisible();
  if (process.platform === 'darwin') {
    await expect(page).toHaveScreenshot('lists.png', {fullPage: true, animations: 'disabled'});
  }
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('currentUser')).token)).toBe('upgrade-test-token');
  await page.reload();
  await expect(page.getByText('Upgrade groceries', {exact: true})).toBeVisible();
  const menuToggle = page.getByRole('button', {name: 'Toggle navigation'});
  if (await menuToggle.isVisible()) await menuToggle.click();
  await page.locator('#forcemenu [ngbDropdownToggle]').click();
  await page.getByText('logout', {exact: true}).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('currentUser'))).toBe(null);
});

test('forgot-password navigation preserves the entered email', async ({page}) => {
  await page.goto('/user/login');
  await page.locator('[formControlName="email"]').fill('upgrade@example.com');
  await page.getByText('Forgot Password', {exact: true}).click();
  await expect(page).toHaveURL(/\/user\/reset$/);
  await expect(page.locator('[formControlName="email"]')).toHaveValue('upgrade@example.com');
});

test('an expired API session returns to login and clears stored credentials', async ({page}) => {
  await page.goto('/user/login');
  await page.locator('[formControlName="email"]').fill('upgrade@example.com');
  await page.getByPlaceholder('password', {exact: true}).fill('UpgradePassword123');
  await page.getByRole('button', {name: 'Login', exact: true}).click();
  await expect(page.getByText('Upgrade groceries', {exact: true})).toBeVisible();
  await page.route('**/test-api/v2/shoppinglist', route => route.fulfill({status: 401, json: {}}));
  const expired = page.waitForResponse(response => response.url().endsWith('/test-api/v2/shoppinglist') && response.status() === 401);
  await page.reload();
  await expired;
  await expect(page).toHaveURL(/\/user\/login$/);
  await expect.poll(() => page.evaluate(() => localStorage.getItem('currentUser'))).toBe(null);
});

test('login layout baseline', async ({page}) => {
  await page.goto('/user/login');
  await expect(page.getByRole('button', {name: 'Login', exact: true})).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('login.png', {fullPage: true, animations: 'disabled'});
});

test('landing carousel, section scrolling and connect menu work', async ({page}) => {
  await page.goto('/home');
  await expect(page.getByRole('heading', {name: 'The List Shop', exact: true})).toBeVisible();
  await expect(page.locator('owl-carousel-o .owl-item.active')).not.toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  const mobileMenu = page.getByRole('button', {name: 'Toggle navigation'});
  if (await mobileMenu.isVisible()) await mobileMenu.click();
  await page.locator('app-header a[href="#about"]').click();
  await expect.poll(() => page.locator('#about').evaluate(element => Math.round(element.getBoundingClientRect().top))).toBe(80);
  await page.getByRole('button', {name: 'connect', exact: true}).click();
  await page.locator('app-header').getByRole('link', {name: 'sign in', exact: true}).click();
  await expect(page).toHaveURL(/\/user\/login$/);
  await expect(page.getByRole('button', {name: 'Login', exact: true})).toBeVisible();
});

test('shopping-list confirmation cancels and confirms deletion', async ({page}) => {
  let deleted = false;
  await page.route('**/test-api/v2/shoppinglist', route => route.fulfill({json: {
    list_of_lists: deleted ? [] : [{list_id: '101', name: 'Upgrade groceries', item_count: 3, is_starter_list: false}]
  }}));
  await page.route('**/test-api/v2/shoppinglist/101', route => {
    expect(route.request().method()).toBe('DELETE');
    deleted = true;
    return route.fulfill({json: {}});
  });
  await page.goto('/user/login');
  await page.locator('[formControlName="email"]').fill('upgrade@example.com');
  await page.getByPlaceholder('password', {exact: true}).fill('UpgradePassword123');
  await page.getByRole('button', {name: 'Login', exact: true}).click();
  await expect(page.getByText('Upgrade groceries', {exact: true})).toBeVisible();
  await page.getByText('delete', {exact: true}).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', {name: 'No', exact: true}).click();
  await expect(dialog).toHaveCount(0);
  expect(deleted).toBe(false);
  await page.getByText('delete', {exact: true}).click();
  await dialog.getByRole('button', {name: 'Yes', exact: true}).click();
  await expect(page.getByText('Upgrade groceries', {exact: true})).toHaveCount(0);
  await expect(dialog).toHaveCount(0);
  expect(deleted).toBe(true);
});

test('themed list switch and dish autocomplete preserve selection behavior', async ({page}, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const dish = {dish_id: '42', name: 'Carrot soup', tags: [], ingredients: [], ratings: []};
  const item = (id, name, crossed_off) => ({item_id: id, tag: {tag_id: id, name}, crossed_off,
    sources: [], details: [], used_count: 1});
  await page.route('**/test-api/v2/tag', route => route.fulfill({json: {tag_list: []}}));
  await page.route('**/test-api/v2/dish', route => route.fulfill({json: {dish_list: [dish]}}));
  await page.route('**/test-api/v2/shoppinglist/101', route => route.fulfill({json: {
    list_id: '101', name: 'Upgrade groceries', legend: [], is_starter_list: false,
    categories: [{name: 'Produce', items: [item('1', 'Carrot', false), item('2', 'Apple', true)]}]
  }}));
  let selectedDish = false;
  await page.route('**/test-api/v2/shoppinglist/101/dish/42', route => {
    expect(route.request().method()).toBe('POST');
    selectedDish = true;
    return route.fulfill({json: {}});
  });
  await page.goto('/user/login');
  await page.locator('[formControlName="email"]').fill('upgrade@example.com');
  await page.getByPlaceholder('password', {exact: true}).fill('UpgradePassword123');
  await page.getByRole('button', {name: 'Login', exact: true}).click();
  await page.goto('/lists/edit/101');
  await expect(page.getByText('Apple', {exact: true})).toBeVisible();
  const toggle = page.getByRole('switch');
  await expect(toggle).toBeChecked();
  await expect(page.locator('.p-toggleswitch-slider')).toHaveCSS('background-color', 'rgb(230, 125, 33)');
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).not.toBeChecked();
  await expect(page.getByText('Apple', {exact: true})).toHaveCount(0);
  await toggle.click();
  await expect(page.getByText('Apple', {exact: true})).toBeVisible();
  await page.getByText('Add Dish', {exact: true}).click();
  const input = page.locator('app-dish-select input');
  await input.fill('soup');
  const option = page.getByRole('option', {name: 'Carrot soup'});
  await expect(option).toBeVisible();
  const bounds = await option.boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width);
  const screenshotPath = testInfo.outputPath('primeng-list-controls.png');
  await page.screenshot({path: screenshotPath, fullPage: true, animations: 'disabled'});
  await testInfo.attach('primeng-list-controls', {path: screenshotPath, contentType: 'image/png'});
  await option.click();
  await expect.poll(() => selectedDish).toBe(true);
  expect(errors).toEqual([]);
});
