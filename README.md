# SCL Gifts

Gifting storefront for Strategic Communication Lab. Recipients browse the collection, pick gifts (with size, color and other options), and submit a selection with their contact details, shipping address and best delivery date. There are no prices and no payment.

Live: https://gifts.scl.us.com (once DNS is set; until then https://ayalmeyers.github.io/scl-gifts/)

## Files

```
index.html          page shell
css/store.css       styles (SCL navy #22428f, sky #4395d1, EB Garamond throughout)
js/config.js        campaign copy, order endpoint, limits  <- edit this
js/products.js      the catalog                            <- edit this
js/app.js           storefront logic
images/products/    product photos
assets/, fonts/     SCL logo, favicons, self-hosted fonts
```

No build step. Plain HTML/CSS/JS served by GitHub Pages.

## Adding gifts and photos

1. Put photos in `images/products/` (JPG or WebP, about 1200 px on the long edge, 4:5 portrait crops look best).
2. In `js/products.js`, add or edit an entry and list its photos in `images`. The first photo is the cover.
3. Options such as `Size` and `Color` land in their own Excel columns. Any other option (Scent, Style…) goes to `Other Options`.
4. `personalize` adds a free-text field (monogram, name) that lands in the `Personalization` column.

Items without photos show a branded placeholder.

## Where orders go

Each submission is sent two ways at once:

1. **Excel** — `orderEndpoint` in `js/config.js` is a Power Automate "When an HTTP request is received" flow. It writes one row per item to the `GiftOrders` table in `SCL Gift Orders.xlsx` (SharePoint · OPERATIONS · Documents/General/Gifts).
2. **Email** — every order is emailed through FormSubmit to `notifyEmail` (admin@scl.us.com) with a cc to `ccEmails` (ameyers@scl.us.com). The Power Automate flow "SCL Gifts - Orders to Excel" watches the ameyers@ inbox for subject "Gift selection SCL-" and adds one row per item to the GiftOrders table in SharePoint OPERATIONS › General › Gifts › SCL Gift Orders.xlsx.

If both channels fail, the guest sees an error with a pre-filled email link, and their cart and form are kept.

### Payload

The flow receives JSON with the full order (`customer`, `shipping`, `delivery`, `items`) plus `rows`, an array already flattened to the Excel columns:

Order ID · Submitted At · Campaign · Line · Total Lines · SKU · Item · Category · Size · Color · Other Options · Personalization · Quantity · First Name · Last Name · Email · Phone · Company · Job Title · Ship To Name · Address Line 1 · Address Line 2 · City · State / Region · Postal Code · Country · Address Type · Full Address · Best Delivery Date · Date Flexible · Delivery Instructions · Notes · Order Summary · Invite Ref · Status

## Personal invite links

Add query parameters to prefill the guest's details and tag the order:

```
https://gifts.scl.us.com/?name=Jane%20Doe&email=jane@acme.com&company=Acme&ref=acme-2026
```

`ref` lands in the `Invite Ref` column. Parameters: `name` (or `first` + `last`), `email`, `company`, `ref`.

## Settings (`js/config.js`)

- `campaignName`, `eyebrow`, `headline`, `intro` — copy
- `maxItems` — total items a guest may choose (0 = unlimited)
- `maxQtyPerItem` — per-item quantity cap
- `minLeadDays` — earliest delivery date offered, in days from today

## Custom domain

DNS at the scl.us.com registrar: `gifts` CNAME → `ayalmeyers.github.io`. Then the repo's `CNAME` file holds `gifts.scl.us.com`, and "Enforce HTTPS" is turned on in Settings → Pages.
