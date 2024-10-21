USE [totalsecureDESA]
GO
/****** Object:  StoredProcedure [dbo].[sp_CaseEvalSet]    Script Date: 21/10/2024 12:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Angelo Diaz
-- Create Date: 02/09/2024
-- Description: Se toman los casos pendientes del analista en consulta
-- =============================================
create PROCEDURE [dbo].[sp_CaseEvalMasiveSet]
(	
    @caseIds NVARCHAR(MAX),  -- Cambiado a NVARCHAR para manejar una lista de IDs
    @newComment NVARCHAR(MAX),
    @newAmount DECIMAL(16, 2),
    @newFraudMotiveId INT,
    @newStatusId INT
)
AS
BEGIN
    BEGIN TRY
        -- Iniciar la transacción
        BEGIN TRANSACTION;

        -- Actualizar campos de acuerdo a los caseIds
        UPDATE evaluations
        SET 
            commentAnalyst = @newComment,
            amount = @newAmount,
            fraudMotiveId = @newFraudMotiveId,
            fecUpdate = GETDATE(),  -- Actualiza fecUpdate a la fecha actual
            -- Si el nuevo statusId es 2, actualiza fecEndEvalution y cambia statusId
            fecEndEvalution = CASE 
                                WHEN @newStatusId = 2 THEN GETDATE() 
                                ELSE fecEndEvalution 
                              END,
            statusId = @newStatusId
        WHERE caseId IN (SELECT value FROM dbo.fn_SplitString(@caseIds, ','));  -- Usamos la función de división aquí

        -- Verificar si se afectó alguna fila
        IF @@ROWCOUNT = 0
        BEGIN
            -- Si no se actualizó ninguna fila, devolver un mensaje de error
            ROLLBACK TRANSACTION;
            THROW 50001, 'No se encontró ningún registro con los caseIds proporcionados.', 1;
        END

        -- Confirmar la transacción si todo salió bien
        COMMIT TRANSACTION;

        -- Devolver un mensaje de éxito
        SELECT 'Actualización exitosa' AS Mensaje, * FROM evaluations WHERE caseId IN (SELECT value FROM dbo.fn_SplitString(@caseIds, ','));

    END TRY
    BEGIN CATCH
        -- Manejar errores, revertir cambios y devolver el error
        ROLLBACK TRANSACTION;

        -- Capturar el mensaje de error
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(), 
            @ErrorSeverity = ERROR_SEVERITY(), 
            @ErrorState = ERROR_STATE();

        -- Devolver el mensaje de error
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO
