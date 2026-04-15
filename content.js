// content.js - logic for checking if current page is a wiki and redirecting to the selected skin if necessary

const url = new URL(window.location.href);
const host = url.hostname;

// .some(...) first part matches domain exactly with host variable.
// 2nd part matches *.exampledomain.org
const isWiki = [
    "wikipedia.org",
    "wiktionary.org",
    "wikibooks.org",
    "wikinews.org",
    "wikiquote.org",
    "wikisource.org",
    "wikiversity.org",
    "wikivoyage.org",
    "wikimedia.org"
].some(d => host === d || host.endsWith("." + d));

// define & initialize variable that splits hostname into parts. length 2 = wikipedia.org, 
// length 3 = en.wikipedia.org, etc. If this domain is a subdomain (length > 2) 
// and does not start with "www.", then it is a subdomain of the wiki domain.
const isSubdomain = host.split(".").length > 2 && !host.startsWith("www.");

// get skin from storage (logic in popup.js)
chrome.storage.sync.get("skin", ({ skin }) => {
    if (!skin) return;

    if (isWiki && isSubdomain && url.searchParams.get("useskin") !== skin) {
        url.searchParams.set("useskin", skin);
        window.location.replace(url);
    }
});