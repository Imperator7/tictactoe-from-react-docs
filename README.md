# tic-tac-toe-from-react-docs

Re-implement the classic React tutorial from scratch (no copy-paste). After finishing the MVP, compare and document differences in state management, component structure

**implemented features:**
- Find the winner
- Can't click the occupied box
- Can't click after the game ended
- Play again button
- Tied detection
- highlight winning line
- Time travel
- refactor state to use useReducer
- centralize states in custom hook

**upcoming features:**
none

**Learned from doing:**
- designing state management
- useMemo must be pure/ useEffect use for side effects(logging, state syncing, etc)
- the files in react will get hashed and embedded when building but the files outside the react code like svg icon file in index.html wont get embedded, so we have to put it in public file if not the file is no where to find.

**Problems faced when developing:**
- react's strict mode makes mounting happens twice✅ **understood:** it dues to strict mode's purpose to force to write pure functions with not side effects. 
- add dynamic tailwind classes to the safelist so its JIT dont ignore those classes when building css.