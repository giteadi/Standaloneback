const File = require("../model/Archschale");

exports.updateData = async (req, res) => {
    try {
        // Fetch data from req.body
        const { assignTo, assignBy, description, dueDate, project, comment} = req.body;

        if (!assignBy || !assignTo || !description || !dueDate || !project || !comment) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        let exUser = await File.findOne({ project });

        if (exUser) {
            // Update existing user
            exUser = await File.findOneAndUpdate(
                { project },
                {
                   
                    assignTo: assignTo,
                    assignBy: assignBy,
                    description: description,
                    dueDate: dueDate,
                    project: project,
                    comment:comment,
                 
                },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "User updated successfully."
            });
        } else {
            // Create a new user
            const newUser = await File.create({
                assignTo: assignTo,
                assignBy: assignBy,
                description: description,
                dueDate: dueDate,
                project: project,
                comment:comment
               
            });

            res.status(201).json({
                success: true,
                message: "User created successfully."
                
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
};

exports.updatePost = async (req, res) => {
    try {
        // fetch comments
        const { email, comment } = req.body;

        if (!email || !comment) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields."
            });
        }

        const exUser = await File.findOneAndUpdate({ email }, { comment }, { new: true });

        res.status(201).json({
            success: true,
            message: "Comment updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Can't update comment. Something went wrong."
        });
    }
};

exports.showDate = async (req, res) => {
    try {
  
      const fileDocument = await File.findOne({});
  
     
      if (!fileDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json({ dueDate: fileDocument.dueDate });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  exports.showAssignTo = async (req, res) => {
    try {
      const { assigndTo,description } = req.body;
  
      if (!assigndTo || !description) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or missing assigndTo parameter in the request body',
        });
      }
  
      const assignToData = await File.find({ assigndTo },{description});
  
      if (!assignToData || assignToData.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No data found for the given assigndTo value',
        });
      }
  
      console.log('Response:', assignToData);
      res.status(200).json({
        success: true,
        assignToData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
  
  