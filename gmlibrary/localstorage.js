//==============================================================================
// localstorage.js
//==============================================================================

indexing = false;
dataindexing = false;
ruleindexing = true;

var manager = 'manager';
var player = 'anonymous';

//==============================================================================

function doinitialize ()
 {window.addEventListener("storage",handlestorage,false);
  return true}

function doplayer ()
 {player = read(prompt("What is your player's identifier?"));
  document.getElementById('player').innerHTML = player;
  return true}

//==============================================================================

function handlestorage (ev)
 {console.log(ev);
  if (ev.key!==player) {return false};
  var transcript = document.getElementById('transcript');
  transcript.value = transcript.value + ev.newValue + "\n";
  var answer = handlemessage(read(ev.newValue));
  if (!answer) {console.log("Player: no response"); return false};
  send(grind(answer));
  return true}

function handlemessage (envelope)
 {var msgid = envelope[1];
  var sender = envelope[2];
  var receiver = envelope[3];
  var message = envelope[4];
  if (sender!==manager) {return false};
  if (receiver!==player) {return false};
  var answer = ggpeval(message);
  if (answer) {return seq('message',msgid,player,manager,answer)};
  return false}

function send (str)
 {var transcript = document.getElementById('transcript');
  transcript.value = transcript.value + str + "\n";
  localStorage[manager] = str;
  return true}

//==============================================================================

function ggpeval (msg)
 {if (symbolp(msg)) {return false};
  if (msg[0]==='ping') {return ping()};
  if (msg[0]==='start') {return start(msg[2],msg[3],msg[4],msg[5])};
  if (msg[0]==='play') {return play(msg[2])};
  if (msg[0]==='stop') {return stop(msg[2])};
  if (msg[0]==='abort') {return abort()};
  return false}

//==============================================================================
// End of protocol code
//==============================================================================