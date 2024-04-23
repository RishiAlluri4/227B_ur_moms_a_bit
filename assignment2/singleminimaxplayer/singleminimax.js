//==============================================================================
// singleminimax.js
//==============================================================================

var role, roles, state, library, startclock, playclock;

function ping ()
 {return 'ready'}

function start (r,rs,sc,pc)
 {role = r;
 library = rs; // definerules([],rs.slice(1));
 roles = findroles(library);
 state = findinits(library);
 startclock = numberize(sc);
 playclock = numberize(pc);
 return 'ready'}

function play (move)
 {if (move!==nil) {state = simulate(move,state,library)};
 if (findcontrol(state,library)!==role) {return false};
 return bestmove(state)}

function stop (move)
 {return false}

function abort ()
 {return false}

/* bestmove function takes looks through all possible actions that can be taken from
   from the current state and returns the actions which has the maximum possible value 
   that can be found using minimax */

function bestmove (state) {
    var actions = findlegals(role,state,ruleset);
    var action = actions[0];
    var score = 0;
    for (var i=0; i<actions.length; i++) {
        var newstate = simulate(actions[i],state,library);
        var newscore = minimax(newstate);
        if (newscore>score) {
            score = newscore; 
            action = actions[i]
        }    
    }
    return action;
}

/* Takes a state and performs minimax algorithm by returning the maximum value state if 
   in control and the minimum value state if not in control */

function minimax (state) {
    if (findterminalp(state,library)) {
        return findreward(role,state,library)*1;
    }
    var active = findcontrol(state,library);
    if (active===role) {
        return maximize(state);
    }
    return minimize(state)
}

/* Takes a state as input and returns maximum value that can be found using minimax 
*/

function maximize (state) {
    var actions = findlegals(state,library);
    if (actions.length===0) {
        return 0;
    }
    var score = 0;
    for (var i=0; i<actions.length; i++) {
        var newstate = simulate(actions[i],state,library);
        var newscore = minimax(newstate);
        if (newscore>score) {
            score = newscore;
        }
    }
    return score;
}

/* Takes a state as input and returns minimum value that can be found using minimax 
*/

function minimize (state) {
    var actions = findlegals(state,library);
    if (actions.length===0) {
        return 0;
    }
    var score = 100;
    for (var i=0; i<actions.length; i++) {
        var newstate = simulate(actions[i],state,library);
        var newscore = minimax(newstate);
        if (newscore<score) {
            score = newscore;
        }
    }
    return score;
}

//==============================================================================
// End of player code
//==============================================================================