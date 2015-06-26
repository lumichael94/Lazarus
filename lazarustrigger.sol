contract LazarusTrigger {

    int debug; //used for blockapps test

    struct deadman{
        address origin;
        uint timestamp;
        bytes32 name;
        uint position;
        bytes32 status;
        uint timeInterval;
        address[2**20] peer;
        bool dataPrimed;
    }

    mapping (address => deadman) public deadmen;
    bool[2**20] alive;
    uint numDeadmen;

    function lazarus() {
        debug = 9000;
        numDeadmen = 0;
    }

    function initialize(bytes32 name, uint interval){
        deadmen[msg.sender].timestamp = 0;
        deadmen[msg.sender].name = name;
        deadmen[msg.sender].status = "INACTIVE";
        deadmen[msg.sender].timeInterval = interval;
        alive[numDeadmen] = true;
        deadmen[msg.sender].position = numDeadmen;
        numDeadmen = numDeadmen+1;
        deadmen[msg.sender].dataPrimed = false;
        //return true
    }
    function checkStatus() constant returns(bytes32){
        //should return either 0 or a timestamp
        return deadmen[msg.sender].status;
    }

    function checkTimeStamp() constant returns(uint){
        //should return either 0 or a timestamp
        return deadmen[msg.sender].timestamp;
    }

    function deactivate(){
        if(deadmen[msg.sender].origin == msg.sender)
            deadmen[msg.sender].status == "INACTIVE";
    }

    function trigger() {
        if(deadmen[msg.sender].origin == msg.sender){
            deadmen[msg.sender].status = "ACTIVE";
            deadmen[msg.sender].timestamp = block.timestamp;
        }
    }

    //Adds a friendly peer
    function addPeer(address friend, int peerIndex){
        if(deadmen[msg.sender].origin == msg.sender){
            deadmen[deadman].peer[peerIndex] = friend;
        }
    }
    //Friendly peers can say that the data is primed for release
    function peerResponse(address deadman, int peerIndex){
        if(deadmen[deadman].peer[peerIndex] == msg.sender){
            deadmen[msg.sender].dataPrimed = true;
        }
    }

    function exportState(address man) {
    //the number was chosen randomly
        alive[deadmen[man].position] = deadmen[msg.sender].timestamp + deadmen[msg.sender].timeInterval < block.timestamp;
    }
}
