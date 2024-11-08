const cloudinary = require("cloudinary");
const dotenv = require("dotenv")

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const ImageUploadContainer = async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path)
        // console.log("received data")
        res.json({
            url: result.secure_url,
            public_id: result.public_id
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = { ImageUploadContainer }