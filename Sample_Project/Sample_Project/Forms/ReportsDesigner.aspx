<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ReportsDesigner.aspx.vb" Inherits="FLEXYGO.ReportsDesigner" %>
<%@ Register namespace="DevExpress.XtraReports.Web" assembly="DevExpress.XtraReports.v23.1.Web.WebForms, Version=23.1.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" TagPrefix="dx" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style>
        HTML, BODY, FORM {
           height: 100%;
        }
    </style>
</head>
<body>
    <link rel="stylesheet" type="text/css" href="<%=Page.ResolveClientUrl("~/js/plugins/DevExpress/Content/Designer.css")%>" />
    <script type="text/javascript" src="<%=Page.ResolveClientUrl("~/js/plugins/DevExpress/Designer.js")%>"></script>
    <script>
        function onInit(s, e) {
            onDesignerInit(s, e);
            RegisterNationalityEditor("<%=Page.ResolveClientUrl("~/js/plugins/DevExpress/Content/")%>");
            RegisterDamageDiagramEditor();
        }
    </script>
    <form  runat="server">
             <dx:ASPxReportDesigner runat="server" ID="reportDesigner"
            ClientInstanceName="reportDesigner" CssClass="fullscreen"
            EnableViewState="False" EnableRichTextEditor="true" Height="" ClientSideEvents-Init="onInit" >
                 <ClientSideEvents CustomizeMenuActions="CustomizeMenuActions" CustomizeWizard="customizeWizard" /> 
        </dx:ASPxReportDesigner>
    </form>
        
</body>
</html>
