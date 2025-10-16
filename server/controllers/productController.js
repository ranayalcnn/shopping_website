// server/controllers/productController.js

// **Veritabanı yerine geçici olarak simüle edilmiş ürün verileri**
const sampleProducts = [
    { id: 1, name: "Akıllı Telefon", price: 12000, description: "Hızlı ve modern.", image: "/images/phone.jpg" },
    { id: 2, name: "Dizüstü Bilgisayar", price: 25000, description: "Yüksek performanslı.", image: "/images/laptop.jpg" },
    { id: 3, name: "Kablosuz Kulaklık", price: 1500, description: "Yüksek ses kalitesi.", image: "/images/headphone.jpg" },
];

// Tüm ürünleri döndüren fonksiyon
exports.getProducts = (req, res) => {
    // Gerçek uygulamada burası: const products = await Product.find({}); olurdu.
    // Şimdilik simüle edilmiş veriyi döndürüyoruz.
    res.json(sampleProducts);
};

// Belirli bir ürünü ID ile döndüren fonksiyon
exports.getProductById = (req, res) => {
    // URL'den gelen ID'yi alır
    const productId = parseInt(req.params.id); 
    
    const product = sampleProducts.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        // Ürün bulunamazsa 404 hatası döndür
        res.status(404).json({ message: 'Ürün bulunamadı.' });
    }
};