# Script to Get OpenURL elements from a DOI
Author: Ben Hockenberry
Project Initiated: 8/5/2016
Last modified: 8/16/2016

## Contents: Files
 * README.md - You're looking at it
 * doitest.js - Javascript file to include in an ILLiad webpage
	Adds a button which pops out a DOI search. If a DOI is found in the search string, it is checked against CrossRef, and if a target is identified by the DOI, its metadata is sent to the ILLiad request form.
 * include_doisearch.html - file that can be saved into your ILLiad request directory and included in your ArticleRequest form with the line: `<#INCLUDE filename="include_doisearch.html">` 
 * doitest.html - basic HTML page with the code to run a DOI lookup.  Modify this for wherever you want to host your lookup. Ours is in Libguides: http://libguides.sjfc.edu/doi
 * doitest.css - fairly basic CSS to style up doitest.html -- to be trimmed down further

 
## Setup

### Variables in JS file
Set isILLiad to true or false depending on whether you will be using the code in ILLiad or not.

You'll need to modify the JS file to set your OpenURL prefix and any suffix variables. The prefix is the section of an OpenURL request up to the "?".

The suffix field exists for any special added fields (not in the OpenURL standard) specific to your resolver. For example, in EBSCO Full Text Finder, to allow for non-IP-authenticated access, you'll need to add in a site code and guest authentication identifiers as a suffix to the URL, like this:
```
"&site=ftf-live&authtype=guest&custid=s9000206&groupid=main"
```

## Dependencies

### OpenURL Only
 * jQuery
 * CrossRef API
 * Optional: Bootstrap for button and input field highlighting -- doitest.css now does this
 
### Our ILLiad Integration
 * jQuery UI - currently used for dialog popups inside ILLiad; you could take these out if preferring not to import the whole JQUI library, but will need to modify the user interface functions in the code
 * jQuery UI CSS customized to campus colors
 * Our ILLiad integration also borrows heavily from Matthew Reidsma of GVSU's pages. You can get his code from the GVSULib Github at https://github.com/gvsulib/Illiad/
 
## Examples
 * Outside ILLiad: http://libguides.sjfc.edu/doi - OpenURL lookup via DOI
	* Another version, with the plain code as present in this repository: http://citadel.sjfc.edu/staff/bhockenberry/doitest/doitest.html
 * In ILLiad: Demonstration video: https://youtu.be/Ckrz_R_ZMG4
	
## Goals
 * Javascript file with a function that asynchronously queries CrossRef API with a DOI and return the elements needed for an OpenURL search
	* DONE
 * HTML file to INCLUDE in an ILLiad Article Request to show a button to display a DOI search box, which, on-click, calls the javascript function, inserting the values into form fields on the ILLiad Request Page
    * DONE
 * HTML code snippet to insert into a non-ILLiad page which displays the resulting metadata, shows "Is this the right article?" and displays an OpenURL link (unless there's no resulting metadata)
    * This could be made simpler -- now it's a whole page sample, rather than a snippet

## Potential enhancements:
 * If no ISSN, but there is an ISBN, do what? Handle books better
 * Separate out functions that rely on jQuery UI, such as the popup in ILLiad, so interface design components are separate from functional requirements
 * On the ILLiad side, implement a more responsive version of the ".dialog" popup -- it works, currently, but something like FluidDialog would be better
 * Strip down Bootstrap CSS (which our ILLiad uses already) so others have access to the CSS for essential tags in the sample interface
 
## Sample DOI response
http://api.crossref.org/works/10.1080/15367967.2016.1154466
```json
{
    "status":"ok",
    "message-type":"work",
    "message-version":"1.0.0",
    "message": {
        "indexed": {
            "date-parts": [[2016, 6, 8]], "date-time": "2016-06-08T15:41:39Z", "timestamp": 1465400499128
        }
        ,
        "reference-count":28,
        "publisher":"Informa UK Limited",
        "issue":"1",
        "published-print": {
            "date-parts": [[2016, 1, 2]]
        }
        ,
        "DOI":"10.1080\/15367967.2016.1154466",
        "type":"journal-article",
        "created": {
            "date-parts": [[2016, 6, 8]], "date-time": "2016-06-08T14:15:19Z", "timestamp": 1465395319000
        }
        ,
        "page":"24-34",
        "update-policy":"http:\/\/dx.doi.org\/10.1080\/tandf_crossmark_01",
        "source":"CrossRef",
        "title":["Get out of fines free: Recruiting student usability testers via fine waivers"],
        "prefix":"http:\/\/id.crossref.org\/prefix\/10.1080",
        "volume":"13",
        "author":[ {
            "affiliation": [], "family": "Hockenberry", "given": "Benjamin"
        }
        ,
        {
            "affiliation": [], "family": "Blackburn", "given": "Kourtney"
        }
        ],
        "member":"http:\/\/id.crossref.org\/member\/301",
        "published-online": {
            "date-parts": [[2016, 6, 8]]
        }
        ,
        "container-title":["Journal of Access Services"],
        "deposited": {
            "date-parts": [[2016, 6, 8]], "date-time": "2016-06-08T14:15:20Z", "timestamp": 1465395320000
        }
        ,
        "score":1.0,
        "subtitle":[],
        "issued": {
            "date-parts": [[2016, 1, 2]]
        }
        ,
        "alternative-id":["10.1080\/15367967.2016.1154466"],
        "URL":"http:\/\/dx.doi.org\/10.1080\/15367967.2016.1154466",
        "ISSN":["1536-7967",
        "1536-7975"],
        "subject":["Library and Information Sciences"],
        "assertion":[ {
            "label": "Peer Review Statement", "name": "peerreview_statement", "order": 1, "value": "The publishing and review policy for this title is described in its Aims & Scope."
        }
        ,
        {
            "label": "Aim & Scope", "name": "aims_and_scope_url", "order": 2, "URL": "http:\/\/www.tandfonline.com\/action\/journalInformation?show=aimsScope&journalCode=wjas20", "value": "http:\/\/www.tandfonline.com\/action\/journalInformation?show=aimsScope&journalCode=wjas20"
        }
        ]
    }
}
```

