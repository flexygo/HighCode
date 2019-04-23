<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:output method="xml" indent="yes"/>
  <xsl:param name="mode"/>
  <xsl:template match="/">
   
    <xsl:choose>
      <xsl:when test="$mode='grid'">
        <div class="flx-list">
          <table >
            <thead>
              <tr class="rowHeader">
                <xsl:for-each select="NewDataSet/Table[1]/*">
                  <th >
                    <xsl:value-of select="name()"/>
                  </th>
                </xsl:for-each >
              </tr>
            </thead>
            <xsl:for-each select="*/Table">
              <tbody>
                <tr>
                  <xsl:for-each select="*">

                    <td  >
                      <b>
                        <xsl:value-of select="name()"/>
                      </b>

                      <xsl:value-of select="."/>

                    </td>

                  </xsl:for-each >
                </tr>
              </tbody>
            </xsl:for-each >

          </table>
        </div>
        <div class="clear-both"></div>
      </xsl:when>
      <xsl:otherwise>
        <div class="flx-view">
          <xsl:for-each select="*/Table/*">

            <div class="col-2 col-m-4 col-s-12">
              <div class="item">
                <label >
                  <xsl:value-of select="name()"/>
                </label>
                <span >
                  <xsl:value-of select="."/>
                </span >
              </div>
            </div>

          </xsl:for-each >
        </div>
        <div class="clear-both"></div>
      </xsl:otherwise>
    </xsl:choose>
    
   
  </xsl:template>
  
</xsl:stylesheet>