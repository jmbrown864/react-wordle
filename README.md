# React-Wordle
## How to Play:

1. **Guess a Word**: Each round, try to guess a five-letter word. Type your guess into the input field provided.

2. **Submit Your Guess**: After entering your guess, hit the "Submit" button to see how many letters in your guess match the hidden word and if they're in the right position.

3. **Use Feedback**: Pay attention to the feedback provided after each guess:
    - Letters in green are correct and in the right position.
    - Letters in yellow are correct but in the wrong position.
    - Letters in gray are not in the hidden word.

4. **Narrow Down Options**: Use the feedback to refine your guesses and deduce the hidden word.

5. **Win the Game**: You have six attempts to guess the word. If you guess it correctly within the allotted attempts, you win!

## Implementation Tasks
- [x] Add data for possible solution words
- [x] Set up JSON server
- [x] Create `useWordle` hook to manage gampeplay logic
- [x] Track user's current guess
- [x] Format and check a guess when a user submits word
- [x] Manage gameplay logic for additional guesses
- [x] Create a grid for guesses
- [x] Show colorized past guesses on game grid
- [x] Show current guess as user types
- [x] Animate game tiles when user submits a guess
- [x] Animate game tiles as user enters a current guess
- [x] Create a keypad for entering guesses
- [x] Colorize keypad based on guesses
- [x] Alerts for end game
