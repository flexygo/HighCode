Imports System.Web.Mvc
Imports FLEXYGO
Imports FLEXYGO.Environment
Imports FLEXYGO.Web
Imports FLEXYGO.Utilities.General.Util
Imports FLEXYGO.Data
Imports FLEXYGO.Utilities.SQL.SQLUtilities

Namespace ahoraflexy.controllers

    ''' <summary>
    ''' Class CarouselController.
    ''' Allows Process execution by process Id or process name
    ''' </summary>
    <SessionState(System.Web.SessionState.SessionStateBehavior.ReadOnly)>
    Public Class CarouselController
        Inherits FlxController

        ''' <summary>
        ''' Reads data for carousel module
        ''' </summary>
        ''' <param name="ObjectName">Object name.</param>
        ''' <param name="ObjectWhere">The object where.</param>
        ''' <param name="ModuleName">The module identifier.</param>
        ''' <returns>returns list of images as ActionResult.</returns>
        <Compress>
        Public Function GetData(ByVal ObjectName As String, ByVal ObjectWhere As String, ByVal ModuleName As String) As ActionResult

            Try

                'Dim modDef As ModuleDefinition = GlobalVars.ConfToken.EnvironmentSettings.GetModule(ModuleName)


                Return Json(ReadImages())

            Catch ex As Exception
                Return Json(ajaxError.ajaxException("Error in GetData GetData", ex, Response))
            End Try

        End Function

        ''' <summary>
        ''' Reads data images for carousel module
        ''' </summary>
        ''' <returns>returns list of images</returns>
        Public Function ReadImages() As List(Of FLEXYGO.Utilities.General.BaseCollection)

            Dim dm As New DataManager(GlobalVars.ConfToken.UserSecurity.ConnectionStrings("DataConnectionString"))

            Dim dt As DataTable = dm.DataTable("Select * from carousel")

            If dm.LastException IsNot Nothing Then
                Throw New InvalidOperationException("Error leyendo datos", dm.LastException)
            End If

            Return DataTableToList(dt, GlobalVars.ConfToken)


        End Function

    End Class
End Namespace


