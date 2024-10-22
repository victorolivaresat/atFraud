const sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");
const multer = require("multer");
const upload = multer({ dest: "public/cases" });

const getDocumentsByCaseId = async (req, res) => {
  try {
    const { caseId } = req.params;

    const documentsData = await sequelize.query(
      "EXEC [dbo].[sp_DocumentsGet] @caseId = :caseId",
      {
        replacements: { caseId },
        type: QueryTypes.SELECT,
      }
    );

    if (documentsData.length > 0) {
      res.status(200).json(documentsData);
    } else {
      res.status(404).json({ error: "No documents found for the given case" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error fetching documents: ${error.message}` });
  }
};

const addDocumentToCase = async (req, res) => {
  console.log("req.file", req.file);
  console.log("req.body", req.body);

  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const { caseId, flgEvaluation, analystId } = req.body;
    const documentName = req.file.originalname;
    const filePath = req.file.path;

    await sequelize.query(
      "EXEC [dbo].[sp_DocumentsSet] @caseId = :caseId, @path = :path, @documentName = :documentName, @flgEvaluation = :flgEvaluation, @analystId = :analystId",
      {
        replacements: {
          caseId,
          path: filePath,
          documentName,
          flgEvaluation,
          analystId,
        },
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Document added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error adding document: ${error.message}` });
  }
};

const deleteDocumentById = async (req, res) => {
  try {
    const { documentId } = req.params;

    await sequelize.query(
      "EXEC [dbo].[sp_DocumentsDelete] @documentId = :documentId",
      {
        replacements: { documentId },
        type: QueryTypes.DELETE,
      }
    );

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error deleting document: ${error.message}` });
  }
};

module.exports = {
  getDocumentsByCaseId,
  addDocumentToCase,
  deleteDocumentById,
};
