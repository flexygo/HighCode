<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Register.aspx.vb" Inherits="FLEXYGO.Register"  UnobtrusiveValidationMode="None" %>
<%@ Register Src="~/Account/Links.ascx" TagPrefix="uc1" TagName="Links" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Register</title>
    <uc1:Links runat="server" id="Links" />
    <meta name="viewport" content="width=420px, user-scalable=no" />
    
    <script>
     function initRegisterPage(){
         
        sessionStorage.removeItem('DevelopMode');
	  
        $('#trademark').textillate({
                 in: {
                     delayScale: 2, delay: 100, effect: 'flipInY', 
                     callback: function (){
                         $('#trademark').html('<span class="outstanding">flexy</span>go');
                         $('#trademark').parents('.flip-card').toggleClass('flip-card-reverse');
                     }}}
         );
     }

     function Progress(ev) {

         if (Page_ClientValidate()) {
             $('#MainButton').html('Loading...');
             drawLoading();
         }
     }

     function drawLoading() {

         $('#MainButton').textillate({
             loop: true,
             minDisplayTime: 0,
             in: {effect: 'flipInY'},
             out:{effect: 'flipOutY'},
         });
     }

    $(document).ready(initRegisterPage);
    </script>
   
</head>

<body>


    <form id="form1" runat="server" DefaultButton="MainButton">
        <div id="login" class="login">
            <div class="divlogin">
                <div class="flip-card"  onclick="$(this).toggleClass('flip-card-reverse');">
		            <div class="flip-card-flipper">
			            <div class="flip-card-front" >
				            <div id="trademark" class="trademark" >flexygo</div>
			            </div>
			            <div class="flip-card-back" >
				            <div id="logo" class="logo"></div>
			            </div>
		            </div>
	            </div>                
                <section id="loginForm">
                    <div class="cell">
                        <asp:Label runat="server" ViewStateMode="Disabled">Enter your information to register</asp:Label>
                    </div>
                    <div class="cell"><i class="flx-icon icon-user"></i>
                        <asp:TextBox ID="Name" autocomplete="off" placeHolder="Name" runat="server"></asp:TextBox><asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="Name" Text="*"></asp:RequiredFieldValidator>
                    </div>
                    <div class="cell"><i class="flx-icon icon-user"></i>
                        <asp:TextBox ID="SurName" autocomplete="off" placeHolder="Surname" runat="server"></asp:TextBox><asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="SurName" Text="*"></asp:RequiredFieldValidator>
                    </div>
                    <div class="cell"><i class="fa fa-at"></i>
                        <asp:TextBox ID="Email" autocomplete="off" placeHolder="Email" runat="server"></asp:TextBox><asp:RequiredFieldValidator ID="emailRequired" runat="server" ControlToValidate="Email" Text="*"></asp:RequiredFieldValidator>
                        <asp:RegularExpressionValidator ID="RegularExpressionValidatorEmail" runat="server" ControlToValidate="Email" ErrorMessage="Please enter corect email" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
                    </div>
                     <div class="cell"><i class="flx-icon icon-user"></i>
                        <asp:TextBox ID="UserName" autocomplete="off" placeHolder="User Name" runat="server"></asp:TextBox><asp:RequiredFieldValidator ID="userNameRequired" runat="server" ControlToValidate="UserName" Text="*"></asp:RequiredFieldValidator>
                       <asp:RegularExpressionValidator ID="RegularExpressionValidatorUserName" runat="server" ControlToValidate="UserName" ErrorMessage="Please enter corect user name" ValidationExpression="^[a-z0-9_-]{3,15}$"></asp:RegularExpressionValidator>
                          </div>
                    <asp:LinkButton ID="MainButton" CssClass="mainbutton" CommandName="Register" runat="server" OnClientClick="Progress(event)">Register</asp:LinkButton>
                    <div class="others">
                        <asp:Label CssClass="text-success" ID="SuccesMessage" runat="server" ViewStateMode="Disabled" Visible="false"></asp:Label>
                        <asp:Label CssClass="text-danger" ID="ErrorMessage" runat="server" ViewStateMode="Disabled" Visible="false"></asp:Label>
                    </div>
                </section>
            </div>
        </div>
    </form>

</body>
</html>