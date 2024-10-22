USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_CasesEvalGet]    Script Date: 22/10/2024 10:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Angelo Diaz
-- Create Date: 16/08/2024
-- Description: Se toma los casos pendientes del analista en consulta
-- =============================================
ALTER PROCEDURE [dbo].[sp_CasesEvalGet]
(	
	  @analystId int
)
AS
BEGIN
  select a.caseId,a.numCase,
	a.clientId, d.externalId, d.documentType,d.documentNumber, d.lastName, d.firstName, d.flgActive, d.typeClientId, h.typeClientName,
	a.numCase, a.flgConcentrator,a.flgMasive, 
	a.companyId, e.companyName,
	a.flgRecentUpload,
	FORMAT(b.fecGeneration, 'dd/MM/yyyy HH:mm') fecGeneration,
	FORMAT(b.fecStartEvaluation, 'dd/MM/yyyy HH:mm') fecStartEvaluation,
	FORMAT(b.fecEndEvalution, 'dd/MM/yyyy HH:mm') fecEndEvalution,
	round((case when b.fecEndEvalution is null then DATEDIFF(HOUR,b.fecStartEvaluation,GETDATE())
		else DATEDIFF(hour,b.fecStartEvaluation,b.fecEndEvalution) end)/24.0,1) Dias,
	b.analystId, c.[name] analystName, c.email emailAnalyst,
	b.flgMasiveClosed, b.flgEvaluated, 
	b.statusId, f.statusName,
	b.commentAnalyst, b.fecUpdate, b.amount, 
	b.fraudMotiveId, g.motiveFraudName,
	al.controlId, al.amount, con.controlCode,con.controlName
	from cases a left join evaluations b  on a.caseId = b.caseId
				 left join analysts c on b.analystId = c.analystId
				 left join clients d on a.clientId = d.clientId
				 left join type_clients h on d.typeClientId = h.typeClientId
				 left join companies e on a.companyId = e.companyId
				 left join [status] f on b.statusId = f.statusId
				 left join fraud_motives g on b.fraudMotiveId = g.motiveFraudId
				 left join alerts al on al.caseId = a.caseId
				 left join controls con on al.controlId = con.controlId
	where b.statusId = 3 and b.analystId = @analystId
END


