Imports FLEXYGO.Configuration.Tokens
Imports FLEXYGO.Data
Imports FLEXYGO.Exceptions
Imports FLEXYGO.Objects
Imports FLEXYGO.Processing
Imports FLEXYGO.Processing.ProcessManager
Imports FLEXYGO.Utilities.General
Imports FLEXYGO.Utilities.General.Util

Public Class SampleDataProcesses


    ''' <summary>
    ''' Insert new object
    ''' </summary>
    ''' <param name="Entity">User Entity object with all info</param>
    ''' <param name="Ret">ProcessHelper for returning results</param>
    Public Shared Function InsertObj(Entity As EntityObject, Ret As ProcessHelper) As Boolean
        Try

            If Not Entity.CanInsert Then
                Ret.LastException = New LocalizedException("You do Not have enough credentials to insert this Object.")
                Return False
            End If

            ''Do something here before insert


            If Entity.InsertProcess(Entity.TableName, Settings.ObjectSettings.eUpdateType.Standard, "") Then

                ''Do something here after insert

                Ret.Success = True
                Return True
            Else
                Ret.Success = False
                Ret.LastException = Entity.LastException
                Return False
            End If

        Catch ex As Exception
            Ret.Success = False
            Ret.LastException = ex
            Return False
        End Try
    End Function

    ''' <summary>
    ''' Update an object.
    ''' </summary>
    ''' <param name="Entity">User Entity object with all info</param>
    ''' <param name="Ret">ProcessHelper for returning results</param>
    Public Shared Function UpdateObj(Entity As EntityObject, Ret As ProcessHelper) As Boolean
        Try

            If Not Entity.CanUpdate Then
                Ret.LastException = New LocalizedException("You do Not have enough credentials to update this Object.")
                Return False
            End If

            Dim lTabla As DataTable = Entity.GetData.Tables(0).GetChanges

            'Dim OldValue As String = lTabla.Rows(0)("my_data_field", DataRowVersion.Original)
            'Dim NewValue As String = lTabla.Rows(0)("my_data_field", DataRowVersion.Current)
            'Use this sintax to compare old and new values

            ''Do something here begore update.

            If Entity.UpdateProcess(Settings.ObjectSettings.eUpdateType.Standard, "") Then


                ''Do something here after update.

                Ret.Success = True
                Return True
            Else
                Ret.Success = False
                Ret.LastException = Entity.LastException
                Return False
            End If

        Catch ex As Exception
            Ret.Success = False
            Ret.LastException = ex
            Return False
        End Try
    End Function

    ''' <summary>
    ''' Delete an object
    ''' </summary>
    ''' <param name="Entity">User Entity object with all info</param>
    ''' <param name="Ret">ProcessHelper for returning results</param>
    Public Shared Function DeleteObj(Entity As EntityObject, Ret As ProcessHelper) As Boolean
        Try

            If Not Entity.CanDelete Then
                Ret.LastException = New LocalizedException("You do Not have enough credentials to delete this Object.")
                Return False
            End If

            'Do something here before delete

            If Entity.DeleteProcess(Entity.TableName, Settings.ObjectSettings.eUpdateType.Standard, "") Then

                'Do something here after delete

                Ret.Success = True
                Return True
            Else
                Ret.Success = False
                Ret.LastException = Entity.LastException
                Return False
            End If

        Catch ex As Exception
            Ret.Success = False
            Ret.LastException = ex
            Return False
        End Try
    End Function


End Class
