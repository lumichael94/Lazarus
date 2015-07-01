var contractAddress = "71696feb6f12903103c60357232c71ae60fae1bb"



function watcher(opts){
    this.username = '';
    this.address = '';
    this.timeout = opts.timeout;
    this.handle = null;
    this.emails = []
    this.init(opts);
}

function hex2a(d) {
    return unescape(d.replace(/(..)/g, '%$1'))
}

var keyIndexToLookup = function(key,index) {
  var words = CryptoJS.enc.Hex.parse(key.concat(index));
  return CryptoJS.SHA3(words, { outputLength: 256}).toString(CryptoJS.enc.Hex);
}

function leftpad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

watcher.prototype = {
    init: function(opts){
        var self = this;
        self.username = opts.username;
        self.emails = opts.emails;
        self.address = opts.address;
        self.timeout = (opts.timeout * (60 * 1000));
        self.start();
    },
    start: function(){
        var self = this;
        var time = Date.now();
        console.log("\nTesting " + self.address + "\nTime: " + self.getFormatedDate(time) + "\n");
        console.log("\nTIME OUT"+ self.timeout);
        self.handle = setInterval(function () {
            self.check();
        }, self.timeout);
    },

    stop: function () {
        clearInterval(this.handle);
        this.handle = null;
        delete this;
    },

    check: function () {
        var self = this;
        var currentTime = Date.now();
        //check
        $.get("http://stablenet.blockapps.net/query/storage?address="+contractAddress, function( data ) {
          var storage = "{"
          $.each(data, function( index, element ) {
            var key = element.key //truncate leading zeros and make ascii
            var value = element.value //truncate leading zeros and make ascii
            storage += '"'+key+'":"'+value+'",'
          });
          storage = storage.substring(0, storage.length - 1);
          storage+="}"

          storage = $.parseJSON(storage)
          var numKeys = parseInt(storage["0000000000000000000000000000000000000000000000000000000000100001"])+1
          var keyMap = {}
          for(var i=1; i<=numKeys;i++)
          {
              var key = storage[leftpad(i,64)]
              keyMap[hex2a(key.replace(/^(00)+/, '').replace(/(00)+$/, ''))] = hex2a(storage[keyIndexToLookup(key,"0000000000000000000000000000000000000000000000000000000000000000")].replace(/^(00)+/, '').replace(/(00)+$/, '')) //00... is the position of the mapping in the array
          }
          if(keyMap[self.username] == "false"){
              self.isDead();
          }
          else{
              self.isAlive();
          }

        });
    },

    isAlive: function () {
        this.log('UP', 'OK');
    },

    isDead: function () {
        var time =  Date.now(),
            self = this,
            time = self.getFormatedDate(time),
        msg = '\nTime of death: ' + time;
        msg +='\nPerson: ' + self.username;
        msg += '\nLAZARUS INITALIZED<';
        self.emails.forEach(function(email){
            to= email;
    		subject="LAZARUS"
    		text="LAZARUS"
    		$.get("http://localhost:3001/send",{to:to,subject:subject,text:text},function(data){
        		if(data=="sent"){
        			console.log("Email is been sent at "+to+" . Please check inbox !</p>");
        		}
            });
        });
        self.stop();
    },

    log: function (status, msg) {
        var self = this,
            time = Date.now(),
            output = '';

        output += "\nPerson: " + self.username;
        output += "\nTime: " + self.getFormatedDate(time);
        output += "\nStatus: " + status;
        output += "\n" + msg;
        // output += "\nMessage:" + msg  + "\n";
        //Do something else too?
        console.log(status);
        console.log(output);
    },
    getFormatedDate: function (time) {
        var currentDate = new Date(time);

        currentDate = currentDate.toISOString();
        currentDate = currentDate.replace(/T/, ' ');
        currentDate = currentDate.replace(/\..+/, '');

        return currentDate;
    }
}
