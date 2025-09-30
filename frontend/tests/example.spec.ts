import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:4200';

test.describe('E2E Login and Navbar Tests', () => {


  // Customer Tests

  test('Customer login should show customer navbar links', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.fill('input[type="email"]', 'customer1@gmail.com');
    await page.fill('input[type="password"]', '1234');
    await page.click('button:has-text("Login")');

    await expect(page).toHaveURL(/.*customer/);

    // Navbar links
    await expect(page.getByRole('link', { name: 'Policies', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'My Policies', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Claims', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Payments', exact: true })).toBeVisible();

    // Logout
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL(/.*login/);
  });

  test('Customer login invalid credentials', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.fill('input[type="email"]', 'customer1@gmail.com');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button:has-text("Login")');

    // Expect error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  // Agent Tests

  test('Agent login should show agent navbar links', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.fill('input[type="email"]', 'agent@gmail.com');
    await page.fill('input[type="password"]', '1234');
    await page.click('button:has-text("Login")');

    await expect(page).toHaveURL(/.*agent/);

    // Navbar links
    await expect(page.getByRole('link', { name: 'customers', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Claims', exact: true })).toBeVisible();

    // Logout
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL(/.*login/);
  });

  test('Agent login invalid credentials', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.fill('input[type="email"]', 'agent@gmail.com');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button:has-text("Login")');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });


  // Admin Tests

  test('Admin login should show admin navbar links', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.fill('input[type="email"]', 'admin@gmail.com');
    await page.fill('input[type="password"]', '1234');
    await page.click('button:has-text("Login")');

    await expect(page).toHaveURL(/.*admin/);

    // Navbar links
    await expect(page.getByRole('link', { name: 'Policies', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Agents', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Customers', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Claims', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Payments', exact: true })).toBeVisible();

    // Logout
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL(/.*login/);
  });

  test('Admin login invalid credentials', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.fill('input[type="email"]', 'admin@gmail.com');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button:has-text("Login")');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });


  // Navigation / Other Checks

  test('Redirect to login when accessing customer page without login', async ({ page }) => {
    await page.goto(`${baseUrl}/customer`);
    await expect(page).toHaveURL(/.*login/);
  });

  test('Redirect to login when accessing agent page without login', async ({ page }) => {
    await page.goto(`${baseUrl}/agent`);
    await expect(page).toHaveURL(/.*login/);
  });

  test('Redirect to login when accessing admin page without login', async ({ page }) => {
    await page.goto(`${baseUrl}/admin`);
    await expect(page).toHaveURL(/.*login/);
  });

  test('Customer cannot see agent/admin links', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', 'customer1@gmail.com');
    await page.fill('input[type="password"]', '1234');
    await page.click('button:has-text("Login")');

    await expect(page.locator('text=Agents')).not.toBeVisible();
    await expect(page.locator('text=Customers')).not.toBeVisible();
    await expect(page.locator('text=Payments')).toBeVisible(); 

    await page.click('button:has-text("Logout")');
  });

});
