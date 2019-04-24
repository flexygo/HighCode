CREATE PROCEDURE [dbo].[zMerge](
@table varchar(776),
@from varchar(800) = NULL
)
AS
----------------------------------------------------------------------------------
--#NAME
--		ZMerge
--#CREATION
-- 		16/01/2018
--#CLASIFICATION
-- 		Framework/Utils
--#DESCRIPTION
-- 		Create a merge sentence from table. Lite version of sp_generate_merge
--#PARAMETERS
--		@table varchar(776) The table/view for which the MERGE statement will be generated using the existing data
--		@from varchar(800) = NULL Use this parameter to filter the rows based on a filter condition (using WHERE)
--#OBSERVATIONS
-- 		
--#CHANGES
-- 		
----------------------------------------------------------------------------------
BEGIN

	exec sp_generate_merge @table_name=@table,@from=@from

END