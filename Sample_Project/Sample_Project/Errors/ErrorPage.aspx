<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ErrorPage.aspx.vb" Inherits="FLEXYGO.ErrorPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Error 500 Internal server Error</title>
    <link href="<%=ResolveUrl("~/css/skins/default/fonts/font-awesome/font-awesome.min.css") %>" rel="stylesheet" />
    <link href="<%=ResolveUrl("~/js/plugins/bootstrap/css/bootstrap.min.css") %>" rel="stylesheet" />
    <link href="<%=ResolveUrl("~/js/plugins/bootstrap/css/bootstrap-theme.min.css") %>" rel="stylesheet" />
    <link href="<%=ResolveUrl("~/js/plugins/lettering/animate.css") %>" rel="stylesheet" />
    <script src="<%=ResolveUrl("~/js/plugins/jquery/jquery.min.js") %>"></script>
    <script src="<%=ResolveUrl("~/js/plugins/bootstrap/js/bootstrap.min.js") %>"></script>
</head>
<body>
    <style>
        body {
            /*background-color: #f9c56a;*/
            background: url('<%=ResolveUrl("~/img/background-flexygo.jpg") %>') transparent; background:cover;height:100vh;background-attachment:fixed;
            color: #ccc;
        }

     
        .error-text {
            font-weight: 400;
            color: #fff;
            letter-spacing: -4px;
            font-size: 700%;
            margin-bottom: 30px;
            text-shadow: 0 1px 0 #ccc,0 2px 0 #bfbfbf,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);
        }

        .error-box {
            max-width: 900px;
            margin: 0 auto;
            padding: 15px;
            margin-top:75px;
            background: rgba(0,0,0,0.8);
            border-radius: 5px;
            border: solid 1px #2DB7B0;
        }

        .error-detail {
            text-align: left;
            background-color: white;
            padding: 12px;
            font-size: 12px;
            border-radius: 5px;
        }

        .error-main {
            color: red;
        }

        h1 {
            font-family: "Open Sans",Arial,Helvetica,Sans-Serif;
            margin: 10px 0;
        }

            h1 i {
                margin-right: 20px;
            }

        .error-icon-shadow {
            text-shadow: 0 1px 0 #803838,0 2px 0 #a85d5d,0 3px 0 #b86565,0 4px 0 #d86f6f,0 5px 0 #b3a5a5,0 6px 1px rgba(131,51,51,.1),0 0 5px rgba(102,30,30,.1),0 1px 3px rgba(95,15,15,.3),0 3px 5px rgba(100,23,23,.2),0 5px 10px rgba(114,30,30,.25),0 10px 10px rgba(94,15,15,.2),0 20px 20px rgba(121,38,38,.15);
        }

        .btn-primary, .btn-primary:active, .btn-primary:visited {
            background-color: #2DB7B0 !important;
            background-image: none !important;
        }
        .btn-primary:hover{
            background-color: #0D9790 !important;
             background-image: none !important;
        }
        h4{
            color:#A94442;
            margin-bottom: 0px;
        }
        p{
            margin-bottom:25px;
        }

        #InnerTrace{
            font-size:0.8em
        }
    </style>

    <div id="content" class="content" style="opacity: 1;">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center error-box">
                            <h1 class="error-text animated tada"><i class="fa fa-times-circle text-danger error-icon-shadow"></i>Error 500</h1>
                            <h2 class="font-xl"><strong>Oooops, Something went wrong!</strong></h2>
                            <br />
                            <p class="lead semi-bold">
                                <strong>You have experienced a technical error. We apologize.</strong><br>
                                <br />
                                <small>We are working hard to correct this issue. Please wait a few moments and try your search again.
                                   
                                </small>

                            </p>
                            <p>
                                <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">More Info
                                </a>
                            </p>
                            <div class="collapse" id="collapseExample">
                                <div class="card card-block" style="text-align:left;">
                                    <asp:Panel ID="DetailedErrorPanel" runat="server" Visible="false">
                                        <p class="lead semi-bold" style="color:white">
                                            <asp:Label ID="InnerMessage" runat="server" />
                                        </p>                                        
                                        <p>
                                            <h4>Detailed Error:</h4>
                                            <asp:Label ID="ErrorDetailedMsg" runat="server" Font-Size="Small" />
                                        </p>                                        
                                        <p>
                                            <h4>Error Handler:</h4>
                                            <asp:Label ID="ErrorHandler" runat="server" Font-Size="Small" />
                                        </p>
                                        <p>
                                             <h4>Call Stack:</h4>
                                            <asp:Label ID="InnerTrace" runat="server" />
                                        </p>
                                    </asp:Panel>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</body>
</html>
