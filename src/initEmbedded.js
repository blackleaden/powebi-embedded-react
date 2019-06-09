/*
Application ID:
88506594-1b9b-4365-afae-5928c873712f

Application secret:
8p0YbN0qF0zRjbfBPDbRFKcpk4NeRL93rYnvvfhL3jE=

Application ID:
8555c781-4703-4961-a5fc-ed8a3ef443d4

Application secret:
kIblgfwtHCiWIcn6CP724QhPaA75Isq3sKKcoHb

Workspace ID:
d1be9da7-1ec7-42b1-a48b-913a46798da8

Report ID:
62097fd8-aec8-4241-9de6-8bd08a8826b8
*/

/* 
https://app.powerbi.com/reportEmbed
    ?reportId=f6bfd646-b718-44dc-a378-b73e6b528204
    &groupId=be8908da-da25-452e-b220-163f52476cdd
    &config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLU5PUlRILUNFTlRSQUwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQifQ%3d%3d
*/

// Read embed application token from textbox
var txtAccessToken = $('#txtAccessToken').val();

// Read embed URL from textbox
var txtEmbedUrl = $('#txtReportEmbed').val();

// Read report Id from textbox
var txtReportId = $('#txtEmbedReportId').val();

// Read page name from textbox
var txtPageName = $('#txtPageName').val();

// Read visual name from textbox
var txtVisualName = $('#txtVisualName').val();

// Read embed type from radio
var tokenType = $('input:radio[name=tokenType]:checked').val();

// Get models. models contains enums that can be used.
var models = window['powerbi-client'].models;

// Embed configuration used to describe the what and how to embed.
// This object is used when calling powerbi.embed.
// This also includes settings and options such as filters.
// You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
var config= {
    type: 'visual',
    tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
    accessToken: txtAccessToken,
    embedUrl: txtEmbedUrl,
    id: txtReportId,
    pageName: txtPageName,
    visualName: txtVisualName
};

// Get a reference to the embedded report HTML element
var embedContainer = $('#embedContainer')[0];

// Embed the report and display it within the div container.
var report = powerbi.embed(embedContainer, config);

// Report.off removes a given event handler if it exists.
report.off("loaded");

// Report.on will add an event handler which prints to Log window.
report.on("loaded", function() {
    Log.logText("Loaded");
});

// Report.off removes a given event handler if it exists.
report.off("rendered");

// Report.on will add an event handler which prints to Log window.
report.on("rendered", function() {
    Log.logText("Rendered");
});

report.on("error", function(event) {
    Log.log(event.detail);

    report.off("error");
});