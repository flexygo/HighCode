<%@ Page Title="Forgot Password" Language="vb" AutoEventWireup="false" CodeBehind="Forgot.aspx.vb" Inherits="FLEXYGO.ForgotPassword" Async="false" UnobtrusiveValidationMode="None" %>
<%@ Register Src="~/Account/Links.ascx" TagPrefix="uc1" TagName="Links" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Forgot Password</title>
    <uc1:Links runat="server" id="Links" />
    <script>
        setViewport();
        $(window).on("orientationchange", function () {
            setViewport();
        });

        function setViewport() {
            $('head meta[name="viewport"]').remove();
          if(screen.height > screen.width) //Vertical
          {
            $('head').append('<meta name="viewport" content="width=500px, user-scalable=no" />');
          } else 
          {
             $('head').append('<meta name="viewport" content="width=1280px, user-scalable=no" />'); 
          }
        }
</script>
</head>
<body>
    <form id="form1" runat="server" DefaultButton="MainButton">
        <div id="login" class="login">
            <div class="divlogin">
                <div id="logo" class="logo"></div>
                <asp:PlaceHolder id="loginForm" runat="server">
                  
                    <div class="cell"><i class="flx-icon icon-email-2"></i>
                        <asp:TextBox ID="Email" autocomplete="off" placeHolder="Email" runat="server"></asp:TextBox><asp:RequiredFieldValidator ID="EmailRequired" runat="server" ControlToValidate="Email" Text="*"></asp:RequiredFieldValidator>
                    </div>
                 
                     <asp:LinkButton ID="MainButton" CssClass="mainbutton" CommandName="Forgot" runat="server">Send Email</asp:LinkButton>
               </asp:PlaceHolder>
                 <asp:PlaceHolder runat="server" ID="DisplayEmail" Visible="false">
                 <div class="others">
                    Please check your email to reset your password.
                </div>
            </asp:PlaceHolder>
            <div class="others">
                        <asp:HyperLink ID="GotoLogin" runat="server" Visible="False" NavigateUrl="~/Account/Login">Goto Login</asp:HyperLink>
             </div>
            </div>
            
        </div>
    </form>
</body>
</html>

