# Private playground for React Native + Firebase Instant Messanging

The code can be dirty and it might not work. Concepts are experimental
tryouts of either technology or patterns

## TODOs

- Add room repository
  - DONE - add to appcontext
  - DONE - getDefault()
  - DONE - create slice that holds active room
  - DONE - Add connectToDefault to HomeScreen
  - DONE - Create subcollection in firebase which contains messages
  - DONE - Add functionality for writing a message
    - DONE - Add input field
    - DONE - Add thunk for posting message
  - DONE - Change display to show messages
    - DONE - Load messages to roomslice
    - DONE - Display on frontend with scrollview
  - DONE - Create proper message senders
  - Subscribe from message loader