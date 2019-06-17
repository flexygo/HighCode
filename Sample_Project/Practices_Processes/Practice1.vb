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

    ''' <summary>
    ''' Class Practices.
    ''' </summary>
    Partial Public Class Practices

        ''' <summary>
        ''' Block Client 
        ''' </summary>
        ''' <param name="Entity">The entity.</param>
        ''' <param name="Ret">Returns a Process Helper.</param>
        ''' <param name="IdClient">Id Client.</param>
        ''' <param name="BlockReason">Block Reason.</param>
        ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function DevBlockClient(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper, ByVal IdClient As Integer, ByVal BlockReason As String) As Boolean
            Try
                'Define EntityObject
                Dim Client As EntityObject

                'Initialize EntityObject 
                Client = New EntityObject("Dev_Client", String.Format("IdClient = {0}", IdClient), Ret.ConfToken)

                'Set values
                Client("IdState") = 2
                Client("BlockReason") = BlockReason
                Client("BlockDate") = Date.Now

                'Update
                If Not Client.Update() Then
                    Throw New Exception("Error blocking client :(")
                End If

                Ret.Success = True
                Ret.SuccessMessage = "Client blocked ;)"
                Ret.JSCode = String.Format("flexygo.nav.openPage('view', 'Dev_Client', '(IdClient = {0})', null, 'current', false, null);", IdClient)
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
        ''' <param name="IdClient">Id Client.</param>
        ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function DevUnblockClient(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper, ByVal IdClient As Integer) As Boolean
            Try
                'Define EntityObject
                Dim Client As EntityObject

                'Initialize EntityObject 
                Client = New EntityObject("Dev_Client", String.Format("IdClient = {0}", IdClient), Ret.ConfToken)

                'Set values
                Client("IdState") = 1
                Client("BlockReason") = Nothing
                Client("BlockDate") = DBNull.Value

                'Update
                If Not Client.Update() Then
                    Throw New Exception("Error unblocking client :(")
                End If

                Ret.Success = True
                Ret.SuccessMessage = "Client unblocked ;)"
                Ret.JSCode = String.Format("flexygo.nav.openPage('view', 'Dev_Client', '(IdClient = {0})', null, 'current', false, null);", IdClient)
                Return True
            Catch ex As Exception
                Ret.Success = False
                Ret.LastException = ex
                Return False
            End Try
        End Function

    End Class

End Namespace