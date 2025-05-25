const PendingSeller = require('../../models/PendingSeller');

exports.rejectSeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        const seller = await PendingSeller.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Option 1: Delete the seller completely
        await PendingSeller.findByIdAndDelete(sellerId);

        // Option 2: Just update a status (e.g., isApproved = false / rejected = true)
        // seller.isApproved = false;
        // seller.rejected = true;
        // await seller.save();

        return res.status(200).json({ message: 'Seller rejected successfully' });
    } catch (error) {
        console.error('Error rejecting seller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
