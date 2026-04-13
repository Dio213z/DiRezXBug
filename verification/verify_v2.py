import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Using a simple server to host the static files
        server_process = await asyncio.create_subprocess_shell(
            "python3 -m http.server 8000",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        await asyncio.sleep(2) # Wait for server to start

        page = await browser.new_page()
        await page.goto("http://localhost:8000")

        # 1. Verify Spam input is gone
        spam_input = await page.query_selector("#spam")
        print(f"Spam input found: {spam_input is not None}")

        # 2. Select a bug and execute
        await page.fill("#target", "628123456789")

        # Select "Bug Delay Hard"
        await page.click("text='Bug Delay Hard'")
        await asyncio.sleep(0.5)

        # Execute
        await page.click("text='EXECUTE'")
        await asyncio.sleep(1)

        # Verify terminal output
        result_text = await page.inner_text("#result")
        print("Terminal Output Snippet:")
        print(result_text[:200])

        # Take screenshot
        await page.screenshot(path="verification/final_vibe.png")

        await browser.close()
        server_process.terminate()

if __name__ == "__main__":
    asyncio.run(verify())
