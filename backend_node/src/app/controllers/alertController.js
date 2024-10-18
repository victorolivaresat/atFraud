const sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");

const getAlertsByCaseId = async (req, res) => {
  try {
    const { caseId } = req.params;

    const alertsData = await sequelize.query(
      "EXEC [dbo].[sp_AlertsGet] @caseId = :caseId",
      {
        replacements: { caseId },
        type: QueryTypes.SELECT,
      }
    );

    if (alertsData.length > 0) {
      res.status(200).json(alertsData);
    } else {
      res.status(404).json({ error: "No alerts found for the given case" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error fetching alerts: ${error.message}` });
  }
};

module.exports = {
  getAlertsByCaseId,
};