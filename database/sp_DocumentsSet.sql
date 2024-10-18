USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentsSet]    Script Date: 18/10/2024 10:38:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Angelo Diaz
-- Create Date: 05/09/2024
-- Description: Se toma los documentos subidos al caso seleccionado
-- =============================================
ALTER PROCEDURE [dbo].[sp_DocumentsSet]
(
    @caseId bigint,
    @path varchar(500),
    @documentName varchar(500),
    @flgEvaluation bit,
    @analystId int
)
AS
BEGIN
    -- Validar si el caseId existe en la tabla cases
    IF NOT EXISTS (SELECT 1 FROM cases WHERE caseId = @caseId)
    BEGIN
        RAISERROR('El caseId no existe en la tabla cases.', 16, 1);
        RETURN;
    END

    -- Validar si el path no es vacío o NULL
    IF @path IS NULL OR LTRIM(RTRIM(@path)) = ''
    BEGIN
        RAISERROR('El campo path no puede ser nulo o vacío.', 16, 1);
        RETURN;
    END

    -- Validar si el documentName no es vacío o NULL
    IF @documentName IS NULL OR LTRIM(RTRIM(@documentName)) = ''
    BEGIN
        RAISERROR('El campo documentName no puede ser nulo o vacío.', 16, 1);
        RETURN;
    END

    -- Validar que flgEvaluation sea 1 o 0
    IF @flgEvaluation NOT IN (0, 1)
    BEGIN
        RAISERROR('El campo flgEvaluation solo puede ser 1 o 0.', 16, 1);
        RETURN;
    END

    -- Validar si el analystId existe en la tabla analysts
    IF NOT EXISTS (SELECT 1 FROM analysts WHERE analystId = @analystId)
    BEGIN
        RAISERROR('El analystId no existe en la tabla analysts.', 16, 1);
        RETURN;
    END

    -- Si todas las validaciones pasan, insertar el registro en la tabla documents
    INSERT INTO documents (caseId, [path], documentName, fecRegister, flgEvaluation, analystId)
    VALUES (@caseId, @path, @documentName, GETDATE(), @flgEvaluation, @analystId);

	-- Mensaje de éxito al insertar correctamente
    RAISERROR('El registro se ha insertado correctamente.', 0, 1);
END
