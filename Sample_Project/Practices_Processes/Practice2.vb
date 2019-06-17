' ***********************************************************************
' Assembly         : Practices_Processes
' Author           : Alberto Criado Andrés
' Created          : 16-06-2019
'
' Last Modified By : 
' Last Modified On : 
' ***********************************************************************
' <copyright file="Practices.vb" company="FLEXYGO S.L.">
'     Copyright ©  2016
' </copyright>
' <summary></summary>
' ***********************************************************************
Imports FLEXYGO.Objects
Imports FLEXYGO.Processing.ProcessManager

Namespace Processes

    'Class Practices.
    Partial Public Class Practices

        ''' <summary>
        ''' Block Client 
        ''' </summary>
        ''' <param name="Entity">The entity.</param>
        ''' <param name="Ret">Returns a Process Helper.</param>
        ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function DevObjBlockClient(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
            Try
                'Check if object is new, is collecntion and is Dev_Client
                If Entity.IsNew OrElse Entity.IsCollection OrElse Entity.Name <> "Dev_Client" Then
                    Throw New Exception("Error blocking client :(")
                End If

                'Check security
                If Entity.CanUpdate Then
                    Entity("IdState") = 2
                    Entity("BlockReason") = String.Format("Automatic Message. User: {0}", Ret.ConfToken.UserSecurity.UserFullName)
                    Entity("BlockDate") = Date.Now

                    'Update
                    If Not Entity.UpdateProcess(Settings.ObjectSettings.eUpdateType.Standard, Nothing) Then
                        Throw New Exception("Error blocking client :(")
                    End If

                    Ret.SuccessMessage = "Client blocked ;)"
                Else
                    Ret.WarningMessage = "You do not have enough credentials to update this Object"
                End If
                Ret.Success = True
                Return True
            Catch ex As Exception
                Ret.Success = False
                Ret.LastException = ex
                Return False
            End Try
        End Function

        ''' <summary>
        ''' Unblock Client 
        ''' </summary>
        ''' <param name="Entity">The entity.</param>
        ''' <param name="Ret">Returns a Process Helper.</param>
        ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function DevObjUnblockClient(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
            Try
                'Check if object is new, is collecntion and is Dev_Client
                If Entity.IsNew OrElse Entity.IsCollection OrElse Entity.Name <> "Dev_Client" Then
                    Throw New Exception("Error unblocking client :(")
                End If

                'Check security
                If Entity.CanUpdate Then
                    Entity("IdState") = 1
                    Entity("BlockReason") = Nothing
                    Entity("BlockDate") = DBNull.Value

                    'Update
                    If Not Entity.UpdateProcess(Settings.ObjectSettings.eUpdateType.Standard, Nothing) Then
                        Throw New Exception("Error unblocking client :(")
                    End If

                    Ret.SuccessMessage = "Client unblocked ;)"
                Else
                    Ret.WarningMessage = "You do not have enough credentials to update this Object"
                End If
                Ret.Success = True
                Return True
            Catch ex As Exception
                Ret.Success = False
                Ret.LastException = ex
                Return False
            End Try
        End Function

    End Class

End Namespace