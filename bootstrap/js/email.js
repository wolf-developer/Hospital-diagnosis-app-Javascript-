var map = buildMap();
var mazeHistory = [getMazeId()];
//need to set up a routine that figures out the PO or IV antibiotic from var drugs and then pulls the text from codeCheck. That will tell them what path they were on as well as the decisions to get there
var codeValidation = 1

function setUpEmails() { 
    $(".codefor").each(function (index) {
        $(this).hide(0);
        var parentId = $(this).parents("[data-role='page']").attr("id")
        //console.log("parentID ",parentId);
        //inserts the code getter in the webpages
        if ($("#"+parentId).find("#" + parentId + "-patient-input").size() == 0) {
            $("<div id='" + parentId + "-patient-input'>To reveal code enter:<br/>Patient UR number: <input type='text' id='" + parentId + "-patient-number' name='" + parentId 
            + "'/><br/>Doctor HE number:  <input type='text' id='" + parentId + "-doctor-number' name='" + parentId + "'/><button type='button' onClick='sendEmail(\"" + parentId + "\")'>Get Code</button></div>").insertBefore(this);
        }
    });
}

function isParent(mazeId, lastVisitedMaze) {
    //console.log("mazeID ",mazeId);
    //console.log("lastVisitedMaze ",lastVisitedMaze);
    var cleanMazeId = mazeId.split('#').pop();
    //mazeId.replace("#","")
    var cleanLastMazeId = lastVisitedMaze.split('#').pop();
    //console.log("cleanLastMazeId ",cleanLastMazeId);
    //console.log("cleanLastMazeID Reason: ",cleanLastMazeId.reason)
    // get the part of the tree

    var mazeReason = map[cleanLastMazeId].reason;
    //console.log("mazeReason ",mazeReason);
    //console.log("isParent? ",mazeReason != undefined && mazeReason.filter(function(reason) { return reason.from === cleanMazeId}).length > 0);
    return mazeReason != undefined && mazeReason.filter(function(reason) { return reason.from === cleanMazeId}).length > 0 
}

function getReason(previous, current) {
    //console.log(previous, current)

    var cleanCurrent = current.split('#').pop();
    // get the part of the tree

    if (previous === undefined) {
        if (map[cleanCurrent].reason === undefined) {
            return undefined;
        }
        return map[cleanCurrent].reason[0].reason;
    } else {
        var cleanPrevious = previous.split('#').pop();
        var mapping = map[cleanCurrent].reason.filter(function(reason) { return reason.from === cleanPrevious})[0];
        if (mapping === undefined) {
            return undefined;
        } else {
            return mapping.reason;
        }
    }
}

function getRestOfPath(mazeId) {
    var mazeId = mazeId.split('#').pop();
    var path = []

    while(mazeId !== undefined) {
        var mazeReason = map[mazeId].reason
        if (mazeReason === undefined || mazeReason.length === 0) {
            mazeId = undefined
        } else {
            path.push(mazeReason[0].reason)
            mazeId = mazeReason[0].from
        }
    }

    return path;
}

function getReasonForPaths(mazeHistory) {
    var lastId = mazeHistory.length -1;
    var secondLastId = mazeHistory.length - 2;

    var path = []

    while (lastId >= 0) {
        var current = mazeHistory[lastId];
        var previous = undefined;
        if (secondLastId >= 0) {
            previous = mazeHistory[secondLastId];
        }

        var reason = getReason(previous, current);
        if (reason === undefined) {
            break;
        } else {
            path.push(getReason(previous, current));
        }

        lastId = lastId - 1;
        secondLastId = secondLastId - 1;
    }

    if (lastId < 0) {
        // get the rest of the maze, ignoring the first element
        return path.concat(getRestOfPath(mazeHistory[0]).slice(1))
    } else {
        return path.concat(getRestOfPath(mazeHistory[lastId]));
    }
}

function getMazeId() {
    var mazeId = document.location.href.match(/html.*/g);
    //console.log("mazeID is ",mazeId);
    if (mazeId === null || mazeId === undefined || mazeId[0] === undefined || mazeId[0] === "" || mazeId[0] === "#") {
        return "html#home"
    } else {
        return mazeId[0];
    }
}

function processPopState() {
    //console.log("processing pop state")
    var mazeId = getMazeId()
    $(mazeId).find(".codefor").hide();
    $(mazeId).find(mazeId+"-patient-input").show();
    //start on home cos it is the root of all evil
    mazeHistory = ["#home"]
    //console.log("mazeHistory.length is ",mazeHistory.length);
    // home is the root of all, wipe knowledge of it
    if (mazeId === "html#home") {
        mazeHistory = ["#home"]
    }
    
    // check if we went backwards or forwards
    else if (mazeHistory.length == 0) {
        mazeHistory.push(mazeId);
    } else if (isParent(mazeId, mazeHistory[mazeHistory.length - 1])) {
        mazeHistory.pop()
    } else if (!isParent(mazeId, mazeHistory[mazeHistory.length - 1])) {
        mazeHistory.push(mazeId)
    }
}

