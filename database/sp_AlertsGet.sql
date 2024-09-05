USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_AlertsGet]    Script Date: 5/09/2024 00:53:42 ******/
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
	select a.caseId,
		a.companyId,d.companyName,
		b.alertId,b.amount,b.comment,b.amount,b.fecRegister,b.flgActive,
		b.controlId,c.controlCode,c.controlName,c.flgActive,c.familyTransactionId,e.familyName
	from cases a left join alerts b on a.caseId = b.caseId
				 left join controls c on b.controlId = c.controlId
				 left join companies d on a.companyId = d.companyId
				 left join family_transactions e on c.familyTransactionId = e.familyId
	where a.caseId = @caseId
END
