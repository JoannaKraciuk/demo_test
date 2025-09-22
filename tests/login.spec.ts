import { test, expect } from '@playwright/test';

test.describe.only('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = 'Joanna10';
    const userPassword = '10987654';
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectUserId = 'Joa';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    // Act
  
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('login-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = 'Joanna10';
    const incorrectPassword = '1098';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    // Act
  
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
