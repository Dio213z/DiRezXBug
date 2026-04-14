import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Load the local index.html
        path = os.path.abspath('index.html')
        await page.goto(f'file://{path}')

        # 1. Initial State
        await page.screenshot(path='/home/jules/verification/initial_state.png', full_page=True)

        # 2. Empty Target Error
        await page.click('text=Execute')
        await page.wait_for_timeout(500)
        await page.screenshot(path='/home/jules/verification/empty_target_error.png', full_page=True)

        # 3. Success execution (Mocked success response)
        # We need to mock the fetch call because we don't have a real backend running
        await page.route("**/execute", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"status": "success", "message": "Berhasil dikirim ke userbot"}'
        ))

        await page.fill('#target', '628123456789')
        await page.click('text=Execute')
        await page.wait_for_timeout(1000)
        await page.screenshot(path='/home/jules/verification/success_execution.png', full_page=True)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
