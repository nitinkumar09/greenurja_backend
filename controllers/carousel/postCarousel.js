const express = require("express");
const Carousel = require("../../models/Carousel");
 exports.postCarousel = async (req, res) => {
    try {
        console.log("Received request to create carousel item:", req.body);
        const { image, title } = req.body;
        const newCarousel = new Carousel({ image, title });
        await newCarousel.save();
        res.status(201).json({ message: "Carousel item created successfully" });
    } catch (error) {
        console.error("Error creating carousel item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}