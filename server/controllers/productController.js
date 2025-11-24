// server/controllers/productController.js

// **Genişletilmiş 20 ürünlük demo veri**
const sampleProducts = [
    // 1
    { 
        id: 1, 
        name: "Leather Jacket", 
        price: 12000, 
        description: "Hızlı ve modern.",
        category: "Erkek",
        image: "/images/ceket1.jpg",
        hoverImage: "/images/ceket2.jpg"
    },

    // 2
    { 
        id: 2, 
        name: "Bag", 
        price: 25000, 
        description: "Premium deri kadın çanta.",
        category: "Kadın",
        image: "/images/bag1.jpg",
        hoverImage: "/images/bag2.jpg"
    },

    // 3
    { 
        id: 3, 
        name: "Kablosuz Kulaklık", 
        price: 1500, 
        description: "Yüksek ses kalitesi.",
        category: "Teknoloji",
        image: "/images/headphone.jpg",
        hoverImage: "/images/headphone2.jpg"
    },

    // 4
    { 
        id: 4, 
        name: "Güneş Gözlüğü", 
        price: 800, 
        description: "Tarz ve koruma bir arada.",
        category: "Aksesuar",
        image: "/images/glasses1.jpg",
        hoverImage: "/images/glasses2.jpg"
    },

    // 5
    { 
        id: 5, 
        name: "Sneaker Ayakkabı", 
        price: 2200, 
        description: "Her gün rahatlık.",
        category: "Kadın",
        image: "/images/shoes1.jpg",
        hoverImage: "/images/shoes2.jpg"
    },

    // 6
    { 
        id: 6,
        name: "Erkek Siyah T-Shirt",
        price: 350,
        description: "Yumuşak pamuklu günlük kullanım.",
        category: "Erkek",
        image: "/images/tshirt1.jpg",
        hoverImage: "/images/tshirt2.jpg"
    },

    // 7
    {
        id: 7,
        name: "Kadın Crop Top",
        price: 290,
        description: "Şık ve rahat.",
        category: "Kadın",
        image: "/images/crop1.jpg",
        hoverImage: "/images/crop2.jpg"
    },

    // 8
    {
        id: 8,
        name: "Spor Ayakkabı",
        price: 1800,
        description: "Koşu ve yürüyüş için ideal.",
        category: "Spor",
        image: "/images/sport1.jpg",
        hoverImage: "/images/sport2.jpg"
    },

    // 9
    {
        id: 9,
        name: "Akıllı Saat",
        price: 3200,
        description: "Sağlık takibi ve bildirimler.",
        category: "Teknoloji",
        image: "/images/watch1.jpg",
        hoverImage: "/images/watch2.jpg"
    },

    // 10
    {
        id: 10,
        name: "Kadın Jean",
        price: 850,
        description: "Skinny fit denim.",
        category: "Kadın",
        image: "/images/jean1.jpg",
        hoverImage: "/images/jean2.jpg"
    },

    // 11
    {
        id: 11,
        name: "Erkek Mont",
        price: 2600,
        description: "Kışlık sıcak tutan mont.",
        category: "Erkek",
        image: "/images/mont1.jpg",
        hoverImage: "/images/mont2.jpg"
    },

    // 12
    {
        id: 12,
        name: "Şapka",
        price: 150,
        description: "Tarz bir tamamlayıcı.",
        category: "Aksesuar",
        image: "/images/hat1.jpg",
        hoverImage: "/images/hat2.jpg"
    },

    // 13
    {
        id: 13,
        name: "Kadın Çizme",
        price: 3250,
        description: "Kış sezonu için ideal.",
        category: "Kadın",
        image: "/images/boot1.jpg",
        hoverImage: "/images/boot2.jpg"
    },

    // 14
    {
        id: 14,
        name: "Sırt Çantası",
        price: 600,
        description: "Günlük kullanım için hafif.",
        category: "Aksesuar",
        image: "/images/backpack1.jpg",
        hoverImage: "/images/backpack2.jpg"
    },

    // 15
    {
        id: 15,
        name: "Bluetooth Hoparlör",
        price: 980,
        description: "Güçlü bass performansı.",
        category: "Teknoloji",
        image: "/images/speaker1.jpg",
        hoverImage: "/images/speaker2.jpg"
    },

    // 16
    {
        id: 16,
        name: "Erkek Deri Kemer",
        price: 450,
        description: "%100 gerçek deri.",
        category: "Erkek",
        image: "/images/belt1.jpg",
        hoverImage: "/images/belt2.jpg"
    },

    // 17
    {
        id: 17,
        name: "Kadın Parfüm",
        price: 780,
        description: "Çiçeksi kalıcı bir koku.",
        category: "Kadın",
        image: "/images/perfume1.jpg",
        hoverImage: "/images/perfume2.jpg"
    },

    // 18
    {
        id: 18,
        name: "Erkek Parfüm",
        price: 820,
        description: "Odunsu taze bir koku.",
        category: "Erkek",
        image: "/images/perfume3.jpg",
        hoverImage: "/images/perfume4.jpg"
    },

    // 19
    {
        id: 19,
        name: "Gaming Mouse",
        price: 540,
        description: "RGB ışıklı hassas sensör.",
        category: "Teknoloji",
        image: "/images/mouse1.jpg",
        hoverImage: "/images/mouse2.jpg"
    },

    // 20
    {
        id: 20,
        name: "Spor Tayt",
        price: 430,
        description: "Esnek ve nefes alan kumaş.",
        category: "Spor",
        image: "/images/tights1.jpg",
        hoverImage: "/images/tights2.jpg"
    },
];

// Tüm ürünleri döndüren fonksiyon
exports.getProducts = (req, res) => {
    res.json(sampleProducts);
};

// Belirli bir ürünü ID ile döndüren fonksiyon
exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id); 
    const product = sampleProducts.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Ürün bulunamadı.' });
    }
};
