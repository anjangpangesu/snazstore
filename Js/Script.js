let products = [
  {
    id: 1,
    name: "Mobile Legends",
    category: "mobile",
    iconUrl: "img/mobile-legends.jpeg",
    prices: [
      {
        productsName: "Weekly Diamond Pass",
        price: "Rp28.000",
      },
      {
        productsName: "Weekly Diamond Pass x2",
        price: "Rp56.000",
      },
      {
        productsName: "Weekly Diamond Pass x3",
        price: "Rp84.000",
      },
      {
        productsName: "Weekly Diamond Pass x4",
        price: "Rp112.000",
      },
      {
        productsName: "Weekly Diamond Pass x5",
        price: "Rp140.000",
      },
      { productsName: "Twilight Pass", price: "Rp150.000" },
      { productsName: "5 Diamond", price: "Rp2.000" },
      { productsName: "12 Diamond", price: "Rp4.000" },
      { productsName: "19 Diamond", price: "Rp6.000" },
      { productsName: "28 Diamond", price: "Rp8.000" },
      { productsName: "44 Diamond", price: "Rp12.000" },
      { productsName: "50 Diamond", price: "Rp16.000" },
      { productsName: "59 Diamond", price: "Rp16.000" },
      { productsName: "85 Diamond", price: "Rp23.000" },
      { productsName: "113 Diamond", price: "Rp32.000" },
      { productsName: "144 Diamond", price: "Rp39.000" },
      { productsName: "170 Diamond", price: "Rp46.000" },
      { productsName: "229 Diamond", price: "Rp62.000" },
      { productsName: "240 Diamond", price: "Rp65.000" },
      { productsName: "257 Diamond", price: "Rp70.000" },
      { productsName: "278 Diamond", price: "Rp76.000" },
      { productsName: "284 Diamond", price: "Rp77.000" },
      { productsName: "296 Diamond", price: "Rp80.000" },
      { productsName: "301 Diamond", price: "Rp82.000" },
      { productsName: "345 Diamond", price: "Rp94.000" },
      { productsName: "355 Diamond", price: "Rp96.000" },
      { productsName: "374 Diamond", price: "Rp102.000" },
      { productsName: "381 Diamond", price: "Rp103.000" },
      { productsName: "408 Diamond", price: "Rp110.000" },
      { productsName: "425 Diamond", price: "Rp115.000" },
      { productsName: "427 Diamond", price: "Rp116.000" },
      { productsName: "450 Diamond", price: "Rp123.000" },
      { productsName: "512 Diamond", price: "Rp139.000" },
      { productsName: "522 Diamond", price: "Rp142.000" },
      { productsName: "568 Diamond", price: "Rp150.000" },
      { productsName: "601 Diamond", price: "Rp160.000" },
      { productsName: "712 Diamond", price: "Rp189.000" },
      { productsName: "717 Diamond", price: "Rp191.000" },
      { productsName: "750 Diamond", price: "Rp200.000" },
      { productsName: "875 Diamond", price: "Rp230.000" },
      { productsName: "965 Diamond", price: "Rp254.000" },
      { productsName: "977 Diamond", price: "Rp261.000" },
      { productsName: "1050 Diamond", price: "Rp280.000" },
      { productsName: "1134 Diamond", price: "Rp304.000" },
      { productsName: "1136 Diamond", price: "Rp303.000" },
      { productsName: "1139 Diamond", price: "Rp305.000" },
      { productsName: "1159 Diamond", price: "Rp310.000" },
      { productsName: "1164 Diamond", price: "Rp312.000" },
      { productsName: "1183 Diamond", price: "Rp317.000" },
      { productsName: "1220 Diamond", price: "Rp327.000" },
      { productsName: "1230 Diamond", price: "Rp329.000" },
      { productsName: "1368 Diamond", price: "Rp367.000" },
      { productsName: "1412 Diamond", price: "Rp379.000" },
      { productsName: "1443 Diamond", price: "Rp384.000" },
      { productsName: "1453 Diamond", price: "Rp390.000" },
      { productsName: "1507 Diamond", price: "Rp401.000" },
      { productsName: "1672 Diamond", price: "Rp446.000" },
      { productsName: "1704 Diamond", price: "Rp454.000" },
      { productsName: "1750 Diamond", price: "Rp464.000" },
      { productsName: "2010 Diamond", price: "Rp505.000" },
      { productsName: "2180 Diamond", price: "Rp551.000" },
      { productsName: "2199 Diamond", price: "Rp557.000" },
      { productsName: "2350 Diamond", price: "Rp598.000" },
      { productsName: "2382 Diamond", price: "Rp607.000" },
      { productsName: "2536 Diamond", price: "Rp648.000" },
      { productsName: "2578 Diamond", price: "Rp656.000" },
      { productsName: "2885 Diamond", price: "Rp737.000" },
      { productsName: "2904 Diamond", price: "Rp742.000" },
      { productsName: "3453 Diamond", price: "Rp888.000" },
      { productsName: "3481 Diamond", price: "Rp896.000" },
      { productsName: "3693 Diamond", price: "Rp953.000" },
      { productsName: "4020 Diamond", price: "Rp1.020.000" },
      { productsName: "4404 Diamond", price: "Rp1.126.000" },
      { productsName: "4678 Diamond", price: "Rp1.197.000" },
      { productsName: "4830 Diamond", price: "Rp1.223.000" },
      { productsName: "5372 Diamond", price: "Rp1.376.000" },
      { productsName: "5398 Diamond", price: "Rp1.376.000" },
      { productsName: "5568 Diamond", price: "Rp1.423.000" },
      { productsName: "5940 Diamond", price: "Rp1.535.000" },
      { productsName: "6001 Diamond", price: "Rp1.539.000" },
      { productsName: "6030 Diamond", price: "Rp1.529.000" },
      { productsName: "6257 Diamond", price: "Rp1.610.000" },
      { productsName: "6840 Diamond", price: "Rp1.733.000" },
      { productsName: "7195 Diamond", price: "Rp1.831.000" },
      { productsName: "7660 Diamond", price: "Rp1.955.000" },
      { productsName: "7723 Diamond", price: "Rp1.973.000" },
      { productsName: "8040 Diamond", price: "Rp2.039.000" },
      { productsName: "8302 Diamond", price: "Rp2.126.000" },
      { productsName: "8850 Diamond", price: "Rp2.242.000" },
      { productsName: "9302 Diamond", price: "Rp2.367.000" },
      { productsName: "9588 Diamond", price: "Rp2.442.000" },
      { productsName: "10050 Diamond", price: "Rp2.548.000" },
      { productsName: "12060 Diamond", price: "Rp3.058.000" },
      { productsName: "12953 Diamond", price: "Rp3.302.000" },
      { productsName: "13680 Diamond", price: "Rp3.465.000" },
      { productsName: "14814 Diamond", price: "Rp3.758.000" },
      { productsName: "16080 Diamond", price: "Rp4.077.000" },
      { productsName: "18510 Diamond", price: "Rp4.688.000" },
      { productsName: "20100 Diamond", price: "Rp5.096.000" },
      { productsName: "20195 Diamond", price: "Rp5.126.000" },
      { productsName: "21330 Diamond", price: "Rp5.401.000" },
      { productsName: "28980 Diamond", price: "Rp7.337.000" },
    ],
    needServer: true,
    formType: "game",
  },
  {
    id: 2,
    name: "Magic Chess Go Go",
    category: "mobile",
    iconUrl: "img/mcgg.png",
    prices: [
      { "productsName": "5 Diamonds", "price": "Rp2.000" },
      { "productsName": "12 Diamonds", "price": "Rp4.000" },
      { "productsName": "19 Diamonds", "price": "Rp6.000" },
      { "productsName": "28 Diamonds", "price": "Rp9.000" },
      { "productsName": "44 Diamonds", "price": "Rp13.000" },
      { "productsName": "59 Diamonds", "price": "Rp17.000" },
      { "productsName": "85 Diamonds", "price": "Rp24.000" },
      { "productsName": "170 Diamonds", "price": "Rp47.000" },
      { "productsName": "240 Diamonds", "price": "Rp66.000" },
      { "productsName": "296 Diamonds", "price": "Rp81.000" },
      { "productsName": "408 Diamonds", "price": "Rp111.000" },
      { "productsName": "568 Diamonds", "price": "Rp151.000" },
      { "productsName": "875 Diamonds", "price": "Rp233.000" },
      { "productsName": "2010 Diamonds", "price": "Rp511.000" },
      { "productsName": "4830 Diamonds", "price": "Rp1.248.000" },
    ],
    needServer: true,
    formType: "game",
  },
  {
    id: 3,
    name: "Free Fire | Free Fire Max",
    category: "mobile",
    iconUrl: "img/free-fire.webp",
    prices: [
      { productsName: "Level Up Pass", price: "Rp16.000" },
      { productsName: "Membership Mingguan", price: "Rp30.000" },
      { productsName: "Membership Bulanan", price: "Rp89.000" },
      { productsName: "BP Card", price: "Rp47.000" },
      { productsName: "5 Diamond", price: "Rp1.000" },
      { productsName: "10 Diamond", price: "Rp2.000" },
      { productsName: "12 Diamond", price: "Rp2.000" },
      { productsName: "50 Diamond", price: "Rp8.000" },
      { productsName: "55 Diamond", price: "Rp9.000" },
      { productsName: "70 Diamond", price: "Rp10.000" },
      { productsName: "80 Diamond", price: "Rp12.000" },
      { productsName: "100 Diamond", price: "Rp15.000" },
      { productsName: "120 Diamond", price: "Rp17.000" },
      { productsName: "130 Diamond", price: "Rp19.000" },
      { productsName: "140 Diamond", price: "Rp19.000" },
      { productsName: "145 Diamond", price: "Rp20.000" },
      { productsName: "150 Diamond", price: "Rp21.000" },
      { productsName: "190 Diamond", price: "Rp27.000" },
      { productsName: "200 Diamond", price: "Rp28.000" },
      { productsName: "210 Diamond", price: "Rp28.000" },
      { productsName: "280 Diamond", price: "Rp38.000" },
      { productsName: "355 Diamond", price: "Rp47.000" },
      { productsName: "420 Diamond", price: "Rp56.000" },
      { productsName: "500 Diamond", price: "Rp67.000" },
      { productsName: "510 Diamond", price: "Rp69.000" },
      { productsName: "565 Diamond", price: "Rp75.000" },
      { productsName: "635 Diamond", price: "Rp84.000" },
      { productsName: "720 Diamond", price: "Rp91.000" },
      { productsName: "800 Diamond", price: "Rp105.000" },
      { productsName: "860 Diamond", price: "Rp112.000" },
      { productsName: "930 Diamond", price: "Rp122.000" },
      { productsName: "1000 Diamond", price: "Rp131.000" },
      { productsName: "1050 Diamond", price: "Rp138.000" },
      { productsName: "1075 Diamond", price: "Rp140.000" },
      { productsName: "1080 Diamond", price: "Rp141.000" },
      { productsName: "1450 Diamond", price: "Rp189.000" },
      { productsName: "2180 Diamond", price: "Rp284.000" },
      { productsName: "2200 Diamond", price: "Rp288.000" },
      { productsName: "3640 Diamond", price: "Rp474.000" },
      { productsName: "7290 Diamond", price: "Rp933.000" },
      { productsName: "36500 Diamond", price: "Rp4.661.000" },
      { productsName: "73100 Diamond", price: "Rp9.322.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 4,
    name: "PUBG Mobile",
    category: "mobile",
    iconUrl: "img/pubgm.jpg",
    prices: [
      { "productsName": "60 UC", "price": "Rp 16.000" },
      { "productsName": "325 UC", "price": "Rp 78.000" },
      { "productsName": "660 UC", "price": "Rp 155.000" },
      { "productsName": "1800 UC", "price": "Rp 396.000" },
      { "productsName": "3850 UC", "price": "Rp 792.000" },
      { "productsName": "8100 UC", "price": "Rp 1.583.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 5,
    name: "Call of Duty Mobile",
    category: "mobile",
    iconUrl: "img/codm.webp",
    prices: [
      { "productsName": "31 CP", "price": "Rp5.000" },
      { "productsName": "63 CP", "price": "Rp10.000" },
      { "productsName": "128 CP", "price": "Rp19.000" },
      { "productsName": "321 CP", "price": "Rp46.000" },
      { "productsName": "645 CP", "price": "Rp98.000" },
      { "productsName": "800 CP", "price": "Rp111.000" },
      { "productsName": "1373 CP", "price": "Rp184.000" },
      { "productsName": "2060 CP", "price": "Rp276.000" },
      { "productsName": "3564 CP", "price": "Rp464.000" },
      { "productsName": "5618 CP", "price": "Rp677.000" },
      { "productsName": "7656 CP", "price": "Rp927.000" },
      { "productsName": "15312 CP", "price": "Rp1.846.000" },
      { "productsName": "38280 CP", "price": "Rp4.615.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 6,
    name: "Honor of Kings",
    category: "mobile",
    iconUrl: "img/hok.png",
    prices: [
      { "productsName": "Weekly Card", "price": "Rp13.000" },
      { "productsName": "Weekly Card Plus", "price": "Rp41.000" },
      { "productsName": "8 Tokens", "price": "Rp2.000" },
      { "productsName": "16 Tokens (8 + 8)", "price": "Rp2.000" },
      { "productsName": "23 Tokens", "price": "Rp4.000" },
      { "productsName": "32 Tokens (16 + 16)", "price": "Rp3.000" },
      { "productsName": "46 Tokens (23 + 23)", "price": "Rp5.000" },
      { "productsName": "80 Tokens", "price": "Rp13.000" },
      { "productsName": "160 Tokens (80 + 80)", "price": "Rp13.000" },
      { "productsName": "240 Tokens", "price": "Rp41.000" },
      { "productsName": "400 Tokens", "price": "Rp70.000" },
      { "productsName": "560 Tokens", "price": "Rp96.000" },
      { "productsName": "830 Tokens", "price": "Rp131.000" },
      { "productsName": "1245 Tokens", "price": "Rp205.000" },
      { "productsName": "2508 Tokens", "price": "Rp414.000" },
      { "productsName": "4180 Tokens", "price": "Rp692.000" },
      { "productsName": "8360 Tokens", "price": "Rp1.333.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 7,
    name: "Genshin Impact",
    category: "mobile",
    iconUrl: "img/Genshin_Impact.webp",
    prices: [
      { "productsName": "Blessing Welkin Moon", "price": "Rp62.000" },
      { "productsName": "Blessing Welkin Moon x2", "price": "Rp123.000" },
      { "productsName": "Blessing Welkin Moon x3", "price": "Rp184.000" },
      { "productsName": "Blessing Welkin Moon x4", "price": "Rp245.000" },
      { "productsName": "Blessing Welkin Moon x5", "price": "Rp306.000" },
      { "productsName": "All Pack Genesis Crystals", "price": "Rp2.555.000" },
      { "productsName": "60 Crystals", "price": "Rp12.000" },
      { "productsName": "330 Crystals", "price": "Rp62.000" },
      { "productsName": "1090 Crystals", "price": "Rp185.000" },
      { "productsName": "1420 Crystals", "price": "Rp246.000" },
      { "productsName": "2240 Crystals", "price": "Rp409.000" },
      { "productsName": "3880 Crystals", "price": "Rp628.000" },
      { "productsName": "4970 Crystals", "price": "Rp817.000" },
      { "productsName": "8080 Crystals", "price": "Rp1.257.000" },
      { "productsName": "11960 Crystals", "price": "Rp1.884.000" },
    ],
    needServer: true,
    formType: "hoyogame",
    servers: ["Amerika", "Asia", "Europa", "TW_HK_MO"],
  },
  {
    id: 8,
    name: "Honkai Star Rail",
    category: "mobile",
    iconUrl: "img/honkai.png",
    prices: [
      { "productsName": "Express Supply Pass", "price": "Rp62.000" },
      { "productsName": "Express Supply Pass x2", "price": "Rp123.000" },
      { "productsName": "Express Supply Pass x3", "price": "Rp184.000" },
      { "productsName": "Express Supply Pass x4", "price": "Rp245.000" },
      { "productsName": "Express Supply Pass x5", "price": "Rp306.000" },
      { "productsName": "All Pack", "price": "Rp2.540.000" },
      { "productsName": "60 Oneiric Shard", "price": "Rp13.000" },
      { "productsName": "330 Oneiric Shard", "price": "Rp62.000" },
      { "productsName": "1090 Oneiric Shard", "price": "Rp189.000" },
      { "productsName": "1420 Oneiric Shard", "price": "Rp250.000" },
      { "productsName": "2240 Oneiric Shard", "price": "Rp388.000" },
      { "productsName": "3880 Oneiric Shard", "price": "Rp640.000" },
      { "productsName": "4970 Oneiric Shard", "price": "Rp830.000" },
      { "productsName": "8080 Oneiric Shard", "price": "Rp1.248.000" },
      { "productsName": "11960 Oneiric Shard", "price": "Rp1.887.000" },
    ],
    needServer: true,
    formType: "hoyogame",
    servers: ["Amerika", "Asia", "Europa", "TW_HK_MO"],
  },
  {
    id: 9,
    name: "Honkai Impact 3rd",
    category: "mobile",
    iconUrl: "img/impact.webp",
    prices: [
      { "productsName": "Monthly-Card", "price": "Rp82.000" },
      { "productsName": "65 Crystals", "price": "Rp17.000" },
      { "productsName": "330 Crystals", "price": "Rp82.000" },
      { "productsName": "710 Crystals", "price": "Rp165.000" },
      { "productsName": "1430 Crystals", "price": "Rp340.000" },
      { "productsName": "3860 Crystals", "price": "Rp845.000" },
      { "productsName": "8088 Crystals", "price": "Rp1.689.000" },
      { "productsName": "65 B-Chips", "price": "Rp17.000" },
      { "productsName": "330 B-Chips", "price": "Rp82.000" },
      { "productsName": "990 B-Chips", "price": "Rp256.000" },
      { "productsName": "1320 B-Chips", "price": "Rp337.000" },
      { "productsName": "1980 B-Chips", "price": "Rp502.000" },
      { "productsName": "3300 B-Chips", "price": "Rp845.000" },
      { "productsName": "6600 B-Chips", "price": "Rp1.689.000" },
    ],
    needServer: true,
    formType: "hoyogame",
    servers: ["Amerika", "Asia", "Europa", "TW_HK_MO"],
  },
  {
    id: 10,
    name: "Zenless Zone Zero",
    category: "mobile",
    iconUrl: "img/zzz.webp",
    prices: [
      { "productsName": "Inter-Knot Membership", "price": "Rp65.000" },
      { "productsName": "Inter-Knot Membership x2", "price": "Rp130.000" },
      { "productsName": "Inter-Knot Membership x3", "price": "Rp195.000" },
      { "productsName": "Inter-Knot Membership x4", "price": "Rp260.000" },
      { "productsName": "Inter-Knot Membership x5", "price": "Rp325.000" },
      { "productsName": "All Pack Monochrome", "price": "Rp2.742.000" },
      { "productsName": "60 Monochrome", "price": "Rp16.000" },
      { "productsName": "330 Monochrome", "price": "Rp65.000" },
      { "productsName": "1090 Monochrome", "price": "Rp196.000" },
      { "productsName": "2240 Monochrome", "price": "Rp433.000" },
      { "productsName": "3880 Monochrome", "price": "Rp666.000" },
      { "productsName": "8080 Monochrome", "price": "Rp1.347.000" },
    ],
    needServer: true,
    formType: "hoyogame",
    servers: ["Amerika", "Asia", "Europa", "TW_HK_MO"],
  },
  {
    id: 11,
    name: "Valorant Points",
    category: "pc",
    iconUrl: "img/valorant.png",
    prices: [
      { "productsName": "478 Point", "price": "Rp56.000" },
      { "productsName": "1000 Point", "price": "Rp112.000" },
      { "productsName": "2050 Point", "price": "Rp223.000" },
      { "productsName": "3650 Point", "price": "Rp386.000" },
      { "productsName": "5350 Point", "price": "Rp555.000" },
      { "productsName": "11000 Point", "price": "Rp1.102.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 12,
    name: "Playstation Store Gift Card",
    category: "console",
    iconUrl: "img/playstation-gc.jpg",
    prices: [
      { "productsName": "Gift Card Rp. 100.000", "price": "Rp 100.000" },
      { "productsName": "Gift Card Rp. 225.000", "price": "Rp 225.000" },
      { "productsName": "Gift Card Rp. 300.000", "price": "Rp 300.000" },
      { "productsName": "Gift Card Rp. 400.000", "price": "Rp 394.000" },
      { "productsName": "Gift Card Rp. 600.000", "price": "Rp 598.000" },
      { "productsName": "Gift Card Rp. 1.000.000", "price": "Rp 1.000.000" },
      { "productsName": "Gift Card Rp. 1.500.000", "price": "Rp 1.500.000" },
    ],
    needServer: false,
    formType: "phone",
  },
  {
    id: 13,
    name: "IDR Steam Wallet",
    category: "pc",
    iconUrl: "img/steam-wallet.jpeg",
    prices: [
      { "productsName": "IDR 12.000", "price": "Rp13.000" },
      { "productsName": "IDR 45.000", "price": "Rp47.000" },
      { "productsName": "IDR 60.000", "price": "Rp63.000" },
      { "productsName": "IDR 90.000", "price": "Rp94.000" },
      { "productsName": "IDR 120.000", "price": "Rp123.000" },
      { "productsName": "IDR 250.000", "price": "Rp270.000" },
      { "productsName": "IDR 400.000", "price": "Rp440.000" },
      { "productsName": "IDR 600.000", "price": "Rp648.000" },
    ],
    needServer: false,
    formType: "game",
  },
  {
    id: 14,
    name: "IDR Google Play",
    category: "voucher",
    iconUrl: "img/google-play.webp",
    prices: [
      { "productsName": "IDR 5.000", "price": "Rp6.000" },
      { "productsName": "IDR 10.000", "price": "Rp11.000" },
      { "productsName": "IDR 16.000", "price": "Rp17.000" },
      { "productsName": "IDR 20.000", "price": "Rp21.000" },
      { "productsName": "IDR 35.000", "price": "Rp37.000" },
      { "productsName": "IDR 49.000", "price": "Rp52.000" },
      { "productsName": "IDR 50.000", "price": "Rp53.000" },
      { "productsName": "IDR 65.000", "price": "Rp69.000" },
      { "productsName": "IDR 79.000", "price": "Rp83.000" },
      { "productsName": "IDR 100.000", "price": "Rp105.000" },
      { "productsName": "IDR 129.000", "price": "Rp136.000" },
      { "productsName": "IDR 150.000", "price": "Rp158.000" },
      { "productsName": "IDR 159.000", "price": "Rp167.000" },
      { "productsName": "IDR 249.000", "price": "Rp261.000" },
      { "productsName": "IDR 300.000", "price": "Rp315.000" },
      { "productsName": "IDR 329.000", "price": "Rp345.000" },
      { "productsName": "IDR 399.000", "price": "Rp418.000" },
      { "productsName": "IDR 500.000", "price": "Rp524.000" },
      { "productsName": "IDR 649.000", "price": "Rp680.000" },
      { "productsName": "IDR 799.000", "price": "Rp846.000" },
      { "productsName": "IDR 1.299.000", "price": "Rp1.375.000" },
      { "productsName": "IDR 1.599.000", "price": "Rp1.692.000" },
    ],
    needServer: false,
    formType: "phone",
  },
  {
    id: 15,
    name: "IDR Roblox Gift Card",
    category: "voucher",
    iconUrl: "img/roblox.webp",
    prices: [
      { "productsName": "Gift Card Rp. 100.000", "price": "Rp100.000" },
      { "productsName": "Gift Card Rp. 300.000", "price": "Rp300.000" },
      { "productsName": "Gift Card Rp. 500.000", "price": "Rp500.000" },
    ],
    needServer: false,
    formType: "phone",
  },
  {
    id: 16,
    name: "Canva",
    category: "voucher",
    iconUrl: "img/canva.jpeg",
    prices: [
      { productsName: "1 Month", price: "Rp 55.000" },
      { productsName: "3 Months", price: "Rp 150.000" },
      { productsName: "6 Months", price: "Rp 280.000" },
      { productsName: "12 Months", price: "Rp 550.000" },
    ],
    needServer: false,
    formType: "phone",
  },
];

let categories = [
  {
    id: 1,
    name: "Mobile Games",
    code: "mobile",
  },
  {
    id: 2,
    name: "PC Games",
    code: "pc",
  },
  {
    id: 3,
    name: "Console Games",
    code: "console",
  },
  {
    id: 4,
    name: "Voucher",
    code: "voucher",
  },
];

// DOM Elements
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const categoryFilters = document.querySelectorAll(".category-filter");
const checkoutModal = document.getElementById("checkout-modal");
const closeModal = document.getElementById("close-modal");
const checkoutForm = document.getElementById("checkout-form");
const formFieldsContainer = document.getElementById("form-fields-container");
const successModal = document.getElementById("success-modal");
const closeSuccessModal = document.getElementById("close-success-modal");
const backToProductsBtn = document.getElementById("back-to-products");
const detailPriceList = document.getElementById("detail-price-list");

// Current state
let currentCategory = "all";
let currentProduct = null;
let currentPrice = null;

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
}

// Show section (beranda, produk, or product-detail)
function showSection(section) {
  document.getElementById("beranda").classList.add("hidden");
  document.getElementById("produk").classList.add("hidden");
  document.getElementById("product-detail").classList.add("hidden");
  document.getElementById(section).classList.remove("hidden");

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + section) {
      link.classList.add("active");
    }
  });

  // If showing products, render them
  if (section === "produk") {
    renderProducts();
  }
}

// Filter products by category
function filterByCategory(category) {
  currentCategory = category;

  // Update active category button
  categoryFilters.forEach((btn) => {
    btn.classList.remove("active-category", "bg-amber-100", "text-amber-600");
    if (btn.dataset.category === category) {
      btn.classList.add("active-category", "bg-amber-100", "text-amber-600");
    }
  });

  renderProducts();
}

// Show product detail page
function showProductDetail(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentProduct = product;

  // Set product details
  document.getElementById("detail-product-icon").src = product.iconUrl;
  document.getElementById("detail-product-name").textContent = product.name;

  // Get category name
  const category = categories.find((c) => c.code === product.category);
  document.getElementById("detail-product-category").textContent = category
    ? category.name
    : product.category;

  // Render all price options
  detailPriceList.innerHTML = "";
  product.prices.forEach((price, index) => {
    const priceCard = document.createElement("div");
    priceCard.className =
      "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300";
    priceCard.innerHTML = `
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-medium">${price.productsName}</span>
                            <span class="text-amber-600 font-semibold">${price.price}</span>
                        </div>
                        <button class="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                                onclick="openCheckoutModal(${product.id}, ${index})">
                            Beli Sekarang
                        </button>
                    `;
    detailPriceList.appendChild(priceCard);
  });

  // Show product detail section
  showSection("product-detail");
}

// Render products based on current filters
function renderProducts() {
  const searchTerm = searchInput.value.toLowerCase();

  let filteredProducts = products;

  // Apply category filter
  if (currentCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === currentCategory
    );
  }

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  // Clear products container
  productsContainer.innerHTML = "";

  // Render filtered products
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
                        <div class="col-span-full text-center py-12">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 class="text-xl font-semibold text-gray-700 mb-2">Tidak ada produk ditemukan</h3>
                            <p class="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
                        </div>
                    `;
    return;
  }

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className =
      "bg-white rounded-lg shadow-md overflow-hidden product-card transition-transform duration-300";

    // Show only first 5 prices, if more add a "View Details" button
    const displayPrices = product.prices.slice(0, 5);
    const hasMorePrices = product.prices.length > 5;

    let priceButtons = "";
    displayPrices.forEach((price, index) => {
      priceButtons += `
                            <button class="price-btn w-full border-b border-gray-200 hover:bg-amber-100 transition-colors duration-200" 
                                    data-product-id="${product.id}" 
                                    data-price-index="${index}">
                                <span>${price.productsName}</span>
                                <span class="font-semibold text-amber-600">${price.price}</span>
                            </button>
                        `;
    });

    // Add "View Details" button if there are more than 5 prices
    const viewDetailsButton = hasMorePrices
      ? `
                        <button class="view-details-btn w-full py-3 px-4 text-center bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white font-medium" 
                                data-product-id="${product.id}">
                            Lihat Produk Lainnya (${product.prices.length})
                        </button>
                    `
      : "";

    productCard.innerHTML = `
                        <div class="p-5">
                            <div class="flex items-center mb-4">
                                <div class="w-14 h-14 bg-white rounded-lg flex items-center justify-center mr-4">
                                    <img src="${product.iconUrl}" alt="${product.name}" class="product-icon">
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold">${product.name}</h3>
                                    <p class="text-sm text-gray-500">${product.prices.length} produk lainnya</p>
                                </div>
                            </div>
                            <div class="border rounded-lg overflow-hidden">
                                ${priceButtons}
                                ${viewDetailsButton}
                            </div>
                        </div>
                    `;

    productsContainer.appendChild(productCard);
  });

  // Add event listeners to price buttons
  document.querySelectorAll(".price-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.dataset.productId);
      const priceIndex = parseInt(btn.dataset.priceIndex);
      openCheckoutModal(productId, priceIndex);
    });
  });

  // Add event listeners to "View Details" buttons
  document.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.dataset.productId);
      const product = products.find((p) => p.id === productId);

      if (product) {
        const slug = product.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "");
        window.location.hash = `#produk#${slug}`;
        showProductDetail(productId);
      }
    });
  });
}

