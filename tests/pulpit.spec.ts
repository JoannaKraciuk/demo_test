import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = 'Joanna10';
    const userPassword = '10987654';

    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('Quick payment with corret data', async ({ page }) => {
    //  Arrange
    const receiverId = '2';
    const transferAmound = '120';
    const transferTitle = 'Zwrot środków';
    const ExpectetTrensferReceiver = 'Chuck Demobankowy';

    //  Act
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').click();
    await page.locator('#widget_1_transfer_amount').fill(transferAmound);
    await page.locator('#widget_1_transfer_title').click();
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    //  Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${ExpectetTrensferReceiver} - ${transferAmound},00PLN - ${transferTitle}`,
    );
  });

  test('Successful mobile top-up', async ({ page }) => {
    //  Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '120';
    const transferTitle = 'Zwrot środków';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    //  Act
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    //  Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
