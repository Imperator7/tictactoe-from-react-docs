# tic-tac-toe-from-react-docs

Re-implement the classic React tutorial from scratch (no copy-paste). After finishing the MVP, compare and document differences in state management, component structure

implemented features:

- Find the winner
- Can't click the occupied box
- Can't click after the game ended
- Play again button
- Tied detection
- highlight winning line
- Time travel

upcoming features:
refactor state to use useReducer

Learned from doing:

- designing state management
- useMemo must be pure/ useEffect use for side effects(logging, state syncing, etc)

Problems faced when developing:

- react's strict mode makes mounting happens twice
