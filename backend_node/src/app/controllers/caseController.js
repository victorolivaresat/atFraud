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

const updateCaseEvaluation = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { newComment, newAmount, newFraudMotiveId, newStatusId } = req.body;

    const result = await sequelize.query(
      "EXEC [dbo].[sp_CaseEvalSet] @caseId = :caseId, @newComment = :newComment, @newAmount = :newAmount, @newFraudMotiveId = :newFraudMotiveId, @newStatusId = :newStatusId",
      {
        replacements: { caseId, newComment, newAmount, newFraudMotiveId, newStatusId },
        type: QueryTypes.SELECT,
      }
    );

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: "Case not found or no changes made" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error updating case evaluation: ${error.message}` });
  }
};

const getEvaluationsAttended = async (req, res) => {
  try {
    const { analystId } = req.params;
    const result = await sequelize.query(
      "DECLARE @attendedCount INT; EXEC [dbo].[sp_EvalAtendidas] @analystId = :analystId, @attendedCount = @attendedCount OUTPUT; SELECT @attendedCount AS attendedCount;",
      {
        replacements: { analystId },
        type: QueryTypes.SELECT,
      }
    );

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: "No evaluations found for the given analyst" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error fetching evaluations: ${error.message}` });
  }
};

const getEvaluationsPending = async (req, res) => {
  try {
    const { analystId } = req.params;
    const result = await sequelize.query(
      "DECLARE @pendingCount INT; EXEC [dbo].[sp_EvalPendientes] @analystId = :analystId, @pendingCount = @pendingCount OUTPUT; SELECT @pendingCount AS pendingCount;",
      {
        replacements: { analystId },
        type: QueryTypes.SELECT,
      }
    );

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: "No pending evaluations found for the given analyst" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error fetching pending evaluations: ${error.message}` });
  }
};

module.exports = {
  getCaseById,
  getCasesInEvaluation,
  updateCaseEvaluation,
  getEvaluationsAttended,
  getEvaluationsPending,
};