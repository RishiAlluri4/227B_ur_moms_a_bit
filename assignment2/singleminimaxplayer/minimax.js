    //==============================================================================
    // Customization
    //==============================================================================

    var manager = 'manager';
    var player = 'ur_moms_a_bit';

    //==============================================================================
    // singleminimax.js
    //==============================================================================

    var role = 'robot';
    var rules = [];
    var startclock = 10;
    var playclock = 10;

    var library = [];
    var roles = [];
    var state = [];
    // memoization
    var memo = {};

    //==============================================================================

    function ping () {
        return 'ready'
    }

    function start (r,rs,sc,pc) {
        role = r;
        rules = rs.slice(1);
        startclock = numberize(sc);
        playclock = numberize(pc);
        library = definemorerules([],rs.slice(1));
        roles = findroles(library);
        state = findinits(library);
        memo = {};
        return 'ready';
    }

    function play (move) {
        if (move!==nil) {
            state = simulate(move,state,library);
        }
        if (findcontrol(state,library)!==role) {
            return false;
        }
        // Testing efficiency
        // testminimax(role, state);
        return playminimax(role);
    }

    function stop (move) {
        return false;
    }

    function abort () {
        return false;
    }

    //==============================================================================
    // minimax
    //==============================================================================

    var nodes = 0;
    var terminals = 0;
    var elapsed = 0;

    function playminimax(role) {
        var actions = shuffle(findlegals(state,library));
        if (actions.length===0) {
            return false;
        }
        if (actions.length===1) {
            return actions[0];
        }
        var action = actions[0];
        var score = 0;
        var alpha = -Infinity;  
        var beta = Infinity; 
        nodes = 0;
        for (var i=0; i<actions.length; i++) {
            //console.log(grind(actions[i]));
            var newstate = simulate(actions[i],state,library);
            var newscore = minimax(role,newstate, alpha, beta);
            //console.log(newscore);
            if (newscore===100) {
                return actions[i];
            }
            if (newscore>score) {
                action = actions[i]; 
                score = newscore;
            }
        }
        return action;
    }

    function testminimax (role, state, alpha, beta) {
        nodes = 0;
        terminals = 0;
        var beg = performance.now();
        var result = minimax(role,state, alpha, beta);
        var end = performance.now();
        elapsed = Math.round(end-beg);
        console.log('Elapsed time: ' + elapsed + ' ms');
        return result;
    }

    function minimax (role, state, alpha, beta) {
        nodes = nodes + 1;
        // use role + state for memo key
        var stateKey = role + JSON.stringify(state);
        if (stateKey in memo) {
            return memo[stateKey];
        }
        if (findterminalp(state,library)) {
            terminals = terminals + 1;
            var reward = findreward(role,state,library)*1;
            memo[stateKey] = reward;  
            return reward;
        }
        var active = findcontrol(state,library);
        if (active===role) {
            var maxScore = maximize(active, role, state, alpha, beta);  
            memo[stateKey] = maxScore;
            return maxScore;
        }
        var minScore = minimize(active, role, state, alpha, beta);
        memo[stateKey] = minScore;
        return minScore;
    }

    function maximize(active, role, state, alpha, beta) {
        var actions = findlegals(state,library);
        if (actions.length===0) {
            return 0;
        }
        var score = 0;
        for (var i=0; i<actions.length; i++) {
            var newstate = simulate(actions[i],state,library);
            var newscore = minimax(role,newstate, alpha, beta);
            score = Math.max(score, newscore); 
            if (score===100) {
                return 100;
            }
            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
                break;
            }
        }
        return score;
    }

    function minimize(active, role, state, alpha, beta) {
        var actions = findlegals(state,library);
        if (actions.length===0) {
            return 0;
        }
        var score = 100;
        for (var i=0; i<actions.length; i++) {
            var newstate = simulate(actions[i],state,library);
            var newscore = minimax(role,newstate, alpha, beta);
            score = Math.min(score, newscore);
            if (score===0) {
                return 0;
            }
            beta = Math.min(beta, score);
            if (beta <= alpha) {
                break;
            }
        }
        return score;
    }

    function shuffle (array) {
        for (var i = array.length-1; i>0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    //==============================================================================
    // End of player code
    //==============================================================================