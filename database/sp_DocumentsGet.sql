USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentsGet]    Script Date: 5/09/2024 00:55:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Angelo Diaz
-- Create Date: 05/09/2024
-- Description: Se toma los documentos subidos al caso seleccionado
-- =============================================
ALTER PROCEDURE [dbo].[sp_DocumentsGet]
(	
	  @caseId bigint
)
AS
BEGIN
	select a.caseId,
		a.companyId,d.companyName,
		b.analystId,c.[name] analystName,
		b.documentId,b.documentName,b.[path] 
	from cases a left join documents b on a.caseId = b.caseId
				 left join analysts c on b.analystId = c.analystId
				 left join companies d on a.companyId = d.companyId
	where a.caseId = @caseId
END
