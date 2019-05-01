SET NUMERIC_ROUNDABORT OFF
GO
SET XACT_ABORT, ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
BEGIN TRANSACTION


EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT all'

EXEC sp_MSforeachtable 'ALTER TABLE ? DISABLE TRIGGER all'

--INICIO DATOS

:r .\data\actions.sql
:r .\data\action_states.sql
:r .\data\action_types.sql
:r .\data\client.sql
:r .\data\client_state.sql
:r .\data\client_type.sql
:r .\data\carousel.sql
:r .\data\contact.sql
:r .\data\countries.sql
:r .\data\employee.sql
:r .\data\product.sql
:r .\data\projects.sql
:r .\data\sale.sql
:r .\data\sale_product.sql
:r .\data\team.sql
:r .\data\tasks.sql
:r .\data\tasks_states.sql

--- FIN SECCIONA DATOS POR DEFECTO

EXEC sp_MSforeachtable 'ALTER TABLE ? ENABLE TRIGGER all'
EXEC sp_MSforeachtable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL'

COMMIT TRANSACTION


GO 