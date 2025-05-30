const xlsx = require("xlsx");
const Product = require("../../models/ProductMaster");

const uploadExcel = async (req, res) => {
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        if (data.length === 0) {
            return res.status(400).json({ message: "No data found in Excel file" });
        }

        // ✅ Ensure all expected fields exist in each row
        const expectedFields = [
            "ID", "Type", "SKU", "GTIN_UPC_EAN_or_ISBN", "Name", "Published",
            "Is_featured", "Visibility_in_catalog", "Short_description", "Description",
            "Date_sale_price_starts", "Date_sale_price_ends", "Tax_status", "Tax_class",
            "In_stock", "Stock", "Low_stock_amount", "Backorders_allowed", "Sold_individually",
            "Weight_kg", "Length_cm", "Width_cm", "Height_cm", "Allow_customer_reviews",
            "Purchase_note", "Sale_price", "Regular_price", "Categories", "Tags", "Shipping_class",
            "Images", "Download_limit", "Download_expiry_days", "Parent", "Grouped_products",
            "Upsells", "Cross_sells", "External_URL", "Button_text", "Position", "Brands"
        ];

        const fixedData = data.map(row => {
            const fixed = {};
            expectedFields.forEach(field => {
                fixed[field] = row[field] !== undefined ? row[field] : (
                    // Fields that should default to null if missing (numbers)
                    ["ID", "Published", "Is_featured", "In_stock", "Stock", "Low_stock_amount",
                        "Weight_kg", "Length_cm", "Width_cm", "Height_cm", "Download_limit",
                        "Download_expiry_days", "Position"].includes(field)
                        ? null
                        : ""
                );
            });
            return fixed;
        });

        await Product.insertMany(fixedData);

        res.status(200).json({ message: `${fixedData.length} products uploaded successfully` });
    } catch (err) {
        console.error("Excel Upload Error:", err);
        res.status(500).json({ message: "Failed to upload products" });
    }
};

module.exports = {
    uploadExcel,
};
