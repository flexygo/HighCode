<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="License.aspx.vb" Inherits="FLEXYGO.LicensePage"  UnobtrusiveValidationMode="None" %>
<%@ Register Src="~/Account/Links.ascx" TagPrefix="uc1" TagName="Links" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>License</title>
    <meta name="viewport" content="user-scalable=no" />
    <uc1:Links runat="server" id="Links" />
    <style>

        .row {
            width: 100%;
            clear: both;
            margin: 0px;
            
        }

        .col-8 {
            width: 66.66%;
            display:inline;
        }

        .col-6 {
            width: 50%;
            display:inline;
        }

        .col-4 {
            width: 33.33%;
            display:inline;
        }

 
        .divPanel {
            margin: 0 auto;
            width: 800px;
            padding:  10px;
            padding-top:  50px;
            padding-bottom:  50px;
            border-radius:10px;
        }

        
        #license {
            margin: 0.5em;
            height: 100%;
            display: table;
            position: absolute;
            top:0px;
            left:0px;
            height: 70%;
            width: 100%;
            box-sizing: border-box;
            border-collapse:collapse;
        }

        #license td {
            display: table-cell;
            vertical-align: middle;
        }

        #license .cell{
            box-sizing: border-box;
            margin: 25px auto;
            width: 700px;
        }

        #license .others{
            margin: 20px auto;
            width: 300px;
            text-align:center
        }
        #license i{
            display:block;
            float:left;
            margin-right:10px;
            line-height:1.6em;
            font-size:1.6em;
        }

        #license h2 i{
            float:none;
        }
        #license input[type="text"],#license input[type="password"],#license select  {
            font-size:1.2em;
            margin:0.5em;
            background: transparent;
            min-width:400px;
            color: #dddddd;
            border: none;
            border-bottom: solid 1px #dddddd;
            
        }

        #license textarea {
            font-size:1.2em;
            margin:1em;
            background: transparent;
            color: #dddddd;
            border: none;
            border-bottom: solid 1px #dddddd;
            width: 600px;
            height:230px;
        }

        #license a {
            display:block;
            margin: 0 auto;
            margin-top: 20px;
            font-size:1.5em;
            padding: 5px;
            text-align: center;
            background: #333333;
            color: #ffffff;
            text-decoration: none;
            width:50%;
            background-color: #2DB7B0;
            border-radius:10px;
      
        }

        #license a:hover {
            background-color: silver;
        }

        #license a.link {
            display:inline;
            font-size:1em;
        }

        .status {
            font-weight: bold;
            font-size:1.2em;
        }

    </style>
    <script>
     function initLoginPage(){
         var isLogout = false;
          
         $('#trademark').textillate({
             in: {
                 delayScale: 2, delay: 100, effect: 'flipInY',
                 callback: function (){
                    $('#trademark').html('<span class="outstanding">flexy</span>go');
                    $('#trademark').parents('.flip-card').toggleClass('flip-card-reverse');
	    }}});

     }
    $(document).ready(initLoginPage);
    </script>
   
