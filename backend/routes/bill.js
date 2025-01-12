const express = require('express');
const Bill = require('../models/Bill'); 
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const bill = new Bill(req.body); 
        await bill.save(); 
        res.status(201).json(bill); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find()
            .populate('customer') 
            .populate('products.product'); 
        res.json(bills); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/totalsales-revenue', async (req, res) => {
    try {
        const result = await Bill.aggregate([
            {
                $unwind: "$products"  
            },
            {
                $group: {
                    _id: null,  
                    totalSales: { $sum: "$products.quantity" },  
                    totalRevenue: { $sum: { $multiply: ["$products.quantity", "$products.price"] } }  
                }
            },
            {
                $project: {
                    _id: 0, 
                    totalSales: 1,
                    totalRevenue: 1
                }
            }
        ]);

        res.status(200).json(result[0]);  
    } catch (error) {
        console.error('Error calculating totals:', error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
