Imports FLEXYGO.Configuration.Tokens
Imports FLEXYGO.Data
Imports FLEXYGO.Exceptions
Imports FLEXYGO.Objects
Imports FLEXYGO.Processing
Imports FLEXYGO.Processing.ProcessManager
Imports FLEXYGO.Utilities.General
Imports FLEXYGO.Utilities.General.Util

Public Class SaleOnChangeProcess
    ''' <summary>
    ''' Sample load object/change property custom process.
    ''' </summary>
    ''' <param name="aSender">FormSender with objectname, processname or reportname, entity if proceeded and current form values.</param>
    ''' <param name="Ret">Returns a Process Helper.</param>
    ''' <returns>List(Of FormAction) with actions to do with properties.</returns>
    ''' <exception cref="System.Exception">Returns error</exception>
    Public Shared Function EndDateLoadProcess(ByVal aSender As FormSender, ByRef Ret As ProcessHelper) As List(Of FormAction)
        Try

            'Define new action after load/change
            Dim action As New FormAction
            action.PropertyName = "EconomicAmount"

            If aSender.FormValues("EconomicAmount") Is Nothing Then
                'Set new value to this property
                action.changeValue = True
                action.newValue = "1"
            End If

            'Change default class to one property
            action.changeClass = True
            action.newClass = "box-danger"

            'Define if property is required
            action.changeRequired = True
            action.newRequired = True

            'Define if property is enabled
            action.changeEnabled = True
            action.newEnabled = False

            'Define current visibility to this property
            action.changeVisibility = True
            action.newVisibility = True

            'set new sql for this property
            action.changeSQL = True
            action.newSQL = "select ObjectName from objects where objectname like '%docu%'"


            ''Append to afterload action array.
            Dim actionResult As New List(Of FormAction)
            actionResult.Add(action)

            Ret.Success = True

            Return actionResult

        Catch ex As Exception
            Ret.Success = False
            Ret.LastException = ex
            Return Nothing
        End Try
    End Function

End Class
