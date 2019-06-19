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
        ''' Sample load object/change property custom process.
        ''' </summary>
        ''' <param name="aSender">FormSender with objectname, processname or reportname, entity if proceeded and current form values.</param>
        ''' <param name="Ret">Returns a Process Helper.</param>
        ''' <returns>List(Of FormAction) with actions to do with properties.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function stateDepencies(ByVal aSender As FormSender, ByRef Ret As ProcessHelper) As List(Of FormAction)
            Try

                'Define new action after load/change
                Dim action As New FormAction
                Dim actionDate As New FormAction
                action.PropertyName = "BlockReason"
                actionDate.PropertyName = "BlockDate"

                If aSender.FormValues("IdState") = 2 Then
                    'Set new values to the properties
                    action.changeValue = True
                    action.newValue = "Blocked by admin"

                    actionDate.changeValue = True
                    actionDate.newValue = Date.Now

                    'Change default class to properties
                    action.changeClass = True
                    action.newClass = "box-danger"

                    actionDate.changeClass = True
                    actionDate.newClass = "box-danger"


                End If


                ''Append to afterload action array.
                Dim actionResult As New List(Of FormAction)
                actionResult.Add(action)
                actionResult.Add(actionDate)

                Ret.Success = True
                Return actionResult
            Catch ex As Exception
                Ret.Success = False
                Ret.LastException = ex
                Return Nothing
            End Try
        End Function
    End Class
End Namespace


