CREATE PROCEDURE [dbo].[zScript]
	@OutputPath NVARCHAR(256)
AS

	DECLARE @tabla		NVARCHAR(128)
	DECLARE @SQL		NVARCHAR(MAX)
	DECLARE @Count		INT
	DECLARE @msg table(msg nvarchar(max))

	SET NOCOUNT ON

	
	DECLARE curTablas CURSOR FOR
	SELECT Name from sys.tables

	
	  
	IF LEN(ISNULL(@OutputPath,''))>0 BEGIN
		SET @OutputPath=RTRIM(LTRIM(@OutputPath))
		IF RIGHT(@OutputPath,1)<>N'\' SET @OutputPath=@OutputPath + N'\'
	END

	
	OPEN curTablas
	FETCH NEXT FROM curTablas INTO @tabla
	WHILE @@FETCH_STATUS <> -1 BEGIN

		print @tabla
		
		SELECT @Count = 0

		SELECT @SQL = N'SELECT @Count = COUNT(1) FROM ' + @tabla 

		EXEC sp_executesql @SQL, @Params = N'@Count INT OUTPUT', @Count = @Count OUTPUT

		IF @Count>0 BEGIN

		
			SELECT @SQL = N'DECLARE @sql varchar(max);exec sp_generate_merge @ReturnSQL = 1, @OutputSQL = @sql OUTPUT, @Table_Name = ''' + @tabla + N''';SELECT @sql'

 
			/*


				-- To allow advanced options to be changed.  
				EXEC sp_configure 'show advanced options', 1;  
				GO  
				-- To update the currently configured value for advanced options.  
				RECONFIGURE with override;  
				GO  
				-- To enable the feature.  
				EXEC sp_configure 'xp_cmdshell', 1;  
				GO  
				-- To update the currently configured value for this feature.  
				RECONFIGURE with override;  
				GO  
			*/

				DECLARE @OutputFile NVARCHAR(100)  
				SET @OutputFile = LOWER(@tabla) + '.sql'
				
				declare @bcpCommand NVARCHAR(1000)				

				----Deleting file if exists
				--set @bcpCommand = 'powershell -Command "If (Test-Path ''' + @outputpath + @outputfile + '''){Remove-Item ''' + @outputpath + @outputfile + '''}"'
		
				--DELETE @Msg
				--INSERT INTO @msg
				--EXEC master.sys.xp_cmdshell @bcpCommand
 
				--IF EXISTS(SELECT 1 FROM @Msg WHERE MSG LIKE '%ERROR%') BEGIN
				--	SELECT @SQL=N'Error deleting file: ' + @Tabla+NCHAR(13)+NCHAR(10)
				--	SELECT @SQL=@SQL + ISNULL(MSG,'') +NCHAR(13)+NCHAR(10) FROM @MSG
				--	RAISERROR(@SQL,12,1)
				--END

				----Generating file

				SET @bcpCommand = 'bcp "USE ' + DB_NAME() + ';' + @SQL + ' " queryout '
				SET @bcpCommand = @bcpCommand + '"'+@outputPath + @OutputFile + '" -T -c -C 65001 -S'+ @@servername
				

				DELETE @Msg
				INSERT INTO @msg
				EXEC master.sys.xp_cmdshell @bcpCommand
 
				IF EXISTS(SELECT 1 FROM @Msg WHERE MSG LIKE '%ERROR%') BEGIN
					SELECT @SQL=N'Error processing table: ' + @Tabla+NCHAR(13)+NCHAR(10)
					SELECT @SQL=@SQL + ISNULL(MSG,'') +NCHAR(13)+NCHAR(10) FROM @MSG
					RAISERROR(@SQL,12,1)
				END
				 
				----PowerShell script to add BOM mark to start of file
				
				set @bcpCommand = 'powershell -Command "(239 -as [char])+(187 -as [char])+(191 -as [char])+(Get-Content -path ''' + @outputpath + @outputfile + ''' -Raw) | Set-Content ''' + @outputpath + @outputfile + ''' "'
				

				DELETE @Msg
				INSERT INTO @msg
				EXEC master.sys.xp_cmdshell @bcpCommand
 
				IF EXISTS(SELECT 1 FROM @Msg WHERE MSG IS NOT NULL) BEGIN
					SELECT @SQL=N'Error encoding file: ' + @Tabla+NCHAR(13)+NCHAR(10)
					SELECT @SQL=@SQL + ISNULL(MSG,'') +NCHAR(13)+NCHAR(10) FROM @MSG
					RAISERROR(@SQL,12,1)
				END
				

		END

		
		FETCH NEXT FROM curTablas INTO @tabla
	END
	DEALLOCATE curTablas




	RETURN 0