<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  xmlns:n1="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"  xmlns:ms="urn:schemas-microsoft-com:xslt">
  <xsl:template match="/">
    <div class="padding-l">
      <xsl:for-each select="n1:feed/n1:entry[n1:title='Flexygo']">
        <xsl:sort select="n1:published" order="descending"/>
        <xsl:if test="position() &lt;= 10">
          <h1 class="txt-outstanding">
            <xsl:value-of select="n1:title"/>
            <xsl:text> </xsl:text>
            <small>
              <xsl:value-of select="m:properties/d:Version"/>
              <span class="size-s txt-warning icon-margin-left">
                <xsl:value-of select="'   '"/>
                <xsl:text> (</xsl:text>
                <xsl:value-of select=" ms:format-date(n1:published, 'dd MM yyyy')"/>
                <xsl:text>)</xsl:text>
              </span>
            </small>
          </h1>

          <ul>
            <xsl:call-template name="show_data">
              <xsl:with-param name="ReleaseNotes" select = "m:properties/d:ReleaseNotes" />
            </xsl:call-template>
          </ul>
          
          <br/>
        </xsl:if>
      </xsl:for-each>
    </div>
  </xsl:template>

  <xsl:template name = "show_data" >
    <xsl:param name = "ReleaseNotes" />
    <xsl:call-template name="li">
      <xsl:with-param name="text" select="$ReleaseNotes" />
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="li">
    <xsl:param name="text" select="string(.)"/>
    <xsl:choose>
      <xsl:when test="contains($text, '&#xa;')">
        <xsl:choose>
          <xsl:when test="substring-before($text, '&#xa;')=''">
            <xsl:value-of select="substring-before($text, '&#xa;')"/>
          </xsl:when>
          <xsl:when test="substring-before($text, '&#xa;')='New features:  '">
            <h6>
              <i class="flx-icon icon-star icon-margin-right"></i> <xsl:value-of select="substring-before($text, '&#xa;')"/>
            </h6>
          </xsl:when>
          <xsl:when test="substring-before($text, '&#xa;')='Fixes: '">
            <br/>
            <b>
              <i class="fa fa-bug icon-margin-right"></i><xsl:value-of select="substring-before($text, '&#xa;')"/>
            </b>
          </xsl:when>
          <xsl:otherwise>
            <li>

              <xsl:value-of select="substring-before($text, '&#xa;')"/>
            </li>
          </xsl:otherwise>
        </xsl:choose>

        <xsl:call-template name="li">
          <xsl:with-param
            name="text"
            select="substring-after($text, '&#xa;')"
        />
        </xsl:call-template>

      </xsl:when>
      <xsl:otherwise>
        <li>
          <xsl:value-of select="$text"/>
        </li>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>



