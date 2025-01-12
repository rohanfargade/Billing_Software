const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    totalSales: { type: Number, required: true },
    totalRevenue: { type: Number, required: true }
}, { _id: false }); 

module.exports = mongoose.model('Totals', DashboardSchema);
