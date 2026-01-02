from playwright.sync_api import sync_playwright

def verify_leaderboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the app
            page.goto("http://localhost:5173")

            # Wait for loading to finish and leaderboard to appear
            # The leaderboard table has a class 'leaderboard-table'
            page.wait_for_selector(".leaderboard-table", timeout=10000)

            # Check for the title
            title = page.locator("h1")
            print(f"Title found: {title.inner_text()}")

            # Check for recent activity
            page.wait_for_selector(".recent-activity-container")

            # Take a screenshot of the homepage
            page.screenshot(path="verification/home_page.png", full_page=True)
            print("Home page screenshot taken.")

            # Click on the first contestant to go to profile
            first_contestant = page.locator(".contestant-row").first
            first_contestant.click()

            # Wait for profile page
            page.wait_for_selector(".profile-info", timeout=5000)

            # Take screenshot of profile page
            page.screenshot(path="verification/profile_page.png", full_page=True)
            print("Profile page screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_leaderboard()