</head>
<body>

    <form id="form1" runat="server">
        <div id="license">

            <div class="divPanel">

                <div class="flip-card" style="margin:0 auto;width: 320px;height:100px;" onclick="$(this).toggleClass('flip-card-reverse');">
		            <div class="flip-card-flipper">
			            <div class="flip-card-front" >
				            <div id="trademark" style="width: 320px;height:100px;">flexygo</div>
			            </div>
			            <div class="flip-card-back" style="width: 320px;height:100px;">
				            <div id="logo"></div>
			            </div>
		            </div>
	            </div>


                <asp:Label runat="server" ID="lblStatus" class="status">
                    Your application is not licensed
                </asp:Label>


                <asp:PlaceHolder runat="server" ID="pnlUnlicensed" Visible="false" >

                    <div class="cell">
                        
                        <asp:Label runat="server" ID="lblOfflineUnlicensedMsg">
                            <p>Please register at <a href="<%=CURL_LICENSESERVER%>" class="link" target="_blank"><%=CURL_LICENSESERVER%></a> and paste the request data to obtain the license</p>
                        </asp:Label>

                        <asp:Label runat="server" ID="lblOnlineUnlicensedMsg">
                             <p>Fill the data and click on button to request a license</p>
                             <p>If your are note registered, you will be automatically registered at <a href="<%=CURL_LICENSESERVER%>" class="link" target="_blank"><%=CURL_LICENSESERVER%></a></p>
                        </asp:Label>
                        
                                             
                        <table class="row">
                            <tr>
                               <td class="col-4">
                                <asp:Label ID="lblLicenseType" runat="server" Text="License type:"></asp:Label>
                            </td>
                            <td class="col-8">
                                <asp:DropDownList ID="cboLicenseType" runat="server" AutoPostBack="true"></asp:DropDownList>
                            </td>
                            </tr>
                           
                        </table>

                        <table class="row">
                            <tr>
                               <td class="col-4">
                                <asp:Label ID="lblLicenseRate" runat="server" Text="License rate:"></asp:Label>
                            </td>
                            <td class="col-8">
                                <asp:DropDownList ID="cboLicenseRate" runat="server" AutoPostBack="true"></asp:DropDownList>
                            </td>
                            </tr>

                           
                        </table>

                        <table class="row">
                            <tr>
                               <td class="col-4">
                                    <asp:Label ID="lblUsers" runat="server" Visible="false" Text="Users:"></asp:Label>
                                </td>
                                <td class="col-8">
                                    <asp:TextBox ID="txtUsers" runat="server" Visible="false" AutoPostBack="true"></asp:TextBox>
                                </td>
                            </tr>
                           
                        </table>

                        <asp:PlaceHolder ID="pnlRequestCredentials" runat="server">
                            <table class="row">

                             <tr>
                                <td class="col-4">
                                      <asp:Label ID="Label3" runat="server" Text="Email:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtRequestMail" runat="server"></asp:TextBox>
                                </td>
                            </tr>

                            
                            <tr>

                                <td class="col-4">
                                    <asp:Label ID="Label6" runat="server" Text="Password:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtRequestPassword" textmode="Password" runat="server"></asp:TextBox>
                                </td>
                            </tr>

                            <tr>
                                <td class="col-4">
                                    <asp:Label ID="lblRequestCompanyName" runat="server" Text="Company name:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtRequestCompanyName" runat="server"></asp:TextBox>
                                </td>
                            </tr>

                            <tr>
                                <td class="col-4">
                                    <asp:Label ID="lblRequestPhoneNumber" runat="server" Text="Phone number:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtRequestPhoneNumber" runat="server"></asp:TextBox>
                                </td>
                            </tr>
                          

                        </table>

                        </asp:PlaceHolder>
                         
                        <asp:Label ID="lblRequest" runat="server" Text="Request Code:"></asp:Label>
                        <br />
                        <asp:TextBox ID="txtRequest" runat="server" TextMode="MultiLine" Enabled ="false"></asp:TextBox>
                        <br />

                        <asp:CheckBox ID="chkLicenseData" runat="server" AutoPostBack="true" Text="I have a license data to apply to this application"></asp:CheckBox>
                        
                        <asp:LinkButton ID="btnGotoSetLicense"  runat="server">Set license</asp:LinkButton>
                        <asp:LinkButton ID="btnGetLicense"  runat="server">Get license</asp:LinkButton>
                        
                    

                    </div>
                    
                    
                    
                </asp:PlaceHolder>


                 <asp:PlaceHolder runat="server" ID="pnlRequested" Visible="false" >


                     <asp:PlaceHolder runat="server" ID="pnlRequestedOnline">

                         <p>Request new license at <a href="<%=CURL_LICENSESERVER%>" class="link" target="_blank"><%=CURL_LICENSESERVER%></a> click on button to update your license data</p>

                         <asp:LinkButton ID="btnRefreshLicenseData"  runat="server">Refresh license data</asp:LinkButton>

                     </asp:PlaceHolder>

                     <asp:PlaceHolder runat="server" ID="pnlRequestedOffline">

                         <div class="cell">

                             <p>Request new license at <a href="<%=CURL_LICENSESERVER%>" class="link" target="_blank"><%=CURL_LICENSESERVER%></a> and paste here your license data to update your license information</p>
                        
                        <asp:Label ID="Label7" runat="server" Text="License data:"></asp:Label>
                        <br />
                        <asp:TextBox ID="txtLicenseData" runat="server" TextMode="MultiLine"></asp:TextBox>
                        <br />

                        <asp:LinkButton ID="btnSetLicenseData"  runat="server">Set license data</asp:LinkButton>
                        
                    

                    </div>
                    

                     </asp:PlaceHolder>

                    
                    
                    
                </asp:PlaceHolder>
                  

                <asp:PlaceHolder runat="server" ID="notActivatedPanel" Visible="false" >

                    
                    <div class="cell">

                         <asp:PlaceHolder runat="server" ID="notRequestedPanel" Visible="false" >
                           
                            <p>To activate your license, you must be registered at <a href="<%=CURL_LICENSESERVER%>" class="link" target="_blank"><%=CURL_LICENSESERVER%></a></p>
                                
                            <asp:CheckBox ID="chkActivationRegistered" runat="server" AutoPostBack="true" Text="I'm registered"></asp:CheckBox>

                            <asp:PlaceHolder ID="pnlActivationNotRegistered" runat="server">
                                <p>Please fill this form to register. You will receive a confirmation e-mail and then you can request your activation code</p>

                                 <table class="row">

                             <tr>
                                <td class="col-4">
                                      <asp:Label ID="Label10" runat="server" Text="Email:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtActivateMail" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator runat="server" id="reqtxtActivateMail" controltovalidate="txtActivateMail" errormessage="Please enter email" />
                                </td>
                            </tr>
                            <tr>
                                
                                <td class="col-4">
                                      <asp:Label ID="Label11" runat="server" Text="Password:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtActivatePassword" textmode="Password" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator runat="server" id="reqtxtActivatePassword" controltovalidate="txtActivatePassword" errormessage="Please enter password" />
                                     
                                </td>
                            </tr>

                                      <tr>
                                
                                <td class="col-4">
                                      <asp:Label ID="Label12" runat="server" Text="Confirm Password:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtActivateConfirmPassword" textmode="Password" runat="server"></asp:TextBox>
                                     <asp:RequiredFieldValidator runat="server" id="reqtxtActivateConfirmPassword" controltovalidate="txtActivateConfirmPassword" errormessage="Please confirm password" />
                                </td>
                            </tr>
                                   

                                     <tr>
                                <td class="col-4">
                                    <asp:Label ID="Label13" runat="server" Text="Company name:"></asp:Label>
                                </td>
                                <td class="col-8">
                                    <asp:TextBox ID="txtActivateCompanyName" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator runat="server" id="reqtxtActivateCompanyName" controltovalidate="txtActivateCompanyName" errormessage="Please enter company name" />
                                </td>
                            </tr>

                            <tr>
                                <td class="col-4">
                                    <asp:Label ID="Label14" runat="server" Text="Phone number:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtActivatePhoneNumber" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator runat="server" id="reqtxtActivatePhoneNumber" controltovalidate="txtActivatePhoneNumber" errormessage="Please enter phone number" />
                                </td>
                            </tr>
                          

                                      </table>



                            </asp:PlaceHolder>

                            <asp:PlaceHolder ID="pnlActivationRegistered" runat="server">
                                <p>Please enter your user mail and your password to request your activation code</p>
                                 <table class="row">

                             <tr>
                                <td class="col-4">
                                      <asp:Label ID="Label1" runat="server" Text="Email:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtEmail" runat="server"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                
                                <td class="col-4">
                                      <asp:Label ID="Label5" runat="server" Text="Password:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtPassword" textmode="Password" runat="server"></asp:TextBox>
                                     
                                </td>
                            </tr>
                                      </table>
                            </asp:PlaceHolder>


                            
                          

                       
                         </asp:PlaceHolder>

                        <asp:PlaceHolder runat="server" ID="requestedPanel" Visible="false" >
                            <h4>Please check your mail and enter your activation code:</h4>
                             <table class="row">
 
                             <tr>
                                 <td class="col-4">
                                      <asp:Label ID="lblLicenseId" runat="server" Text="License Id:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtLicenseId" runat="server" ReadOnly="true" text=""></asp:TextBox>
                                </td>
                             </tr>
                            <tr>
                                <td class="col-4">
                                      <asp:Label ID="lblActivationCode" runat="server" Text="Activation Code:"></asp:Label>
                                </td>
                                <td class="col-8">
                                    <asp:TextBox ID="txtLicenseCode" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator runat="server" id="reqLicenseCode" controltovalidate="txtLicenseCode" errormessage="Please enter license code!" />
                                </td>
                            </tr>

                        </table>
                        </asp:PlaceHolder>

                       

                        
                         <asp:CheckBox ID="chkActivationCode" runat="server" AutoPostBack="true" Text="I have an activation code"></asp:CheckBox>

                         <asp:LinkButton ID="btnActivate"  runat="server" AutoPostBack="true">Activate license</asp:LinkButton>

                    </div>
                                    
                    

                </asp:PlaceHolder>    
                
                            
                <asp:PlaceHolder runat="server" ID="activatedPanel" Visible="false" >


                    <asp:PlaceHolder runat="server" ID ="validPanel">

                        <div class="cell">
                         
                         <table class="row">
                             <tr>
                                 <td class="col-4">
                                      <asp:Label ID="Label2" runat="server" Text="License Id:"></asp:Label>
                                </td>
                                <td class="col-8">
                                     <asp:TextBox ID="txtActivatedId" runat="server" ReadOnly="true" text=""></asp:TextBox>
                                </td>
                             </tr>
                            <tr>
                                <td class="col-4">
                                      <asp:Label ID="Label4" runat="server" Text="Activation Code:"></asp:Label>
                                </td>
                                <td class="col-8">
                                    <asp:TextBox ID="txtActivatedCode" readonly="true" runat="server"></asp:TextBox>
                                    
                                </td>
                            </tr>

                              <tr>
                                <td class="col-4">
                                      <asp:Label ID="Label17" runat="server" Text="Type:"></asp:Label>
                                </td>
                                <td class="col-8">
                                    <asp:TextBox ID="txtActivatedType" readonly="true" runat="server"></asp:TextBox>
                                    
                                </td>
                            </tr>

                              <tr>
                                <td class="col-4">
                                      <asp:Label ID="Label16" runat="server" Text="Users:"></asp:Label>
                                </td>
                                <td class="col-8">
                                    <asp:TextBox ID="txtActivatedUsers" readonly="true" runat="server"></asp:TextBox>
                                    
                                </td>
                            </tr>

                             </table>

                             <asp:PlaceHolder ID="pnlActivatedNonEvaluation" runat="server">
                                 
                                 <table class="row">

                                      <tr>
                                <td class="col-4">
                                      <asp:Label ID="Label15" runat="server" Text="Rate:"></asp:Label>
                                </td>
                                <td class="col-8">
                                    <asp:TextBox ID="txtActivatedRate" readonly="true" runat="server"></asp:TextBox>
                                    
                                </td>
                            </tr>

                            

                              <tr>
                                <td class="col-4">
                                      <asp:Label ID="Label18" runat="server" Text="End date:"></asp:Label>
                                </td>
                                <td class="col-8">
                                    <asp:TextBox ID="txtActivatedEndDate" readonly="true" runat="server"></asp:TextBox>
                                    
                                </td>
                            </tr>
                           
                        </table>


                             </asp:PlaceHolder>
 

                    </div>

                    </asp:PlaceHolder>

                     <asp:PlaceHolder runat="server" ID="invalidPanel">

                        <div class="cell">
                         
                          <table class="row">

                                      <tr>
                                <td class="col-4">
                                      <asp:Label ID="Label19" runat="server" Text="Invalid reason:"></asp:Label>
                                </td>
                                <td class="col-8">
                                    <asp:TextBox ID="txtInvalidReason" readonly="true" runat="server"></asp:TextBox>
                                </td>
                            </tr>
                              </table>
    

                    </div>
                    
                  
                    
                </asp:PlaceHolder>     
                    
                     
                 <asp:LinkButton   ID="btnModify"  runat="server">Modify license</asp:LinkButton>
                 <asp:LinkButton   ID="btnRefresh"  runat="server">Refresh license</asp:LinkButton>
                 <asp:LinkButton   ID="btnReturn"  runat="server">Return</asp:LinkButton>
                   
                   
                </asp:PlaceHolder>
                
                
               
                
            </div>
        </div>
    
            </form>

</body>
</html>
