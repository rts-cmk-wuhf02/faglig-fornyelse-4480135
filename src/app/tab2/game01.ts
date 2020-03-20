import { createGesture, Gesture } from "@ionic/core"

export function startGame01() {
    /* Modifiers */
    const BULLET_SPEED : number = 3;
    const ENEMY_INITIAL_SPEED : number = 0.3;
    const ENEMY_SPEED_INCREMENT : number = 0.0005;
    const ENEMY_MAX_SPEED : number = 1.8;
    const MAX_BULLETS : number = 1;
    const MAX_ENEMIES : number = 5;
    const FPS : number = 30;



    // Controls
    const controlsDOM : any = document.querySelector(".controls");
    const playerDOM : any = document.querySelector(".game_player");

    // Swipe up
    const controlGesture: Gesture = createGesture({
        el: controlsDOM,
        threshold: 0,
        passive: false,
        direction: undefined,
        gestureName: 'swipe-control',
        onEnd: (ev) => {
            if(!isPlayerDead) {
                // Threshold checks
                if(ev.startY > ev.currentY + 20 && ev.startX > ev.currentX - 30 && ev.startX < ev.currentX + 30) {
                    // Remove direction classes
                    for(let i = 0; i < 4; i++) {
                        if(playerDOM.classList.contains("side-" + i)) playerDOM.classList.remove("side-" + i);
                    }

                    // Add direction class
                    playerDOM.classList.add("side-0");

                    spawnBullet();
                } else if(ev.startX > ev.currentX + 20 && ev.startY > ev.currentY - 30 && ev.startY < ev.currentY + 30) {
                    // Remove direction classes
                    for(let i = 0; i < 4; i++) {
                        if(playerDOM.classList.contains("side-" + i)) playerDOM.classList.remove("side-" + i);
                    }

                    // Add direction class
                    playerDOM.classList.add("side-1");

                    spawnBullet();
                } else if(ev.startX < ev.currentX - 20 && ev.startY > ev.currentY - 30 && ev.startY < ev.currentY + 30) {
                    // Remove direction classes
                    for(let i = 0; i < 4; i++) {
                        if(playerDOM.classList.contains("side-" + i)) playerDOM.classList.remove("side-" + i);
                    }

                    // Add direction class
                    playerDOM.classList.add("side-2");

                    spawnBullet();
                } else if(ev.startY < ev.currentY - 20 && ev.startX > ev.currentX - 30 && ev.startX < ev.currentX + 30) {
                    // Remove direction classes
                    for(let i = 0; i < 4; i++) {
                        if(playerDOM.classList.contains("side-" + i)) playerDOM.classList.remove("side-" + i);
                    }

                    // Add direction class
                    playerDOM.classList.add("side-3");

                    spawnBullet();
                } else if(ev.startX < ev.currentX + 10 && ev.startX > ev.currentX - 10 && ev.startY < ev.currentY + 10 && ev.startY > ev.currentY - 10) {
                    spawnBullet();
                }
            }
        }
    });
    controlGesture.enable();


    // Program
    let enemySpawner : any;
    let score : number = 0;
    let bullets : any = [];
    let enemies : any = [];
    let isPlayerDead : boolean = false;
    let enemySpeed = ENEMY_INITIAL_SPEED;

    let updateLoop : any;

    
    // DOM elements
    const deadPopupDOM : any = document.querySelector(".dead-popup");
    const deadPopupScoreDOM : any = document.querySelector(".dead-popup_score");
    const initialCoverDOM : any = document.querySelector(".initial-cover");
    const startButtonDOM : any = document.querySelector(".initial-cover .start-button");
    const deadPopupStartButtonDOM : any = document.querySelector(".dead-popup .start-button");
    const gameCanvasDOM : any = document.querySelector(".game-canvas");
    const enemiesDOM : any = document.querySelector(".game_enemies");
    const bulletsDOM : any = document.querySelector(".game_bullets");
    const scoreDOM :any = document.querySelector(".game_score");
    
    const ngClassID : string = enemiesDOM.getAttributeNames().find((element) => {
        return (element.indexOf("_ngcontent-") >= 0);
    }).split("ngcontent-")[1];

    // Start button click
    startButtonDOM.addEventListener("click", function() {
        initialCoverDOM.classList.add("hidden");
        enemySpawner = setTimeout(spawnEnemy, 1000);

        updateLoop = setInterval(update, 1000 / FPS);
    })

    deadPopupStartButtonDOM.addEventListener("click", function() {
        deadPopupDOM.classList.remove("visible");
        enemySpawner = setTimeout(spawnEnemy, 1000);

        updateLoop = setInterval(update, 1000 / FPS);


        score = 0;
        scoreDOM.innerText = score;
        isPlayerDead = false;
        playerDOM.classList.remove("die");
        enemySpeed = ENEMY_INITIAL_SPEED;
        
        // Reset enemies
        enemies.forEach(element => {
            element[0].remove();
        });
        enemies = [];
        
        // Reset bullets
        bullets.forEach(element => {
            element[0].remove();
        });
        bullets = [];
    });

    // Spawn bullet function
    function spawnBullet() {
        if(bullets.length < MAX_BULLETS) {
            const bulletElement : any = document.createElement("div");
            bulletElement.setAttribute("_ngcontent-" + ngClassID, "");
            bulletElement.className = "bullet " + playerDOM.classList[1];

            const bulletIconElement : any = document.createElement("ion-icon");
            bulletIconElement.name = "ellipse";

            bulletElement.appendChild(bulletIconElement);
            bulletsDOM.appendChild(bulletElement);

            bullets.push([ bulletElement, 50 ]);
        }
    }

    // Spawn enemy function
    function spawnEnemy() {
        if(enemies.length < MAX_ENEMIES && !isPlayerDead) {
            const spawnSide : number = Math.floor(Math.random() * 4);


            const enemyElement : any = document.createElement("div");
            enemyElement.setAttribute("_ngcontent-" + ngClassID, "");
            enemyElement.className = "enemy side-" + spawnSide;
            
            const enemyIconElement : any = document.createElement("ion-icon");
            enemyIconElement.name = "square";
            
            enemyElement.appendChild(enemyIconElement);
            enemiesDOM.appendChild(enemyElement);



            enemySpawner = setTimeout(spawnEnemy, 1000);

            if(spawnSide == 0) {
                enemyElement.style.left = "50%"; // Top
                enemies.push([ enemyElement, 0 ]);
            } else if(spawnSide == 1) {
                enemyElement.style.top = "50%"; // Left
                enemies.push([ enemyElement, 0 ]);
            } else if(spawnSide == 2) {
                enemyElement.style.left = "100%"; // Right
                enemyElement.style.top = "50%";
                enemies.push([ enemyElement, 100 ]);
            } else if(spawnSide == 3) {
                enemyElement.style.top = "100%"; // Bottom
                enemyElement.style.left = "50%";
                enemies.push([ enemyElement, 100 ]);
            }
        }
    }

    function update() {
        if(!isPlayerDead) {
            // Gradually increment enemy speed
            if(enemySpeed < ENEMY_MAX_SPEED)  {
                enemySpeed += ENEMY_SPEED_INCREMENT;
            } else {
                enemySpeed = ENEMY_MAX_SPEED;
            }


            for(let i = 0; i < bullets.length; i++) {
                // Bullet movement
                if(bullets[i][0].classList.contains("side-0")) {
                    bullets[i][1] -= BULLET_SPEED;
                    bullets[i][0].style.top = bullets[i][1] + "%";
                } else if(bullets[i][0].classList.contains("side-1")) {
                    bullets[i][1] -= BULLET_SPEED;
                    bullets[i][0].style.left = bullets[i][1] + "%";
                } else if(bullets[i][0].classList.contains("side-2")) {
                    bullets[i][1] += BULLET_SPEED;
                    bullets[i][0].style.left = bullets[i][1] + "%";
                } else if(bullets[i][0].classList.contains("side-3")) {
                    bullets[i][1] += BULLET_SPEED;
                    bullets[i][0].style.top = bullets[i][1] + "%";
                }

                if(bullets[i][0].offsetTop > gameCanvasDOM.clientHeight
                    || bullets[i][0].offsetTop < 0
                    || bullets[i][0].offsetLeft < 0
                    || bullets[i][0].offsetLeft > gameCanvasDOM.clientWidth) {
                    bullets[i][0].remove();
                    bullets.splice(i, 1);

                    continue;
                }
            
            
                // Bullet/enemy collision detection
                for(let n = 0; n < enemies.length; n++) {
                    if(bullets[i][0].classList[1] == enemies[n][0].classList[1]) {
                        if(!enemies[n][0].classList.contains("die")) {
                            const enemyBox = enemies[n][0].getBoundingClientRect();
                            const bulletBox = bullets[i][0].getBoundingClientRect();
        
                            if(bulletBox.right >= enemyBox.left
                                && bulletBox.bottom >= enemyBox.top
                                && bulletBox.left <= enemyBox.right
                                && bulletBox.top <= enemyBox.bottom) {
                                bullets[i][0].remove();
                                bullets.splice(i, 1);

                                score++;
                                scoreDOM.innerText = score;
        
                                // Play enemy death animation
                                enemies[n][0].classList.add("die");

                                break;
                            }
                        }
                    }
                }
            }


            const playerBox = playerDOM.getBoundingClientRect();

            for(let n = 0; n < enemies.length; n++) {
                // Delete dead enemies
                const enemyBox = enemies[n][0].getBoundingClientRect();

                if(enemyBox.width < 5 && enemyBox.height < 5) {
                    enemies[n][0].remove();
                    enemies.splice(n, 1);
                    continue;
                }


                // Enemy movement
                if(enemies[n][0].classList.contains("side-0")) {
                    enemies[n][1] += enemySpeed;
                    enemies[n][0].style.top = enemies[n][1] + "%";
                } else if(enemies[n][0].classList.contains("side-1")) {
                    enemies[n][1] += enemySpeed;
                    enemies[n][0].style.left = enemies[n][1] + "%";
                } else if(enemies[n][0].classList.contains("side-2")) {
                    enemies[n][1] -= enemySpeed;
                    enemies[n][0].style.left = enemies[n][1] + "%";
                } else if(enemies[n][0].classList.contains("side-3")) {
                    enemies[n][1] -= enemySpeed;
                    enemies[n][0].style.top = enemies[n][1] + "%";
                }


                // Player/enemy collision detection
                if(enemyBox.right >= playerBox.left
                    && enemyBox.bottom >= playerBox.top
                    && enemyBox.left <= playerBox.right
                    && enemyBox.top <= playerBox.bottom && !enemies[n][0].classList.contains("die")) {
                    isPlayerDead = true;
                    playerDOM.classList.add("die");
                    deadPopupDOM.classList.add("visible");
                    clearTimeout(enemySpawner);
                    clearInterval(updateLoop);
                    deadPopupScoreDOM.innerText = score;

                    for(let i = 0; i < enemies.length; i++) {
                        enemies[i][0].classList.add("die");
                    }

                    break;
                }
            }
        }
    }
}