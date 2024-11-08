const express = require("express");
const protect = require("../middleware/authMiddleware");
const { CreateOrder, GetAllOrders, GetSingleOrderDets, markOrderAsDelivered } = require("../controller/OrderRouteController");
const router = express.Router()

router.post("/createOrder",CreateOrder)
router.post("/GetAllOrders", protect, GetAllOrders)
router.post("/GetOrder", protect, GetSingleOrderDets)
router.post("/DeliveredOrder", protect, markOrderAsDelivered )

module.exports = router