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

## Catalog

`js/products.js` holds 40 gifts: the 5 SCL apparel items that were already here (local photos) and the 35 items from the SCL Gifting 2026 store (scl-gifting-2026.checkoutstores.com). Every color of every store item is listed, with sizes where the item has them. Prices are not stored anywhere. Store items load their photos from that store's image host, one photo per color, and the photo changes when a guest picks a color. If the store is closed later, download the photos into `images/products/` and point `images` and `colorImages` at them.

The six placeholder items that used to follow the sample marker (quarter-zip, tumbler, journal, weekender, candle, charger) were removed.

## Logo thread (embroidered garments)

The SCL logo is embroidered in SCL blue, and the blue in the SCL letters must be filled in dense and solid. Dark garments also offer white thread. Set `threadChoice: true` on a garment and the form shows "Logo thread" once a dark color is picked (dark colors match `darkColorPattern` in `js/config.js`). The choice lands in `Other Options` in Excel. Light garments always record "SCL blue".

Open decision: Farhad has not yet signed off on a non-gradient logo file for embroidery. Send the vendor the approved flat-color file before the first order.

## Adding gifts and photos

1. Put photos in `images/products/` (JPG or WebP, about 1200 px on the long edge, 4:5 portrait crops look best).
2. In `js/products.js`, add or edit an entry and list its photos in `images`. The first photo is the cover.
3. Options such as `Size` and `Color` land in their own Excel columns. Any other option (Scent, Style…) goes to `Other Options`.
4. `personalize` adds a free-text field (monogram, name) that lands in the `Personalization` column.

Items without photos show a branded placeholder.

## Where orders go

Each submission is sent two ways at once:

1. **Excel (optional direct feed)** — `orderEndpoint` in `js/config.js` is left empty. It can point to a Power Automate "When an HTTP request is received" flow if the org ever allows anonymous triggers; until then the email route below feeds Excel.
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
