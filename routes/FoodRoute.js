const express = require("express");
const protect = require("../middleware/authMiddleware");
const { CreateFood, getAllFoods, GetFoodById, getNewFood, getFoodFromDistinctCategory, getTopRatedFood } = require("../controller/FoodRouteController");
const router = express.Router()

router.post("/Addfood", protect, CreateFood)
router.get("/GetAllFood", getAllFoods)
router.get("/GetNewFood",protect, getNewFood)
router.get("/SpecialFoods", protect, getFoodFromDistinctCategory)
router.get("/TopRatedFood",protect, getTopRatedFood)
router.get("/Food-Dets/:id", GetFoodById)

module.exports = router