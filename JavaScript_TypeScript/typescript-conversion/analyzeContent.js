// TEST
console.log('analyzeContent("this is a test\\nSeems to work")');
console.log(analyzeContent("this is a test\nSeems to work"));
console.log();
console.log('analyzeContent("body{blabla} a{color:#fff} a{ padding:0}")');
console.log(analyzeContent("body{blabla} a{color:#fff} a{ padding:0}"));
console.log();
console.log('analyzeContent("<html><div></div><div></div></html>")');
console.log(analyzeContent("<html><div></div><div></div></html>"));
function analyzeContent(content) {
    const contentInfo = {};
    if (isHTML(content)) {
        contentInfo.contentType = "HTML";
        contentInfo.tags = extractTags(content);
    }
    else if (isCSS(content)) {
        contentInfo.contentType = "CSS";
        contentInfo.cssTargets = extractTargets(content);
    }
    else {
        contentInfo.contentType = "TEXT";
        contentInfo.lineNumber = extractLines(content);
    }
    return contentInfo;
}
// check if string is HTML
function isHTML(content) {
    return content.match(/<[^\/].*?>/) != null;
}
// check if string is CSS
function isCSS(content) {
    return content.match(/.+{.*}/) != null;
}
// extract HTML tags from HTML string
function extractTags(html) {
    const tags = {};
    const matchedTags = html.matchAll(/<([^\/].*?)>/g);
    for (const tag of matchedTags) {
        if (tags[tag[1]]) {
            tags[tag[1]] = tags[tag[1]] + 1;
        }
        else {
            tags[tag[1]] = 1;
        }
    }
    return tags;
}
// extract CSS targets from CSS string
function extractTargets(css) {
    const targets = {};
    const matchedTargets = css.trim().matchAll(/(.+?){.*?}\s*/g);
    for (const target of matchedTargets) {
        if (targets[target[1]]) {
            targets[target[1]] = targets[target[1]] + 1;
        }
        else {
            targets[target[1]] = 1;
        }
    }
    return targets;
}
// extract line numbers from text
function extractLines(txt) {
    return txt.split('\n').length;
}
