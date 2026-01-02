from playwright.sync_api import sync_playwright

def verify_images(page):
    # Navigate to the home page
    page.goto("http://localhost:5173/2025-Dogs-Scoreboard/")

    # Wait for the leaderboard to load
    page.wait_for_selector(".leaderboard-table")

    # Check image src in the leaderboard
    images = page.locator(".profile-thumb")
    count = images.count()
    print(f"Found {count} images in leaderboard")

    if count > 0:
        src = images.first.get_attribute("src")
        print(f"First image src: {src}")

    # Take a screenshot of leaderboard
    page.screenshot(path="verification/leaderboard.png")

    # Navigate to a contestant page
    # Find a link to a contestant and click it
    page.click(".contestant-row:first-child")

    # Wait for profile to load
    page.wait_for_selector(".profile-image")

    # Check image src in profile
    profile_image = page.locator(".profile-image")
    src = profile_image.get_attribute("src")
    print(f"Profile image src: {src}")

    # Take a screenshot of profile
    page.screenshot(path="verification/profile.png")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        verify_images(page)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()
