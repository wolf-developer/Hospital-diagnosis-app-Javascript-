function test() {
    var now = new Date();

    var options = getPotentialDrugOptions()

    var wrongEntries = 0;

    $(".codefor").each(function (index) {
        var code = extractCode(this);
        var drug = extractDrugs(this);

        var description = $(this).siblings(".color-primary:first").text()
        var mazeId = extractMazeParent(this).attr("id")

        var validity = drug.map(druggo => {
            var correctOption = options.find( element => element.name.includes(druggo));
            if (correctOption === undefined) {
                return false
            }
            var validity = checkCode(code, now, correctOption.selector);

            return validity.includes("This is a valid code")
        }).reduce( (accumulator, currentValue) => accumulator && currentValue )

        var compiled = {
            mazeId: mazeId,
            description: description,
            drug: drug,
            code: code,
            validity: validity
        }

        if (validity === false) {
            //console.log(compiled)
            ++wrongEntries;
        }
    });

    //console.log("Wrong entries: " + wrongEntries)

    $(".medicine").each(function (index) {
        var mazeParent = $(this).parents("[data-role='page']")
        var mazeId = mazeParent.attr("id")
        var missingCode = mazeParent.find(".codefor").length == 0
        if (missingCode) {
            //console.log(mazeId + " is missing a code!!");
        }
    })
}

function getPaths(mazeId, tree) {
    var component = tree[mazeId]
    if (mazeId.trim() === "home" || component === undefined) {
        return [[]];
    }

    if (component.reason.length === 0) {
        //console.log("ERROR: " + mazeId + " is orphaned!!")
        return [[]]
    }

    return component.reason.map(previousState => getPaths(previousState.from, tree).map(path => path.concat(previousState.reason)))
            .reduce((accumulator, value) => accumulator.concat(value));
}

function collapsePaths(paths) {
    var tree = {}
    $(paths).each(function(index) {
        var currentNode = tree
        $(this).each(function(idx){
            var thisText = "" + this
            if (currentNode[thisText] == undefined) {
                currentNode[thisText] = {}
            }
            currentNode = currentNode[thisText]
        })
    })

    return tree;
}

function inspectCodes() {
    var codeRepository = {}
    var options = getPotentialDrugOptions()
    var tree = buildMap()
    var missingCodeSet = new Set()

    $(".codefor").each(function (index) {
        var code = extractCode(this);
        var drugs = extractDrugs(this);

        var mazeId = extractMazeParent(this).attr("id")

        drugs.map(druggo => {
            var correctOption = options.find( element => element.name.includes(druggo.toLowerCase()));
            if (correctOption !== undefined) {
                var finalCode = extractCodeCheckerCode(code, correctOption.selector);
                var missingCode = acceptableCodes[finalCode] === undefined

                var pathToCode = getPaths(mazeId, tree)

                if (missingCode) {
                    pathToCode = pathToCode.map(path => path.concat("CODE IS MISSING FROM CODE CHECKER : " + mazeId))
                    missingCodeSet.add(finalCode)
                }

                if (codeRepository[finalCode] === undefined) {
                    codeRepository[finalCode] = []
                }

                codeRepository[finalCode] = codeRepository[finalCode].concat(pathToCode)

            } else {
                //console.log("Could not find correct option for " + druggo + " on page with maze id " + mazeId)
            }
        })

    });

    var collapsedCodeRepository = {}
    var missingCodeRepository = {}

    Object.keys(codeRepository).map(foo => {
        collapsedCodeRepository[foo] = collapsePaths(codeRepository[foo])
        if (missingCodeSet.has(foo)) {
            missingCodeRepository[foo] = codeRepository[foo].sort();
        }
        codeRepository[foo] = codeRepository[foo].sort()
    })

    // Missing codes
    if (missingCodeSet.size > 0) {
        //console.log(missingCodeSet.size + " invalid codes", missingCodeRepository);
    }

    var visitable = new Set(getVisitable(tree["home"]))

    var pagesVisited = new Set();
    var duplicatePages = new Set();
    var orphanedPage = new Set();
    // Check duplicates
    $("[data-role='page']").each(function(index){
        var id = $(this).attr("id");
        if (pagesVisited.has(id)) {
            // Already seen page, must be duplicate
            duplicatePages.add(id);
        }
        pagesVisited.add(id)
        if (!visitable.has(id)) {
            orphanedPage.add(id);
        }
    });

    if (duplicatePages.size > 0) {
        //console.log("Duplicate mazeIds: ", duplicatePages);
    }

    if (orphanedPage.size > 0) {
        //console.log("Orphaned mazeIds: ", orphanedPage);
    }

    var allDrugOptionsSimple = getPotentialDrugOptions().map(foo => foo.name.replace(new RegExp("[ /].*"), ""))

    $(".medicine").each(function(index){
        var parent = extractMazeParent(this)

        var textOfDoom = ""

        $(parent).find(".medicine").each(function(index){
            textOfDoom = textOfDoom + "\n" + $(this).text() 
        })

        var onPage = allDrugOptionsSimple
                .map(foo => textOfDoom.includes(foo))
                .reduce( (accumulator, currentValue) => accumulator || currentValue )

        if($(parent).find(".codefor").length === 0 && onPage) {
            //console.log($(parent).attr("id"))
        }
    })

    return codeRepository;
}

function getVisitable(node) {
    if (Object.keys(node).length === 1) {
        return [];
    }
    return Object.keys(node).flatMap(foo => {
        if (foo === "reason") {
            return [];
        }
        var otherMazeIds = getVisitable(node[foo]);
        return otherMazeIds.concat(foo);
    })
}

//console.log(inspectCodes())