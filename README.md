# 227B_ur_moms_a_bit
  
## Description  
  
The repository for Stanford's CS227B General Game Playing class team ur_moms_a_bit. The bot is able to play a variety of games utilizing different strategies.
  
## Getting Started
### Downloading the player
    Download any bot's .html file included in the assigment folders.
### Uploading player to gamemaster
    TODO

  
## Players Implemented
### Assignment 3
    Our player this week uses the minimax algorithm discussed in class with a few optimizations which improve runtime. 
    The minimax algorithm simulates the possible moves in a game’s tree to determine the best strategy by minimizing the potential loss. 
    It evaluates all outcomes of all legal moves while predicting possible opponent moves and creates path with the most advantageous outcome. 
    
    In single player games, this means the agent maximizes the value of each of its actions in order to achieve the highest score. 
    In multiplayer games, the agent performs the minimax algorithm to optimize its decisions based on the presumption that the opponent 
    will choose moves aimed at minimizing our score. 
    
    To optimize the runtime of our agent, we used memoization within the minimax algorithm to prevent redundant calculations 
    by storing results of rewards for each unique pair of role and state and returning the stored values if possible. 

    Additionally, we implemented alpha-beta pruning in the minimax, maximize and minimize functions. 
    The alpha variable represents the greatest score of an already explored option along the path to the root for the maximizer; 
    conversely, the beta represents the lowest already explored option for the minimizer. 
    By updating these values every time a node is evaluated and maintaining accurate bounds, 
    the algorithm can skip branches of the state space tree that have no chance of changing the final minimum or maximum.

    In an ideal scenario where all of the best moves are explored first within the tree, alpha-beta pruning can reduce the complexity of the minimax algorithm 
    from O(b^d) to O(b^(d/2)) where ‘b’ is the branching factor of the tree and ‘d’ is the depth of the tree. 

    Even in a scenario that is not completely optimal, the greatly increases the efficiency of the algorithm and 
    significantly reduces the portion of the state space tree that must be explored.  
### Assignment 4
    Our game-playing agent integrates two search strategies covered in last week’s lecture: iterative deepening and Monte Carlo sampling.

    Iterative deepening executes depth-bounded minimax searches, starting with a shallow depth limit and incrementally deepening the limit with each 
    iteration until a solution is found or a depth limit is reached. When the maximum depth is reached at one iteration of iterative deepening, an evaluation
    function is used to estimate rewards at intermediate states. This method lets us find optimal game moves at increasing game tree depths to maximize our bot's
    performance under time constraints.
    
    On the other hand, Monte Carlo sampling runs multiple random simulations from the current state to a terminal state to estimate the most 
    probable outcomes of actions and provide insight into possible future states without exhaustively searching the entire game tree. 

    In our implementation, the agent performs iterative deepening until a certain cutoff deadline time is hit; 
    it uses a priority queue data structure to keep track of the best actions found and their minimax scores. Then the agent switches to Monte Carlo sampling
    and simulates multiple potential games all the way to terminal states from the current state to get information on possible future states 
    that were not reached using iterative deepening. The final decision on the best action to take is determined by a weighted average of the 
    scores from both strategies; currently, the minimax scores are given a higher weighting (0.98) than Montecarlo (0.02). 
    This approach allows the agent to balance between strategic depth and breadth.

## Authors  
  
Project contributors include Rishi Alluri, Campbell Hoskins, and Alan De Loera
