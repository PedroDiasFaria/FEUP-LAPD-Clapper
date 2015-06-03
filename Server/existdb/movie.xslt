<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="2.0">
	<xsl:output method="xml" indent="yes"/>
	<xsl:template match="//movie">
		<movie>
			<movieId>
				<xsl:value-of select="//idIMDB"/>
			</movieId>
			<url>
				<xsl:value-of select="//urlIMDB"/>
			</url>
			<urlPoster>
				<xsl:value-of select="//urlPoster"/>
			</urlPoster>
			<title>
				<xsl:value-of select="//title"/>
			</title>
			<year>
				<xsl:value-of select="//year"/>
			</year>
			<releaseDate>
				<xsl:value-of select="//releaseDate"/>
			</releaseDate>
			<runtime>
				<xsl:value-of select="//runtime"/>
			</runtime>
			<genres>
				<xsl:apply-templates select="//genre"/>
			</genres>
			<simplePlot>
				<xsl:value-of select="//simplePlot"/>
			</simplePlot>
			<plot>
				<xsl:value-of select="//plot"/>
			</plot>
			<directors>
				<xsl:apply-templates select="//director"/>
			</directors>
			<imdbRating>
				<xsl:value-of select="//rating"/>
			</imdbRating>
			<imdbTotalVotes>
				<xsl:value-of select="//votes"/>
			</imdbTotalVotes>
			<actors>
				<xsl:apply-templates select="//actor"/>
			</actors>
			<appRating>0</appRating>
			<appTotalVotes>0</appTotalVotes>
			<appTotalWatched>0</appTotalWatched>
			<appTotalToWatch>0</appTotalToWatch>
			<userComments/>
		</movie>
	</xsl:template>
	<xsl:template match="genre">
		<genre>
			<xsl:value-of select="."/>
		</genre>
	</xsl:template>
	<xsl:template match="director">
		<director>
			<name>
				<xsl:apply-templates select="name"/>
			</name>
			<nameId>
				<xsl:apply-templates select="nameId"/>
			</nameId>
		</director>
	</xsl:template>
	<xsl:template match="actor">
		<actor>
			<actorId>
				<xsl:apply-templates select="actorId"/>
			</actorId>
			<actorName>
				<xsl:apply-templates select="actorName"/>
			</actorName>
			<character>
				<xsl:apply-templates select="character"/>
			</character>
			<urlCharacter>
				<xsl:apply-templates select="urlCharacter"/>
			</urlCharacter>
			<urlPhoto>
				<xsl:apply-templates select="urlPhoto"/>
			</urlPhoto>
			<urlProfile>
				<xsl:apply-templates select="urlProfile"/>
			</urlProfile>
		</actor>
	</xsl:template>
</xsl:stylesheet>