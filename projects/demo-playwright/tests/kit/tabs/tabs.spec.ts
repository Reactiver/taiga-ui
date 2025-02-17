import {TuiDocumentationPagePO, tuiGoto} from '@demo-playwright/utils';
import {expect, test} from '@playwright/test';

test.describe('Tabs', () => {
    test('no extra margin after the last tab', async ({page}) => {
        await page.setViewportSize({width: 1500, height: 500});
        await tuiGoto(page, '/navigation/tabs');

        const example = new TuiDocumentationPagePO(page).getExample('#complex');

        await example.scrollIntoViewIfNeeded();
        await expect(example).toHaveScreenshot('01-tabs-1.png');
        await page.locator('button:has-text("Collaborators")').click();
        await expect(example).toHaveScreenshot('01-tabs-2.png');
        await page.locator('button:has-text("Neil Innes")').click();
        await expect(example).toHaveScreenshot('01-tabs-3.png');
        await page.setViewportSize({width: 560, height: 500});
        await expect(example).toHaveScreenshot('01-tabs-4.png');
        await example.locator('tui-tabs-with-more .t-more_wrapper:visible').click();
        await expect(example).toHaveScreenshot('01-tabs-5.png');
        await page.locator('button:has-text("John Cleese")').nth(1).focus();
        await page.keyboard.down('Enter');
        await expect(example).toHaveScreenshot('01-tabs-6.png');
        await example.locator('tui-tabs-with-more .t-more_wrapper:visible').click();
        await page.locator('button:has-text("Collaborators")').nth(1).focus();
        await page.keyboard.down('Enter');
        await expect(example).toHaveScreenshot('01-tabs-7.png');
        await page.locator('button:has-text("Neil Innes")').nth(0).focus();
        await page.keyboard.down('Enter');
        await expect(example).toHaveScreenshot('01-tabs-8.png');
    });

    test.describe('API', () => {
        [-2, -1, 0, 1, 2, 3, 4, 5, 100, 1000].forEach(index => {
            test(`clamp active activeItemIndex=${index}`, async ({page}) => {
                await tuiGoto(
                    page,
                    `/navigation/tabs/API?tuiMode=null&activeItemIndex=${index}`,
                );
                await expect(
                    new TuiDocumentationPagePO(page).apiPageExample,
                ).toHaveScreenshot(`02-tabs-activeItemIndex-${index}.png`);
            });
        });
    });
});
