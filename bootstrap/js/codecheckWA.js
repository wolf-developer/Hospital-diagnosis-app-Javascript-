
function getCode() {
    var now = new Date();
    var fullDaysSinceEpoch = (Math.floor(((now) / 8.64e7) - 150.604166666))%1000;
    var padding = "";
    if (parseInt(fullDaysSinceEpoch) < 1) {
        padding = padding + "0"
    }
    if (parseInt(fullDaysSinceEpoch) < 10) {
        padding = padding + "0"
    }
    if (parseInt(fullDaysSinceEpoch) < 100) {
        padding = padding + "0"
    }
    return '' + now.getDay() + padding + fullDaysSinceEpoch;
}

function checkValidity(userDayNumber, userCodeIdentifier, todaysNumber, todaysIdentifier) {
    var codeValid = "invalid";
    var codesDaysBetween = 88;
    if(userDayNumber>todaysNumber){
        codesDaysBetween = userDayNumber - todaysNumber;
    }
    if(todaysNumber>userDayNumber){
        codesDaysBetween = todaysNumber - userDayNumber;
    }
    if(todaysNumber-userDayNumber === 0){
        codesDaysBetween = 0;
    }
    for (userCodeIdentifier; userCodeIdentifier<=todaysIdentifier; userCodeIdentifier=userCodeIdentifier+0){
    if(userCodeIdentifier+codesDaysBetween === todaysIdentifier){
    codeValid ="valid";
    return "valid";
    break;
    }
    else userCodeIdentifier +=7;       
    }
    return codeValid;
}

var numberToWordsConverter = ["one", "two", "three", "four", "five", "six", "seven"]

