<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ManagePassword.aspx.vb" Inherits="FLEXYGO.ManagePassword" UnobtrusiveValidationMode="None" %>

<%@ Register Src="~/Account/Links.ascx" TagPrefix="uc1" TagName="Links" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Change Password</title>
    <uc1:Links runat="server" id="Links" />
</head>
<body>
    <form id="form1" runat="server" DefaultButton="MainButton">
        <div id="login" class="login">
            <div class="divlogin">
                <div id="logo" class="logo"></div>
                <section id="loginForm">
                   <div class="cell">
                        <asp:Label runat="server" ViewStateMode="Disabled">Please set your new password and password confirmation</asp:Label>
                    </div>
                    <div class="cell"><i class="flx-icon icon-password"></i>
                        <asp:TextBox ID="CurrentPassword" autocomplete="off" placeHolder="Current password" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="CurrentpwdRequired" runat="server" ControlToValidate="CurrentPassword" Text="*"></asp:RequiredFieldValidator>
                    </div>
                    <div class="cell"><i class="flx-icon icon-password"></i>
                        <asp:TextBox ID="NewPassword" placeHolder="Password" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="NewPassword" Text="*"></asp:RequiredFieldValidator>
                    </div>

                    <div class="cell"><i class="flx-icon icon-password"></i>
                        <asp:TextBox ID="ConfirmPassword" placeHolder="ConfirmPassword" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="ConfirmPasswordRequired" runat="server" ControlToValidate="ConfirmPassword" Text="*"></asp:RequiredFieldValidator>
                         <asp:CompareValidator runat="server" ControlToCompare="NewPassword" ControlToValidate="ConfirmPassword"
                    CssClass="text-danger" Display="Dynamic" ErrorMessage="The password and confirmation password do not match."  />
                    </div>
                    <asp:LinkButton ID="MainButton" CssClass="mainbutton" CommandName="ChangePassword" runat="server">Change</asp:LinkButton>

                     <div class="others">
                        <asp:HyperLink ID="GotoLogin" runat="server" Visible="False" NavigateUrl="~/Account/Login">Goto Login</asp:HyperLink>
                    </div>
                </section>
            </div>
        </div>
    </form>
</body>
</html>
