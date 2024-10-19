USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_AlertsGet]    Script Date: 18/10/2024 19:14:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Angelo Diaz
-- Create Date: 05/09/2024
-- Description: Se toma las alertas cargadas al caso seleccionado
-- =============================================
CREATE PROCEDURE sp_EvalAtendidas
    @analystId INT,
    @attendedCount INT OUTPUT  -- Parámetro de salida para el número de evaluaciones atendidas
AS
BEGIN
    -- Contar la cantidad de evaluaciones atendidas para el analystId dado (excluyendo statusId = 3)
    SELECT @attendedCount = COUNT(*)
    FROM evaluations
    WHERE analystId = @analystId
      AND statusId NOT IN (3)
      AND CAST(fecStartEvaluation AS DATE) >= DATEADD(DAY, -30, GETDATE());
END;