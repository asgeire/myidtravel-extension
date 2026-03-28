# myIDTravel Available Seats

Chrome extension that adds an **Available** row to flight load tables on [myIDTravel](https://www.myidtravel.com), showing `Capacity - Confirmed` per cabin at a glance.

## What it does

When you open a flight's detail modal, the extension automatically injects:
- An **Available** row after the Confirmed row (e.g. Bus: 8, Eco: 23)
- A **Total available** count below the table

The row is highlighted in green for quick scanning.

## Setup (Chrome Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked**
5. Select the `myidtravel-extension` folder
6. Navigate to [myIDTravel](https://www.myidtravel.com), log in, and open any flight's details

To update after code changes, click the reload icon on the extension card in `chrome://extensions`.