// Generate form fields based on product type
function generateFormFields(product) {
  let formHTML = "";

  switch (product.formType) {
    case "phone":
      // For vouchers - only phone number
      formHTML = `
                            <div class="mb-4">
                                <label for="phone" class="block text-gray-700 font-medium mb-2">Nomor Handphone</label>
                                <input type="text" id="phone" name="phone" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                    `;
      break;

    case "hoyogame":
      // Untuk Game Hoyoverse - ID Game, Server, Nickname, dan Nomor HP
      formHTML = `
                            <div class="mb-4">
                                <label for="game-id" class="block text-gray-700 font-medium mb-2">ID Game</label>
                                <input type="text" id="game-id" name="game-id" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                            <div class="mb-4">
                                <label for="nickname" class="block text-gray-700 font-medium mb-2">Nick In Game</label>
                                <input type="text" id="nickname" name="nickname" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                            <div class="mb-4">
                                <label for="server" class="block text-gray-700 font-medium mb-2">Server</label>
                                <select id="server" name="server"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                                    <option value="" disabled selected>Pilih Server</option>
                                     ${product.servers
          .map(
            (server) =>
              `<option value="${server}">${server}</option>`
          )
          .join("")}
                                </select>
                            </div>
                            <div class="mb-4">
                                <label for="phone" class="block text-gray-700 font-medium mb-2">Nomor Handphone</label>
                                <input type="text" id="phone" name="phone" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                    `;
      break;

    case "game":
    default:
      // Untuk game biasa - ID Game, (optional server), Nickname, dan Nomor HP
      formHTML = `
                            <div class="mb-4">
                                <label for="game-id" class="block text-gray-700 font-medium mb-2">ID Game</label>
                                <input type="text" id="game-id" name="game-id" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                            </div>
                            <div class="mb-4">
                                <label for="nickname" class="block text-gray-700 font-medium mb-2">Nick In Game</label>
                                <input type="text" id="nickname" name="nickname" maxlength="25"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                             </div>
                    `;

      if (product.needServer && product.name !== "Genshin Impact") {
        formHTML += `
                        <div class="mb-4">
                            <label for="server" class="block text-gray-700 font-medium mb-2">Server</label>
                            <input type="text" id="server" name="server" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                        </div>
                        `;
      }

      formHTML += `
                        <div class="mb-4">
                            <label for="phone" class="block text-gray-700 font-medium mb-2">Nomor Handphone</label>
                            <input type="text" id="phone" name="phone" pattern="\\d{1,25}" inputmode="numeric" maxlength="25"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent" required>
                        </div>
                    `;
      break;
  }

  return formHTML;
}

