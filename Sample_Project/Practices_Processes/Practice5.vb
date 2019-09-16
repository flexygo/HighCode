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
        ''' State Depencies.
        ''' </summary>
        ''' <param name="aSender">FormSender with objectname, processname or reportname, entity if proceeded and current form values.</param>
        ''' <param name="Ret">Returns a Process Helper.</param>
        ''' <returns>List(Of FormAction) with actions to do with properties.</returns>
        ''' <exception cref="System.Exception">Returns error</exception>
        Public Shared Function StateDepencies(ByVal aSender As FormSender, ByRef Ret As ProcessHelper) As List(Of FormAction)
            Try

                'Define new action after load/change
                Dim actionResult As List(Of FormAction)
                Dim BlockReason As New FormAction
                Dim BlockDate As New FormAction
                Dim Image As New FormAction

                BlockReason.PropertyName = "BlockReason"
                BlockDate.PropertyName = "BlockDate"
                Image.PropertyName = "Image"

                If aSender.PropertyName IsNot Nothing Then
                    If Not FLEXYGO.Utilities.General.Util.IsBlank(aSender.FormValues("IdState")) AndAlso aSender.FormValues("IdState") = 2 Then
                        'Set new values to the properties
                        BlockReason.changeValue = True
                        BlockReason.newValue = "Blocked by admin"

                        BlockDate.changeValue = True
                        BlockDate.newValue = Date.Now

                        'Change default class to properties
                        BlockReason.changeClass = True
                        BlockReason.newClass = "box-danger"

                        BlockDate.changeClass = True
                        BlockDate.newClass = "box-danger"
                    End If

                    ''Append to afterload action array.
                    actionResult = New List(Of FormAction) From {
                        BlockReason,
                        BlockDate
                    }
                Else

                    Image.changeVisibility = True
                    Image.newVisibility = False
                    ''Append to afterload action array.
                    actionResult = New List(Of FormAction) From {
                        Image
                    }
                End If
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