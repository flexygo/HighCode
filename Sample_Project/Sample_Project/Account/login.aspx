<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="login.aspx.vb" Inherits="FLEXYGO.login1"  UnobtrusiveValidationMode="None" %>
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
            $('head').append('<meta name="viewport" content="width=550, user-scalable=no" />');
          } else {
             $('head').append('<meta name="viewport" content="width=1280, user-scalable=no" />'); 
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
                <section id="loginForm" runat="server">
                    <div class="cell"><i class="flx-icon icon-user-3"></i>
                        <asp:TextBox ID="UserName" autocomplete="off" placeHolder="Username" runat="server"></asp:TextBox><asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName" Text="*"></asp:RequiredFieldValidator>
                    </div>
                    <div class="cell"><i class="flx-icon icon-lock"></i>
                        <asp:TextBox ID="Password" placeHolder="Password" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" Text="*"></asp:RequiredFieldValidator>
                        <span class="fa fa-eye" id="pass-status" onclick="viewPassword()"></span> 
                    </div>
                    <asp:LinkButton ID="MainButton" CssClass="mainbutton" CommandName="LogIn" runat="server" OnClientClick="Progress(event)">Login</asp:LinkButton>
                    <div class="others">
                        <asp:CheckBox runat="server" ID="RememberMe" />
                        <asp:Label runat="server" ID="RememberMeLabel" AssociatedControlID="RememberMe">Remember me?</asp:Label>
                    </div>
                    <div class="others">
                        <asp:HyperLink runat="server" ID="RegisterHyperLink" ViewStateMode="Disabled">Register as a new user</asp:HyperLink>
                    </div>
                    <div class="others">
                        <asp:HyperLink runat="server" ID="ForgotPasswordHyperLink" ViewStateMode="Disabled">Forgot your password?</asp:HyperLink>
                    </div>
                    <div style="text-align:center;">
                    <asp:LinkButton ID="azureAADLogin" runat="server" CausesValidation="False">
                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="250px" height="50px" viewBox="0 0 3078 512" class="azureSignInButton">
                            <style type="text/css">
                                .fnt0 {
                                    font-size: 260px;
                                    font-family: 'Segoe UI Semibold', 'Segoe UI';
                                    text-decoration: none;
                                }
                            </style>
                            <rect x="150" y="129" width="122" height="122" fill="#F35325" />
                            <rect x="284" y="129" width="122" height="122" fill="#81BC06" />
                            <rect x="150" y="263" width="122" height="122" fill="#05A6F0" />
                            <rect x="284" y="263" width="122" height="122" fill="#FFBA08" />
                            <text x="470" y="357" fill="white" class="fnt0">Login with Microsoft</text>
                        </svg>
                    </asp:LinkButton>
                        <asp:LinkButton ID="ClaveLogin" runat="server" CausesValidation="False">
                        <svg version="1.1" width="250px" height="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 251 51" style="enable-background:new 0 0 251 51;" xml:space="preserve">
                            <style type="text/css">.st0 {opacity: 0.54;} .st1 {fill: #FFFFFF;} .st2 {fill: none;} .st3 {fill: #575757;} .st4 {font-family: 'Montserrat-Bold';} .st5 {font-size: 13.9135px;} .st6 {fill: #00D2F1;}</style>
                            <g class="st0">
                                <image style="overflow:visible;" width="395" height="195" xlink:href="CB10C0BE4FF3A9EE.png" transform="matrix(1 0 0 1 -71.5192 -72.373)"> </image>
                            </g>
                            <path class="st1"
                                d="M245.1,50.6H6c-3,0-5.5-2.4-5.5-5.5V6.1C0.5,3,3,0.6,6,0.6h239.1c3,0,5.5,2.4,5.5,5.5v39.1  C250.5,48.1,248.1,50.6,245.1,50.6z">
                            </path>
                            <g>
                                <text transform="matrix(1 0 0 1 50.015 30.57)" class="st3 st4 st5">Login with</text>
                            </g>
                            <g id="Mi-sede" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                transform="translate(126,13.5) scale(0.08)">
                                <g id="Group" fill-rule="nonzero">
                                    <g>
                                        <path
                                            d="M88.2995256,190.457097 C86.1600527,193.769004 83.6037793,196.691573 80.6307054,199.224806 C74.8990318,204.108527 68.3153527,206.550388 60.879668,206.550388 C47.2475795,206.550388 36.5587828,201.485788 28.813278,191.356589 C21.2226833,181.589147 17.4273859,169.470284 17.4273859,155 C17.4273859,140.529716 21.2226833,128.410853 28.813278,118.643411 C32.3762102,113.940568 36.7524205,110.232558 41.9419087,107.51938 C47.131397,104.806202 53.4439834,103.449612 60.879668,103.449612 C68.3153527,103.449612 74.8990318,105.891473 80.6307054,110.775194 C83.499249,113.219361 85.9797855,116.435344 88.0723148,119.604392 C88.0887951,119.629351 88.1137215,119.666104 88.1470941,119.714651 L93.9718233,119.713489 L103.185038,119.713489 L108.56066,119.713489 C108.541136,119.665429 108.526088,119.629064 108.515516,119.604392 C104.751877,110.820908 99.407147,103.446317 92.4813278,97.4806202 C82.5670816,89.1602067 70.7939142,85 57.1618257,85 C40.1217151,85 26.2572614,91.7829457 15.5684647,105.348837 C5.18948824,118.552972 -1.42108547e-14,135.103359 -1.42108547e-14,155 C-1.42108547e-14,174.896641 5.18948824,191.447028 15.5684647,204.651163 C26.2572614,218.217054 40.1217151,225 57.1618257,225 C70.7939142,225 82.5670816,220.839793 92.4813278,212.51938 C99.47139,206.498346 104.850895,199.348436 108.619841,190.457097 L88.2995256,190.457097 Z M213.001072,222.875706 L213.001072,37 L193.118971,37 L193.118971,222.875706 L213.001072,222.875706 Z M662.240086,222.875706 L713.933548,90.1073446 L692.195784,90.1073446 L650.57592,201.632768 L608.690961,90.1073446 L586.953198,90.1073446 L638.911754,222.875706 L662.240086,222.875706 Z M838.237406,206.943503 C825.904073,206.943503 815.737406,202.87194 807.737406,194.728814 C799.904073,186.762712 795.32074,176.672316 793.987406,164.457627 L898.737406,164.457627 L898.737406,156.491525 C898.737406,136.841808 893.237406,120.644068 882.237406,107.898305 C870.57074,94.6214689 855.404073,87.9830508 836.737406,87.9830508 C818.07074,87.9830508 802.904073,94.6214689 791.237406,107.898305 C780.237406,120.644068 774.737406,136.841808 774.737406,156.491525 C774.737406,175.964218 780.487406,192.161959 791.987406,205.084746 C803.82074,218.361582 819.154073,225 837.987406,225 M793.737406,145.870056 C795.404073,134.186441 799.904073,124.715631 807.237406,117.457627 C815.07074,109.845574 824.737406,106.039548 836.237406,106.039548 C847.737406,106.039548 857.404073,109.845574 865.237406,117.457627 C872.57074,124.715631 877.07074,134.186441 878.737406,145.870056 L793.737406,145.870056 Z" id="clve" fill="#575757"></path>
                                        <g id="clave" transform="translate(267.224366, 0.000000)" fill="#FF5A00">
                                            <path d="M146.5,0 C226.600619,0 291.686662,64.2850375 292.980373,144.077355 L293,146.5 L270.80303,146.5 C270.80303,77.849332 215.150668,22.1969697 146.5,22.1969697 C77.849332,22.1969697 22.1969697,77.849332 22.1969697,146.5 C22.1969697,214.464161 76.74185,269.688683 144.444422,270.786377 L146.5,270.80303 L146.5,293 C65.5902842,293 0,227.409716 0,146.5 C0,65.5902842 65.5902842,0 146.5,0 Z M142.060606,77.6893939 C162.561588,77.6893939 180.898789,87.2624499 193.114137,102.318555 L193.113636,95.4469697 L215.310606,95.4469697 L215.310606,197.55303 L193.113636,197.55303 L193.113929,190.681702 C180.89858,205.737659 162.561471,215.310606 142.060606,215.310606 C105.283462,215.310606 75.469697,184.503048 75.469697,146.5 C75.469697,108.496952 105.283462,77.6893939 142.060606,77.6893939 Z M142.060606,126.522727 C134.705177,126.522727 128.742424,132.48548 128.742424,139.840909 C128.742424,144.655855 131.297558,148.874018 135.125868,151.213438 L135.401467,151.377327 L135.401515,166.477273 L140.950758,173.136364 L145.390152,173.136364 L145.390152,166.477273 L146.5,166.477273 L146.5,164.257576 L145.390152,164.257576 L145.390152,160.92803 L147.609848,160.92803 L147.610039,151.951395 C152.194787,149.847065 155.378788,145.215819 155.378788,139.840909 C155.378788,132.48548 149.416035,126.522727 142.060606,126.522727 Z M142.060606,137.621212 C143.286511,137.621212 144.280303,138.615004 144.280303,139.840909 C144.280303,141.066814 143.286511,142.060606 142.060606,142.060606 C140.834701,142.060606 139.840909,141.066814 139.840909,139.840909 C139.840909,138.615004 140.834701,137.621212 142.060606,137.621212 Z" id="Combined-Shape"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </asp:LinkButton>
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
