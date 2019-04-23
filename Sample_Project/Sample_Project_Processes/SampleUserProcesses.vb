Imports FLEXYGO.Configuration.Tokens
Imports FLEXYGO.Data
Imports FLEXYGO.Exceptions
Imports FLEXYGO.Objects
Imports FLEXYGO.Processing
Imports FLEXYGO.Processing.ProcessManager
Imports FLEXYGO.Utilities.General
Imports FLEXYGO.Utilities.General.Util

Public Class SampleUserProcesses


    ''' <summary>
    ''' Sample object process executed from object 
    ''' </summary>
    ''' <param name="Entity">The entity.</param>
    ''' <param name="Ret">Returns a Process Helper.</param>
    ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
    ''' <exception cref="System.Exception">Returns error</exception>
    Public Shared Function SampleUserProcess(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
        Try


            ''Do Something

            Ret.Success = True
            Ret.SuccessMessage = "Cache reloaded"
            Return True

        Catch ex As Exception
            Ret.Success = False
            Ret.LastException = ex
            Return False
        End Try
    End Function

    ''' <summary>
    ''' Sample object process executed from object with params
    ''' </summary>
    ''' <param name="Entity">The entity.</param>
    ''' <param name="Ret">Returns a Process Helper.</param>
    ''' <param name="Param1">Sample string param</param>
    ''' <param name="Param2">Sample integer param</param>
    ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
    ''' <exception cref="System.Exception">Returns error</exception>
    Public Shared Function SampleUserProcessWithParams(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper, ByVal Param1 As String, ByVal Param2 As Integer) As Boolean
        Try

            ''Do Something

            Ret.Success = True
            Ret.SuccessMessage = "Cache reloaded"
            Return True

        Catch ex As Exception
            Ret.Success = False
            Ret.LastException = ex
            Return False
        End Try
    End Function

End Class
