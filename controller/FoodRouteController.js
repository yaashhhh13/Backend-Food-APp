const FoodModel = require("../model/Food.js");

const CreateFood = async (req, res) => {
    try {
        console.log("starting backend food creating process")

        const { FoodName, FoodPrice, FoodDescription, FoodCategory, FoodWeight, FoodImage } = req.body;
        const newFood = new FoodModel({
            FoodName, FoodPrice, FoodDescription, FoodCategory, FoodWeight, FoodImage
        })

        const saveFood = newFood.save()

        res.status(200).send({
            message: "food added successfully",
            success: true,
            data: {
                food: saveFood
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "internal server error",
            success: true
        })
    }
}

const getAllFoods = async (req, res) => {
    try {

        // console.log("get all food request accepted")
        
        const { FoodCategory } = req.query
        
        // console.log(FoodCategory)

        if (FoodCategory === 'all') {
            // console.log("resques for viewing all foods received")
            const foodItems = await FoodModel.find()

            res.status(200).send({
                message: "Food Successfully added",
                success: true,
                data: {
                    food: foodItems
                }
            })
        } else {
            // console.log(`request for viewing ${FoodCategory} foods received`)
            const foodItems = await FoodModel.find({ FoodCategory: FoodCategory })
            
            res.status(200).send({
                message: "Food Successfully added",
                success: true,
                data: {
                    food: foodItems
                }
            })
        }
        
        // console.log("get all food request completed")
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "internal server error",
            success: false
        })
    }
}

const getNewFood = async (req, res) => {
    try {

        const NewfoodItems = await FoodModel.find().sort({createdAt : -1}).limit(12);

        res.status(200).send({
            message: "showing 12 registered food",
            success: true,
            data: {
                food: NewfoodItems
            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "internal server error",
            success: true
        })
    }
}

const getFoodFromDistinctCategory = async (req, res) => {
    try {

        // console.log("request accepted")

        const DistinctCategory = await FoodModel.distinct("FoodCategory")
        const DistinctFood = await Promise.all(
            DistinctCategory.slice(0,4).map(async (category) => {
                const food = await FoodModel.findOne({FoodCategory:category});
                return food;
            })
        )

        // console.log(DistinctCategory);
        // console.log(DistinctFood);

        res.status(200).send({
            message: "showing 4 different category food",
            success: true,
            data: {
                food: DistinctFood
            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "internal server error",
            success: true
        })
    }
}

const getTopRatedFood = async (req, res) => {
    try {

        // console.log("top rated request")
        // console.log(req)

        const TopRatedFood= await FoodModel.find().sort({"FoodReviews.rating": -1}).limit(4)

        res.status(200).send({
            message: "showing Top Rated food",
            success: true,
            data: {
                food: TopRatedFood
            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "internal server error",
            success: true
        })
    }
}

const GetFoodById = async (req, res) => {
    try {

        const { id } = req.params

        const foodItemDets = await FoodModel.findById(id)

        res.status(200).send({
            message: "Food details founded successfully",
            success: true,
            data: {
                food: foodItemDets
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "internal server error",
            success: true
        })
    }
}

module.exports = { CreateFood, getAllFoods, GetFoodById , getNewFood, getFoodFromDistinctCategory, getTopRatedFood}