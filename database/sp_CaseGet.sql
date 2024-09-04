USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_CasoGet]    Script Date: 4/09/2024 10:11:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Angelo Diaz
-- Create Date: 02/09/2024
-- Description: Se toma los casos pendientes del analista en consulta
-- =============================================
ALTER PROCEDURE [dbo].[sp_CasoGet]
(	
	  @caseId bigint
)
AS
BEGIN
 select a.caseId,
	a.clientId, d.externalId, d.documentType,d.documentNumber, d.lastName, d.firstName, d.flgActive, d.typeClientId, h.typeClientName,
	a.numCase, a.flgConcentrator,a.flgMasive, 
	a.companyId, e.companyName,
	a.flgRecentUpload,b.fecGeneration, b.fecStartEvaluation, b.fecEndEvalution, 
	b.analystId, c.[name] analystName, c.email emailAnalyst,
	b.flgMasiveClosed, b.flgEvaluated, 
	b.statusId, f.statusName,
	b.commentAnalyst, b.fecUpdate, b.amount, 
	b.fraudMotiveId, g.motiveFraudName
	from cases a left join evaluations b  on a.caseId = b.caseId
				 left join analysts c on b.analystId = c.analystId
				 left join clients d on a.clientId = d.clientId
				 left join type_clients h on d.typeClientId = h.typeClientId
				 left join companies e on a.companyId = e.companyId
				 left join [status] f on b.statusId = f.statusId
				 left join fraud_motives g on b.fraudMotiveId = g.motiveFraudId
	where a.caseId = @caseId	
END
