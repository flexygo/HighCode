<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Authorize.aspx.vb" Inherits="FLEXYGO.Authorize"  UnobtrusiveValidationMode="None" %>
<%@ Register Src="~/Account/Links.ascx" TagPrefix="uc1" TagName="Links" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
    <link rel="manifest" href="../manifest.json" />
    <uc1:Links runat="server" id="Links" />
      <style>
    #LineDown {background-color: rgb(0, 0, 0);background-color: rgba(0, 0, 0, .8);color: #ba362f;font-size: 3em;display: flex;flex-direction: column;justify-content: center;align-items: center;}
    #LineDown > div {width: 50%;text-align: center;}
    .fullscreen{position:fixed;top:0;left:0;z-index:1050;width:100%!important;height:100%!important}
    </style>
    <script>
     //If browser Internet Explorer Throw Not supported browser
        if (typeof $ != 'undefined') {
            $(document).ready(function () {
                if (navigator.userAgent.search("MSIE") >= 0 || navigator.userAgent.search("IE") >= 0 || navigator.userAgent.search("InternetExplorer") >= 0 || navigator.userAgent.search("Trident") >= 0) {
                    $('body').append('<div id="LineDown" class="fullscreen"><div><blink><i class="flx-icon icon-view-in-new-window icon-margin-right"></i> Browser not supported</blink></div></div>');
                }
            });
        }
        else {
            document.write('<div id="LineDown" class="fullscreen"><div><blink><i class="flx-icon icon-view-in-new-window icon-margin-right"></i> Browser not supported</blink></div></div>');
        }
    </script>

    <script>        

     function initLoginPage(){
         var isLogout = false;
         sessionStorage.removeItem('DevelopMode');

         if(document.location.toString().toLowerCase().indexOf('?bye')!=-1){
	     $('#trademark').html('bye bye ;)');
             isLogout=true;
	 }

         $('#trademark').textillate({
             in: {
                 delayScale: 2, delay: 100, effect: 'flipInY', callback:
	    function (){
                if(isLogout){
	           $('#trademark').html('<span class="outstanding">bye bye</span> ;)');
                }
                else{
	             $('#trademark').html('<span class="outstanding">flexy</span>go');
                }
	        $('#trademark').parents('.flip-card').toggleClass('flip-card-reverse');
	    }}});
     }
 

     function drawLoading() {

         $('#MainButton').textillate({
             loop: true,
             minDisplayTime: 0,
             in: {effect: 'flipInY'},
             out:{effect: 'flipOutY'},
         });
     }

    $(document).ready(initLoginPage);
    </script>

    <script>
        setViewport();
        $(window).on("orientationchange", function () {
            setViewport();
        });

        function setViewport() {
            $('head meta[name="viewport"]').remove();

          if (window.orientation == 0 || window.orientation == 180) { //Vertical
            $('head').append('<meta name="viewport" content="width=550px, user-scalable=no" />');
          } else {
             $('head').append('<meta name="viewport" content="width=1280px, user-scalable=no" />'); 
          }
        }
    </script>

    <script>
        function viewPassword(){
            var passwordInput = document.getElementById('Password');
            var passStatus = document.getElementById('pass-status');
 
            if (passwordInput.type == 'password'){
                passwordInput.type='text';
                passStatus.className='fa fa-eye-slash';
            }
            else{
                passwordInput.type='password';
                passStatus.className='fa fa-eye';
            }
        }
    </script>

    <script>
        function testAuth(ev) {

            ev.stopPropagation();
            ev.preventDefault()

            if (Page_ClientValidate()) {
                let originalValue = $('#MainButton').html();
                $('#MainButton').html('Loading...');
                drawLoading();

                if(document.location.toString().toLowerCase().indexOf('response_type=code')!=-1){
                    WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("MainButton", "", true, "", "", false, true));
                } else {

                    let url = document.location.href.replace(new RegExp("/Account/Authorize", "ig"), "/Token");

                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: { grant_type: 'password' },
                        success: function (response) {

                            $('#hidJSONResponse').val(JSON.stringify(response));

                            WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("MainButton", "", true, "", "", false, true));

                            /*let sender = flexygo.utils.querystring.getParamObject(document.location.href);
                            for (let i = 0; i < sender.length; i++) {
                                response['sender_' + sender[i].key] = sender[i].value;
                            }
    
                            $.ajax({
                                type: 'POST',
                                url: $('#hidReturnUrl').val(),
                                data: response,
                                success: function (response) {
                                    $('#lblSuccess').show();
                                    $('#UserName').closest('.cell').hide();
                                    $('#Password').closest('.cell').hide();
                                    $('#lblTitle').hide();
                                    $('#MainButton').hide();
                                    window.close();
                                },
                                error: function (error, error2) {
                                    $('#MainButton').textillate().stop();
                                    $('#MainButton').html(originalValue);
                                    flexygo.msg.error((error.responseText ? error.responseText : error));
                                }
                            });*/

                        },
                        error: function (error, error2) {
                            $('#MainButton').textillate().stop();
                            $('#MainButton').html(originalValue);
                            if (error && error.responseJSON && error.responseJSON.error_description) {
                                flexygo.msg.error(error.responseJSON.error_description);
                            } else {
                                flexygo.msg.error(error);
                            }

                        },
                        beforeSend: function (xhr, settings) {
                            xhr.setRequestHeader('Authorization', 'Basic ' + btoa($('#UserName').val() + ':' + $('#Password').val()));
                            xhr.setRequestHeader('AppName', 'MyApp');
                        }
                    });

                }

            }

        }
    </script>
   
