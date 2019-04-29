const Screen = {
    WIDTH: innerWidth,
    HEIGHT: innerHeight
  };

const Snake = {
    SIZE: 30,
    LENGTH: 1,
    X_COORDINATE: 0,
    Y_COORDINATE: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
    UP: 4
};

const APPLS = 2;
const canvas = document.querySelector(`.can`);
canvas.width = Screen.WIDTH;
canvas.height = Screen.HEIGHT;
const ctx = canvas.getContext(`2d`);

const clearFrame = function (ctx) {
    ctx.clearRect(0, 0, Screen.WIDTH, Screen.HEIGHT);
};

const roundOffSnakeSIZE = function (value) {
    return Math.round(value / Snake.SIZE) * Snake.SIZE;
}

const randomValue = function (param) {
    let value = Math.floor( Math.random() * param );
    return roundOffSnakeSIZE(value);
};

class Apple {
    constructor(){
        this.x = randomValue(Screen.WIDTH);
        this.y = randomValue(Screen.HEIGHT);
        this.size = Snake.SIZE;
    }

    render(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }


    isOffScreen() {
        return this.x + Snake.SIZE >= Screen.WIDTH || this.y + Snake.SIZE >= Screen.HEIGHT;
    }

}

class UserSnake {
    constructor(x = Snake.X_COORDINATE, y = Snake.Y_COORDINATE, vektor = Snake.RIGHT) {
        this.x = x;
        this.y = y;
        this.size = Snake.SIZE;
        this.vektor = vektor;
    }

    render(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

};

const START_SNAKE = Snake.LENGTH;

const snake = new Array(START_SNAKE).fill('').map( () => {
    return new UserSnake;
} );

const createStartSnake = function (ctx, snake) {
    let counterBlocks = Snake.SIZE;
    snake.forEach( (it, i) => {
        if (i > 0) {
            it.x += counterBlocks;
            counterBlocks += Snake.SIZE;
        };
        it.render(ctx);
    } )
};

const isCrushed = function (snake) {
    let snakeHead = snake[snake.length - 1];
    let crush = false;
    snake.map( (it, i) => {
        if (it.x == snakeHead.x && it.y == snakeHead.y && i < snake.length - 1) {
            crush = true;
        };
    } );
    return crush;
};

const moveSnake = function (snake) {
    let snakeHead = snake[snake.length - 1];
    let snakeEnd = snake[0];

    if (snakeHead.vektor == Snake.RIGHT) {
        snakeEnd.x = snakeHead.x + Snake.SIZE;
        snakeEnd.y = roundOffSnakeSIZE(snakeHead.y);
        snake.push(snakeEnd);
        snake.splice(0, 1);
    };
    if (snakeHead.vektor == Snake.DOWN) {
        snakeEnd.y = snakeHead.y + Snake.SIZE;
        snakeEnd.x = roundOffSnakeSIZE(snakeHead.x);
        snake.push(snakeEnd);
        snake.splice(0, 1);
    };
    if (snakeHead.vektor == Snake.LEFT) {
        snakeEnd.x = snakeHead.x - Snake.SIZE;
        snakeEnd.y = roundOffSnakeSIZE(snakeHead.y);
        snake.push(snakeEnd);
        snake.splice(0, 1);
    };
    if (snakeHead.vektor == Snake.UP) {
        snakeEnd.y = snakeHead.y - Snake.SIZE;
        snakeEnd.x = roundOffSnakeSIZE(snakeHead.x);
        snake.push(snakeEnd);
        snake.splice(0, 1);
    };


    document.addEventListener('keydown', function(evt) {
        evt.preventDefault();
        if (evt.keyCode == 37 && snakeHead.vektor !== Snake.RIGHT) {
            snakeHead.vektor = Snake.LEFT;
        };
        if (evt.keyCode == 38 && snakeHead.vektor !== Snake.DOWN) {
            snakeHead.vektor = Snake.UP;
        };
        if (evt.keyCode == 39 && snakeHead.vektor !== Snake.LEFT) {
            snakeHead.vektor = Snake.RIGHT;
        };
        if (evt.keyCode == 40 && snakeHead.vektor !== Snake.UP) {
            snakeHead.vektor = Snake.DOWN;
        };
    })
};

const isOffScreenMove = function (snake) {
    snake.forEach ( (it) => {
        it.vektor == Snake.RIGHT && it.x > roundOffSnakeSIZE(Screen.WIDTH) ? it.x = 0 : null;
        it.vektor == Snake.DOWN && it.y > roundOffSnakeSIZE(Screen.HEIGHT) ? it.y = 0 : null;
        it.vektor == Snake.LEFT && it.x < 0 ? it.x = roundOffSnakeSIZE(Screen.WIDTH) : null;
        it.vektor == Snake.UP && it.y < 0 ? it.y = roundOffSnakeSIZE(Screen.HEIGHT) : null;
    } )
};

const checkCoordinateApple = function (snake, apple, i) {
    snake.forEach( (it) => {
        if(it.x == apple.x && it.y == apple.y) {
            snake.unshift(new UserSnake(snake[0].x - Snake.SIZE, snake[snake.length - 1].y, snake[0].vektor));
            apples.forEach ( (it) => {
                if(it == apple) {
                    apples.splice(i, 1);
                }
            });
        }
    } )
};

const apples = new Array(APPLS).fill('').map( (it) => {
    it = new Apple;
    it.isOffScreen() ? it = new Apple : null;
    return it;
} );

const renderFrame = function(ctx, apples, snake) {

    if (apples.length < APPLS) {
        let newApple = new Apple;
        newApple.isOffScreen() ? newApple = new Apple() : apples.push(newApple);

    };

    clearFrame(ctx);

    isOffScreenMove(snake);

    apples.forEach( (it) => it.render(ctx) );

    snake.forEach( (it) => {
        it.render(ctx);
    } );

    apples.forEach( (it, i) => {
        checkCoordinateApple(snake, it, i);
    } );

    isCrushed(snake) ? snake = snake.splice(0, snake.length, new UserSnake(0, 0)) : null;

    moveSnake(snake);

};

createStartSnake(ctx,snake);
setInterval(() => {
    renderFrame(ctx, apples, snake);
}, 1000/10);


