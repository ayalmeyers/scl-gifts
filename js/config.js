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
  // to notifyEmail, copied to ccEmails. The "SCL Gifts - Orders to Excel"
  // Power Automate flow watches ameyers@scl.us.com and writes every order to
  // the GiftOrders table in "SCL Gift Orders.xlsx" (SharePoint ·
  // OPERATIONS · General/Gifts), one row per item.
  notifyEmail: "admin@scl.us.com",
  ccEmails: "ameyers@scl.us.com",

  // Optional direct endpoint (not used): a Power Automate HTTP trigger URL.
  orderEndpoint: "",

  // Shown to guests who need help.
  contactEmail: "admin@scl.us.com",

  // Total number of items a guest may choose (0 = no limit).
  maxItems: 0,
  // Highest quantity selectable for a single item.
  maxQtyPerItem: 3,

  // Earliest preferred delivery date offered, in days from today.
  minLeadDays: 7,

  // Logo thread on embroidered garments. The SCL blue is embroidered dense
  // and solid. Dark garments offer the choices below; light garments always
  // get the first one. Colors whose name matches darkColorPattern count as dark.
  threadOptions: ["SCL blue", "White"],
  threadNote: "The SCL logo is embroidered in SCL blue. On dark garments you can choose white thread instead.",
  darkColorPattern: "black|navy|charcoal|anthracite|dark|brown|cinder|graphite|olive|shady blue|asphalt|smoke|maritime|atlantic|grey heather"
};
