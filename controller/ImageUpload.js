const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "das4vzabk",
    api_key: "326884228521657",
    api_secret: "MoQM73UNziX4gx6ZfurjGtaRDFQ"
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