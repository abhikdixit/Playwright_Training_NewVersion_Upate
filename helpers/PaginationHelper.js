class PaginationHelper {
    constructor(page) {
        this.page = page;
    }

    async getAllPages() {
        const pages = await this.page.$$('.pagination li:not(.next):not(.prev)');
        return pages.length;
    }

    async getCurrentPage() {
        return await this.page.locator('.pagination li.active').innerText();
    }

    async goToPage(pageNumber) {
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

    async iterateAllPages(callback) {
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

    async hasNextPage() {
        const nextButton = this.page.locator('.pagination li.next:not(.disabled)');
        return await nextButton.isVisible();
    }

    async clickNextPage() {
        if (await this.hasNextPage()) {
            await this.page.click('.pagination li.next a');
            await this.page.waitForLoadState('networkidle');
            return true;
        }
        return false;
    }
}

module.exports = { PaginationHelper };
