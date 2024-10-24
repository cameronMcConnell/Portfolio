const GRID_SIZE = 27;
const GAME_SPEED = 175;

class SnakeGame {
    #gameContainer
    #gameOver
    #gameInterval
    #snakeBody
    #previousSnakeTail
    #directions
    #playerDirection
    #foodPos
    #score
    #grid

    constructor(gameContainer) {
        this.#gameContainer = gameContainer;
        this.#gameOver = false;
        this.#gameInterval;
        this.#snakeBody = [this.#getRandomIntInclusivePair(3, GRID_SIZE - 4)];
        this.#previousSnakeTail = this.#snakeBody[0];
        this.#directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        this.#playerDirection = this.#directions[this.#getRandomIntInclusive(0, 3)];
        this.#foodPos = this.#getRandomIntInclusivePair(1, GRID_SIZE - 2);
        this.#score = 0;
        this.#grid = this.#initGrid();

    }

    getScore() {
        return this.#score;
    }

    startGame() {
        this.#initKeydownEventListener();

        this.#drawBoard();

        // This can be removed if you don't want it.
        window.scrollTo(this.#gameContainer.offsetLeft, this.#gameContainer.offsetTop);

        return new Promise((resolve) => {
            this.#gameInterval = setInterval(() => {
                if (!this.#gameOver){
                    this.#drawBoard();
                    this.#updateSnakeBody();
                    this.#evaluateGameState();
                }
                else {
                    this.#stopGame();
                    resolve();
                }
            }, GAME_SPEED);
        });
    }

    #stopGame() {
        clearInterval(this.#gameInterval);
        this.#removeKeydownEventListener();
    }

    #evaluateGameState() {
        if (this.#hasCollidedWithWall() || this.#hasCollidedWithSelf()) {
            this.#gameOver = true;
        }
        else if (this.#hasEatenFood()) {
            this.#score += 1;
            this.#addSnakeTail();
            this.#generateNewFoodPos();
        }
    }

    #addSnakeTail() {
        this.#snakeBody.push(this.#previousSnakeTail);
    }

    #generateNewFoodPos() {
        let newFoodPos = this.#getRandomIntInclusivePair(1, GRID_SIZE - 2);

        while (this.#foodIsOnSnakeBody(newFoodPos)) {
            newFoodPos = this.#getRandomIntInclusivePair(1, GRID_SIZE - 2);
        }

        this.#foodPos = newFoodPos;
        this.#grid[this.#foodPos[0]][this.#foodPos[1]] = '*';
    }

    #foodIsOnSnakeBody(newFoodPos) {
        const [newFoodRow, newFoodCol] = newFoodPos;

        for (const segment of this.#snakeBody) {
            const [segmentRow, segmentCol] = segment;

            if (segmentRow === newFoodRow && segmentCol === newFoodCol) {
                return true;
            }
        }

        return false;
    }

    #hasCollidedWithWall() {
        const [headRow, headCol] = this.#snakeBody[0];

        if (headRow === 0 || headRow === 26 || headCol === 0 || headCol === 26) {
            return true;
        }

        return false;
    }

    #hasCollidedWithSelf() {
        const [headRow, headCol] = this.#snakeBody[0];

        for (let segment = 1; segment < this.#snakeBody.length; ++segment) {
            const [bodyRow, bodyCol] = this.#snakeBody[segment];

            if (headRow === bodyRow && headCol === bodyCol) {
                return true;
            }
        }

        return false;
    }

    #hasEatenFood() {
        const [headRow, headCol] = this.#snakeBody[0];
        const [foodRow, foodCol] = this.#foodPos;

        if (headRow === foodRow && headCol === foodCol) {
            return true;
        }

        return false;
    }

    #initKeydownEventListener() {
        window.addEventListener('keydown', (event) => this.#handleKeydownEvent(event));
    }

    #removeKeydownEventListener() {
        window.removeEventListener('keydown', (event) => this.#handleKeydownEvent(event));
    }

    #handleKeydownEvent(event) {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.#playerDirection = this.#directions[0];
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.#playerDirection = this.#directions[1];
                break;
            case 'ArrowRight':
                this.#playerDirection = this.#directions[2];
                break;
            case 'ArrowLeft':
                this.#playerDirection = this.#directions[3];
                break;
            default:
                break;
        }
    }

    #updateSnakeBody() {
        const head = this.#snakeBody[0];
        this.#grid[head[0]][head[1]] = '&nbsp;';
        
        const newHead = [
            head[0] + this.#playerDirection[0], 
            head[1] + this.#playerDirection[1]
        ];

        this.#previousSnakeTail = this.#snakeBody[this.#snakeBody.length - 1];

        for (let segment = this.#snakeBody.length - 1; segment > 0; --segment) {
            const [segmentRow, segmentCol] = this.#snakeBody[segment];
            this.#grid[segmentRow][segmentCol] = '&nbsp';
            this.#snakeBody[segment] = [...this.#snakeBody[segment - 1]];
        }

        this.#snakeBody[0] = newHead;
        this.#grid[newHead[0]][newHead[1]] = '@';

        for (let segment = 1; segment < this.#snakeBody.length; ++segment) {
            const [segmentRow, segmentCol] = this.#snakeBody[segment];
            this.#grid[segmentRow][segmentCol] = '@';
        }
    }

    #getRandomIntInclusive(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    #getRandomIntInclusivePair(min, max) {
        return [this.#getRandomIntInclusive(min, max), this.#getRandomIntInclusive(min, max)];
    }

    #initGrid() {
        const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill('&nbsp;'));

        grid[0][0] = '+';
        grid[0][GRID_SIZE - 1] = '+';
        grid[GRID_SIZE - 1][0] = '+';
        grid[GRID_SIZE - 1][GRID_SIZE - 1] = '+';

        const [headRow, headCol] = this.#snakeBody[0];
        grid[headRow][headCol] = '@';

        const [foodRow, foodCol] = this.#foodPos;
        grid[foodRow][foodCol] = '*';

        for (let col = 1; col < GRID_SIZE - 1; ++col) {
            grid[0][col] = '-';
            grid[GRID_SIZE - 1][col] = '-';
        }

        for (let row = 1; row < GRID_SIZE - 1; ++row) {
            grid[row][0] = '|';
            grid[row][GRID_SIZE - 1] = '|';
        }

        return grid;
    }

    #drawBoard() {
        let boardContent = '';

        for (let row = 0; row < GRID_SIZE; ++row) {
            for (let col = 0; col < GRID_SIZE; ++col) {
                boardContent += this.#grid[row][col];
            }

            boardContent += '<br>';
        }

        this.#gameContainer.innerHTML = boardContent;
    }
}

window.SnakeGame = SnakeGame;