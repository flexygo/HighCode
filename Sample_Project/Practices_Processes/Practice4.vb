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
                Entity.InsertProcess(Entity.TableName, Settings.ObjectSettings.eUpdateType.Standard, Nothing)

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
                Entity.UpdateProcess(Settings.ObjectSettings.eUpdateType.Standard, Nothing)

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
                Entity.DeleteProcess(Entity.TableName, Settings.ObjectSettings.eUpdateType.Standard, Nothing)

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