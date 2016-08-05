# Script to Get OpenURL elements from a DOI
Author: Ben Hockenberry
Project Initiated: 8/5/2016

## Goals
 * First, test asynchronous call to CrossRef API
 * Javascript file with a function that asynchronously queries CrossRef API with a DOI and return the elements needed for a DOI search
 * HTML file to INCLUDE in an ILLiad Article Request to show a button to display a DOI search box, which, on-click, calls the javascript function, inserting the values into form fields on the ILLiad Request Page
 * HTML code snippet to insert into a non-ILLiad page which displays the resulting metadata, shows "Is this the right article?" and displays an OpenURL link (unless there's no resulting metadata)

## Sample DOI response: http://api.crossref.org/works/10.1080/15367967.2016.1154466
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


##