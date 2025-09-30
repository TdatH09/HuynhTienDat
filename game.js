// Lấy đối tượng canvas và context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Các biến trò chơi
let score = 0;
let lives = 3;
let bucketX = canvas.width / 2 - 50;
let bucketWidth = 100;
let bucketHeight = 20;
let bucketSpeed = 15;
let beerRadius = 15;
let beerX = Math.random() * canvas.width;
let beerY = -beerRadius;
let beerSpeed = 3;

// Cập nhật điểm và mạng
function updateScoreAndLives() {
    document.getElementById('score').textContent = "Điểm: " + score;
    document.getElementById('lives').textContent = "Mạng: " + lives;
}

// Vẽ thùng bia
function drawBucket() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(bucketX, canvas.height - bucketHeight, bucketWidth, bucketHeight);
}

// Vẽ bia
function drawBeer() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(beerX, beerY, beerRadius, 0, Math.PI * 2);
    ctx.fill();
}

// Cập nhật trò chơi
function updateGame() {
    // Dừng trò chơi khi hết mạng
    if (lives <= 0) {
        showGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBucket();
    drawBeer();

    beerY += beerSpeed; // Cập nhật vị trí bia

    // Kiểm tra bia rơi vào thùng
    if (beerY + beerRadius > canvas.height - bucketHeight && beerX > bucketX && beerX < bucketX + bucketWidth) {
        score++;
        beerY = -beerRadius;
        beerX = Math.random() * canvas.width;
        beerSpeed += 0.2;
    }

    // Nếu bia rơi ra ngoài
    if (beerY > canvas.height) {
        lives--;
        beerY = -beerRadius;
        beerX = Math.random() * canvas.width;
    }

    updateScoreAndLives(); // Cập nhật điểm và mạng
}

// Hiển thị Game Over
function showGameOver() {
    ctx.font = "48px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.font = "24px Arial";
    ctx.fillText("Nhấn F5 để chơi lại", canvas.width / 2, canvas.height / 2 + 50);
}

// Xử lý di chuyển thùng bia
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && bucketX > 0) {
        bucketX -= bucketSpeed;
    } else if (event.key === 'ArrowRight' && bucketX < canvas.width - bucketWidth) {
        bucketX += bucketSpeed;
    }
});

// Hàm chơi game
function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
}

// Bắt đầu trò chơi
gameLoop();