// Open checkout modal
function openCheckoutModal(productId, priceIndex) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  currentProduct = product;
  currentPrice = product.prices[priceIndex];

  // Set modal content
  document.getElementById("product-name").textContent = product.name;
  document.getElementById(
    "product-price"
  ).textContent = `${currentPrice.productsName} - ${currentPrice.price}`;
  document.getElementById("product-icon-img").src = product.iconUrl;

  // Generate form fields based on product type
  formFieldsContainer.innerHTML = generateFormFields(product);

  // Prevent page scroll
  document.body.style.overflow = "hidden";

  // Show modal
  checkoutModal.classList.remove("hidden");
}

// Close checkout modal
function closeCheckoutModal() {
  checkoutModal.classList.add("hidden");
  document.body.style.overflow = "";
  currentProduct = null;
  currentPrice = null;
}

// Format WhatsApp message based on product type and form data
function formatWhatsAppMessage(product, price, formData) {
  let message = `Halo Min Snaz, Saya ingin membeli produk berikut.\n \n`;
  message += `Nama Produk: ${product.name} - ${price.productsName}\n`;
  message += `Harga: ${price.price}\n`;
  // Add game ID if applicable
  if (product.formType === "game" || product.formType === "hoyogame") {
    message += `ID Game: ${formData.gameId}\n`;
    message += `Nick In Game: ${formData.nickGame}\n`;
  }

  // Add server if applicable
  if (
    (product.needServer || product.formType === "hoyogame") &&
    formData.server
  ) {
    message += `Server: ${formData.server}\n`;
  }

  message += `Nomor Handphone: ${formData.phone}\n\n`;
  message += `Tolong segara proses yah min, Terima kasih min.`;

  return encodeURIComponent(message);
}

