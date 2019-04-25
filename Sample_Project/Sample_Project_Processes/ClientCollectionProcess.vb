Imports FLEXYGO.Configuration.Tokens
Imports FLEXYGO.Data
Imports FLEXYGO.Exceptions
Imports FLEXYGO.Objects
Imports FLEXYGO.Processing
Imports FLEXYGO.Processing.ProcessManager
Imports FLEXYGO.Utilities.General
Imports FLEXYGO.Utilities.General.Util

Public Class ClientCollectionProcess
    ''' <summary>
    ''' Convert Potencial Client to a National one
    ''' </summary>
    ''' <param name="Entity">User Entity object with all info</param>
    ''' <param name="Ret">ProcessHelper for returning results</param>
    Public Shared Function ConvertToNationalColl(Entity As EntityCollection, Ret As ProcessHelper) As Boolean
        Try
            If Entity.Count > 0 Then

                For Each cliente As EntityObject In Entity
                    If cliente("IdType") = 4 Then
                        cliente("IdType") = 1
                    End If
                    If cliente.Update() Then
                        Ret.Success = True
                    Else
                        Ret.Success = False
                        Ret.LastException = cliente.LastException
                    End If
                Next
            End If

            Return Ret.Success

        Catch ex As Exception
            Ret.Success = False
            Ret.LastException = ex
            Return False
        End Try
    End Function
End Class
