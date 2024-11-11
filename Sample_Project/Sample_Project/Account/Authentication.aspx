<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Authentication.aspx.vb" Inherits="FLEXYGO.TFA" UnobtrusiveValidationMode="None"%>
<%@ Register Src="~/Account/Links.ascx" TagPrefix="uc1" TagName="Links" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Authentication</title>
    <uc1:Links runat="server" id="Links" />
    <style>
        #LineDown {
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, .8);
            color: #ba362f;
            font-size: 3em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

            #LineDown > div {
                width: 50%;
                text-align: center;
            }

        .fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1050;
            width: 100% !important;
            height: 100% !important
        }
    </style>
    <script>
        function initLoginPage() {
            $('#trademark').textillate({
                in: {
                    delayScale: 2, delay: 100, effect: 'flipInY', callback:
                        function () {
                            $('#trademark').html('<span class="outstanding">flexy</span>go');
                            $('#trademark').parents('.flip-card').toggleClass('flip-card-reverse');
                        }
                }
            });
            $('.securityCode input[type="number"]').on('focus', function () {
                
                let validators = $(this).closest('.securityCode').find('span[style*="visibility: visible"]');
                validators.each((index, validator) => {
                    $(validator).css('visibility', 'hidden');
                })
            });
            $('.securityCode input[type="number"]').on('input', function () {
                let nextInput = $(this).closest('span').next().length > 0 ? $(this).closest('span').next().find('input')[0] : null;
                if (nextInput != null) {
                    nextInput.focus();
                }
            });
            $('.securityCode input[type="number"]').on('paste', function (e) {
                e.preventDefault();
                let pastedText = (e.originalEvent || e).clipboardData.getData('text');
                if (pastedText) {
                    pastedText = pastedText.trim().replace(/[\n\t\r]/g, '');
                }
                //check that pasted text only contains numbers
                if (/^\d+$/.test(pastedText)) {
                    var characters = pastedText.split('');
                    var inputs = $('.securityCode input[type="number"]');
                    for (var i = 0; i < characters.length; i++) {
                        if (inputs[i]) {
                            inputs[i].value = characters[i];
                            if (i == characters.length - 1) {
                                inputs[i].focus();
                            }
                        }
                    }
                }
            });
            $('.securityCode input[type="number"]').on('keydown', function (e) {
                //delete key
                let nextInput = $(this).closest('span').next().length > 0 ? $(this).closest('span').next().find('input')[0] : null;
                let previousInput = $(this).closest('span').prev().length > 0 ? $(this).closest('span').prev().find('input')[0] : null;
                if (e.keyCode == 8) {
                    if (previousInput != null)
                        previousInput.focus();
                    this.value = ''
                    e.preventDefault();
                    //left arrow key
                } else if (e.keyCode == 37 && previousInput != null) {
                    previousInput.focus();
                    e.preventDefault();
                }
                //right arrow key
                else if (e.keyCode == 39 && nextInput != null) {
                    nextInput.focus();
                    e.preventDefault();
                }
                else if (this.value != '' && (e.key >= '0' && e.key <= '9')) {
                    if (nextInput != null) {
                        nextInput.focus();
                    }
                    this.value = e.key
                    e.preventDefault();
                }

            });
        }
        function Progress(ev) {

            if (Page_ClientValidate()) {
                $('#VerifyButton').html('Verifying...');
                drawLoading();
            }
        }

        function drawLoading() {

            $('#VerifyButton').textillate({
                loop: true,
                minDisplayTime: 0,
                in: { effect: 'flipInY' },
                out: { effect: 'flipOutY' },
            });
        }

        $(document).ready(initLoginPage);
    </script>
</head>
<body>

    <form id="authenticationForm" runat="server" defaultbutton="VerifyButton">
        <div id="authentication" class="login">
            <div class="divlogin">
                <div class="flip-card" onclick="$(this).toggleClass('flip-card-reverse');">
                    <div class="flip-card-flipper">
                        <div class="flip-card-front">
                            <div id="trademark" class="trademark">flexygo</div>
                        </div>
                        <div class="flip-card-back">
                            <div id="logo" class="logo"></div>
                        </div>
                    </div>
                </div>
                <section id="twoFactorAuthenticationForm" runat="server">
                    <div style="text-align:center;margin-top:20px;">
                        <asp:Label runat="server" ID="twoFactorAuthenticationLabel"></asp:Label>
                    </div>
                    <div class="securityCode">
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="n1">
                            <asp:TextBox ID="n1" type="number" runat="server" placeholder=" "></asp:TextBox>
                        </asp:RequiredFieldValidator>

                        <asp:RequiredFieldValidator ID="numValidator2" runat="server" ControlToValidate="n2">
                            <asp:TextBox ID="n2" type="number" runat="server" placeholder=" "></asp:TextBox>
                        </asp:RequiredFieldValidator>

                        <asp:RequiredFieldValidator ID="numValidator3" runat="server" ControlToValidate="n3">
                            <asp:TextBox ID="n3" type="number" runat="server" placeholder=" "></asp:TextBox>
                        </asp:RequiredFieldValidator>

                        <asp:RequiredFieldValidator ID="numValidator4" runat="server" ControlToValidate="n4">
                            <asp:TextBox ID="n4" type="number" runat="server" placeholder=" "></asp:TextBox>
                        </asp:RequiredFieldValidator>

                        <asp:RequiredFieldValidator ID="numValidator5" runat="server" ControlToValidate="n5">
                            <asp:TextBox ID="n5" type="number" runat="server" placeholder=" "></asp:TextBox>
                        </asp:RequiredFieldValidator>

                        <asp:RequiredFieldValidator ID="numValidator6" runat="server" ControlToValidate="n6">
                            <asp:TextBox ID="n6" type="number" runat="server" placeholder=" "></asp:TextBox>
                        </asp:RequiredFieldValidator>
                    </div>
                    <asp:LinkButton ID="VerifyButton" CssClass="mainbutton" CommandName="VerifyCode" runat="server" OnClientClick="Progress(event)"></asp:LinkButton>
                    <div class="others">
                        <asp:CheckBox runat="server" ID="TrustCheck" />
                        <asp:Label runat="server" ID="TrustLabel" AssociatedControlID="TrustCheck"></asp:Label>
                    </div>
                </section>
                <section id="loadingRedirect" class="flx-loading-effect" runat="server" style="display:none;">
                    <span class="flx-loader-effect"></span>
                    <div class="flx-loader-text">Redirecting...</div>
                    <asp:LinkButton ID="forceRedirect" runat="server" CausesValidation="False" style="display: none;">
                    </asp:LinkButton>
                </section>
            </div>
        </div>
    </form>

</body>
</html>
