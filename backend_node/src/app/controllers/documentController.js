const sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");

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
    res.status(500).json({ error: `Error fetching documents: ${error.message}` });
  }
};

module.exports = {
  getDocumentsByCaseId,
};