/* SCL Gifts — catalog.
   One entry per gift. Prices are never shown or stored.

   The catalog is the union of two sources:
     1. The five SCL apparel items that were already on this site
        (local photos in images/products/).
     2. The 35 items on the SCL Gifting 2026 store
        (scl-gifting-2026.checkoutstores.com). Their photos load from that
        store's image host, one photo per color.

   Fields
     id            unique, lowercase, no spaces (becomes the SKU)
     name          display name
     category      used for the filter chips
     blurb         one line on the card
     description   paragraph on the detail view
     details       optional bullet list
     images        list of image paths or URLs (first is the cover)
     colorImages   optional { colorName: imageUrl }. Choosing a color swaps the photo.
     options       optional choices, e.g. Size and Color. Each needs
                   { name, values: [...] }. Every option is required.
     threadChoice  true on embroidered garments. Dark colors then offer a
                   white-thread choice for the SCL logo (see config.js).
     personalize   optional free-text field: { label, placeholder, maxLength, required }
     soldOut       optional; true hides the Add button
*/
(function () {
  var STORE = "https://app.fulfillengine.com/images/da66b7cf-2899-4ee4-8261-8787719d048b/scl-gifting-2026/da66b7cf-2899-4ee4-8261-8787719d048b-";
  function img(f) { return STORE + f + "-product.png"; }

  var S5 = ["S", "M", "L", "XL", "XXL"];
  var S6 = ["S", "M", "L", "XL", "XXL", "3XL"];
  var S8 = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];
  var LOGO = "Decorated with the SCL logo.";

  function make(o) {
    var colors = o.colors || [];
    var p = {
      id: o.id,
      name: o.name,
      category: o.cat,
      blurb: o.blurb,
      description: o.desc + " " + LOGO,
      details: o.details || [],
      images: colors.map(function (c) { return img(c[1]); }),
      options: []
    };
    if (colors.length) {
      p.colorImages = {};
      colors.forEach(function (c) { p.colorImages[c[0]] = img(c[1]); });
      p.options.push({ name: "Color", values: colors.map(function (c) { return c[0]; }) });
    }
    if (o.sizes) p.options.push({ name: "Size", values: o.sizes });
    if (o.thread) p.threadChoice = true;
    return p;
  }

  var JV = "Jackets & Vests", FQ = "Fleece & Quarter-Zips", BG = "Bags", HD = "Home & Desk", AC = "Accessories";

  window.SCL_GIFTS_PRODUCTS = [
    /* ---- Items already on this site (local photos) ---- */
    {
      id: "eddie-bauer-womens-black-fleece-vest",
      name: "Eddie Bauer Womens Black Fleece Vest",
      category: JV,
      blurb: "Full-zip fleece vest with the SCL mark.",
      description: "A warm, packable fleece vest with zip hand pockets, embroidered with the SCL logo at the chest.",
      images: ["images/products/eddie-bauer-womens-black-fleece-vest.jpg"],
      threadChoice: true,
      options: [{ name: "Color", values: ["Black"] }, { name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"] }]
    },
    {
      id: "eddie-bauer-womens-gray-fleece-vest",
      name: "Eddie Bauer Womens Gray Fleece Vest",
      category: JV,
      blurb: "Full-zip fleece vest with the SCL mark.",
      description: "A warm, packable fleece vest with zip hand pockets, embroidered with the SCL logo at the chest.",
      images: ["images/products/eddie-bauer-womens-gray-fleece-vest.jpg"],
      options: [{ name: "Color", values: ["Gray"] }, { name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"] }]
    },
    {
      id: "nike-mens-black-grey-dri-fit-stretch-half-zip",
      name: "Nike Mens Black/Grey Dri-FIT Stretch 1/2-Zip",
      category: FQ,
      blurb: "Lightweight Dri-FIT half-zip with the SCL mark.",
      description: "A slim, stretch Dri-FIT pullover with a contrast collar, embroidered with the SCL logo at the chest.",
      images: ["images/products/nike-mens-black-grey-dri-fit-stretch-half-zip.jpg"],
      threadChoice: true,
      options: [{ name: "Color", values: ["Black / Grey"] }, { name: "Size", values: ["S", "M", "L", "XL", "XXL", "3XL"] }]
    },
    {
      id: "the-north-face-womens-dark-grey-heather-skyline-full-zip",
      name: "The North Face Womens Dark Grey Heather Skyline Full-Zip Fleece Jacket",
      category: FQ,
      blurb: "Soft full-zip fleece jacket with the SCL mark.",
      description: "A fitted full-zip fleece jacket with zip hand pockets, embroidered with the SCL logo at the chest.",
      images: ["images/products/the-north-face-womens-dark-grey-heather-skyline-full-zip.jpg"],
      threadChoice: true,
      options: [{ name: "Color", values: ["Dark Grey Heather"] }, { name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"] }]
    },
    {
      id: "the-north-face-womens-black-skyline-full-zip",
      name: "The North Face Womens Black Skyline Full-Zip Fleece Jacket",
      category: FQ,
      blurb: "Soft full-zip fleece jacket with the SCL mark.",
      description: "A fitted full-zip fleece jacket with zip hand pockets, embroidered with the SCL logo at the chest.",
      images: ["images/products/the-north-face-womens-black-skyline-full-zip.jpg"],
      threadChoice: true,
      options: [{ name: "Color", values: ["Black"] }, { name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"] }]
    }
  ].concat([
    /* ---- Items from the SCL Gifting 2026 store ---- */
    make({ id: "columbia-powder-lite-ii-vest", name: "Columbia Powder Lite II Vest", cat: JV,
      blurb: "Light insulated vest with thermal reflective lining.",
      desc: "An insulated, water-resistant vest that layers under or over almost anything.",
      details: ["100% polyester with recycled Thermarator insulation", "Omni-HEAT thermal reflective lining", "Omni-SHIELD repellency", "Zippered hand pockets, drawcord hem"],
      colors: [["Black", "7511916-front-black"], ["Collegiate Navy", "7027711-front-collegiate-navy"]], sizes: S6, thread: true }),
    make({ id: "the-north-face-ladies-everyday-insulated-vest", name: "The North Face Ladies Everyday Insulated Vest", cat: JV,
      blurb: "Baffled, wind-resistant vest.",
      desc: "A flexible, chill-fighting vest with classic baffles for everyday excursions.",
      details: ["WindWall recycled polyester taffeta shell with a water-repellent finish", "150 g Heatseeker synthetic insulation", "Secure-zip hand pockets"],
      colors: [["TNF Black", "6112912-front-tnf-black"]], sizes: S5, thread: true }),
    make({ id: "the-north-face-everyday-insulated-vest", name: "The North Face Everyday Insulated Vest", cat: JV,
      blurb: "Baffled, wind-resistant vest.",
      desc: "A flexible, chill-fighting vest with classic baffles and colorblocking for everyday excursions.",
      details: ["WindWall recycled polyester taffeta shell with a water-repellent finish", "150 g Heatseeker synthetic insulation", "Secure-zip hand pockets"],
      colors: [["Shady Blue", "5294388-front-shady-blue"], ["TNF Black", "5766302-front-tnf-black"]], sizes: S6, thread: true }),
    make({ id: "zusa-mens-influencer-quarter-zip", name: "Zusa Men's Influencer Quarter Zip", cat: FQ,
      blurb: "Soft, midweight performance quarter-zip.",
      desc: "A smooth, stretch pullover that wicks moisture and protects from UV. Each one is made from recycled plastic bottles.",
      details: ["Moisture-wicking recycled polyester", "UV protective", "Midweight, stretches with movement"],
      colors: [["Black", "6465944-front-z300-black"], ["Navy", "3094933-front-z300-navy"], ["Charcoal", "9461242-front-z300-charcoal"]], sizes: S6, thread: true }),
    make({ id: "zusa-womens-influencer-quarter-zip", name: "Zusa Women's Influencer Quarter Zip", cat: FQ,
      blurb: "Soft, midweight performance quarter-zip.",
      desc: "Sharp enough for the office and built to perform on the golf course. Moisture-wicking, anti-microbial and made from recycled plastic bottles.",
      details: ["Moisture-wicking, anti-microbial recycled polyester", "Midweight", "Sizing: the maker suggests sizing up one size from a typical fit"],
      colors: [["Black", "2446621-front-zw300-black"], ["Navy", "1954650-front-zw300-navy"], ["Charcoal", "9137139-front-zw300-charcoal"]], sizes: S5, thread: true }),
    make({ id: "port-authority-large-cotton-canvas-boat-tote", name: "Port Authority Large Cotton Canvas Boat Tote", cat: BG,
      blurb: "Open-top canvas tote with contrast handles.",
      desc: "A durable tote for the beach, shopping and events, with contrast handles and a contrast bottom.",
      details: ["15.5 oz cotton canvas body", "Reinforced webbing handles", "Interior hanging pocket with hook-and-loop closure", "16.5\" h x 14\" w x 7.5\" d"],
      colors: [["Natural / Navy", "927880-front-natural--navy"]] }),
    make({ id: "karst-stone-bound-notebook", name: "Karst Stone Bound Notebook", cat: HD,
      blurb: "Water-resistant notebook made from stone paper.",
      desc: "A 5.5\" x 8.5\" hard-cover notebook with 72 lined pages of smooth stone paper, made without cutting or pulping trees.",
      details: ["Water-resistant hard cover and pages", "Ribbon page marker and back pocket", "Flat-lay binding", "Recyclable"],
      colors: [["Beige", "2296154-front-beige"]] }),
    make({ id: "travismathew-approach-backpack", name: "TravisMathew Approach Backpack", cat: BG,
      blurb: "Organized commuter backpack with a padded laptop pocket.",
      desc: "A classic backpack that keeps everything organized for the commute.",
      details: ["600D poly with a water-repellent finish", "Padded laptop compartment, fits most 16\" laptops", "Interior tech organizers, side water bottle sleeve", "18.5\" h x 11\" w x 5.5\" d"],
      colors: [["Black", "5717651-front-black"], ["River Blue Navy", "2561657-front-river-blue-navy"]] }),
    make({ id: "travismathew-duration-duffel", name: "TravisMathew Duration Duffel", cat: BG,
      blurb: "Weekend duffel with a separate shoe compartment.",
      desc: "A multipurpose duffel with a vented shoe compartment to keep sneakers in good condition.",
      details: ["600D poly with a water-repellent finish", "Detachable, padded shoulder strap", "Front zippered pocket", "11\" h x 22\" w x 11.5\" d, 49 L"],
      colors: [["Black", "4032790-front-black"]] }),
    make({ id: "brooks-brothers-heritage-blanket", name: "Brooks Brothers Heritage Blanket", cat: HD,
      blurb: "Striped polyester-wool blanket, machine washable.",
      desc: "A machine-washable blanket with stripes that echo the Brooks Brothers tie stripe.",
      details: ["15.3 oz, 80/20 polyester/wool", "Tasseled ends", "50\" x 60\""],
      colors: [["Navy Blazer / Ruby Wine / Camel", "5363800-front-navy-blazer---ruby-wine--camel"]] }),
    make({ id: "mophie-power-boost-10k-mah-power-bank", name: "Mophie Power Boost 10K mAh Power Bank", cat: HD,
      blurb: "Two-port power bank in a gift box.",
      desc: "A 10,000 mAh power bank that charges two devices at once, with one USB-C and one USB-A port. It arrives in a gift box with a USB-A to USB-C cable.",
      details: ["Charges up to two devices at once", "Battery life and charging indicator", "Carry-on luggage only"],
      colors: [["Black", "4942186-front-black"]] }),
    make({ id: "brooks-brothers-quilted-jacket", name: "Brooks Brothers Quilted Jacket", cat: JV,
      blurb: "Diamond-quilted, water-resistant jacket.",
      desc: "A supple diamond-quilted jacket that resists water and holds warmth.",
      details: ["100% polyester shell and lining", "Polyfill insulation", "Flap hand pockets, interior zippered chest pocket", "Rib knit lined collar"],
      colors: [["Deep Black", "3684242-front-deep-black"], ["Night Navy", "1443724-front-night-navy"]], sizes: S8, thread: true }),
    make({ id: "brooks-brothers-quilted-vest", name: "Brooks Brothers Quilted Vest", cat: JV,
      blurb: "Diamond-quilted, water-resistant vest.",
      desc: "A supple diamond-quilted vest that resists water and holds warmth.",
      details: ["100% polyester shell and lining", "Polyfill insulation", "Hand pockets with logo snaps, interior zippered chest pocket"],
      colors: [["Deep Black", "2406082-front-deep-black"], ["Night Navy", "5047117-front-night-navy"]], sizes: S8, thread: true }),
    make({ id: "brooks-brothers-washable-merino-birdseye-quarter-zip-sweater", name: "Brooks Brothers Washable Merino Birdseye 1/4-Zip Sweater", cat: FQ,
      blurb: "Machine-washable merino quarter-zip.",
      desc: "A throw-on-and-go sweater in extra-fine Merino wool with a birdseye pattern. Machine washable.",
      details: ["100% extra-fine Merino wool", "1x1 rib neck, cuffs and hem", "1/4-zip cadet collar"],
      colors: [["Deep Black", "3077395-front-deep-black"], ["Deep Black / Shadow Grey", "1282866-front-deep-black--shadow-grey"], ["Navy / Compass Blue", "7757572-front-navy--compass-blue"]], sizes: S8, thread: true }),
    make({ id: "brooks-brothers-womens-diamond-quilt-full-zip", name: "Brooks Brothers Women's Diamond Quilt Full-Zip", cat: FQ,
      blurb: "Diamond-quilted double-knit full-zip.",
      desc: "A diamond-quilted layer in a cotton and recycled polyester double knit with a heritage look.",
      details: ["10 oz cotton/recycled polyester/spandex double knit", "Metal zipper with logo pull", "Angled front pockets, rib knit cuffs"],
      colors: [["Deep Black", "5633965-front-deep-black"], ["Navy Blazer", "8722088-front-navy-blazer"]], sizes: S8, thread: true }),
    make({ id: "cotopaxi-abrazo-full-zip-fleece-jacket", name: "Cotopaxi Abrazo Full-Zip Fleece Jacket", cat: FQ,
      blurb: "Colorblocked recycled fleece jacket.",
      desc: "A soft, fully recycled fleece jacket in a bold colorblocked style.",
      details: ["6.3 oz, 100% recycled polyester fleece", "bluesign approved materials", "Zippered chest pocket, drop-in hand pockets"],
      colors: [["Black / Cinder", "3533185-front-black--cinder"]], sizes: S6, thread: true }),
    make({ id: "cotopaxi-amado-half-zip-fleece", name: "Cotopaxi Amado 1/2-Zip Fleece", cat: FQ,
      blurb: "Colorblocked recycled fleece half-zip.",
      desc: "A sustainably minded fleece that pairs with a tee or a down jacket and also works worn alone.",
      details: ["5 oz, 100% recycled polyester fleece", "Exposed zipper with contrast trim", "Elastic binding at cuffs and hem"],
      colors: [["Atlantic / Black", "7545845-front-atlantic--black"], ["Canyon / Maritime", "1124843-front-canyon--maritime"], ["Cream / Fjord", "6004645-front-cream--fjord"], ["Smoke / Cinder", "9701250-front-smoke--cinder"]], sizes: S6, thread: true }),
    make({ id: "cotopaxi-womens-amado-half-zip-fleece", name: "Cotopaxi Women's Amado 1/2-Zip Fleece", cat: FQ,
      blurb: "Colorblocked recycled fleece half-zip.",
      desc: "A sustainably minded fleece that pairs with a tee or a down jacket and also works worn alone.",
      details: ["5 oz, 100% recycled polyester fleece", "Exposed zipper with contrast trim", "Elastic binding at cuffs and hem"],
      colors: [["Atlantic / Black", "1688658-front-atlantic--black"], ["Canyon / Maritime", "572351-front-canyon--maritime"], ["Cream / Fjord", "2154637-front-cream--fjord"], ["Smoke / Cinder", "687835-front-smoke--cinder"]], sizes: S5, thread: true }),
    make({ id: "nike-storm-fit-full-zip-jacket", name: "Nike Storm-FIT Full-Zip Jacket", cat: JV,
      blurb: "Wind and rain shell with stretch.",
      desc: "A sporty performance jacket with Storm-FIT technology to shield from wind and rain, with stretch for movement.",
      details: ["100% polyester with a water-repellent coating and mesh lining", "Zip-through collar, side pockets, elastic cuffs", "Heat transfer Swoosh on the left sleeve"],
      colors: [["Anthracite", "8411741-front-anthracite"], ["Black", "4290588-front-black"], ["College Navy", "7307051-front-college-navy"]], sizes: S8, thread: true }),
    make({ id: "nike-full-zip-soft-shell-jacket", name: "Nike Full-Zip Soft Shell Jacket", cat: JV,
      blurb: "Water-repellent stretch soft shell.",
      desc: "A smooth, water-repellent soft shell with plenty of stretch and a soft interior.",
      details: ["95/5 polyester/elastane with a water-repellent coating", "Three-panel hood", "Zippered mesh-lined pockets"],
      colors: [["Black", "2614936-front-black"], ["Dark Grey", "254586-front-dark-grey"], ["Navy", "8863492-front-navy"]], sizes: S8, thread: true }),
    make({ id: "nike-womens-full-zip-soft-shell-jacket", name: "Nike Women's Full-Zip Soft Shell Jacket", cat: JV,
      blurb: "Water-repellent stretch soft shell.",
      desc: "A smooth, water-repellent soft shell with plenty of stretch and a soft interior.",
      details: ["95/5 polyester/elastane with a water-repellent coating", "Three-panel hood", "Zippered mesh-lined pockets"],
      colors: [["Black", "672624-front-black"], ["Dark Grey", "5687230-front-dark-grey"], ["Navy", "9910343-front-navy"]], sizes: S5, thread: true }),
    make({ id: "carhartt-duck-detroit-jacket", name: "Carhartt Duck Detroit Jacket", cat: JV,
      blurb: "Heavyweight canvas Detroit jacket.",
      desc: "The classic Detroit jacket with a corduroy collar and heavyweight duck canvas, updated for everyday wear.",
      details: ["12 oz ring spun cotton duck canvas", "Blanket-lined body with Wind Fighter technology", "Two-way brass zipper, triple-stitched seams", "Relaxed fit"],
      colors: [["Black", "2345487-front-black"], ["Carhartt Brown", "885735-front-carhartt-brown"]], sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"], thread: true }),
    make({ id: "carhartt-womens-rugged-flex-crawford-jacket", name: "Carhartt Women's Rugged Flex Crawford Jacket", cat: JV,
      blurb: "Stretch canvas bomber.",
      desc: "A classic bomber built to move, with Rugged Flex stretch canvas and a mesh lining.",
      details: ["8 oz, 98/2 cotton/spandex canvas", "Rib knit collar, cuffs and waistband", "Zippered left chest pocket", "Relaxed fit"],
      colors: [["Black", "3250950-front-black"], ["Carhartt Brown", "2067303-front-carhartt-brown"]], sizes: ["XS", "S", "M", "L", "XL", "XXL"], thread: true }),
    make({ id: "columbia-powder-lite-ii-jacket", name: "Columbia Powder Lite II Jacket", cat: JV,
      blurb: "Insulated, water-resistant jacket.",
      desc: "A light insulated jacket with thermal reflective lining and water-resistant fabric.",
      details: ["100% recycled polyester", "Omni-HEAT thermal reflective lining", "Elastic cuffs, drawcord hem", "Zippered hand pockets"],
      colors: [["Black", "1128594-front-black"], ["Collegiate Navy", "6373964-front-collegiate-navy"]], sizes: S6, thread: true }),
    make({ id: "columbia-womens-powder-lite-ii-full-zip-jacket", name: "Columbia Women's Powder Lite II Full Zip Jacket", cat: JV,
      blurb: "Insulated, water-resistant jacket.",
      desc: "A light insulated jacket with thermal reflective lining and water-resistant fabric.",
      details: ["Recycled Thermarator insulation", "Omni-HEAT thermal reflective lining", "Interior security pocket, zippered hand pockets"],
      colors: [["Black", "2731518-front-black"]], sizes: S5, thread: true }),
    make({ id: "brooks-brothers-wells-dopp-kit", name: "Brooks Brothers Wells Dopp Kit", cat: BG,
      blurb: "Canvas and leather travel kit.",
      desc: "A compact dopp kit for a vacation, the office or the gym, in water-repellent cotton canvas with leather trim.",
      details: ["12 oz cotton canvas with a water-repellent finish", "Zippered interior compartment with elastic loops", "Leather handle", "5\" h x 10.5\" l x 4.5\" d"],
      colors: [["Black", "4386241-front-black"]] }),
    make({ id: "cotopaxi-luzon-backpack", name: "Cotopaxi Luzon Backpack", cat: BG,
      blurb: "Lightweight 18 L daypack.",
      desc: "A lightweight daypack for commuting, travel and hiking. Every pack is a one-of-a-kind color combination, so the color is a surprise.",
      details: ["Repurposed ripstop nylon", "Top drawstring, front zippered pocket", "Interior hydration sleeve", "18 L, 20\" h x 11.25\" w x 5.1\" d"],
      colors: [["Surprise (one-of-a-kind colors)", "7563611-front-surprise"]] }),
    make({ id: "eddie-bauer-quilted-insulated-fleece-blanket", name: "Eddie Bauer Quilted Insulated Fleece Blanket", cat: HD,
      blurb: "Insulated blanket with a fleece back.",
      desc: "A warm, water-resistant blanket with a quilted face and an ultrasoft fleece backing, for indoors and out.",
      details: ["Quilted woven face with a water-repellent finish", "High-pile fleece backing", "Rounded corners, bound hem", "50\" x 60\""],
      colors: [["Black", "2388865-front-black"], ["Grey Steel / Black", "2767971-front-grey-steel--black"], ["River Blue Navy", "9338388-front-river-blue-navy"]] }),
    make({ id: "the-north-face-chest-logo-everyday-insulated-jacket", name: "The North Face Chest Logo Everyday Insulated Jacket", cat: JV,
      blurb: "Baffled insulated jacket.",
      desc: "A jacket for mountain and city life with baffles and colorblocking. It keeps you warm and dry when it gets cold and wet.",
      details: ["WindWall recycled polyester shell with a water-repellent finish", "150 g Heatseeker synthetic insulation", "Secure-zip hand pockets"],
      colors: [["Burnt Olive Green", "3923746-front-burnt-olive-green"]], sizes: S6, thread: true }),
    make({ id: "columbia-whirlibird-watch-cap", name: "Columbia Whirlibird Watch Cap", cat: AC,
      blurb: "Soft acrylic beanie.",
      desc: "A soft four-point beanie in cashmere-like acrylic yarn.",
      details: ["100% acrylic yarn", "4-point beanie construction", "Embroidered Columbia logo"],
      colors: [["Black", "7095596-front-black"]], thread: true }),
    make({ id: "valhalla-copper-vacuum-insulated-camp-mug-14oz", name: "Valhalla Copper Vacuum Insulated Camp Mug 14 oz", cat: HD,
      blurb: "Vacuum-insulated stainless camp mug.",
      desc: "A classic camp mug with a skid-proof synthetic cork base. The double-wall copper-insulated body keeps drinks cold up to 24 hours and hot up to 8.",
      details: ["14 oz capacity, spillproof lid", "18/8 stainless steel", "5.49\" h x 4.53\" w x 3.35\" d"],
      colors: [["Navy", "2239005-front-navy"], ["Black", "606973-front-black"]] }),
    make({ id: "columbia-pike-lake-vest", name: "Columbia Pike Lake Vest", cat: JV,
      blurb: "Insulated vest with thermal reflective lining.",
      desc: "A water-resistant insulated vest with a thermal reflective lining.",
      details: ["Thermarator insulation", "Omni-HEAT thermal reflective lining", "Interior security pocket, zippered hand pockets"],
      colors: [["Black", "3755861-front-black"], ["Black / Graphite", "4727472-front-black--graphite"]], sizes: S5, thread: true }),
    make({ id: "the-north-face-womens-barr-lake-soft-shell-jacket", name: "The North Face Women's Barr Lake Soft Shell Jacket", cat: JV,
      blurb: "Stretch soft shell with WindWall fabric.",
      desc: "A multi-purpose soft shell for high-energy days, with two-way stretch, WindWall fabric and an adjustable hem.",
      details: ["WindWall recycled polyester with a water-repellent finish", "Raglan sleeves for mobility", "Exposed zippered hand pockets"],
      colors: [["Asphalt Grey Dark Heather", "1428555-front-asphalt-grey-dark-heather"], ["Khaki Stone Dark Heather", "2335105-front-khaki-stone-dark-heather"], ["Shady Blue Dark Heather", "5363016-front-shady-blue-dark-heather"], ["TNF Black Heather", "3013018-front-tnf-black-heather"]], sizes: S5, thread: true }),
    make({ id: "columbia-mens-loma-vista-iii-jacket", name: "Columbia Men's Loma Vista III Jacket", cat: JV,
      blurb: "Cotton-blend insulated jacket.",
      desc: "A regular-fit cotton and polyester jacket with a fleece lining and light insulation, treated to repel water and stains.",
      details: ["60/40 cotton/polyester", "Omni-Shield water and stain repellent", "Chest pocket, interior security pocket, zippered hand pockets", "Adjustable cuffs"],
      colors: [["Black", "2975184-front-black"]], sizes: S5, thread: true }),
    make({ id: "the-north-face-mountain-horizon-jacket", name: "The North Face Mountain Horizon Jacket", cat: JV,
      blurb: "Water-repellent stretch jacket.",
      desc: "A sustainable, water-repellent jacket with moisture management for any weather.",
      details: ["Recycled polyester/elastane with a water-repellent finish", "FlashDry-XD moisture management", "Stand collar, hem cinch-cord", "Secure-zip hand pockets"],
      colors: [["Shady Blue", "1047312-front-shady-blue"], ["Stone Slab Grey", "6009370-front-stone-slab-grey"], ["TNF Black", "9792044-front-tnf-black"]], sizes: S6, thread: true })
  ]);
})();
