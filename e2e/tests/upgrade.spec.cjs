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
      return route.fulfill({json: {user: {email: 'upgrade@example.com', token: 'upgrade-test-token', roles: []}}});
    }
    if (pathname.endsWith('/v2/shoppinglist')) return route.fulfill({json: {list_of_lists: [
      {list_id: '101', name: 'Upgrade groceries', item_count: 3, is_starter_list: false}
    ]}});
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
