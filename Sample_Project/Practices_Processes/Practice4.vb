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
        ''' Client Insert
        ''' </summary>
        ''' <param name="Entity">The entity.</param>
        ''' <param name="Ret">Returns a Process Helper.</param>
        ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function DevClientI(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
            Try
                Dim Action As EntityObject

                'Insert client
                If Entity.InsertProcess(Entity.TableName, Settings.ObjectSettings.eUpdateType.Standard, Nothing) Then
                    'New action
                    Action = New EntityObject("Accion", Ret.ConfToken)
                    'Set values
                    Action("Date") = Date.Now
                    Action("EndDate") = Date.Now.AddDays(1)
                    Action("ActionType") = "EMAIL"
                    Action("Comment") = "Talk to the customer and get the technical data"
                    Action("ActionState") = 1
                    Action("UserName") = Ret.ConfToken.UserSecurity.UserName
                    Action("IdClient") = Entity("IdClient")
                    Action("IdEmployee") = Entity("IdEmployee")
                    'Insert action
                    If Not Action.Insert() Then
                        Throw New Exception("Error inserting action")
                    End If
                Else
                    Throw New Exception("Error inserting client")
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
        ''' Client Insert
        ''' </summary>
        ''' <param name="Entity">The entity.</param>
        ''' <param name="Ret">Returns a Process Helper.</param>
        ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function DevClientU(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
            Try
                Dim Action As EntityObject

                'Update client
                If Entity.UpdateProcess(Settings.ObjectSettings.eUpdateType.Standard, Nothing) Then
                    'Check state
                    If Entity("IdState") = 2 Then
                        'New action
                        Action = New EntityObject("Accion", Ret.ConfToken)
                        'Set values
                        Action("Date") = Date.Now
                        Action("EndDate") = Date.Now.AddDays(1)
                        Action("ActionType") = "EMAIL"
                        Action("Comment") = "Communicate to the customer that is blocked"
                        Action("ActionState") = 1
                        Action("UserName") = Ret.ConfToken.UserSecurity.UserName
                        Action("IdClient") = Entity("IdClient")
                        Action("IdEmployee") = Entity("IdEmployee")
                        'Insert action
                        If Not Action.Insert() Then
                            Throw New Exception("Error inserting action")
                        End If
                    End If
                Else
                    Throw New Exception("Error inserting client")
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
        ''' Client Insert
        ''' </summary>
        ''' <param name="Entity">The entity.</param>
        ''' <param name="Ret">Returns a Process Helper.</param>
        ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function DevClientD(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
            Try
                'Check state
                If Entity("IdState") = 2 Then
                    'Delete client
                    If Not Entity.DeleteProcess(Entity.TableName, Settings.ObjectSettings.eUpdateType.Standard, Nothing) Then
                        Throw New Exception("Error removing client")
                    End If
                Else
                    Throw New Exception("Only can remove clients blocked")
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