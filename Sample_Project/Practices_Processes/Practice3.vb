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
        ''' Block Batch Client 
        ''' </summary>
        ''' <param name="Entity">The entity.</param>
        ''' <param name="Ret">Returns a Process Helper.</param>
        ''' <param name="BlockReason">Block Reason.</param>
        ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function DevBlockBatchClients(ByVal Entity As EntityCollection, ByRef Ret As ProcessHelper, ByVal BlockReason As String) As Boolean
            Try
                'Flag: Error updating
                Dim ErrorUpdating As Boolean

                'Loop clients
                For Each Client As EntityObject In Entity
                    ' Check state
                    If Client("IdState") <> 2 Then
                        'Set values
                        Client("IdState") = 2
                        Client("BlockReason") = BlockReason
                        Client("BlockDate") = Date.Now
                        'Update
                        If Not Client.Update() Then
                            ErrorUpdating = True
                        End If
                    End If
                Next

                'Check errors
                If ErrorUpdating Then
                    Ret.WarningMessage = "Error blocking some clients :("
                Else
                    Ret.SuccessMessage = "Clients blocked ;)"
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