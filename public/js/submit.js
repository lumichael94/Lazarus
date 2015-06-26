var helpers = ethlightjs.helpers;
var abi = "[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"deadmen","outputs":[{"name":"origin","type":"address"},{"name":"timestamp","type":"uint256"},{"name":"name","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"interval","type":"uint256"}],"name":"initialize","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"released","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"lazarus","outputs":[],"type":"function"}]";

var api;
function onLoad(){
    var seedField = document.getElementById('seed');
    seedField.onkeyup = function(){
        console.log("seedField up")
        var seed = document.getElementById('seed').value;
        var sel = document.getElementById('addresslist');
        var passwordField = document.getElementById('password');
        passwordField.onkeyup = function(){
            setTimeout(function(){
                var password = document.getElementById('password').value;
                console.log("passwordField up")
                for (var i = 0; i < sel.size; i++){
                    sel.removeChild(sel.childNodes[i]);
                }
                var keystore = new ethlightjs.keystore(seed, password);
                for (var i = 0; i < 10; i++){
                    var opt = document.createElement('option');
                    var address = keystore.generateNewAddress(password);
                    console.log(address);
                    opt.innerHTML = address;
                    opt.value = address;
                    sel.appendChild(opt);
                }
            },2000);
        }
    }
    api = new ethlightjs.blockchainapi.blockappsapi("http://stablenet.blockapps.net");
}

function submit(){
    var name = document.getElementById('name').value;
    var sel = document.getElementById('addresslist');
    var address = sel.options[sel.selectedIndex].value;
    localStorage.setItem("name", name);
    localStorage.setItem("address", address);
    localStorage.setItem("protocol", "TRIGGER");



    window.location.href = "/info";


}
