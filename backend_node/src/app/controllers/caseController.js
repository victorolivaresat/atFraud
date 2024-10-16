const sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");


const getCaseById = async (req, res) => {
  try {
    const { caseId } = req.params;

    const caseData = await sequelize.query(
      "EXEC [dbo].[sp_CaseGet] @caseId = :caseId",
      {
        replacements: { caseId },
        type: QueryTypes.SELECT,
      }
    );

    if (caseData.length > 0) {
      res.status(200).json(caseData[0]);
    } else {
      res.status(404).json({ error: "Case not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error fetching case: ${error.message}` });
  }
};


const getCasesInEvaluation = async (req, res) => {
  try {
    const { analystId } = req.params;

    const casesData = await sequelize.query(
      "EXEC [dbo].[sp_CasesEvalGet] @analystId = :analystId",
      {
        replacements: { analystId },
        type: QueryTypes.SELECT,
      }
    );

    if (casesData.length > 0) {
      res.status(200).json(casesData);
    } else {
      res.status(404).json({ error: "No cases found for the given analyst" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error fetching cases: ${error.message}` });
  }
};

module.exports = {
  getCaseById,
  getCasesInEvaluation,
};