<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<HTML>
			<HEAD>
				<STYLE>
					.stdPVTblLCell {
					background-color: #00a7e7;
					color: white;
					font-weight: bold;
					text-align: left;
					padding-left: 4px;
					padding-top: 4px;
					padding-bottom: 4px;
					width: 100%;
					font-size: 12pt;
					}
					.stdPageHdr {
					color: DarkBlue;
					font-weight: bold;
					font-style:italic;
					font-family:Verdana;
					text-align: left;
					padding-left: 4px;
					padding-top: 4px;
					padding-bottom: 4px;
					width: 100%;
					font-size: 20pt;
					}
					.gridHeader {
					background-color: #C0C0C0;
					color: DarkBlue;
					font-size: 9pt;
					font-weight: bold;
					font-family:Verdana;
					vertical-align:middle;
					text-align:center;
					border: solid thin Black;
					}
					.SearchHeader {
					color: DarkBlue;
					font-size: 9pt;
					font-weight: bold;
					font-family:Verdana;
					}
					.SearchKey {
					color: DarkBlue;
					font-size: 9pt;
					vertical-align:middle;
					text-align:right;
					font-family:Verdana;
					}
					.SearchValue {
					color: Black;
					font-size: 9pt;
					font-weight: bold;
					vertical-align:middle;
					text-align:left;
					font-family:Verdana;
					}
					.SearchResultHeader {
					background-color: #CCFFCC;
					color: DarkBlue;
					font-size: 9pt;
					font-weight: bold;
					font-family:Verdana;
					}
					.SearchResultItem {
					background-color: #CCFFFF;
					color: Black;
					font-size: 8pt;
					font-family:Verdana;
					border: solid thin Black;
					}
					.SearchResultAltItem {
					background-color: #99CCFF;
					color: Black;
					font-size: 8pt;
					font-family:Verdana;
					border: solid thin Black;
					}
				</STYLE>
			</HEAD>
			<BODY>
				<TABLE>
					<TR>
						<TD> </TD>
					</TR>
					<TR>
						<TD class="stdPageHdr" colspan="7">Customer Order Details</TD>
					</TR>
					<TR  class="stdPVTblLCell">
						<TD colspan="15">
							Customer Details
						</TD>
					</TR>
					<TR>
						<TD> </TD>
					</TR>
					<TR>
						<TD colspan="2" class="SearchKey">Customer Id</TD>
						<TD class="SearchValue">
							<xsl:value-of select="NewDataSet/CustomerDetails/CustomerId"/>
						</TD>
					</TR>
					<TR>
						<TD colspan="2" class="SearchKey">Customer Name</TD>
						<TD class="SearchValue">
							<xsl:value-of select="NewDataSet/CustomerDetails/CustomerNm"/>
						</TD>
					</TR>
					<TR>
						<TD colspan="2" class="SearchKey">Contact Name</TD>
						<TD class="SearchValue">
							<xsl:value-of select="NewDataSet/CustomerDetails/ContactNm"/>
						</TD>
					</TR>
					<TR>
						<TD colspan="2" class="SearchKey">City</TD>
						<TD class="SearchValue">
							<xsl:value-of select="NewDataSet/CustomerDetails/City"/>
						</TD>
					</TR>
					<TR>
						<TD> </TD>
					</TR>
					<TR>
						<TD></TD>
					</TR>
					<TR class="SearchResultHeader">
						<TD colspan="2">Order Details</TD>
					</TR>
					<TR>
						<TD> </TD>
					</TR>
					<TR>
						<TD> </TD>
						<TD class="gridHeader">
							Order Id
						</TD>
						<TD class="gridHeader">
							Employee Id
						</TD>
						<TD class="gridHeader">
							Product Id
						</TD>
						<TD class="gridHeader">
							Unit Price
						</TD>
						<TD class="gridHeader">Quantity</TD>
						<TD class="gridHeader">
							Discount
						</TD>
					</TR>
					<xsl:for-each select="NewDataSet/Table">
						<xsl:choose>
							<xsl:when test="position() mod 2 = 1">
								<TR>
									<TD> </TD>
									<TD class="SearchResultItem">
										<xsl:value-of select="orderid"/>
									</TD>
									<TD class="SearchResultItem">
										<xsl:value-of select="EmployeeID"/>
									</TD>
									<TD class="SearchResultItem">
										<xsl:value-of select="ProductID"/>
									</TD>
									<TD class="SearchResultItem">
										<xsl:value-of select="UnitPrice"/>
									</TD>
									<TD class="SearchResultItem">
										<xsl:value-of select="Quantity"/>
									</TD>
									<TD class="SearchResultItem">
										<xsl:value-of select="Discount"/>
									</TD>
								</TR>
							</xsl:when>
							<xsl:otherwise>
								<TR>
									<TD> </TD>
									<TD class="SearchResultAltItem">
										<xsl:value-of select="orderid"/>
									</TD>
									<TD class="SearchResultAltItem">
										<xsl:value-of select="ProductID"/>
									</TD>
									<TD class="SearchResultAltItem">
										<xsl:value-of select="UnitPrice"/>
									</TD>
									<TD class="SearchResultAltItem">
										<xsl:value-of select="PROD_DESC"/>
									</TD>
									<TD class="SearchResultAltItem">
										<xsl:value-of select="Quantity"/>
									</TD>
									<TD class="SearchResultAltItem">
										<xsl:value-of select="Discount"/>
									</TD>
								</TR>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:for-each>
				</TABLE>
			</BODY>
		</HTML>
	</xsl:template>
</xsl:stylesheet>