// Handle checkout form submission
function handleCheckoutSubmit(e) {
  e.preventDefault();

  // Get form values
  const formData = {
    phone: document.getElementById("phone").value,
  };

  // Get game ID if applicable
  if (
    currentProduct.formType === "game" ||
    currentProduct.formType === "hoyogame"
  ) {
    formData.gameId = document.getElementById("game-id").value;
    formData.nickGame = document.getElementById("nickname").value;
  }

  // Get server if applicable
  if (currentProduct.needServer || currentProduct.formType === "hoyogame") {
    if (currentProduct.formType === "hoyogame") {
      formData.server = document.getElementById("server").value;
    } else if (document.getElementById("server")) {
      formData.server = document.getElementById("server").value;
    }
  }

  // Format WhatsApp message
  const message = formatWhatsAppMessage(currentProduct, currentPrice, formData);

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/6287775314721?text=${message}`;

  // Close checkout modal
  closeCheckoutModal();

  // Open WhatsApp in a new tab
  window.open(whatsappURL, "_blank");

  // Show success message
  document.getElementById(
    "success-message"
  ).textContent = `Terima kasih telah berbelanja di Anjang Store. Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan.`;
  successModal.classList.remove("hidden");

  // Reset form
  checkoutForm.reset();
}

// Close success modal
function closeSuccessMessage() {
  successModal.classList.add("hidden");
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  menuToggle.addEventListener("click", toggleMobileMenu);

  // Search input
  searchInput.addEventListener("input", renderProducts);

  // Category filters
  categoryFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterByCategory(btn.dataset.category);
    });
  });

  // Back to products button
  backToProductsBtn.addEventListener("click", () => {
    showSection("produk");
    window.location.hash = "produk";
  });

  // Checkout modal
  closeModal.addEventListener("click", closeCheckoutModal);
  checkoutForm.addEventListener("submit", handleCheckoutSubmit);

  // Success modal
  closeSuccessModal.addEventListener("click", closeSuccessMessage);

  // Show beranda section by default
  showSection("beranda");
});
