import { Page } from '@playwright/test';
class PaginationHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getAllPages(): Promise<number> {
        const pages = await this.page.$$('.pagination li:not(.next):not(.prev)');
        return pages.length;
    }

    async getCurrentPage(): Promise<string> {
        return await this.page.locator('.pagination li.active').innerText();
    }

    async goToPage(pageNumber: number): Promise<boolean> {
        try {
            await this.page.waitForSelector('.pagination');
            const pageLink = this.page.locator(`.pagination li a:text("${pageNumber}")`);
            
            if (await pageLink.isVisible()) {
                await pageLink.click();
                await this.page.waitForLoadState('networkidle');
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Failed to navigate to page ${pageNumber}:`, error);
            return false;
        }
    }

    async iterateAllPages(callback: (pageNumber: number) => Promise<void>): Promise<void> {
        try {
            const totalPages = await this.getAllPages();
            
            for (let i = 1; i <= totalPages; i++) {
                if (await this.goToPage(i)) {
                    await callback(i);
                }
            }
        } catch (error) {
            console.error('Error during pagination:', error);
            throw error;
        }
    }

    async hasNextPage(): Promise<boolean> {
        const nextButton = this.page.locator('.pagination li.next:not(.disabled)');
        return await nextButton.isVisible();
    }

    async clickNextPage(): Promise<boolean> {
        if (await this.hasNextPage()) {
            await this.page.click('.pagination li.next a');
            await this.page.waitForLoadState('networkidle');
            return true;
        }
        return false;
    }
}

export default PaginationHelper;
