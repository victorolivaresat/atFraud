USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentsDelete]    Script Date: 18/10/2024 19:24:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Angelo Diaz
-- Create Date: 05/09/2024
-- Description: Se toma las alertas cargadas al caso seleccionado
-- =============================================
ALTER PROCEDURE [dbo].[sp_DocumentsDelete]
    @documentId INT
AS
BEGIN
    -- Iniciar una transacción
    BEGIN TRANSACTION;
    
    -- Validar si el documento existe
    IF EXISTS (SELECT 1 FROM documents WHERE documentId = @documentId)
    BEGIN
        -- Si existe, se procede a eliminar
        DELETE FROM documents WHERE documentId = @documentId;
        COMMIT TRANSACTION; -- Confirmar la transacción
    END
    ELSE
    BEGIN
        -- Si no existe, se levanta un error
        ROLLBACK TRANSACTION; -- Revertir la transacción si no se encuentra el documento
        RAISERROR('Documento no se pudo eliminar por que no existe', 16, 1, @documentId);
        RETURN; -- Salir del procedimiento si no se encuentra el documento
    END
END;