// TEST
console.log('analyzeContent("this is a test\\nSeems to work")');
console.log(analyzeContent("this is a test\nSeems to work"));
console.log();
console.log('analyzeContent("body{blabla} a{color:#fff} a{ padding:0}")');
console.log(analyzeContent("body{blabla} a{color:#fff} a{ padding:0}"));
console.log();
console.log('analyzeContent("<html><div></div><div></div></html>")');
console.log(analyzeContent("<html><div></div><div></div></html>"));


// analyze content and extract information about content

type Tags = {[key: string]: number};
type CssTargets = {[key: string]: number};

type ContentInfo = {contentType: string, tags?: Tags, cssTargets?: CssTargets, lineNumber?: number};

function analyzeContent(content: string): ContentInfo {
    const contentInfo: Partial<ContentInfo> = {};
    
    if (isHTML(content)) {
        contentInfo.contentType = "HTML";
        contentInfo.tags = extractTags(content);
    } else if (isCSS(content)) {
        contentInfo.contentType = "CSS";
        contentInfo.cssTargets = extractTargets(content);
    } else {
        contentInfo.contentType = "TEXT";
        contentInfo.lineNumber = extractLines(content);
    }

    return contentInfo as ContentInfo;
}


// check if string is HTML
function isHTML(content: string): boolean {
    return content.match(/<[^\/].*?>/) != null;
}


// check if string is CSS
function isCSS(content: string): boolean {
    return content.match(/.+{.*}/) != null;
}


// extract HTML tags from HTML string
function extractTags(html: string): {[key: string]: number} {
    const tags: {[key: string]: number} = {};
    const matchedTags = html.matchAll(/<([^\/].*?)>/g);
    for (const tag of matchedTags) {
        if (tags[tag[1]]) {
            tags[tag[1]] = tags[tag[1]] + 1;
        } else {
            tags[tag[1]] = 1;
        }
    }
    return tags;
}


// extract CSS targets from CSS string
function extractTargets(css: string): {[key: string]: number} {
    const targets: {[key: string]: number} = {};
    const matchedTargets = css.trim().matchAll(/(.+?){.*?}\s*/g);
    for (const target of matchedTargets) {
        if (targets[target[1]]) {
            targets[target[1]] = targets[target[1]] + 1;
        } else {
            targets[target[1]] = 1;
        }
    }
    return targets;
}


// extract line numbers from text
function extractLines(txt: string): number {
    return txt.split('\n').length;
}