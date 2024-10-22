USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_EvalPendientes]    Script Date: 22/10/2024 09:18:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Angelo Diaz
-- Create Date: 05/09/2024
-- Description: Se toma las alertas cargadas al caso seleccionado
-- =============================================
ALTER PROCEDURE [dbo].[sp_EvalPendientes]
    @analystId INT,
    @pendingCount INT OUTPUT  -- Definir un parámetro de salida
AS
BEGIN
    -- Contar la cantidad de evaluaciones pendientes para el analystId dado
    SELECT @pendingCount = COUNT(*)
    FROM evaluations
    WHERE analystId = @analystId
      AND statusId = 3;
END;