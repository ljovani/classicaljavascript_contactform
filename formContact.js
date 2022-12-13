/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

function auxiliaryObjectValueVerification(objectHTML){
    if((objectHTML != null)||(objectHTML != undefined)){
        var value = objectHTML.value;
        if((value.length == 0)||(value == "")||(value == null)||(value == undefined))
            return false;
        else
            return true;
    }else
        return false;
}

function cleanVerification(objectHTML){
    if((objectHTML != null)||(objectHTML != undefined)){
        var objectHTMLId = objectHTML.id;
        objectHTML.value = "";
        document.getElementById("verificationResult"+objectHTMLId).innerHTML = "";
    }
}

function fieldVerification(objectHTML, returnVerification){
    if((objectHTML != null)||(objectHTML != undefined)){
        var objectHTMLId = objectHTML.getAttribute("id");
        var objectHTMLClass = objectHTML.getAttribute("class");
        var objectHTMLValue = objectHTML.value;
        if ((objectHTMLId != null)||(objectHTMLId != undefined)){
            if((auxiliaryObjectValueVerification(objectHTML) == false)&&(objectHTMLClass.search("mandatory") > -1)){
                document.getElementById("verificationResult"+objectHTMLId).innerHTML = "It must filled";
            if(returnVerification == true)
                return 1;  
            }else if(objectHTMLValue.length > 0){
                if(objectHTMLId.search("name") > -1){
                    if(returnVerification == false)
                        lettersVerification(objectHTML);
                    else
                        return lettersVerification(objectHTML, true);
                }
                else if(objectHTMLId.search("email") > -1){
                    if(returnVerification == false)
                        emailVerification(objectHTML);
                    else
                        return emailVerification(objectHTML, true);
                }else if(objectHTMLId.search("telephone") > -1){
                    if(returnVerification == false)
                        numbersVerification(objectHTML);
                    else
                        return numbersVerification(objectHTML, true);
                }
            }
        }else{
            if(returnVerification == true)
                return -1;
        }
    }else{
        if(returnVerification == true)
            return -1;
    }
}

function emailVerification(objectHTML, returnVerification){
    var positionSearch = objectHTML.value.search("@");
    document.getElementById("verificationResult"+objectHTML.id).innerHTML = (positionSearch == -1) ? "It must have @." : "";
    if(returnVerification == true)
        return (positionSearch == -1) ? 1 : 0;
}

function lettersVerification(objectHTML, returnVerification){
    var positionSearch = -1;
    for (var cont = 0;cont < 10;cont++){
        positionSearch = (objectHTML.value.search(cont) >= 0) ? objectHTML.value.search(cont) : positionSearch;
    }
    document.getElementById("verificationResult"+objectHTML.id).innerHTML = (positionSearch > -1) ? "It must have only letters." : "";
    if(returnVerification == true)
        return (positionSearch > -1) ? 1 : 0;
}

function numbersVerification(objectHTML, returnVerification){
    var alphabet = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","z");
    var positionSearch = -1;
    for(cont = 0;cont < alphabet.length;cont++){
        positionSearch = (objectHTML.value.search(alphabet[cont]) >= 0) ? objectHTML.value.search(alphabet[cont]) : positionSearch;
    }
    document.getElementById("verificationResult"+objectHTML.id).innerHTML = (positionSearch > -1) ? "It must have only numbers." : "";
    if(returnVerification == true)
        return (positionSearch > -1) ? 1 : 0;
}

function formVerification(formId){
    var mandatoryObjectsForm = document.getElementsByClassName(formId+"mandatory");
    if(mandatoryObjectsForm.length > 0){
        var mandatoryObjectForm = null;
        var fieldsVerification = 0;
        for(var cont = 0; cont < mandatoryObjectsForm.length;cont++){
            mandatoryObjectForm = mandatoryObjectsForm.item(cont);
            fieldsVerification += fieldVerification(mandatoryObjectForm,true);
        }
        if(fieldsVerification > 0)
            window.alert("It can't be send.");
        else
            document.getElementById(formId).submit();
    }
}


