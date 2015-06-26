var address = localStorage.getItem("address");
var protocol = localStorage.getItem("protocol");
var abi = ;
var contractAddr;
var bytecode;
function onLoad(){
    console.log(address);
    console.log(protocol);
    //REMOVE
    address = "ajiwi3i1ni1vid0n"
    protocol = "trigger"
    document.getElementById("address").innerHTML = "<strong>Address: </strong>" + "<em>" + address + "</em>" ;
    document.getElementById("protocol").innerHTML = "<strong>Protocol: </strong>" + "<em>" + protocol + "</em>";
}

function trigger(){
    var trigger = document.getElementById('trigger');
    var sendingAddr = localStorage.getItem("address");
    var protocol = localStorage.getItem("protocol");
    var contractAddr = "change this to address";
    var abi = JSON.parse(document.getElementById('abi').value);
    var key = parseInt(document.getElementById('keyToSet').value);
    var password = '';

    txObj = {gasLimit: 3000000, gasPrice: 12000000000000, nonce: accNonce}

    helpers.sendFunctionTx(abi, contractAddr, 'trigger',
                    sendingAddr, txObj, api, [key], keystore, password,
                    function (err, data) {console.log(data)});

    trigger.onmouseup = function(){
        helpers.sendFunctionTx(abi, contractAddr, 'released',
                        sendingAddr, txObj, api, [key],keystore, password,
                        function (err, data) {console.log(data)});
    }
}
