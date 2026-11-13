/* SCL Gifts — catalog.
   One object per gift. To add photos, put the files in images/products/
   and list them in `images` (first image is the cover). Items without
   photos show a branded placeholder.

   Fields
     id            unique, lowercase, no spaces (becomes the SKU)
     name          display name
     category      used for the filter chips
     blurb         one line on the card
     description   paragraph on the detail view
     details       optional bullet list
     images        optional list of image paths
     options       optional choices, e.g. Size and Color. Each needs
                   { name, values: [...] }. Every option is required.
     personalize   optional free-text field, e.g. a monogram:
                   { label, placeholder, maxLength, required }
     soldOut       optional; true hides the Add button

   NOTE: the items below are SAMPLES so the store can be reviewed.
   Replace them with the real gifts. */
window.SCL_GIFTS_PRODUCTS = [
  {
    id: "quarter-zip",
    name: "Performance Quarter-Zip",
    category: "Apparel",
    blurb: "A soft, structured layer for the office or the airport.",
    description:
      "Midweight stretch knit with a brushed interior, finished with a subtle SCL mark at the chest.",
    details: ["Unisex fit", "Machine washable", "Embroidered SCL mark"],
    images: [],
    options: [
      { name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"] },
      { name: "Color", values: ["Navy", "Heather Grey", "Black"] }
    ]
  },
  {
    id: "tumbler",
    name: "Insulated Tumbler",
    category: "Everyday",
    blurb: "Keeps coffee hot through the longest meeting.",
    description:
      "Double-wall stainless steel, 16 oz, with a leak-resistant lid that fits standard cup holders.",
    details: ["16 oz", "Hot 6 hrs / cold 24 hrs", "Dishwasher-safe lid"],
    images: [],
    options: [{ name: "Color", values: ["Navy", "Sky", "White"] }]
  },
  {
    id: "leather-journal",
    name: "Leather Journal",
    category: "Desk",
    blurb: "For the ideas worth writing down by hand.",
    description:
      "Full-grain leather cover with 192 pages of dotted, fountain-pen-friendly paper.",
    details: ["A5", "192 dotted pages", "Ribbon marker"],
    images: [],
    options: [{ name: "Color", values: ["Cognac", "Black"] }],
    personalize: {
      label: "Monogram",
      placeholder: "Up to 3 letters, e.g. AJM",
      maxLength: 3,
      required: false
    }
  },
  {
    id: "weekender",
    name: "Canvas Weekender",
    category: "Travel",
    blurb: "Built for a weekend away or a week of travel.",
    description:
      "Waxed canvas with leather handles, a padded laptop sleeve and a separate shoe compartment.",
    details: ["Fits carry-on limits", "Padded 15\" sleeve", "Detachable strap"],
    images: [],
    options: [{ name: "Color", values: ["Navy", "Olive", "Tan"] }]
  },
  {
    id: "candle",
    name: "Hand-Poured Candle",
    category: "Home",
    blurb: "A calm scent for the end of a long week.",
    description:
      "Coconut-soy wax in a reusable ceramic vessel, about 50 hours of burn time.",
    details: ["8 oz", "~50 hr burn", "Reusable vessel"],
    images: [],
    options: [{ name: "Scent", values: ["Cedar & Sage", "Fig & Amber", "Sea Salt"] }]
  },
  {
    id: "wireless-charger",
    name: "Wireless Charging Pad",
    category: "Desk",
    blurb: "One less cable on the desk.",
    description:
      "Fast wireless charging for phones and earbuds, wrapped in fabric with a walnut base.",
    details: ["15W fast charge", "USB-C cable included", "Walnut + fabric"],
    images: [],
    options: [{ name: "Color", values: ["Charcoal", "Sand"] }]
  }
];
