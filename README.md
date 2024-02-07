# Game API Documentation

## Overview

Welcome to the Game API! This API provides endpoints for two exciting games: "Tebak Kata" (Guess the Word) and "Susun Kata" (Arrange the Words). Users can interact with various endpoints to play the games, check rules, and view scores.

## Base URL

The base URL for the API is `gamecf.vercel.app`.

## Endpoints

### 1. Aturan (Rules)

#### Endpoint
```
/aturan
```

#### Method
```
GET
```

#### Description
This endpoint provides an overview of the rules for both "Tebak Kata" and "Susun Kata" games. It includes information on scoring, the number of attempts allowed, and general instructions for playing.

### 2. Tebak Kata (Guess the Word)

#### Endpoint
```
/tebakkata/:idsoal
```

#### Method
```
GET
```

#### Parameters
- `idsoal` (string): The unique identifier for the current game session.

#### Description
This endpoint fetches a "Tebak Kata" game from an external API (`https://rest-api.akuari.my.id/games/tebakkata`). Users can receive a new puzzle by providing a unique `idsoal`. If the provided `idsoal` matches an ongoing game, the current puzzle will be displayed.

### 3. Susun Kata (Arrange the Words)

#### Endpoint
```
/susunkata/:idsoal
```

#### Method
```
GET
```

#### Parameters
- `idsoal` (string): The unique identifier for the current game session.

#### Description
This endpoint fetches a "Susun Kata" game from an external API (`https://rest-api.akuari.my.id/games/susunkata`). Users can receive a new puzzle by providing a unique `idsoal`. If the provided `idsoal` matches an ongoing game, the current puzzle will be displayed.

### 4. Jawab (Submit Answer)

#### Endpoint
```
/jawab/:user?jawaban=&idsoal=
```

#### Method
```
GET
```

#### Parameters
- `user` (string): The username of the player.
- `jawaban` (string): The player's answer to the current puzzle.
- `idsoal` (string): The unique identifier for the current game session.

#### Description
This endpoint allows users to submit their answers to the current puzzle. The server validates the answer, updates the score, and provides feedback to the player. Users have three attempts for each puzzle.

### 5. Skor (User Score)

#### Endpoint
```
/skor?user=
```

#### Method
```
GET
```

#### Parameters
- `user` (string): The username of the player.

#### Description
This endpoint returns the current score of the specified player. The score is calculated based on the number of correct answers submitted.

### 6. Top Skor (Top Scores)

#### Endpoint
```
/topskor
```

#### Method
```
GET
```

#### Description
This endpoint displays the top scores, showing the usernames and corresponding scores of the top players.

## Conclusion

Enjoy playing the games and competing with others to achieve the highest score! If you have any questions or encounter issues, feel free to reach out to the API maintainers.

Happy gaming! 🎮🚀
