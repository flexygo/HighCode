
Imports FLEXYGO.Caching
Imports FLEXYGO.Data
Imports FLEXYGO.Objects
Imports FLEXYGO.Processing.ProcessManager
Imports FLEXYGO.Web

''' <summary>
''' Class Public Class CoursesProcesses.
''' </summary>
Public Class CoursesProcesses
    ''' <summary>
    ''' Apply Step
    ''' </summary>
    ''' <param name="Entity">Entity object with all info</param>
    ''' <param name="Ret">ProcessHelper for returning results</param>
    Public Shared Function ApplyStep(Entity As EntityObject, ByVal Course As String, ByVal [Step] As String, Ret As ProcessHelper) As Boolean
        Dim dmConf As DataManager
        Dim dmData As DataManager
        Dim dt As DataTable
        Try
            dmConf = New DataManager("ConfConnectionString")
            dmData = New DataManager("DataConnectionString")
            dt = dmData.DataTable(String.Format("Select Script, ConnStringId
                                                    From Scripts 
                                                    INNER JOIN Steps ON Scripts.StepId = Steps.StepId AND Steps.CourseId = '{0}'
                                                    INNER JOIN Steps AS Step ON Steps.[Order] <= Step.[Order] AND Step.StepId = '{1}' AND Step.CourseId='{0}'
                                                    WHERE Scripts.[Inherit] = CASE WHEN Scripts.StepId = '{1}' THEN Scripts.[Inherit] ELSE 1 END
                                                    ORDER BY Steps.[Order] ASC", Course, [Step]))

            dmConf.BeginTrans()
            dmConf.ExecuteSQLInstruction("sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT all'")
            dmConf.ExecuteSQLInstruction("sp_msforeachtable 'ALTER TABLE ? DISABLE TRIGGER all'")
            dmData.BeginTrans()
            dmData.ExecuteSQLInstruction("sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT all'")
            dmData.ExecuteSQLInstruction("sp_msforeachtable 'ALTER TABLE ? DISABLE TRIGGER all'")

            dmConf.ExecuteSQLInstruction(IO.File.ReadAllText(Ret.ConfToken.MapPath("~/custom/Courses/Utils/CleanSteps.sql")).Replace(vbNewLine & "GO", ";"))

            For Each row As DataRow In dt.Rows
                If Not IO.File.Exists(Ret.ConfToken.MapPath(row.Item("Script").ToString)) Then
                    Throw New Exception("The file does not exist: " & row.Item("Script").ToString)
                End If
                If row.Item("ConnStringId").ToString = "ConfConnectionString" Then
                    dmConf.ExecuteSQLInstruction(IO.File.ReadAllText(Ret.ConfToken.MapPath(row.Item("Script").ToString)).Replace(vbNewLine & "GO", ";"))
                ElseIf row.Item("ConnStringId").ToString = "DataConnectionString" Then
                    dmData.ExecuteSQLInstruction(IO.File.ReadAllText(Ret.ConfToken.MapPath(row.Item("Script").ToString)).Replace(vbNewLine & "GO", ";"))
                End If
            Next
            dmConf.ExecuteSQLInstruction("sp_MSforeachtable 'ALTER TABLE ? CHECK CONSTRAINT all'")
            dmConf.ExecuteSQLInstruction("sp_msforeachtable 'ALTER TABLE ? ENABLE TRIGGER all'")
            If dmConf.InTrans Then
                dmConf.CommitTrans()
            End If
            dmData.ExecuteSQLInstruction("sp_MSforeachtable 'ALTER TABLE ? CHECK CONSTRAINT all'")
            dmData.ExecuteSQLInstruction("sp_msforeachtable 'ALTER TABLE ? ENABLE TRIGGER all'")
            If dmData.InTrans Then
                dmData.CommitTrans()
            End If
            MyCache.Clear()
            MySession.Clear()
            Ret.Success = True
            Ret.JSCode = "location.reload(true)"
            Return False
        Catch ex As Exception

            If dmConf IsNot Nothing AndAlso dmConf.InTrans Then
                dmConf.RollbackTrans()
            End If
            If dmData IsNot Nothing AndAlso dmData.InTrans Then
                dmConf.RollbackTrans()
            End If

            Ret.Success = False
            Ret.LastException = ex
            Return False
        Finally
            If dt IsNot Nothing Then
                dt.Clear()
            End If
            If dmData IsNot Nothing Then
                dmData.Close()
            End If
            If dmConf IsNot Nothing Then
                dmConf.Close()
            End If
        End Try
    End Function
End Class
