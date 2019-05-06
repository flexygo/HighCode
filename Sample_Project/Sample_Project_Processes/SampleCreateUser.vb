Imports FLEXYGO.Objects
Imports FLEXYGO.Processing.ProcessManager

Public Class SampleCreateUser


    ''' <summary>
    ''' Sample create user
    ''' </summary>
    ''' <param name="Entity">The entity.</param>
    ''' <param name="Ret">Returns a Process Helper.</param>
    ''' <returns><c>true</c> if no error, <c>false</c> otherwise.</returns>
    ''' <exception cref="System.Exception">Returns error</exception>
    Public Shared Function SampleCreateUser(ByVal Entity As EntityObject, ByRef Ret As ProcessHelper) As Boolean
        Try
            'Get the employee's name
            Dim split As String() = Entity("Name").split(" ")
            Dim userName = split(0).ToLower

            'Create a new entity sysUser
            Dim user As EntityObject = New EntityObject("sysUser", Ret.ConfToken)

            'Create a new GUID
            Dim guid As Guid = Guid.NewGuid()

            'Fill the entity with the minimum fields
            user("Id") = guid
            user("RoleId") = "users"
            user("ProfileName") = "default"
            user("Email") = Entity("Email")
            user("EmailConfirmed") = False
            user("UserName") = userName
            user("CultureId") = "es-ES"
            user("PhoneNumberConfirmed") = False
            user("TwoFactorEnabled") = False
            user("AccessFailedCount") = False

            'We check if it has been inserted correctly
            If user.Insert Then
                Ret.Success = True
                Ret.SuccessMessage = "User Create"
            Else
                Ret.Success = False
                Ret.LastException = user.LastException
            End If

            Return Ret.Success

        Catch ex As Exception
            Ret.Success = False
            Ret.LastException = ex
            Return False
        End Try
    End Function

End Class