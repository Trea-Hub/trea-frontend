# Responsive Audit

## Method

Audit the nine Stitch-converted pages against the app routes at these viewport sizes:

| Viewport | Size |
| --- | --- |
| Mobile | 375 x 812 |
| Tablet | 768 x 1024 |
| Desktop | 1280 x 800 |

Dynamic event routes use `/events/meridian-2025` as the representative event ID.

For each route, automated browser checks confirm that:

- `document.documentElement.scrollWidth` does not exceed `clientWidth`.
- The route renders meaningful content.
- The page is visually usable without clipped controls or overlapping content.

## Route and viewport results

| Route | Mobile 375px | Tablet 768px | Desktop 1280px |
| --- | --- | --- | --- |
| `/` | Passed | Passed | Passed |
| `/events/meridian-2025` | Passed | Passed | Passed |
| `/events/meridian-2025/gallery` | Passed | Passed | Passed |
| `/events/create` | Passed | Passed | Passed |
| `/dashboard/organiser` | Passed | Passed | Passed |
| `/dashboard/user` | Passed | Passed | Passed |
| `/events/meridian-2025/checkout` | Passed | Passed | Passed |
| `/events/meridian-2025/confirmation` | Passed | Passed | Passed |
| `/wallet/connect` | Passed | Passed | Passed |

All 27 page/viewport combinations passed the horizontal-overflow check.

## Fixed discrepancies

### Create event at 375px

The create-event page exceeded the mobile viewport width.

Fixes:

- Added horizontal overflow containment to the page.
- Constrained the bottom navigation to the full viewport width.
- Added `min-w-0` constraints to navigation items and native datetime-field containers.

### Checkout at 375px

The checkout grid and cards exceeded the mobile viewport width.

Fixes:

- Added horizontal overflow containment to the page.
- Added `min-w-0` constraints to the responsive grid and its primary content cards.

## Verification routes

| Page | Stitch reference | App route |
| --- | --- | --- |
| Homepage | `html_pages/homepage.html` | `/` |
| Event detail | `html_pages/event_page.html` | `/events/meridian-2025` |
| Gallery | `html_pages/event_photo_gallery.html` | `/events/meridian-2025/gallery` |
| Create event | `html_pages/create_event_form.html` | `/events/create` |
| Organizer dashboard | `html_pages/organiser_dashboard.html` | `/dashboard/organiser` |
| User dashboard | `html_pages/user_dashboard.html` | `/dashboard/user` |
| Checkout | `html_pages/registration_and_checkout.html` | `/events/meridian-2025/checkout` |
| Confirmation | `html_pages/registration_confirmation.html` | `/events/meridian-2025/confirmation` |
| Wallet connect | `html_pages/wallet_connect.html` | `/wallet/connect` |
