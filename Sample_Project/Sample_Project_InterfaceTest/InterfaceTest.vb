Imports System.Text
Imports OpenQA.Selenium
Imports OpenQA.Selenium.Support.UI
Imports OpenQA.Selenium.Chrome


<TestClass()> Public Class InterfaceTest


    Private baseURL As String = My.Settings.AppUrl
    Private testUsername As String = My.Settings.User
    Private testPassword As String = My.Settings.Pass
    Private Shared driver As ChromeDriver

    <ClassInitialize>
    Public Shared Sub Initialize(context As TestContext)

    End Sub

    <ClassCleanup>
    Public Shared Sub Termination()
        driver.Quit()
    End Sub

    <TestInitialize>
    Public Sub TestInit()
        If driver Is Nothing Then
            driver = New ChromeDriver()
            GoToLogin(driver)
            SetDeveloperMode(driver)
        End If
    End Sub

    <TestCleanup>
    Public Sub Clean()
        driver.Navigate().GoToUrl(Me.baseURL & "index")
        CType(driver, IJavaScriptExecutor).ExecuteScript("flexygo.utils.animationTime=0;")
        CType(driver, IJavaScriptExecutor).ExecuteScript("flexygo.utils.testMode=true;")
        Threading.Thread.Sleep(1000)
    End Sub

    <TestMethod>
    <TestCategory("Interface")>
    <Priority(1)>
    <Owner("Chrome")>
    Public Sub TestUIExecuteDiagnostics()


        Dim menu As IWebElement = FindElement(driver, By.Id("mainMenu"), 10)
        ''Set Developer mode
        FindElement(driver, menu, By.CssSelector("li[title='Tools']"), 10).Click()
        menu.FindElement(By.CssSelector("li[title='Diagnostics']")).Click()

        FindElement(driver, By.CssSelector("[testname]"), 10)

        CType(driver, IJavaScriptExecutor).ExecuteScript("$('.execTest').focus()")

        FindElement(driver, By.CssSelector(".execTest"), 10).Click()

        Dim unittestTimeout As Integer = 60 * 10 'Los tests unitarios pueden tardar
        Try
            FindElement(driver, By.CssSelector(".execTest:enabled"), unittestTimeout)
        Catch ex As Exception
            Throw New InvalidOperationException("Execution test timeout exception. More than " & unittestTimeout.ToString & " seconds.")
        End Try


        GetJavascriptErrors(driver, "", True)


    End Sub

    Private Sub GoToLogin(ByVal driver As IWebDriver)

        ''Go to login URL and check if there's any javascript error.
        driver.Manage().Window.Size = (New Drawing.Size(1820, 980))


        driver.Navigate().GoToUrl(Me.baseURL & "account/login")

        GetJavascriptErrors(driver, "on login page")

        ''Put username and password and click on login button.
        Dim user As IWebElement = FindElement(driver, By.Id("UserName"), 30)
        Dim pass As IWebElement = FindElement(driver, By.Id("Password"))
        Dim loginBtn As IWebElement = FindElement(driver, By.Id("MainButton"))

        user.Clear()
        user.SendKeys(Me.testUsername)

        pass.Clear()
        pass.SendKeys(Me.testPassword)

        loginBtn.Click()

        ''Wait to navigator element and check javascript errors.

        FindElement(driver, By.TagName("flx-nav"), 30)
        GetJavascriptErrors(driver, "after login")

        Threading.Thread.Sleep(1000)


    End Sub

    Private Sub SetDeveloperMode(ByVal driver As IWebDriver)

        CType(driver, IJavaScriptExecutor).ExecuteScript("flexygo.utils.animationTime=0;")
        CType(driver, IJavaScriptExecutor).ExecuteScript("flexygo.utils.testMode=true;")

        Dim menu As IWebElement = FindElement(driver, By.Id("mainMenu"), 30)
        ''Set Developer mode
        FindElement(driver, menu, By.CssSelector("li[title='Tools']"), 60).Click()
        menu.FindElement(By.CssSelector("li[title='Develop Mode']")).Click()
        FindElement(driver, menu, By.CssSelector("li[title='Tools']"), 10).Click()

    End Sub


    Private Sub SwitchToMainWindow(driver As IWebDriver)
        If driver.WindowHandles.Count > 1 Then
            driver.SwitchTo().Window(driver.WindowHandles(0))
        End If
    End Sub

    Private Sub CloseNewWindows(driver As IWebDriver)
        While driver.WindowHandles.Count > 1
            driver.SwitchTo().Window(driver.WindowHandles(1))
            driver.Close()
            driver.SwitchTo().Window(driver.WindowHandles(0))
        End While
    End Sub

    Private Function GetJavascriptErrors(ByVal driver As IWebDriver, ByVal message As String, Optional ThrowExc As Boolean = True) As String

        Dim errorStrings As New StringBuilder

        'Dim jsErrors As IList(Of JavaScriptError) = JavaScriptError.ReadErrors(driver)
        'For Each jError As JavaScriptError In jsErrors
        '    errorStrings.AppendLine(String.Format("{0}: {1} {2}", jError.LineNumber, jError.ErrorMessage, jError.SourceName))
        'Next

        For Each logentry In driver.Manage().Logs.GetLog(LogType.Browser)
            If logentry.Level = LogLevel.Severe Then
                errorStrings.AppendLine(logentry.Message)
            End If
        Next

        If errorStrings.ToString <> "" Then
            If ThrowExc Then
                Throw New InvalidOperationException("JS error(s) " & message & ":" + vbCrLf + errorStrings.ToString)
            Else
                Return "JS error(s) " & message & ":" + vbCrLf + errorStrings.ToString
            End If

        End If

        Return ""

    End Function

    Private Function FindElement(ByVal driver As IWebDriver, ByVal Selector As By, Optional seconds As Integer = 0) As IWebElement
        If seconds = 0 Then
            Return driver.FindElement(Selector)
        Else
            Dim wait As New WebDriverWait(driver, TimeSpan.FromSeconds(seconds))

            Dim myDynamicElement As IWebElement = wait.Until(Of IWebElement)(
           Function(d)
               Dim el As IWebElement = d.FindElement(Selector)
               If el.Displayed Then
                   Return el
               Else
                   Return Nothing
               End If
           End Function)

            Return myDynamicElement
        End If

    End Function

    Private Function FindElement(ByVal driver As IWebDriver, ByVal parent As IWebElement, ByVal Selector As By, Optional seconds As Integer = 0) As IWebElement
        If seconds = 0 Then
            Return parent.FindElement(Selector)
        Else
            Dim wait As New WebDriverWait(driver, TimeSpan.FromSeconds(seconds))

            Dim myDynamicElement As IWebElement = wait.Until(Of IWebElement)(
           Function(d)
               Dim el As IWebElement = parent.FindElement(Selector)
               If el.Displayed Then
                   Return el
               Else
                   Return Nothing
               End If
           End Function)

            Return myDynamicElement
        End If
    End Function

End Class