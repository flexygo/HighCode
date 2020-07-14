<%@ Page Title="Account confirmation" Language="vb" AutoEventWireup="false" CodeBehind="Confirm.aspx.vb" Inherits="FLEXYGO.Confirm" Async="false" UnobtrusiveValidationMode="None" %>
<%@ Register Src="~/Account/Links.ascx" TagPrefix="uc1" TagName="Links" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Confirm</title>
    <uc1:Links runat="server" ID="Links" />
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
                 <div class="confirm">

                <h1><%: Title %>.</h1>
                     <asp:PlaceHolder runat="server" ID="PassPanel" ViewStateMode="Disabled" Visible="true" >
                      <div class="cell"><i class="flx-icon icon-password"></i>
                        <asp:TextBox ID="Password" placeHolder="Password" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" Text="*"></asp:RequiredFieldValidator>
                    </div>

                    <div class="cell"><i class="flx-icon icon-password"></i>
                        <asp:TextBox ID="ConfirmPassword" placeHolder="ConfirmPassword" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="ConfirmPasswordRequired" runat="server" ControlToValidate="ConfirmPassword" Text="*"></asp:RequiredFieldValidator>
                        <asp:CompareValidator ID="ValidatorPassword" runat="server" ControlToCompare="Password" ControlToValidate="ConfirmPassword"  CssClass="text-danger" Display="Dynamic" ErrorMessage="The password and confirmation password do not match."  />
                    </div>
                    <asp:LinkButton ID="MainButton" CssClass="mainbutton" CommandName="Set" runat="server">Set</asp:LinkButton>

                     <div class="others">
                        <asp:HyperLink ID="GotoLogin" runat="server" Visible="False" NavigateUrl="~/Account/Login">Goto Login</asp:HyperLink>
                    </div>
                    </asp:PlaceHolder>
               
                    <asp:PlaceHolder runat="server" ID="successPanel" ViewStateMode="Disabled" Visible="false" >
                      
                            <h2><i class="flx-icon icon-user-3"></i> <asp:Label ID="ThanksMessage" runat="server" Text="Label">Thank you for confirming your account.</asp:Label></h2>
                            <p><asp:HyperLink ID="loginBtn" runat="server" NavigateUrl="~/Account/Login"> Click here to login</asp:HyperLink></p>
                   
                    </asp:PlaceHolder>
                    <asp:PlaceHolder runat="server" ID="errorPanel" ViewStateMode="Disabled" Visible="false">
                        
                           <h2 class="error"><i class="flx-icon  icon-warning "></i>An error has occurred.</h2> 
                        
                    </asp:PlaceHolder>
                </div>
            </div>
        </div>
    </form>
</body>
</html>

