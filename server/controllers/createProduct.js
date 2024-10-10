const path = require('path');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Ensure image is uploaded
        if (!req.files || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const file = req.files.image; // Get uploaded image
        const fileExtension = path.extname(file.name);
        const filename = Date.now() + fileExtension; // Create unique filename
        const uploadPath = path.join(__dirname, '../files/', filename); // Define where to store the file

        // Move the file to the 'files' folder
        file.mv(uploadPath, (err) => {
            if (err) {
                console.error("Error while moving file", err);
                return res.status(500).json({
                    success: false,
                    message: "Error while uploading the image",
                });
            }
        });

        // Create new product with image
        const response = await Product.create({
            name,
            description,
            price,
            image: filename, // Save the filename in the database
        });

        console.log("Product Created", response);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: response,
        });
    } catch (error) {
        console.error("Error while creating product", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

