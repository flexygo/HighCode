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
Imports FLEXYGO.Utilities.General
Imports FLEXYGO.Utilities.General.Util

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
        Public Shared Function ExecuteStored(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
            Dim aParams = New BaseCollection
            Dim Param1 As String = Nothing
            Dim Param2 As String = Nothing

            Try
                'Add Stored Params
                aParams.Add("Param1", Param1)
                aParams.Add("Param2", Param2)

                'Exec Stored
                If Entity.DataManager.ExecuteStored("pStored", aParams) Then
                    Ret.Success = True
                Else
                    Ret.Success = False
                    Throw New Exception(Entity.DataManager.LastException.ToString)
                End If

                Return Ret.Success
            Catch ex As Exception
                Ret.LastException = ex
                Return Ret.Success
            End Try
        End Function


        Public Shared Function SendMail(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
            Try
                'Get Mail
                Dim Email As String = Entity("Mail")
                Dim subject As String = "Subject"
                Dim body As String = "Body"

                FLEXYGO.Mails.Mail.SendTemplateMail(Email, subject, body, "default")

                'Example Attachment

                'Dim Attachment As New List(Of System.Net.Mail.Attachment)
                'Attachment.Add(Attach)
                'FLEXYGO.Mails.Mail.SendTemplateMail(Email, subject, body, "default", Attachment)

                Ret.Success = True
                Return True

            Catch ex As Exception
                Ret.Success = False
                Ret.LastException = ex
                Return False

            End Try

        End Function

        Public Shared Function CreateClientXML(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
            Try
                'Get XML
                Dim xml As XDocument
                xml = XDocument.Load("xml")

                'Create Client
                Dim Client As EntityObject = New EntityObject("Dev_Client", Ret.ConfToken)
                Client("Name") = xml.Root.<Name>.Value

                If Client.InsertProcess(Client.TableName, Settings.ObjectSettings.eUpdateType.Standard, Nothing) Then
                    Ret.Success = True
                Else
                    Ret.Success = False
                    Throw New Exception(Client.DataManager.LastException.ToString)
                End If

                Return Ret.Success

            Catch ex As Exception
                Ret.LastException = ex
                Return Ret.Success
            End Try

        End Function

    End Class

End Namespace