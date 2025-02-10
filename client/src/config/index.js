export const registerFormControls = [
  {
    name: "userName",
    label: "Username",
    placeholder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Saree Type",
    name: "saree_type",
    componentType: "select",
    options: [
      { id: "plain_sarees", label: "Plain Sarees" },
      { id: "designer_sarees", label: "Designer Sarees" },
      { id: "kanjivaram_sarees", label: "Kanjivaram Sarees" },
      { id: "banarasi_sarees", label: "Banarasi Sarees" },
      { id: "silk_sarees", label: "Silk Sarees" },
      { id: "cotton_sarees", label: "Cotton Sarees" },
      { id: "georgette_sarees", label: "Georgette Sarees" },
      { id: "net_sarees", label: "Net Sarees" },
      { id: "chiffon_sarees", label: "Chiffon Sarees" },
      { id: "linen_sarees", label: "Linen Sarees" }
    ]
  },
  {
    label: "Occasion",
    name: "occasion",
    componentType: "select",
    options: [
      { id: "wedding_sarees", label: "Wedding Sarees" },
      { id: "party_wear_sarees", label: "Party Wear Sarees" },
      { id: "casual_sarees", label: "Casual Sarees" },
      { id: "festive_sarees", label: "Festive Sarees" },
      { id: "bridal_sarees", label: "Bridal Sarees" },
    ]
  },
  {
    label: "Fabric",
    name: "fabric",
    componentType: "select",
    options: [
      { id: "silk", label: "Silk" },
      { id: "cotton", label: "Cotton" },
      { id: "chiffon", label: "Chiffon" },
      { id: "georgette", label: "Georgette" },
      { id: "linen", label: "Linen" },
      { id: "velvet", label: "Velvet" },
      { id: "crepe", label: "Crepe" }
    ]
  },
  {
    label: "Color",
    name: "color",
    componentType: "select",
    options: [
      { id: "red_sarees", label: "Red" },
      { id: "blue_sarees", label: "Blue" },
      { id: "green_sarees", label: "Green" },
      { id: "black_sarees", label: "Black" },
      { id: "white_sarees", label: "White" },
      { id: "pink_sarees", label: "Pink" },
      { id: "yellow_sarees", label: "Yellow" },
      { id: "gold_sarees", label: "Gold" },
      { id: "purple_sarees", label: "Purple" },
      { id: "orange_sarees", label: "Orange" },
      { id: "brown_sarees", label: "Brown" },
      { id: "beige_sarees", label: "Beige" },
      { id: "silver_sarees", label: "Silver" },
      { id: "gray_sarees", label: "Gray" },
      { id: "teal_sarees", label: "Teal" },
      { id: "maroon_sarees", label: "Maroon" },
      { id: "turquoise_sarees", label: "Turquoise" },
      { id: "lavender_sarees", label: "Lavender" },
      { id: "ivory_sarees", label: "Ivory" }
    ]
  },
  
  
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