var acceptableCodes = {
    "2abpgentam" : "This is a valid code for gentamicin for non-sexually acquired epididymo-orchitis or acute bacterial prostatitis in a patient who can tolerate gentamicin",
    "2abpgentam" : "This is a valid code for ceftriaxone for non-sexually acquired epididymo-orchitis or acute bacterial prostatitis in a patient who cannot tolerate gentamicin",
    "1abpceftri" : "This is a valid code for ceftriaxone for sexually acquired epididymo-orchitis for a single dose of treatment",
    "7abpPO azi" : "This is a valid code for oral azithromycin for sexually acquired epididymo-orchitis",
    "14abpPO cip" : "This is a valid code for oral ciprofloxacin for non-sexually acquired, non-severe epididymo-orchitis or non-severe acute bacterial prostatitis in a patient with a known resistant pathogen on micro",
    "3ascceftri" : "This is a valid code for ceftriaxone for ascending cholangitis in a patient with immediate or delayed non-severe penicillin hypersensitivity or who cannot tollerate gentamicin",
    "2ascgentam" : "This is a valid code for gentamicin for ascending cholangitis in a patient who can tolerate gentamicin with no penicillin hypersensitivity or immediate or delayed severe penicillin hypersensitivity",
    "3ascpipera" : "This is a valid code for Tazocin for ascending cholangitis in a patient with no penicillin hypersensitivity who cannot tollerate gentamicin",
    "5cacPO cli" : "This is a valid code for clindamycin in carbuncle sourced cellulitis where the cellulitis/abscess is mild/moderate, in an adult patient with nMRSA and either no penicillin hypersensitivity or immediate or delayed severe penicillin hypersensitivity",
    "2cacvancom" : "This is a valid code for vancomycin in carbuncle sourced cellulitis where the cellulitis/abscess is severe, in a patient that either has immediate or delayed severe penicillin hypersensitivity or a combination of nMRSA and either no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "5carPO cli" : "This is a valid code for clindamycin for Carbuncle/Abscess where there are no signs of spreading cellulitis or significant systemic features in an adult patient with immediate or delayed severe penicillin hypersensitivity",
    "1uroPO cip" : "This is a valid code for PO ciprofloxacin surgical prophylaxis for Urological surgery, transrectal prostatic biopsy where anitbiotic prophylaxis is necessary in a patient who has not travelled to south east asia in the last six months",
    "5bchceftri" : "This is a valid code for ceftriaxone for bronchiectasis",
    "5bchceftaz" : "This is a valid code for ceftazidime for bronchiectasis in a patient with pseudomonas infection",
    "5bchamocla" : "This is a valid code for IV amoxicillin and clavulanate for bronchiectasis in a child with no pseudomonas infection",
    "5bchIV mox" : "This is a valid code for moxifloxacin for bronchiectasis in a patient with severe penicillin allergy",
    "5bchPO cip" : "This is a valid code for oral ciprofloxacin for bronchiectasis in a patient with pseudomonas",
    "5bchclarit" : "This is a valid code for clarithromycin for bronchiectasis in a patient with severe penicillin allergy",
    "5bchcefuro" : "This is a valid code for cefuroxime for bronchiectasis in a patient with penicillin allergy",
    "5bchPO mox" : "This is a valid code for moxifloxacin for bronchiectasis in a patient with severe penicillin allergy",
    "10bchceftri" : "This is a valid code for ceftriaxone for bronchiectasis",
    "10bchcefota" : "This is a valid code for cefotaxime for bronchiectasis",
    "10bchceftaz" : "This is a valid code for ceftazidime for bronchiectasis in a patient with pseudomonas infection",
    "10bchamocla" : "This is a valid code for IV amoxicillin and clavulanate for bronchiectasis in a child with no pseudomonas infection",
    "10bchIV mox" : "This is a valid code for moxifloxacin for bronchiectasis in a patient with severe penicillin allergy",
    "10bchPO cip" : "This is a valid code for oral ciprofloxacin for bronchiectasis in a patient with pseudomonas",
    "10bchclarit" : "This is a valid code for clarithromycin for bronchiectasis in a patient with severe penicillin allergy",
    "10bchcefuro" : "This is a valid code for cefuroxime for bronchiectasis in a patient with penicillin allergy",
    "10bchPO mox" : "This is a valid code for moxifloxacin for bronchiectasis in a patient with severe penicillin allergy",
    "2bchceftaz" : "This is a valid code for ceftazidime for bronchiectasis in a patient with likely pseudomonas and severe bronchiectasis",
    "2bchIV cip" : "This is a valid code for IV ciprofloxacin for bronchiectasis in a patient with mild penicillin allergy and likely pseudomonas",
    "2bchgentam" : "This is a valid code for gentamicin for bronchiectasis in a patient with mild penicillin allergy and likely pseudomonas",
    "2bchpipera" : "This is a valid code for piperacillin-tazobactam for bronchiectasis in a patient with mild penicillin allergy and likely pseudomonas",
    "3bitPO cli" : "This is a valid code for clindamycin for dog/cat/human bite/punch for prophylaxis in a patient with penicillin allergy",
    "3bitPO cip" : "This is a valid code for ciprofloxacin for dog/cat/human bite/punch for prophylaxis in a patient with penicillin allergy",
    "3bitIV cli" : "This is a valid code for IV clindamycin for dog/cat/human bite/punch with signs infection in a patient with penicillin allergy",
    "3bitIV cip" : "This is a valid code for IV ciprofloxacin for dog/cat/human bite/punch with signs of moderate/severe infection in a patient with immediate or delayed non-severe or severe penicillin hypersensitivity",
    "3bitceftri" : "This is a valid code for ceftriaxone for dog/cat/human bite/punch with signs of moderate/severe infection in a patient with immediate or delayed non-severe or severe penicillin hypersensitivity",
    "5bitamocla" : "This is a valid code for IV amoxicillin+clavulanate for dog/cat/human bite/punch with signs of mild or moderate/severe infection in a patient with no penicillin hypersensitivity",
    "2bitvancom" : "This is a valid code for vancomycin for dog/cat/human bite/punch at with either signs of mild infection in a patient with no penicillin hypersensitivity or signs of moderate/severe infection in a patient with no penicillin hypersensitivity/delayed non-severe penicillin hypersensitivity/delayed severe penicillin hypersensitivity",
    "3bitamocla" : "This is a valid code for IV amoxicillin+clavulanate for dog/cat/human bite/punch with with no signs of infection present (used as prophylaxis only) in a patient with no penicillin hypersensitivity",
    "2burvancom" : "This is a valid code for vancomycin for septic bursitis in a patient with severe penicillin allergy or MRSA risk factors",
    "2burIV cli" : "This is a valid code for IV clindamycin for septic bursitis in a patient with severe penicillin allergy without MRSA risk factors",
    "7burPO cli" : "This is a valid code for PO clindamycin for non-severe septic bursitis in a patient with severe penicillin allergy without MRSA risk factors",
    "2celIV cli" : "This is a valid code for IV clindamycin for cellulitis with severe penicillin allergy",
    "2celvancom" : "This is a valid code for vancomycin for cellulitis with severe penicillin allergy",
    "3cliceftri" : "This is a valid code for ceftriaxone for periorbital cellulitis or orbital cellulitis",
    "3clicefota" : "This is a valid code for cefotaxime for periorbital cellulitis in a patient that is severely ill with immediate or delayed non-severe penicillin hypersensitivity or orbital cellulitis in a patient with immediate or delayed non-severe penicillin hypersensitivity",
    "2clivancom" : "This is a valid code for vancomycin for orbital cellulitis or severe periorbital in a patient with immediate or delayed severe penicillin hypersensitivity",
    "3cliIV cip" : "This is a valid code for IV ciprofloxacin for orbital cellulitis or severe periorbital with moderate or severe penicillin allergy",
    "3cliPO cli" : "This is a valid code for PO clindamycin for non-severe periorbital cellulitis in patient with severe penicillin allergy",
    "7cliIV cli" : "This is a valid code for IV clindamycin for orbital cellulitis or severe periorbital with severe penicillin allergy",
    "5celPO cli" : "This is a valid code for PO clindamycin for mild/moderate cellulitis with no purulent focus for infection in an adult patient with severe penicillin allergy",
    "7dfiamocla" : "This is a valid code for IV Augmentin for a diabetic foot infection where the infection is moderate or severe in patient with no penicillin hypersensitivity",
    "7dfiamocla" : "This is a valid code for IV amoxicillin+clavulanate for a diabetic foot infection where the infection is moderate in patient with no penicillin hypersensitivity",
    "7dfipipera" : "This is a valid code for piperacillin-tazobactam for a diabetic foot infection where the infection is severe in patient with no penicillin hypersensitivity",
    "2dfivancom" : "This is a valid code for vancomycin for a diabetic foot infection where the infection is moderate or severe in patient at risk of MRSA or with signs of sepsis",
    "2dfiPO cip" : "This is a valid code for PO ciprofloxacin for a diabetic foot infection where the infection is moderate in patient at risk of MRSA with signs of sepsis with immediate or delayed non-severe or severe penicillin hypersensitivity",
    "2dfiIV cip" : "This is a valid code for IV ciprofloxacin for a diabetic foot infection where the infection is moderate in patient at risk of MRSA with signs of sepsis with immediate or delayed non-severe or severe penicillin hypersensitivity",
    "2dfiIV cli" : "This is a valid code for IV clindamycin for a diabetic foot infection where the infection is moderate or severe in patient with immediate or delayed non-severe or immediate or delayed severe penicillin hypersensitivity",
    "7dfiPO cip" : "This is a valid code for PO ciprofloxacin for a diabetic foot infection where the infection is moderate or severe in patient with immediate or delayed non-severe or severe penicillin hypersensitivity",
    "7dfiPO cli" : "This is a valid code for PO clindamycin for a diabetic foot infection where the infection is moderate in patient with immediate or delayed non-severe or severe penicillin hypersensitivity",
    "5epgmPO mox" : "This is a valid code for IV moxifloxacin for epiglottitis in a patient with penicillin anaphylaxis",
    "5epgcefota" : "This is a valid code for cefotaxime for epiglottitis in a patient with immediate or delayed non-severe penicillin hypersensitivity or no penicillin hypersensitivity",
    "5epgceftri" : "This is a valid code for ceftriaxone for epiglottitis in a patient with immediate or delayed non-severe penicillin hypersensitivity or no penicillin hypersensitivity",
    "5epgIV mox" : "This is a valid code for IV moxifloxacin for epiglottitis in a patient with penicillin anaphylaxis",
    "7empIV mox" : "This is a valid code for IV moxifloxacin for severe parapnuemonic effusion/empyema in a patient with penicillin anaphylaxis",
    "7empceftri" : "This is a valid code for ceftriaxone for severe parapnuemonic effusion/empyema in a patient with non severe penicillin allergy",
    "5empIV mox" : "This is a valid code for IV moxifloxacin for non-severe parapnuemonic effusion/empyema in a patient with penicillin anaphylaxis",
    "5empceftri" : "This is a valid code for ceftriaxone for non-severe parapnuemonic effusion/empyema in a patient with non severe penicillin allergy",
    "5fluoselta" : "This is a valid code for oseltamivir for signs of influenza like illness",
    "3febaztreo" : "This is a valid code for Aztreonam for a febrile neutropenia patient with severe penicillin allergy",
    "3febvancom" : "This is a valid code for vancomycin for febrile neutropeniain a patient either that has been colonised with or recently infected with muli-drug resistant Gram negative bacteria and is at risk of MRSA infection or in patient that has not been colonised with or recently infected with muli-drug resistant Gram negative bacteria, with no penicillin hypersensitivity, is not at risk of MRSA infection and has signs of severe sepsis or immediate or delayed severe penicillin hypersensitivity and is at risk of MRSA infection",
    "3febmerope" : "This is a valid code for meropenem for febrile neutropenia in a patient that has been colonised with or recently infected with muli-drug resistant Gram negative bacteria in the wet season",
    "2febgentam" : "This is a valid code for gentamicin for febrile neutropenia with signs of sepsis in patient that has not been colonised with or recently infected with muli-drug resistant Gram negative bacteria with either no penicillin hypersensitivity or immediate or delayed non-severe or severe penicillin hypersensitivity and either is at risk of MRSA infection or has signs of severe sepsis in the dry season",
    "3febpipera" : "This is a valid code for Piperacillin/tazobactam for febrile neutropenia in patient that has not been colonised with or recently infected with muli-drug resistant Gram negative bacteria in the dry season",
    "3febceftaz" : "This is a valid code for ceftazidime for febrile neutropenia in patient immediate or delayed non-severe penicillin hypersensitivity that has not been colonised with or recently infected with muli-drug resistant Gram negative bacteria",
    "3febcefepi" : "This is a valid code for cefepime for febrile neutropenia in patient immediate or delayed non-severe penicillin hypersensitivity that has not been colonised with or recently infected with muli-drug resistant Gram negative bacteria",
    "3febIV cip" : "This is a valid code for IV ciprofloxacin for a non-septic febrile neutropenia patient with severe penicillin allergy",
    "3gasPO azi" : "This is a valid code for oral azithromycin for gastroenteritis in a paediatric patient with no symptoms of E.coli, tolerating oral medications or an adult who has travelled to SE asia",
    "3gasPO cip" : "This is a valid code for oral ciprofloxacin for gastroenteritis in an adult patient tolerating oral medications",
    "3gasceftri" : "This is a valid code for ceftriaxone for gastroenteritis in a patient not tolerating oral medications with no penicillin hypersensitivity or with immediate or delayed non-severe penicillin hypersensitivity or cephalosporin allergy",
    "3gascefota" : "This is a valid code for cefotaxime for gastroenteritis in a patient with no symptoms of severe disease, who is immunocompromised and can not tolerating oral medications with no penicillin hypersensitivity or with immediate or delayed non-severe penicillin hypersensitivity and no cephalosporin allergy or in a child patients with symptoms of severe disease who has no risk factors for enterohaemorrhagic E.coli, who is immunocompromised and can not tolerating oral medications with no penicillin hypersensitivity or with immediate or delayed non-severe penicillin hypersensitivity and no cephalosporin allergy",
    "3gasnorflo" : "This is a valid code for norfloxacin for gastroenteritis in a patient tolerating oral medications",
    "5intamocla" : "This is a valid code for IV amoxicillin/clavulanate for ruptured appendicitis or cholecystitis where a cholecystectomy has not been performed or where an appendectomy has not been performed or an appendectomy has been perforemed and the appecndix was ruptured or there was an appendiceal abscess, in a patient who cannot tolerate gentamicin and has no penicillin hypersensitivity",
    "2intgentam" : "This is a valid code for gentamicin for ruptured appendicitis, severe diverticulitis or acalculous cholecystitis in a patient who can tolerate gentamicin and has no penicillin hypersensitivity or has immediate or delayed severe penicillin hypersensitivity or calculous cholecystitis where a cholecystectomy has not been performed in a patient who can tolerate gentamicin and has severe penicillin hypersensitivity",
    "2intceftri" : "This is a valid code for ceftriaxone for ruptured appendicitis, cholecystitis or necrotic pancreatitis in a patient with immediate or delayed non-severe penicillin hypersensitivity",
    "2intIV cli" : "This is a valid code for IV clindamycin for ruptured appendicitis, acalculous cholecystitis where a cholecystectomy has not been performed or necrotic pancreatitis in a patient who can tolerate gentamicin and has immediate or delayed severe penicillin hypersensitivity",
    "1intgentam" : "This is a valid code for a single further dose of gentamicin after clean cholecyesytectomy has been performed on either an acalculous cholecystitis in a patient who can tolerate gentamicin or  a calculous cholecystitis in a patient who can tolerate gentamicin and has severe penicillin hypersensitivity",
    "1intpipera" : "This is a valid code for a single further day of Tazocin after clean cholecyesytectomy has been performed",
    "1intceftri" : "This is a valid code for a single further dose of ceftriaxone after clean cholecyesytectomy has been performed on an acalculous cholecystitis in a patient who cannot tolerate gentamicin or a calculous cholecystitis in a patient who cannot tolerate gentamicin and has either no or non-severe penicillin hypersensitivity",
    "1inaceftri" : "This is a valid code for a single further dose of ceftriaxone after clean cholecyesytectomy has been performed",
    "1inaIV cli" : "This is a valid code for a single further dose of clindamycin after clean cholecyesytectomy has been performed",
    "1inagentam" : "This is a valid code for a single further dose of gentamicin after clean cholecyesytectomy has been performed",
    "1inapipera" : "This is a valid code for a single further dose of piperacillin-tazobactam after clean cholecyesytectomy has been performed",
    "1inaamocla" : "This is a valid code for a single further dose of IV amoxicillin+clavulanate after clean cholecyesytectomy has been performed",
    "3intceftri" : "This is a valid code for ceftriaxone for cholecystitis, perforated viscus or diverticulitis in a patient with mild penicillin allergy",
    "3intpipera" : "This is a valid code for Piperacillin/tazobactam for empirical treatment of cholecystitis or diverticulitis in a patient who cannot tolerate gentamicin",
    "3intIV cli" : "This is a valid code for IV clindamycin for severe diverticuilitis/perforated viscus in a patient with life threatening penicillin allergy",
    "2inppipera" : "This is a valid code for piperacillin-tazobactam for severe/necrotic pancreatitis in a patient with no penicillin hypersensitivity",
    "2inbpipera" : "This is a valid code for piperacillin-tazobactam for peritonitis caused by perforated viscus in a patient with no penicillin hypersensitivity who cannot tollerate gentamicin or for spontaneous peritonitis in a patient with no penicillin hypersensitivity that has been on SBP prophylaxis",
    "2inbgentam" : "This is a valid code for gentamicin for peritonitis caused by perforated viscus in a patient who can tollerate gentamicin with either with no penicillin hypersensitivity or immediate or delayed severe penicillin hypersensitivity",
    "2inbceftri" : "This is a valid code for ceftriaxone for SBP in a pt not receiving ABx prophylaxis or severe diverticulitis in a patient immediate or delayed non-severe penicillin hypersensitivity or for peritonitis caused by perforated viscus in a patient with immediate or delayed non-severe penicillin hypersensitivity",
    "2inpceftri" : "This is a valid code for ceftriaxone for severe/necrotic pancreatitis in a patient with immediate or delayed non-severe penicillin hypersensitivity",
    "2inpcefota" : "This is a valid code for cefotaxime for severe/necrotic pancreatitis in a patient with immediate or delayed non-severe penicillin hypersensitivity",
    "2inbamocla" : "This is a valid code for IV Augmentin for either spontaneous bacterial peritonitis for a patient who developed SBP whilst on prophylactic ABx, or for diverticulitis",
    "2inaamocla" : "This is a valid code for IV Augmentin for calculous cholecystitis for a patient who cannot tolerate gentamicin",
    "2inaamocla" : "This is a valid code for IV amoxicillin/clavulanate for calculous cholecystitis for a patient who cannot tolerate gentamicin, where a cholecystectomy has not been performed with no penicillin hypersensitivity",
    "2inagentam" : "This is a valid code for gentamicin for acalculous cholecystitis for a patient who can tolerate gentamicin, where a cholecystectomy has not been performed",
    "2inaIV cli" : "This is a valid code for IV clindamycin for acalculous cholecystitis for a patient who can tolerate gentamicin, where a cholecystectomy has not been performed",
    "1inaamocla" : "This is a valid code for IV Augmentin for calculous cholecystitis for a patient who cannot tolerate gentamicin, with no penicillin hypersensitivity who has had an uncomplicated cholecystectomy",
    "2livgentam" : "This is a valid code for empiric gentamicin for a liver abscess in a patient with no penicillin allergy",
    "2livceftri" : "This is a valid code for empiric ceftriaxone for a liver abscess in a patient with a non-severe penicillin allergy",
    "2livcefota" : "This is a valid code for empiric cefotaxime for a liver abscess in a patient with a non-severe penicillin allergy",
    "2menceftri" : "This is a valid code for ceftriaxone for meningitis in an adult or child >2months with no penicillin hypersensitivity",
    "2mencefota" : "This is a valid code for cefotaxime for meningitis in a child <2months old with no penicillin hypersensitivity",
    "2menIV aci" : "This is a valid code for IV aciclovir for meningitis in child (<2 months old) with meningitis with no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "2menvancom" : "This is a valid code for vancomycin in an adult or child >2months for meningitis",
    "2menIV cip" : "This is a valid code for IV ciprofloxacin for meningitis in an adult or child >2months for a patient with immediate or delayed severe penicillin hypersensitivity",
    "2menIV mox" : "This is a valid code for IV moxifloxacin for meningitis in an adult or child >2months for a patient with immediate or delayed severe penicillin hypersensitivity",
    "2necvancom" : "This is a valid code for vancomycin for empirical therapy of necrotising fasciitis or cellulitis sourced sepsis",
    "2necIV cli" : "This is a valid code for IV clindamycin for empirical therapy of necrotising fasciitis or cellulitis sourced sepsis",
    "2necmerope" : "This is a valid code for meropenem for empirical therapy of necrotising fasciitis or cellulitis sourced sepsis in a patient with penicillin allergy or a wound exposed to water",
    "2necIV cip" : "This is a valid code for IV ciprofloxacin for empirical therapy of necrotising fasciitis or cellulitis sourced sepsis in a wound exposed to water",
    "2necpipera" : "This is a valid code for piperacillin-tazobactam for empirical therapy of necrotising fasciitis in a patient with no penicillin hypersensitivity or cellulitis sourced sepsis in a wound not exposed to water",
    "7opcpipera" : "This is a valid code for Piperacillin/tazobactam for severe open fracture with clinical evidence of infection with no penicillin hypersensitivity where the wound has not been immersed in water",
    "7opccefepi" : "This is a valid code for cefepime for severe open fracture with clinical evidence of infection with no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "7opfpipera" : "This is a valid code for Piperacillin/tazobactam for severe open fracture in a patient with no penicillin allergy",
    "7opfcefepi" : "This is a valid code for cefepime for severe open fracture with established infection",
    "7opfIV cip" : "This is a valid code for IV ciprofloxacin for severe open fracture with clinical evidence of infection with immediate or delayed severe penicillin hypersensitivity",
    "7opfIV cli" : "This is a valid code for IV clindamycin for severe open fracture with clinical evidence of infection with immediate or delayed severe penicillin hypersensitivity",
    "7opfPO cip" : "This is a valid code for PO ciprofloxacin for open fracture with clinical evidence of infection with immediate or delayed severe penicillin hypersensitivity",
    "7opfPO cli" : "This is a valid code for PO clindamycin for severe open fracture in a patient with severe penicillin allergy",
    "2opcvancom" : "This is a valid code for vancomycin in a patient with an open fracture with clinical evidence of infection",
    "2opfvancom" : "This is a valid code for vancomycin in a patient with an open fracture at risk of MRSA infection",
    "3opfcefepi" : "This is a valid code for cefepime prophylaxis in a patient with an open fracture with no clinical evidence of infection, with no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "3opfIV cip" : "This is a valid code for IV ciprofloxacin prophylaxis in a patient with an open fracture with no clinical evidence of infection with immediate or delayed severe penicillin hypersensitivity",
    "3opfPO cip" : "This is a valid code for oral ciprofloxacin prophylaxis in a patient with severe penicillin allergy with an open fracture without established infection",
    "3opfIV cli" : "This is a valid code for IV clindamycin prophylaxis in a patient with an open fracture with no clinical evidence of infection with immediate or delayed severe penicillin hypersensitivity",
    "3opfPO cli" : "This is a valid code for oral clindamycin prophylaxis in a patient with severe penicillin allergy with an open fracture without established infection",
    "5ostceftri" : "This is a valid code for ceftriaxone in a child with no penicillin allergy or non-severe penicillin allergy with suspected Kingella kingae infection",
    "5ostcefota" : "This is a valid code for cefotaxime in a child with no penicillin allergy or non-severe penicillin allergy with suspected Kingella kingae infection",
    "5ostamocla" : "This is a valid code for IV amoxicillin and clavulanate in an adult patient with non-septic osteomyelitis from a leg or foot ulcer",
    "4ostceftri" : "This is a valid code for ceftriaxone in an adult with vertebral osteomyelitis with no penicillin allergy or non-severe penicillin allergy with neurological compromise",
    "4ostIV cip" : "This is a valid code for ceftriaxone in an adult with vertebral osteomyelitis with no penicillin allergy or non-severe penicillin allergy with neurological compromise",
    "5ostIV cli" : "This is a valid code for IV clindamycin in a child with osteomyelitis and a severe penicillin allergy",
    "2ostvancom" : "This is a valid code for vancomycin in a child or adult with osteomyelitis with either severe penicillin allergy or suspected MRSA infection",
    "3pevceftri" : "This is a valid code for ceftriaxone for inpatient treatment of severe pelvic inflammatory disease in a patient with no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "3pevIV azi" : "This is a valid code for IV azithromycin for severe pelvic inflammatory disease in a patient with no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "8pelPO azi" : "This is a valid code for TWO DOSES ONLY of azithromycin in week 1 and 2 for in/outpatient treatment of non-severe pelvic inflammatory disease",
    "1pelceftri" : "This is a valid code for ceftriaxone for a SINGLE dose used IM with lidocaine for outpatient treatment of non-severe pelvic inflammatory disease in a patient with no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "2pelgentam" : "This is a valid code for gentamicin for severe pelvic inflammatory disease in a patient with immediate or delayed severe penicillin hypersensitivity who can tolerate gentamicin",
    "2pelIV azi" : "This is a valid code for azithromycin for severe pelvic inflammatory disease in a patient with life-threatening penicillin allergy",
    "2pelIV cli" : "This is a valid code for clindamycin for severe pelvic inflammatory disease in a patient with life-threatening penicillin allergy",
    "9pelPO cip" : "This is a valid code for ciprofloxacin outpatient treatment of PID in a patient with penicillin allergy. This code is for FOURTEEN days of ciprofloxacin",
    "7aspceftri" : "This is a valid code for ceftriaxone for aspiration pneumonia with mild penicillin allergy",
    "7aspPO cli" : "This is a valid code for clindamycin for aspiration pneumonia with mild penicillin allergy",
    "3aspIV cli" : "This is a valid code for ceftriaxone for aspiration pneumonia with severe penicillin allergy",
    "2capceftri" : "This is a valid code for ceftriaxone for mild community acquired pneumonia with mild penicillin allergy",
    "2capmerope" : "This is a valid code for meropenem for severe community acquired pneumonia in a patient who is 5 to 15 years old with mild immediate or delayed non-severe penicillin hypersensitivity or immediate or delayed severe penicillin hypersensitivity",
    "2capvancom" : "This is a valid code for vancomycin for severe community acquired pneumonia in a patient who is 15 years or older and has no penicillin hypersensitivity or who is 15 to 50 years old and has immediate or delayed non-severe penicillin hypersensitivity or who is greater than 50 years old and has immediate or delayed severe penicillin hypersensitivity severe(ICU) community acquired pneumonia in a patient who is 15 to 50 years and has either no penicillin hypersensitivity or immediate or delayed severe penicillin hypersensitivity",
    "2cappipera" : "This is a valid code for piperacillin-tazobactam for community acquired pneumonia",
    "3capceftri" : "This is a valid code for ceftriaxone for moderate community acquired pneumonia in a patient 15 years or older with immediate or delayed non-severe penicillin hypersensitivity or severe community acquired pneumonia in a patient 15 years or older with no penicillin hypersensitivity or immediate or delayed severe penicillin hypersensitivity",
    "3capvancom" : "This is a valid code for vancomycin for severe community acquired pneumonia in a patient 5 to 15 years old with immediate or delayed severe penicillin hypersensitivity where mycoplasma pneumoniae infection is not suspected",
    "3capIV mox" : "This is a valid code for IV moxifloxacin for severe community acquired pneumonia in a patient 15 years or older with immediate or delayed severe penicillin hypersensitivity",
    "3capPO azi" : "This is a valid code for oral azithromycin for severe community acquired pneumonia in a child where pertussis is suspected or with penicillin anaphylaxis",
    "3capIV azi" : "This is a valid code for IV azithromycin for severe community acquired pneumonia in a patient 15 years or older with no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "7capcefuro" : "This is a valid code for cefuroxime for mild/moderate community acquired pneumonia",
    "3caoceftri" : "This is a valid code for ceftriaxone for moderate/severe community acquired pneumonia in a patient with non severe penicillin allergy or tropically acquired pneumonia",
    "2caogentam" : "This is a valid code for gentamicin for mild/moderate tropically acquired community acquired pneumonia",
    "2capgentam" : "This is a valid code for gentamicin for mild/moderate tropically acquired community acquired pneumonia",
    "7capPO mox" : "This is a valid code for PO moxifloxacin for community acquired pneumonia in a patient 15 years and older with moderate pneumonia and immediate or delayed severe penicillin hypersensitivity",
    "1capIV mox" : "This is a valid code for IV moxifloxacin for community acquired pneumonia in a patient with immediate or delayed severe penicillin hypersensitivity until they can change to oral",
    "1capIV azi" : "This is a valid code for IV azithromycin for severe CAP which will require ICU admission",
    "1capmerope" : "This is a valid code for meropenem for severe CAP in the wet season which will require ICU admission",
    "1capvancom" : "This is a valid code for vancomycin for severe CAP in an adult which will require ICU admission or a child with major penicillin allergy",
    "1cappipera" : "This is a valid code for Tazocin for severe CAP in the dry season which will require ICU admission",
    "2capIV azi" : "This is a valid code for IV azithromycin in patient 5 to 15 years old with mild/moderate CAP who either immediate or delayed non-severe penicillin hypersensitivity or immediate or delayed severe penicillin hypersensitivity or no penicillin hypersensitivity where Mycoplasma pneumoniae infection suspected or with severe CAP where Mycoplasma pneumoniae infection suspected or with severe(ICU) CAP with immediate or delayed severe penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "5capPO azi" : "This is a valid code for PO azithromycin for mild/moderate CAP in patient 5 to 15 years old who either has immediate or delayed non-severe penicillin hypersensitivity or no penicillin hypersensitivity where Mycoplasma pneumoniae infection suspected or immediate or delayed severe penicillin hypersensitivity",
    "1capceftri" : "This is a valid code for ceftriaxone for severe CAP in a paediatric patient",
    "1capcefota" : "This is a valid code for cefotaxime for severe CAP in a paediatric patient",
    "3encIV aci" : "This is a valid code for IV aciclovir in any patient with suspected encephalitis prior to review by infectious diseases",
    "3encIV tri" : "This is a valid code for IV trimethoprim+sulfamethoxazole in any patient with suspected encephalitis prior to review by infectious diseases",
    "7hapamocla" : "This is a valid code for IV amoxicillin+clavulanate for a patient with low/moderate hospital acquired pneumonia and no penicillin hypersensitivity",
    "3hapIV cip" : "This is a valid code for ciprofloxacin for a patient with high severity hospital acquired pneumonia and immediate or delayed severe penicillin hypersensitivity",
    "3hapcefepi" : "This is a valid code for cefepime for a patient with high severity hospital acquired pneumonia and immediate or delayed non-severe penicillin hypersensitivity or for an adult patient with sepsis where the source is hospital acquired pneumonia with immediate or delayed non-severe penicillin hypersensitivity",
    "3hapmerope" : "This is a valid code for meropenem for a patient with high severity hospital acquired pneumonia and immediate or delayed severe penicillin hypersensitivity",
    "2hapgentam" : "This is a valid code for gentamicin for a patient with high severity hospital acquired pneumonia and either no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "2hapvancom" : "This is a valid code for vancomycin for a patient with high severity hospital acquired pneumonia",
    "3hapceftri" : "This is a valid code for ceftriaxone for a patient with mild/moderate hospital acquired pneumonia and immediate or delayed non-severe penicillin hypersensitivity",
    "7hapcefuro" : "This is a valid code for cefuroxime for a patient with low/moderate hospital acquired pneumonia and immediate or delayed non-severe penicillin hypersensitivity",
    "3happipera" : "This is a valid code for Piperacillin/tazobactam for a patient with high severity hospital acquired pneumonia and no penicillin hypersensitivity",
    "7hapPO mox" : "This is a valid code for PO moxifloxacin for a patient with mild/moderate hospital acquired pneumonia and immediate or delayed severe penicillin hypersensitivity",
    "3hapIV mox" : "This is a valid code for IV moxifloxacin for a patient with mild/moderate hospital acquired pneumonia and immediate or delayed severe penicillin hypersensitivity",
    "8hapIV mox" : "This is a valid code for IV moxifloxacin for a patient with low/moderate hospital acquired pneumonia and immediate or delayed non-severe penicillin hypersensitivity",
    "4labamocla" : "This is a valid code for IV amoxicillin+clavulanate for severe community acquired lung abscess in a patient with no penicillin allergy",
    "4labceftri" : "This is a valid code for ceftriaxone for severe community acquired lung abscess or lung abscess from jugular thrombophlebitis",
    "4labcefota" : "This is a valid code for cefotaxime for severe community acquired lung abscess or lung abscess from jugular thrombophlebitis",
    "4labcefepi" : "This is a valid code for cefepime for hospital acquired lung abscess in a patient with non-severe penicillin allergy",
    "4labmerope" : "This is a valid code for meropenem for community or hospital acquired lung abscess in a patient with severe penicillin allergy",
    "4labpipera" : "This is a valid code for piperacillin+tazobactam for severe community acquired lung abscess",
    "7labPO cli" : "This is a valid code for oral clindamycin for non-severe community acquired lung abscess in a patient with penicillin allergy",
    "2labIV cli" : "This is a valid code for IV clindamycin for non-severe community acquired lung abscess or jugular thrombophlebitis associated lung abscess in a patient with penicillin allergy",
    "2labvancom" : "This is a valid code for vancomycin for a lung abscess in a patient displaying signs of sepsis/systemic features with an unknown source of infection",
    "2labgentam" : "This is a valid code for gentamicin for a lung abscess in a patient displaying signs of sepsis/systemic features with an unknown source of infection",
    "7lacPO cli" : "This is a valid code for oral clindamycin for lactational mastitis in a patient with severe penicillin allergy",
    "10masPO cip" : "This is a valid code for oral ciprofloxacin for acute mastoiditis at risk of pseudomonas infection",
    "7maspipera" : "This is a valid code for piperacillin+tazobactam for acute mastoiditis at risk of pseudomonas infection",
    "7masceftri" : "This is a valid code for ceftriaxone for acute mastoiditis",
    "7mascefota" : "This is a valid code for cefotaxime for acute mastoiditis",
    "7masceftaz" : "This is a valid code for ceftazidime for acute mastoiditis",
    "10mascefuro" : "This is a valid code for cefuroxime for acute mastoiditis",
    "7masmerope" : "This is a valid code for meropenem for acute mastoiditis",
    "10masPO azi" : "This is a valid code for oral azithromycin for acute mastoiditis",
    "7penPO cip" : "This is a valid code for oral ciprofloxacin for prophylaxis in a penetrating eye injury",
    "7penPO mox" : "This is a valid code for oral moxifloxacin for prophylaxis in a penetrating eye injury",
    "7perPO cli" : "This is a valid code for clindamycin non-severe periorbital cellulitis in a patient with penicillin/cephalosporin anaphylaxis",
    "2pervancom" : "This is a valid code for vancomycin for severe periorbital cellulitis in a patient with MRSA risk factors",
    "3perceftri" : "This is a valid code for ceftriaxone for severe periorbital cellulitis in a patient that is severely ill with no penicillin hypersensitivity or for orbital cellulitis when used with flucloxacillin in a patient with no penicillin hypersensitivity or for severe periorbital cellulitis or orbital cellulitis in a patient with non-severe immediate or delayed penicillin hypersensitivity",
    "3perceftri" : "This is a valid code for IV ciprofloxacin for severe periorbital cellulitis in a patient with immediate penicillin hypersensitivity",
    "3pdicefepi" : "This is a valid code for cefepime for peritoneal dialysis associated peritonitis in a patient unable to tolerate gentamicin",
    "2pdigentam" : "This is a valid code for gentamicin for peritoneal dialysis associated peritonitis",
    "2pdivancom" : "This is a valid code for vancomycin for peritoneal dialysis associated peritonitis in a patient with MRSA, MRSA risk factors or severe penicillin allergy",
    "2posgentam" : "This is a valid code for gentamicin for severe postprocedural pelvic infection",
    "2posIV cli" : "This is a valid code for IV clindamycin for severe postprocedural pelvic infection in a patient with severe penicillin allergy",
    "2posceftri" : "This is a valid code for cefriaxone for severe postprocedural pelvic infection in a patient with non-severe penicillin allergy",
    "2pdigentam" : "This is a valid code for gentamicin for peritoneal dialysis associated peritonitis",
    "3percefota" : "This is a valid code for cefotaxime for severe periorbital cellulitis in a patient less than 2 months old with mild penicillin allergy or with H.influenzae risk factors",
    "3pyecefota" : "This is a valid code for cefotaxime for a child <2 months old with pyelonephritis who cannot tolerate gentamicin with either with no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "1pyegentam" : "This is a valid code for gentamicin for a child with pyelonephritis",
    "3pyeceftri" : "This is a valid code for ceftriaxone for a patient greater than one month old with severe pyelonephritis who cannot tolerate gentamicin and has either no penicillin hypersensitivity or immediate or delayed non-severe penicillin hypersensitivity",
    "2pyegentam" : "This is a valid code for gentamicin for a child less than one monmth old with pyelonephritis or an adult or child greater than one month old with severe pyelonephritis who can tollerate gentamicin",
    "2pyemerope" : "This is a valid code for meropenem for an adult with severe pyelonephritis where the patient has either no penicillin hypersensitivity or immediate or delayed severe penicillin hypersensitivity and can tollerate gentamicin",
    "10otePO cip" : "This is a valid code for oral ciproflaxacin for a patient with severe otitis externa",
    "10otePO cli" : "This is a valid code for oral clindamycin for a patient with severe otitis externa and penicillin anaphylaxis",
    "1scaiverme" : "This is a valid code for ivermectin for scabies of any severity for one stat dose (infectious diseases to be involved for subsequent treatment)",
    "2sepmerope" : "This is a valid code for meropenem for sepsis in a patient with penicillin allergy and gentamicin intolerance, or at risk of MDR gram negative infection",
    "2sepamocla" : "This is a valid code for amoxicillin IV & clavulanate for sepsis in a patient with no penicillin allergy who can not tollerate gentamicin, with Chorioamnionitis (intra-amniotic infection)",
    "2sepceftri" : "This is a valid code for ceftriaxone for sepsis in a patient with chorioamnionitis sourced sepsis who cannot tolerate gentamicin",
    "2sepamocla" : "This is a valid code for IV Augmentin for sepsis in a patient with chorioamnionitis sourced sepsis who cannot tolerate gentamicin",
    "1sepmerope" : "This is a valid code for meropenem for sepsis in a patient with penicillin allergy and gentamicin intolerance, or at risk of MDR gram negative infection",
    "1sepvancom" : "This is a valid code for vancomycin for a child >2 months old with severe sepsis, make sure pt receives loading dose. infectious diseases to be contacted within 24 hours",
    "2sepvancom" : "This is a valid code for vancomycin for severe sepsis, make sure pt receives loading dose. infectious diseases to be contacted within 24 hours",
    "1seppipera" : "This is a valid code for Tazocin for severe sepsis in a child > 2months old in the dry season (infectious diseases to be contacted within 24 hours)",
    "2seppipera" : "This is a valid code for Tazocin for severe sepsis",
    "2sepcefepi" : "This is a valid code for cefepime for severe sepsis",
    "2sepIV cli" : "This is a valid code for IV clindamycin sepsis in a patient who cannot tolerate penicillin or cephalosporins",
    "1sepIV aci" : "This is a valid code for IV aciclovir for severe sepsis in a child with suspected herpes simplex. infectious diseases to be contacted within 24 hours",
    "2sepgentam" : "This is a valid code for gentamicin for severe sepsis in a child where meningitis is not suspected or in an adult",
    "2sepceftri" : "This is a valid code for ceftriaxone for treating sepsis in a child >2 months old or an adult with suspected Neisseria meningitidis infection",
    "2sepcefota" : "This is a valid code for cefotaxime for a child with community sourced sepsis",
    "2sepcefepi" : "This is a valid code for cefepime for sepsis from chorioamnionitis in a patient with non-severe penicillin allergy",
    "1sepcefota" : "This is a valid code for cefotaxime for a child less than tweo months old with community sourced sepsis where Meningitis has not been excluded and Herpes Simplex Encephalitis is not suspected",
    "1sepgentam" : "This is a valid code for gentamicon for a child less than tweo months old with community sourced sepsis where Meningitis has been excluded",
    "1sepIV cip" : "This is a valid code for IV ciprofloxacin for a critically ill child with severe sepsis and severe penicillin allergy",
    "2sepIV cip" : "This is a valid code for IV ciprofloxacin for a non critically ill child with severe sepsis and severe penicillin allergy",
    "2sfiamocla" : "This is a valid code for IV amoxicillin+clavulanate in a patient with a post operative infection with systemic features of infection or deep incisional surgical site infection involving mucosa with no penicillin allergy",
    "2sfipipera" : "This is a valid code for piperacillin+tazobactam in a patient with a post operative infection with systemic features of infection or deep incisional surgical site infection involving mucosa with no penicillin allergy and likely pseudomonal infection",
    "2sfivancom" : "This is a valid code for vancomycin in a patient with a post operative infection with systemic features of infection or deep incisional surgical site infection at risk of MRSA infection",
    "5sfiPO cli" : "This is a valid code for oral clindamycin in a patient with severe penicillin allergy and a post operative infection without any systemic features of infection or deep incisional surgical site infection and not at risk of MRSA infection",
    "3shiIV aci" : "This is a valid code for IV aciclovir for shingles where the patient is immunocompromised and there is widespread/desseminated disease",
    "3shiPO aci" : "This is a valid code for PO aciclovir for severe shingles",
    "7shifamcic" : "This is a valid code for famciclovir for shingles",
    "7shivalaci" : "This is a valid code for Valaciclovir for shingles",
    "7shiPO aci" : "This is a valid code for PO aciclovir for shingles where the patient is immunocompromised and there is no widespread/desseminated disease or the rash has been onset for less that 72 hours and the patient is not immunocompromised",
    "2sepvancom" : "This is a valid code for vancomycin for severe sepsis, make sure pt receives loading dose. infectious diseases to be contacted within 24 hours",
    "2utigentam" : "This is a valid code for Gentamicin for a UTI where the patient is less than one month old and has no penicillin allergy",
    "5uticefota" : "This is a valid code for cefotaxime for a UTI cyctitis where the patient is less than one month old and has an immediate or delayed non-severe or severe penicillin hypersensitivity",
    "3ulcIV cip" : "This is a valid code for ciprofloxacin for a non-diabetic ulcer with Severe (life threatening infection or osteomyelitis) where antibiotic treatment is required and the patient has immediate or delayed non-severe or severe penicillin hypersensitivity",
    "3ulcamocla" : "This is a valid code for IV amoxicillin+clavulanate for a non-diabetic ulcer with Severe (life threatening infection or osteomyelitis) where antibiotic treatment is required and the patient has no penicillin hypersensitivity",
    "7ulcPO cli" : "This is a valid code for clindamycin for a non-diabetic ulcer with moderate (definitive surrounding cellulitis) where antibiotic treatment is required and the patient has immediate or delayed severe or severe penicillin hypersensitivity",
    "3ulcpipera" : "This is a valid code for Piperacillin/tazobactam for a non-diabetic ulcer with Severe (life threatening infection or osteomyelitis) where antibiotic treatment is required and the patient has no penicillin hypersensitivity",
    "3ulcIV cli" : "This is a valid code for clindamycin for a non-diabetic ulcer with moderate (definitive surrounding cellulitis) or severe (life threatening infection or osteomyelitis) where antibiotic treatment is required and the patient has immediate or delayed non-severe or severe penicillin hypersensitivity",
    "3quiIV cli" : "This is a valid code for IV clindamycin for a patient with quinsy or peritonsillar cellulitis with a penicillin allergy",
    "10quiPO cli" : "This is a valid code for PO clindamycin for a patient with quinsy or peritonsillar cellulitis with a penicillin allergy",
    "5quiPO azi" : "This is a valid code for PO azithromycin for a child with quinsy or peritonsillar cellulitis with a penicillin allergy who cannot tolerate oral clindamycin",
    "3traIV cli" : "This is a valid code for IV clindamycin for prophylaxis of a non-infected wound requiring surgical debridement, or treatment of a footware associated wound infection in a patient with severe penicillin allergy",
    "3traamocla" : "This is a valid code for IV amoxicillin+clavulanate for an infected traumatic wound with significant contamination/maceration in a patient with no penicillin allergy",
    "3trapipera" : "This is a valid code for piperacillin/tazobactam for an infected traumatic wound with footware involvement in a patient with no penicillin allergy",
    "3traPO cli" : "This is a valid code for PO clindamycin for prophylaxis of a non-infected wound in a patient with severe penicillin allergy",
    "3travancom" : "This is a valid code for vancomycin for a severely infected traumatic wound at risk of MRSA or in a patient with severe penicillin allergy",
    "3traIV cip" : "This is a valid code for IV ciprofloxacin for a severely infected traumatic wound with injury through footware in a patient with penicillin allergy or at risk of MRSA",
    "5traPO cli" : "This is a valid code for PO clindamycin for treatment of an infected wound in a patient with MRSA risk factors or with severe penicillin allergy",
    "5watPO cip" : "This is a valid code for PO ciprofloxacin for a child < 8 years old with wound exposure to salt water, or any child or adult with wound exposure to fresh water with possible localised infection",
    "3watvancom" : "This is a valid code for IV vancomycin for a wound associated with significant trauma or exposed to soil/sewage in a patient at risk of MRSA",
    "3watcefep" : "This is a valid code for cefepime for a wound associated with significant trauma or exposed to soil/sewage",
    "3watIV cli" : "This is a valid code for IV clindamycin for a water exposed wound associated with significant trauma in a patient with severe penicillin allergy",
    "3watIV cip" : "This is a valid code for IV ciprofloxacin for a water exposed wound associated with significant trauma or exposed to soil/sewage",
    "2endIV cli" : "This is a valid code for IV clindamycin for severe post-partum endometritis in a patient with severe penicillin allergy with clindamycin sensitive group B streptococcus",
    "2endgentam" : "This is a valid code for gentamicin for severe post-partum endometritis in a patient who can tolerate gentamicin",
    "3endamocla" : "This is a valid code for IV amoxicillin and clavulanate for severe post-partum endometritis in a patient with no penicillin allergy who cannot tolerate gentamicin",
    "3endvancom" : "This is a valid code for vancomycin for severe post-partum endometritis in a patient with severe penicillin allergy who cannot tolerate gentamicin or has a clindamycin resistant group B strep isolate"
}

