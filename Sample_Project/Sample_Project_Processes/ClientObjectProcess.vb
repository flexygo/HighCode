Imports FLEXYGO.Configuration.Tokens
Imports FLEXYGO.Data
Imports FLEXYGO.Exceptions
Imports FLEXYGO.Objects
Imports FLEXYGO.Processing
Imports FLEXYGO.Processing.ProcessManager
Imports FLEXYGO.Utilities.General
Imports FLEXYGO.Utilities.General.Util

Public Class ClientObjectProcess
    ''' <summary>
    ''' Convert Potencial Client to a National one
    ''' </summary>
    ''' <param name="Entity">User Entity object with all info</param>
    ''' <param name="Ret">ProcessHelper for returning results</param>
    Public Shared Function ConvertToNational(Entity As EntityObject, Ret As ProcessHelper) As Boolean
        Try

            If Entity("IdType") = 4 Then
                Entity("IdType") = 1
            End If

            If Entity.Update() Then
                Ret.Success = True
                Return True
            Else
                Ret.Success = False
                Ret.LastException = Entity.LastException
                Return False
            End If

        Catch ex As Exception
            Ret.Success = False
            Ret.LastException = ex
            Return False
        End Try
    End Function
End Class
