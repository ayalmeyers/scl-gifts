/* SCL Gifts — site configuration.
   Everything a non-developer may want to change lives here. */
window.SCL_GIFTS_CONFIG = {
  // Shown in the header tag, page title and every order row.
  campaignName: "SCL Gifts 2026",

  // Home page copy.
  eyebrow: "With gratitude from Strategic Communication Lab",
  headline: "A thank-you, chosen by you.",
  intro:
    "Thank you for a year of meaningful work together. Choose the gifts you would enjoy most, tell us where to send them, and we will take care of the rest.",

  // Where submitted orders go. Each order is emailed (through FormSubmit)
  // to notifyEmail, copied to ccEmails. The "SCL Gifts → Excel" Power
  // Automate flow watches notifyEmail's inbox and writes every order to
  // the GiftOrders table in "SCL Gift Orders.xlsx" (SharePoint ·
  // OPERATIONS · General/Gifts), one row per item.
  notifyEmail: "ameyers@scl.us.com",
  ccEmails: "admin@scl.us.com",

  // Optional direct endpoint (not used): a Power Automate HTTP trigger URL.
  orderEndpoint: "",

  // Shown to guests who need help.
  contactEmail: "admin@scl.us.com",

  // Total number of items a guest may choose (0 = no limit).
  maxItems: 0,
  // Highest quantity selectable for a single item.
  maxQtyPerItem: 3,

  // Earliest preferred delivery date offered, in days from today.
  minLeadDays: 7
};
