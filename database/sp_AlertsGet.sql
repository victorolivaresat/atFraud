USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_AlertsGet]    Script Date: 18/10/2024 10:36:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Angelo Diaz
-- Create Date: 05/09/2024
-- Description: Se toma las alertas cargadas al caso seleccionado
-- =============================================
ALTER PROCEDURE [dbo].[sp_AlertsGet]
(	
	  @caseId bigint
)
AS
BEGIN
	SELECT a.caseId, b.alertId, b.fecRegister, b.amount, b.numCase, b.numAlert, b.flgEvaluation, b.flgActive, b.comment,
		b.controlId,c.controlCode , c.controlName, c.familyTransactionId, d.familyName
	FROM cases A LEFT JOIN alerts b on a.caseId = b.caseId
				left join controls c on c.controlId = b.controlId
				left join family_transactions d on d.familyId = c.familyTransactionId
	where a.caseId = @caseId
END
