const Carousel= require("../../models/Carousel");
exports.getCarousel = async (req, res) => {
    try {
        const carouselItems = await Carousel.find();
        res.status(200).json(carouselItems);
    } catch (error) {
        console.error("Error fetching carousel items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