function extractCodeCheckerCode(code, antibioticPrescribed) {
    // Numeric part at the beginning.
    var numericSection = code.match(/\d+/g)[0]
    // The number of days prescribed is the numbers before that.
    var userCodeLength = parseInt(numericSection.substring(0, numericSection.length - 4))
    var userIndication = code.substring(numericSection.length).toLowerCase();
    return (userCodeLength + userIndication + antibioticPrescribed);
}

function checkCode(code, dateOfFirstDose, antibioticPrescribed) {
    var todaysWholeNumber = getCode();
    // Numeric part at the beginning.
    var numericSection = code.match(/\d+/g)[0]
    // The magic token is the last 3 numbers.
    var userCodeIdentifier = parseInt(numericSection.substring(numericSection.length - 3))
    // The day of the week is the 1 number before the token.
    var userDayNumber = parseInt(numericSection.substring(numericSection.length - 4, numericSection.length - 3))
    // The number of days prescribed is the numbers before that.
    var userCodeLength = parseInt(numericSection.substring(0, numericSection.length - 4))
    var todaysIdentifier = Number(todaysWholeNumber.substring(1));
    
    var concat = extractCodeCheckerCode(code, antibioticPrescribed)
    var todaysDate = new Date();
    var todaysNumber = todaysDate.getDay()
    var daysBetween = Math.round(((todaysDate.getTime() - dateOfFirstDose.getTime())/86400000));
    var codeValid = checkValidity(userDayNumber, userCodeIdentifier, todaysNumber, todaysIdentifier)
    var now = new Date();
    var fullDaysSinceEpoch = (Math.floor(((now) / 8.64e7) - 150.604166666))%1000;

    var teamsCodeIndicationValid = acceptableCodes[concat] || "This code does not appear to be valid, either the duration doesn't match the allowed treatment lengths or there is a typo";

    if(userCodeIdentifier > todaysIdentifier) {
        return "This is a future dated code and could not have been made by the WAAMS application, it should be treated as invalid";
    }
    if(codeValid === "valid" && teamsCodeIndicationValid === "This code does not appear to be valid, either the duration doesn't match the allowed treatment lengths or there is a typo"){
        return "This code does not appear to be valid, either the duration doesn't match the allowed treatment lengths, it is for the incorrect antibiotic or there is a typo";
    }
    else if (codeValid === "invalid" && teamsCodeIndicationValid === "This code does not appear to be valid, either the duration doesn't match the allowed treatment lengths or there is a typo"){
        return "This code is both out of date and invalid";
    }
    else if (codeValid === "valid"){
        if (todaysIdentifier > (userCodeLength + userCodeIdentifier - daysBetween)) {
            return "This code expired " + (todaysIdentifier - (userCodeLength + userCodeIdentifier - daysBetween)) + " day(s) ago";
        }
        else if (todaysIdentifier < (userCodeLength + userCodeIdentifier - daysBetween)) {
            return teamsCodeIndicationValid + " This code is in date and expires at 8am in " + ((userCodeLength + userCodeIdentifier - daysBetween) - todaysIdentifier) + " days time";
        }
        else if (todaysIdentifier === (userCodeLength + userCodeIdentifier - daysBetween)) {
            return teamsCodeIndicationValid + " This code expires today";
        }
    }
    return "This code is invalid";;
}