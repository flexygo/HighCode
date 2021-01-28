<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="OfficeToken.aspx.vb" Inherits="FLEXYGO.ContactsToken" UnobtrusiveValidationMode="None" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Contacts</title>
</head>
<body>
    <div>           
        <section>
            <div>
                <asp:Label ID="TokenText" runat="server" ViewStateMode="Disabled" Visible="true">Token: </asp:Label><br/>
            </div>
        </section>
    </div>
</body>
</html>
