const File = require("../model/Archschale");
const cloudinary = require("cloudinary").v2;


//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
const MAX_FILE_SIZE_MB = 15;
//image upload ka hadnler
exports.imageUpload = async (req, res) => {
    try {
        const file = req.files.imageFile;
        console.log(file);

        // Check file size
        const fileSizeInBytes = file.size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert bytes to megabytes
        console.log("File Size:", fileSizeInMB, "MB");

        if (fileSizeInMB > MAX_FILE_SIZE_MB) {
            return res.status(400).json({
                success: false,
                message: `File size exceeds the limit of ${MAX_FILE_SIZE_MB} MB`,
            });
        }

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png", "pdf","avif","mp3","mp4"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("File Type:", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // File format is supported
        console.log("Uploading...");
        const response = await uploadFileToCloudinary(file, "Temporary");
        console.log(response);

        // Save entry to the database
        const fileData = await File.create({
            imageUrl: response.secure_url,
            changeDate:Date.now(),
        });
        const readableChangeDate = new Date(fileData.changeDate).toLocaleString();
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded",
            changeDate: readableChangeDate,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


