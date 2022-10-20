/* Constants ---------- */
const tileType = {
    EMPTY: ' ',
    WALL: 'x',
    CHAR: 'C',
}

/* Game State --------- */
let settings = {
    width: 20,
    height:  20,
    tileDim:  30,
}

let board = [settings.width][settings.height];
let charLoc = { x: 1, y: 1 }

/* P5 ----------------- */
function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');

    initialize();
}

function draw() {
    render();
}

function keyPressed() {
    moveCharacter();
}

/* Logic -------------- */
function initialize() {
    let map = `xxxxxxxxxxxxxxxxxxxx
x                  x
xxxxxxxx           x
x      x  xxxxxxx  x
x      x  x     x  x
x      x  x xxx x  x
x      xxxx xxx x  x
x               x  x
xxxx xxxxxxxxxx x  x
x  x x        x x  x
xxxx xxxx     x x  x
x       x     x x  x
x     x xxxxxxx x  x
x     x xx      x  x
x     x xx xxxx x  x
xxxxxxx xx x  x x  x
x          x xx xxxx
x          x x     x
x          x x  C  x
x          x x     x
xxxxxxxxxxxxxxxxxxxx`;

    board = map.split('\n');
    charLoc = findCharacter(board);

    // TODO Generate map
}

function moveCharacter() {
    let deltaX = 0;
    let deltaY = 0;
    switch (keyCode) {
        case 72:            // h
        case LEFT_ARROW:
            deltaX = -1;
            break;
        case 74:            // j
        case DOWN_ARROW:
            deltaY = 1;
            break;
        case 75:            // k
        case UP_ARROW:
            deltaY = -1;
            break;
        case 76:            // l
        case RIGHT_ARROW:
            deltaX = 1;
            break;
        default:
            break;
    }

    let newX = charLoc.x + deltaX;
    let newY = charLoc.y + deltaY;
    if ((deltaX === 0 && deltaY === 0) ||
       (board[newX][newY] === tileType.WALL)) {
           return;
    }

    console.log(keyCode, ' (', deltaX, ', ', deltaY, ')');

    board = replace(board, charLoc.x, charLoc.y, tileType.EMPTY);

    charLoc = {
        x: charLoc.x + deltaX,
        y: charLoc.y + deltaY,
    }

    console.log(charLoc);
    console.log(board);
    board = replace(board, charLoc.x, charLoc.y, tileType.CHAR);
    console.log(board);
}

function findCharacter(board) {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y] === tileType.CHAR) {
                return { x: x, y:y };
            }
        }
    }
    return false;
}

function replace(board, x, y, c) {
    let front  = board[x].slice(0, y);
    let back   = board[x].slice(y + 1);
    let above  = board.slice(0, x);
    let bottom = board.slice(x + 1);
    let replace = concat(concat(front, c), back);
    print(board[y]);
    print(replace);
    return concat(concat(above, replace), bottom);
}

/* Rendering ---------- */
const tileColors = new Map([
    [tileType.EMPTY, 'rgb(211, 211, 211)'],
    [tileType.WALL,  'rgb(000, 000, 000)'],
    [tileType.CHAR,  'rgb(200, 100, 100)'],
]);

function render() {
    let offset = settings.tileDim + settings.tileDim / 10;
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[0].length; y++) {
            fill(tileColors.get(board[x][y]));
            square(x * offset, y * offset, settings.tileDim);
        }
    }
}
