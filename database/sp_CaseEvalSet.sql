ALTER PROCEDURE [dbo].[sp_CaseEvalSet]
(	
	@caseId bigint,
	@newComment NVARCHAR(max),
	@newAmount DECIMAL(16, 2),
	@newFraudMotiveId INT,
	@newStatusId INT
)
AS
BEGIN
    BEGIN TRY
        -- Iniciar la transacción
        BEGIN TRANSACTION;

        -- Actualizar campos de acuerdo al caseId
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
        WHERE caseId = @caseId;

        -- Verificar si se afectó alguna fila
        IF @@ROWCOUNT = 0
        BEGIN
            -- Si no se actualizó ninguna fila, devolver un mensaje de error
            ROLLBACK TRANSACTION;
            THROW 50001, 'No se encontró ningún registro con el caseId proporcionado.', 1;
        END

        -- Confirmar la transacción si todo salió bien
        COMMIT TRANSACTION;

        -- Devolver un mensaje de éxito
        SELECT 'Actualización exitosa' AS Mensaje, * FROM evaluations WHERE caseId = @caseId;

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