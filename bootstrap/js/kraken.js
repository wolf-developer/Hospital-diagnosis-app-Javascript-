function extractCode(codeforElement) {
    return $(codeforElement).children(".bold:first").text().replace(" document.write(getCode())" , "").replace(";", "").trim()
}

function extractDrugs(codeforElement) {
    return $(codeforElement).children(".color-success:first").text().replace("Code for " , "").replace("is:", "")
    .split(new RegExp(" and | or |,|\\+|/", 'g'))
    .map(function(val) { return val.replace("if required", "")})
    .map(function(val) {return val.trim()})
}

function extractMazeParent(element) {
    return $(element).parents("[data-role='page']")
}

function getPotentialDrugOptions() {
    var options = [];
    $("#codeAntibiotic").children("option").each(function (index) {
        options.push({name: $(this).text().trim().replace(" PO", " orally").toLowerCase(), selector: $(this).val()});
    });
    return options;
}

function buildMap() { 
    var tree = {"home":{}}
    $("a").each(function (index) {
        var path = $(this).attr("href")
        if (path !== undefined && path.startsWith("#") && !path.includes("#home") && $(this).parent().parent().parent().parent().attr("id") !== undefined) {
            var simplePath = path.split('#').pop();
            var mazeParent = extractMazeParent(this)
            var mazeParentId = mazeParent.attr("id")
            var reason = $(this).text()
            // Add a bit more details
            if (reason.toLowerCase() === "no" || reason.toLowerCase() === "yes") {
                reason = $(this).parent().parent().siblings(":first").text().trim() + ":" + reason
            }

            if (tree[simplePath] === undefined) {
                tree[simplePath] = {reason: [{reason: reason, from: mazeParentId}]}
            } else {
                tree[simplePath]["reason"].push({reason: reason, from: mazeParentId})
            }

            if(tree[mazeParentId] === undefined) {
                tree[mazeParentId] = {reason:[]}
            }            
            tree[mazeParentId][simplePath] = tree[simplePath]
        }
    })
    return tree;
}

function krakenSearch() {
    var searchTerm = $( "#kraken-search-input").val().toLowerCase().trim()
    $("a").each(function (index) {
        var tagString = $(this).attr("tags")
        if (tagString !== undefined) {
            var tags = tagString.split(",").map(val => val.toLowerCase().trim())
            if (tags.find(val => val.includes(searchTerm))) {
                $(this).parent().show()
            } else {
                $(this).parent().hide()
            }
        }
    })
}