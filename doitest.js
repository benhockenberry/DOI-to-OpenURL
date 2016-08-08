/*This is doitest.js */
var doiRegExp = new RegExp('(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)');
var isILLiad = false;
var OpenURLbase = 'http://resolver.ebscohost.com.pluma.sjfc.edu/openurl';					

function DOItest(DOItoTest) {
	/* DOI RegExp from https://github.com/regexhq/doi-regex/blob/master/index.js */
	/* Remove alerts once it goes into production: convert these into meaningful HTML text */
	if (doiRegExp.test(DOItoTest)) {
		$('#doiResponse').html('<p>Valid DOI</p>');
		return true;
	} else {
		$('#doiResponse').html('<p>Not a valid DOI</p>');
		return false;
	}
}
$(document).ready(function() {
	$('#checkDOI').click(function() {
		$('#doiResponse').text('');
		DOIval = $('#inputDOI').val();
		if (DOItest(DOIval) == true){
			DOI = DOIval.match(doiRegExp)[0];
			DOIurl = 'http://api.crossref.org/works/' + DOI;
			$('#doiResponse').append('Loading and testing ' + DOIurl + '<br />');
			/* need error handling for cases with no CrossRef DOI record found, i.e. http://api.crossref.org/works/10.1016/j.iree.2016.07.002 */
			$.getJSON( DOIurl, function( data ) {
				/* Define Local OpenURL variable */
				var strAuthor = '';
				var strJournal = '';
				var strTitle = '';
				var strVolume = '';
				var strIssue = '';
				var strType = '';
				var strDate = '';
				var strPublishedPrint = '';
				var strPublishedOnline = '';
				var strCreated = '';
				var strPage = '';
				var strISBN = '';
				var strCitedIn = 'Library DOI Resolver';
				$.each(data, function() {
				  $.each(this, function(k, v) {
					/* Display all read data in key value pairs; note that nested arrays will show as "object Object" */
					/* $('#doiResponse').append(k + ': ' + v + '<br />'); */
					switch(k){
						case 'container-title':
							strJournal = v;
							break;
						case 'title':
							strTitle = v;
							break;
						case 'volume':
							strVolume = v;
							break;
						case 'issue':
							strIssue = v;
							break;
						case 'page':
							strPage = v;
							break;
						case 'type':
							/* TBD: nest conditionals to convert types into ILLiad/OpenURL values. Perhaps apply that logic separately to make code usable for both resolution systems? */
							strType = v;
							break;
						case 'published-print':
							/* Need nested loop to process array; also run logic later to prioritize published-print over published-online over created date */
							$.each(this, function(k2,v2) {
								/* Display all read data in key value pairs; note that nested arrays will show as "object Object" */
								if (k2 == 'date-parts'){
									strPublishedPrint = v2.toString().split(',')[0];
								}
							});		
							break;
						case 'published-online':
							/* Need nested loop to process array; also run logic later to prioritize published-print over published-online over created date */
							$.each(this, function(k2,v2) {
								/* Display all read data in key value pairs; note that nested arrays will show as "object Object" */
								if (k2 == 'date-parts'){
									strPublishedOnline = v2.toString().split(',')[0];
								}
							});
							break;
						case 'created':
							/* Need nested loop to process array; also run logic later to prioritize published-print over published-online over created date */
							$.each(this, function(k2,v2) {
								/* Display all read data in key value pairs; note that nested arrays will show as "object Object" */
								if (k2 == 'date-parts'){
									strCreated = v2.toString().split(',')[0];
								}
							});
							break;

						case 'ISSN':
							strISSN = v.toString().split(',')[0];
							break;
						case 'ISBN':
							strISBN = v;
							break;
						case 'author':
							/* exists in a nested array for articles with multiple authors. Check for functionality if not an array: checked 2016/8/5 16:54 EDT */
							if (strAuthor == ''){
								var strGiven = '';
								var strFamily = '';
								$.each(this, function() {
									$.each(this, function(k2,v2) {
										/* Display all read data in key value pairs; note that nested arrays will show as "object Object" */
										/*$('#doiResponse').append(k2 + ': ' + v2 + '<br />');*/
										if (strAuthor == ''){
											if (k2 == 'family'){
												strFamily = v2;
											}
											if (k2 == 'given') {
												strGiven = v2;
											}
										}
									});
									if (!(strFamily == '') && !(strGiven =='')){
										strAuthor = strFamily + ', ' + strGiven;
									}
								});
							}
							break;
					}
					//cited in field: "Library DOI Resolver"
					//volume
					//issue
											//						page: 24-34
					//ISSN[0]: 1536-7967,1536-7975
					//DOI
					//published-print.date-parts[0] PRIORITIZE over published-online.date-parts[0]
					/*if (k=='type'){
						str
					}*/
					
				  });
				});

				/* Calculate Best Approximation of Date of Publication */
				if (!(strPublishedPrint == '')) {
					strDate = strPublishedPrint;
				} else if (!(strPublishedOnline == '')) {
					strDate = strPublishedOnline;
				} else if (!(strCreated == '')) {
					strDate = strCreated;
				}
				
				/* Generate Output */
				$('#doiResponse').append('=============<br />');
				$('#doiResponse').append('Journal: ' + strJournal + '<br />');
				$('#doiResponse').append('Title: ' + strTitle + '<br />');
				$('#doiResponse').append('Author: ' + strAuthor + '<br />');
				$('#doiResponse').append('Volume: ' + strVolume + '<br />');
				$('#doiResponse').append('Issue: '  + strIssue + '<br />');
				$('#doiResponse').append('Page: '  + strPage + '<br />');
				$('#doiResponse').append('Type: '  + strType + '<br />');
				$('#doiResponse').append('Published-Print: '  + strPublishedPrint + '<br />');
				$('#doiResponse').append('Published-Online: '  + strPublishedOnline + '<br />');
				$('#doiResponse').append('Created: '  + strCreated + '<br />');
				$('#doiResponse').append('Date: '  + strDate + '<br />');
				$('#doiResponse').append('ISSN: ' + strISSN + '<br />');
				$('#doiResponse').append('ISBN: ' + strISBN + '<br />');
				$('#doiResponse').append('CitedIn: ' + strCitedIn + '<br />');
				$('#doiResponse').append('DOI: ' + DOI + '<br />');
				var GetItAtFisherLink = OpenURLbase + '?sid=' + encodeURIComponent(strCitedIn) + '&genre=' + encodeURIComponent(strType) + '&issn=' + strISSN + '&ISBN=' + strISBN + '&volume=' + strVolume + '&issue=' + strVolume + '&date=' + encodeURIComponent(strDate) + '&spage=' + strPage + '&pages=' + strPage + '&title=' + encodeURIComponent(strJournal) + '&atitle=' + encodeURIComponent(strTitle) + '&aulast=' + encodeURIComponent(strAuthor) + '&id=doi%3A%2F%2F' + encodeURIComponent(DOI) + '&site=ftf-live';
				$('#doiResponse').append('Check for full text: <a href="' + GetItAtFisherLink + '">Get It @ Fisher</a>');

				if (isILLiad == true) {
					/* Populate data into ILLiad form */
					$('#PhotoArticleAuthor').val(strAuthor);
					$('#PhotoArticleTitle').val(strTitle);
					$('#PhotoJournalTitle').val(strJournal);
					$('#PhotoJournalVolume').val(strVolume);
					$('#PhotoJournalIssue').val(strIssue);
					$('#PhotoJournalInclusivePages').val(strPage);
					$('#ISSN').val(strISSN);
					$('#PhotoJournalYear').val(strDate);
				}
				
			});
		} else {
			$('#doiResponse').val('No DOI found; no response called.');
		}
	});
});