if (window.addEventListener !== undefined) {
    window.addEventListener('popstate', function(event) {
        processPopState();
    });
} else {
    window.attachEvent('onpopstate', function(event) {
        processPopState();
    });    
}
var FirstName = {
    asp:"Aspiration Pneumonia", ascho:"Ascending cholangitis", bite:"Animal or human bite", bronchi:"Bronchiectasis", cap:"Community Acquired Pneumonia", 
    carble:"Carbuncle/abscess", cath:"Catheter associated urinary tract infection",
    cell:"Cellulitis (skin)", cellu:"Cellulitis (skin)", celli:"Cellulitis of the eye", chor:"Chorioamnionitis (intra-amniotic infection)", 
    codeCheck:"Code checker", diabf:"Diabetic foot infection", dose:"Dosing nomograms and calculators", 
    empara:"Parapneumonic effusion or empyema", encph:"Encephalitis", epidi:"Epididymo-orchitis", epigl:"Epiglottitis", 
    eyepen:"Penetrating eye injury", febne:"Febrile neutropenia", gastro1:"Gastroenteritis and colitis",
    hap:"Hospital Acquired Pneumonia", iecopd:"Infective exacerbation of COPD", influ:"Influenza infection", intrab:"Intra-abdominal infection",
    intrab1:"Appendicitis", intrab2:"Cholecystitis", intrab3:"Diverticulitis", intrab4:"Pancreatitis", intrab5:"Peritonitis", intrab5a:"Peritonitis due to perforated viscus",
    intrab5b:"Spontaneous Bacterial Peritonitis (SBP)", intrab5c:"Peritoneal dialysis associated peritonitis", intrab6:"Ascending cholangitis",
    lacto:"Lactational mastitis", liver:"Liver abscess", luabsc:"Lung abscess", mastoid:"Acute mastoiditis in children", menin:"Meningitis",
    necro:"Necrotising fasciitis", neoherp:"Neonatal herpes infection", nursicap:"Nursing home or aged care facility pneumonia", oasis:"Third or fourth degree perianal tear prophylaxis",
    open:"Open (compound) fracture", osteo:"Osteomyelitis", otitis:"Otitis media or externa", pelvi:"Pelvic inflammatory disease", pneum:"Pneumonia",
    pospel:"Postprocedural pelvic infection", postendo:"Postpartum endometritis", prostati:"Acute bacterial prostatitis", quinsy:"Peritonsillar abscess (quinsy) or cellulitis",
    respi:"Respiratory tract infections", scab:"Scabies (crusted)", sepbur:"Septic bursitis", sepsis:"Sepsis", septar:"Septic arthritis",
    septor:"Septic abortion", shing:"Shingles", surginf:"Surgical site infection", surgpro:"Surgical prophylaxis", tcap:"Tropically Acquired Community Acquired Pneumonia",
    trauma:"Post traumatic wound", ulcer:"Skin ulcer (non-diabetic)", utis:"Urinary tract infections (UTIs)", watwo:"Water immersed wound infection"};

function sendEmail(parentId) {
    var patientNumber = $("#"+parentId+"-patient-number").val()
    var doctorNumber = $("#"+parentId+"-doctor-number").val()

    // Check codes are valid
    if(!patientCheck(patientNumber)){
        alert('Invalid patient number')
        return;
    }
    if(!doctorCheck(doctorNumber)){
        alert('Invalid doctor number')
        return;
    }

    // Guaranteed that the codes are valid now.
    $("#"+parentId).find(".codefor").show() 
    $("#"+parentId+"-patient-input").hide()

    var treatment = []

    $("#"+parentId).find(".codefor").each(function (index) {
        var code = extractCode(this);
        var drugs = extractDrugs(this);

        treatment.push({code: code, drugs: drugs})
    })

    var name_key = mazeHistory[mazeHistory.length-1].split("#")[1].split(/([0-9]+)/)[0];
    // var name_key = name_key1.split(/([0-9]+)/)[0];
    if(name_key=="gastro"){
        name_key="gastro1";
    }
    if(name_key=="carblec"){
        name_key="carble";
    }
    if(name_key=="sepsisb"){
        name_key="sepsis";
    }
    console.log(name_key);
    var content=FirstName[name_key]+"\n"+getReasonForPaths(mazeHistory).reverse().join('\n');
    console.log(content);
    
    // if(name_key=="");
    $.post( "http://topendams.com/ScratchHouse/email.php", { treatment_code: treatment, patient_code: patientNumber, doctor_code: doctorNumber, reason: content },
        function( data ) {
            //console.log( data );
        });
}


function patientCheck(patientNumber) {
    return patientNumber.length === 8 && /[a-zA-Z]\d\d\d\d\d\d\d/.test(patientNumber)
}

function doctorCheck(doctorNumber) {
    return (doctorNumber.length === 7 && /[hH][eE]\d\d\d\d\d/.test(doctorNumber))
        || (doctorNumber.length === 8 && /[hH][eE]\d\d\d\d\d\d/.test(doctorNumber))
}


setUpEmails()