# Palette's Journal

## 2025-01-28 - Leaderboard Keyboard Accessibility
**Learning:** `tr` elements with `cursor: pointer` are often not accessible to keyboard users by default, effectively blocking them from core navigation.
**Action:** When making entire rows clickable for better mouse UX, always ensure they are focusable (`tabindex="0"`) and have keyboard event handlers (`keydown.enter`), or wrap the primary content in a link/button.
