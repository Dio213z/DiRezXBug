import asyncio
from playwright.async_api import async_playwright
import json
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Create a local server to serve the files
        # We'll use a simple file path for now since it's a static site
        page = await browser.new_page()

        file_path = f"file://{os.getcwd()}/index.html"
        await page.goto(file_path)

        # 1. Test clicking without target (should return early)
        console_logs = []
        page.on("console", lambda msg: console_logs.append(msg.text))

        await page.click(".execute-btn")

        # Check for error message in terminal
        await page.wait_for_function('document.getElementById("result").innerText === "Masukkan Nomor Target!"')

        assert "EXECUTE CLICKED" in console_logs
        # Since it returns early, there should NOT be a second log with SENDING PAYLOAD
        assert not any("SENDING PAYLOAD" in log for log in console_logs)

        # 2. Test successful execution
        # Mock the fetch
        await page.route("http://127.0.0.1:5000/execute", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps({"status": "ok"})
        ))

        await page.fill("#target", "628123456789")
        await page.click(".execute-btn")

        # Wait for terminal update
        await page.wait_for_function('document.getElementById("result").innerText.includes("Berhasil dikirim ke userbot") || document.getElementById("result").innerText === "ok"')

        assert "EXECUTE CLICKED" in console_logs
        # Check for SENDING PAYLOAD log
        any_data_log = any("SENDING PAYLOAD" in log and "628123456789" in log for log in console_logs)
        assert any_data_log

        # 3. Test failure execution
        await page.route("http://127.0.0.1:5000/execute", lambda route: route.abort("failed"))
        await page.click(".execute-btn")

        await page.wait_for_function('document.getElementById("result").innerText.includes("Koneksi ke userbot gagal")')

        print("All Playwright tests passed!")
        await page.screenshot(path="verification.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
