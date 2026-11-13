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

  // Where submitted orders go. Paste the Power Automate
  // "When an HTTP request is received" URL here. Each order is written
  // to the GiftOrders table in Excel, one row per item.
  orderEndpoint: "",

  // Backup + notification channel. Every order is also emailed here
  // through FormSubmit, so nothing is lost if the Excel flow is down.
  // Leave "" to turn email copies off.
  notifyEmail: "admin@scl.us.com",

  // Shown to guests who need help.
  contactEmail: "admin@scl.us.com",

  // Total number of items a guest may choose (0 = no limit).
  maxItems: 0,
  // Highest quantity selectable for a single item.
  maxQtyPerItem: 3,

  // Earliest preferred delivery date offered, in days from today.
  minLeadDays: 7
};
