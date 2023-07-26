const { test, expect } = require('@playwright/test');
const assert = require('assert')

	test('Should have title', async ({ page }) => {
		await page.goto('https://automationbookstore.dev/')
		assert.equal(await page.innerText('#page-title'), 'Automation Bookstore')
	})

	test('should return one book when exact title is given', async ({ page }) => {
		await page.goto('https://automationbookstore.dev/')
		await page.fill('#searchBar', 'Agile Testing')
		await page.waitForSelector('li.ui-screen-hidden', { state: 'attached' })

		const visibleBooksSelector = 'li:not(.ui-screen-hidden)'
		const visibleBooks = await page.$$(visibleBooksSelector)
		assert.equal(visibleBooks.length, 1)
		assert.equal(await page.innerText(visibleBooksSelector + ' >> h2'), 'Agile Testing')
	})

	test('should return multiple books when partial title is given', async ({ page }) => {
		await page.goto('https://automationbookstore.dev/')
		await page.fill('#searchBar', 'test')
		await page.waitForSelector('li.ui-screen-hidden', { state: 'attached' })

		const expectedBooks = [
			'Test Automation in the Real World',
			'Experiences of Test Automation',
			'Agile Testing',
			'How Google Tests Software',
			'Java For Testers']

		const visibleBooksSelector = 'li:not(.ui-screen-hidden)'
		const visibleBooks = await page.$$(visibleBooksSelector)
		assert.equal(visibleBooks.length, expectedBooks.length)
		expectedBooks.forEach(book => async () => {
			assert.equal(await page.innerText(visibleBooksSelector + ' >> h2'), book)
		})
	})