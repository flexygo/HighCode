--IF @OriginId != 0 
	--BEGIN
	
       declare @CRLF nvarchar(2) = char(13) + char(10)
       Declare @SQLSentence nvarchar(max)
       declare @CurrentOriginId nvarchar(2)
       declare @error nvarchar(max)

       set @CurrentOriginId=convert(varchar(2),(select Originid from Origins where OriginId=2))

       ;WITH vOrigins AS (
       select 'select count(*) as OriginCount,'''+o.name+''' as TableName from ['+o.name+']  where OriginId='+@CurrentOriginId as OriginsTest, o.name as TableName from sysobjects  o
       inner join syscolumns c on c.id=o.id and c.name='OriginId'
       where o.type='U' and (o.name not like '%zVersion_%' and o.name <> 'Origins')
       )
       Select   
                    @SQLSentence=replace(replace('select @xml = (select ''delete from ''+TableName+ '' where originid='+@CurrentOriginId+''' as TableName from ('+substring((
                           Select 'UNION '+ST1.OriginsTest  AS [text()]
                           From vOrigins ST1
                           ORDER BY ST1.OriginsTest
                           For XML PATH ('')
                    ),7,100000000000000)+') A where a.OriginCount>0 for xml path('''') )' ,'&gt;','>'),'&lt;','<')

       declare @xmlout xml
       DECLARE @ParmDefinition nvarchar(500); 

       exec sp_executesql @SQLSentence, N'@xml xml OUTPUT' ,@XML=@XMLout OUTPUT

       if not @XMLOut is null BEGIN

             declare @deleteString nvarchar(max)

             SELECT @deleteString= @CRLF + replace(replace(replace(replace(convert(nvarchar(max),@XMLout),'<originCount>',''),'</originCount>',' '),'<TableName>',''),'</TableName>',@CRLF) 
             exec sp_executesql @deleteString
       END

	--END

	--RETURN 1