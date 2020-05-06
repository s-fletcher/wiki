/**
 * Called if slug is not unique. Appends slug-"num" to the end. Ex: If there are
 * already 3 with the slug of "demo", then this will generate a slug of "demo-4".
 * @param {String} slug the slug to make unique
 * @param {String} previousSlug previous result of calling makeUnique if
 * previously failed
 */
function makeUnique(slug, previousSlug) {
    if (previousSlug != slug) {
        var end = previousSlug.substring(slug.length + 1);
        end = parseInt(end) + 1;
        return slug + "-" + end;
    }
    return slug + "-1";
}

module.exports = makeUnique;