</head>
<body>

    <form id="form1" runat="server" DefaultButton="MainButton">
        <div id="login" class="login">
            <div class="divlogin">
                <div class="flip-card" style="margin:0 auto;width: 320px;height:100px;" onclick="$(this).toggleClass('flip-card-reverse');">
		            <div class="flip-card-flipper">
			            <div class="flip-card-front" >
				            <div id="trademark" class="trademark" style="width: 320px;height:100px;">flexygo</div>
			            </div>
			            <div class="flip-card-back" style="width: 320px;height:100px;">
                            <asp:Panel ID="logo" CssClass="logo" runat="server"></asp:Panel>
			            </div>
		            </div>
	            </div>                
                <section id="loginForm">
                    <div class="cell">
                        <asp:Label ID="lblTitle" Text="<b>{0}</b> requests authorization to use his credentials:" runat="server"></asp:Label>
                        <asp:Label ID="lblSuccess" Text="Successfull Authorization, now you can close the window." Style="display:none" runat="server"></asp:Label>
                        <asp:HiddenField ID="hidReturnUrl" runat="server" />
                        <asp:HiddenField ID="hidJSONResponse" runat="server" />
                    </div>
                    <div class="cell"><i class="flx-icon icon-user-3"></i>
                        <asp:TextBox ID="UserName" autocomplete="off" placeHolder="Username" runat="server"></asp:TextBox><asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName" Text="*"></asp:RequiredFieldValidator>
                    </div>
                    <asp:Panel ID="pnlPassword" runat="server" CssClass="cell">
                        <i class="flx-icon icon-lock"></i>
                        <asp:TextBox ID="Password" placeHolder="Password" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" Text="*"></asp:RequiredFieldValidator>
                        <span class="fa fa-eye" id="pass-status" onclick="viewPassword()"></span> 
                    </asp:Panel>
                    <asp:LinkButton ID="MainButton" CssClass="mainbutton" CommandName="LogIn" runat="server" OnClientClick="testAuth(event)">Authorize</asp:LinkButton>
                    <asp:LinkButton ID="btnAuthorize" Visible="False" CssClass="mainbutton" runat="server" >Authorize</asp:LinkButton>
                </section>
            </div>
        </div>
    </form>

</body>
</html>
