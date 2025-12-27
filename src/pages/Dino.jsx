import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import Header from '../components/Header.jsx'

const GAME_CONFIG = {
    GRAVITY: 0.8,
    MAX_JUMP_HEIGHT: 12,
    MIN_JUMP_HEIGHT: 12,
    SPEED: 6,
    ACCELERATION: 0.001,
    CLOUD_FREQUENCY: 0.5,
    MAX_CLOUDS: 6,
    TREX_WIDTH: 60,
    TREX_HEIGHT: 50,
    OBSTACLE_WIDTH: 60,
    OBSTACLE_HEIGHT: 80,
    GROUND_HEIGHT: 12,
    CANVAS_WIDTH: 600,
    CANVAS_HEIGHT: 150,
    FPS: 60,
    OBSTACLE_MIN_GAP: 800,
    OBSTACLE_MAX_GAP: 1800,
    SPEED_INCREMENT: 0.5,
    MAX_SPEED: 13,
    SCORE_INCREMENT_INTERVAL: 100,
    OBSTACLE_VERTICAL_SPEED: 2,
    OBSTACLE_VERTICAL_RANGE: 40,
    SHAKE_TRIGGER_SCORE: 500, // 500점마다 흔들림
    SHAKE_DURATION: 2000, // 2초간 흔들림
    SHAKE_INTENSITY: 8, // 흔들림 강도
    GHOST_BLINK_SPEED: 3, // 깜빡임 속도
    GHOST_VISIBLE_TIME: 0.7 // 보이는 시간 비율 (0.7 = 70% 시간 동안 보임)
}

const OBSTACLE_TYPES = ['pass', 'pass1', 'moving_pass', 'moving_pass1', 'ghost_pass', 'ghost_pass1']

const KEY_CODES = {
    SPACE: 'Space',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown'
}

const groundMove = keyframes`
    from { background-position: 0 0; }
    to { background-position: -4px 0; }
`

const walkAnimation = keyframes`
    0% { background-image: url('/assets/404/walk.png'); }
    50% { background-image: url('/assets/404/walk-2.png'); }
    100% { background-image: url('/assets/404/walk.png'); }
`

const shakeAnimation = keyframes`
    0% { transform: translate(0px, 0px); }
    10% { transform: translate(-2px, -1px); }
    20% { transform: translate(-1px, 2px); }
    30% { transform: translate(3px, 0px); }
    40% { transform: translate(0px, -2px); }
    50% { transform: translate(-2px, 1px); }
    60% { transform: translate(2px, 1px); }
    70% { transform: translate(1px, -1px); }
    80% { transform: translate(-1px, 2px); }
    90% { transform: translate(2px, -2px); }
    100% { transform: translate(0px, 0px); }
`

const GameContainer = styled.div`
    width: 100vw;
    height: calc(100vh - 163px); /* 헤더 높이만큼 빼기 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const GameCanvas = styled.div`
    position: relative;
    width: ${GAME_CONFIG.CANVAS_WIDTH}px;
    height: ${GAME_CONFIG.CANVAS_HEIGHT}px;
    border: 1px solid #535353;
    overflow: hidden;
    
    ${props => props.isShaking && css`
        animation: ${shakeAnimation} 0.1s infinite;
    `}
`

const TRex = styled.div`
    position: absolute;
    bottom: ${GAME_CONFIG.GROUND_HEIGHT}px;
    left: 25px;
    width: ${GAME_CONFIG.TREX_WIDTH}px;
    height: ${GAME_CONFIG.TREX_HEIGHT}px;
    background-image: url('/assets/404/walk.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    z-index: 10;
    transform: translateY(${props => -props.jumpHeight}px);
    transition: none;

    ${props => props.isRunning && css`
        animation: ${walkAnimation} 0.4s infinite;
    `}

    ${props => props.isJumping && css`
        background-image: url('/assets/404/jump.png');
        animation: none;
    `}

    ${props => props.isDucking && css`
        background-image: url('/assets/404/slide.png');
        animation: none;
    `}
`

const Obstacle = styled.div`
    position: absolute;
    bottom: ${props => {
        const baseBottom = props.type === 'pass1' || props.type === 'moving_pass1' || props.type === 'ghost_pass1'
            ? GAME_CONFIG.GROUND_HEIGHT + 30
            : GAME_CONFIG.GROUND_HEIGHT;
        
        // 움직이는 장애물인 경우에만 verticalOffset 적용
        const isMoving = props.type === 'moving_pass' || props.type === 'moving_pass1';
        return baseBottom + (isMoving ? (props.verticalOffset || 0) : 0);
    }}px;
    width: ${props => props.width || GAME_CONFIG.OBSTACLE_WIDTH}px;
    height: ${props => props.height || GAME_CONFIG.OBSTACLE_HEIGHT}px;
    left: ${props => props.x}px;
    z-index: 5;
    background-image: url(${props => {
        if (props.type === 'pass1' || props.type === 'moving_pass1' || props.type === 'ghost_pass1') {
            return '/assets/404/pass1.png';
        }
        return '/assets/404/pass.png';
    }});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transition: bottom 0.1s ease-out;
    
    /* 고스트 장애물 깜빡임 효과 */
    opacity: ${props => {
        if (props.type === 'ghost_pass' || props.type === 'ghost_pass1') {
            return props.isVisible ? 0.8 : 0.1;
        }
        return 1;
    }};
    
    /* 고스트 장애물일 때 약간의 그림자 효과 */
    ${props => (props.type === 'ghost_pass' || props.type === 'ghost_pass1') && css`
        filter: drop-shadow(0 0 3px rgba(255, 0, 0, 0.5));
        transition: opacity 0.1s ease-in-out;
    `}
`

const Ground = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${GAME_CONFIG.GROUND_HEIGHT}px;
    background-color: #535353;
    background-image: repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 2px,
        #535353 2px,
        #535353 4px
    );

    ${props => props.isMoving && css`
        animation: ${groundMove} 1s linear infinite;
    `}
`

const ScoreDisplay = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #535353;
    z-index: 100;

    .current-score {
        display: inline-block;
        min-width: 60px;
        text-align: right;
    }

    .high-score {
        margin-left: 12px;
        display: inline-block;
        min-width: 60px;
        text-align: right;
    }
`

const BaseButton = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`

const StartButton = styled(BaseButton)`
    background-image: url('/assets/404/start_button.png');
`

const RestartButton = styled(BaseButton)`
    background-image: url('/assets/404/resatrt.png');
`

const useGame = () => {
    const [gameState, setGameState] = useState('waiting')
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [gameSpeed, setGameSpeed] = useState(GAME_CONFIG.SPEED)
    const [isShaking, setIsShaking] = useState(false)
    const [lastShakeScore, setLastShakeScore] = useState(0)
    const [tRex, setTRex] = useState({
        jumping: false,
        ducking: false,
        jumpVelocity: 0,
        jumpHeight: 0
    })
    const [obstacles, setObstacles] = useState([])

    const gameLoopRef = useRef()
    const lastObstacleRef = useRef(0)
    const shakeTimeoutRef = useRef()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedHighScore = localStorage.getItem('dinoHighScore')
            if (savedHighScore) {
                setHighScore(parseInt(savedHighScore))
            }
        }
    }, [])

    const jump = useCallback(() => {
        if (gameState !== 'playing' || tRex.jumping || tRex.ducking) return

        setTRex(prev => ({
            ...prev,
            jumping: true,
            jumpVelocity: GAME_CONFIG.MAX_JUMP_HEIGHT
        }))
    }, [gameState, tRex.jumping, tRex.ducking])

    const duck = useCallback((isDucking) => {
        if (gameState !== 'playing' || tRex.jumping) return

        setTRex(prev => ({
            ...prev,
            ducking: isDucking
        }))
    }, [gameState, tRex.jumping])

    const startGame = useCallback(() => {
        setGameState('playing')
        setScore(0)
        setGameSpeed(GAME_CONFIG.SPEED)
        setObstacles([])
        setIsShaking(false)
        setLastShakeScore(0)
        setTRex({
            jumping: false,
            ducking: false,
            jumpVelocity: 0,
            jumpHeight: 0
        })
        lastObstacleRef.current = 0
        
        // 기존 흔들림 타이머 정리
        if (shakeTimeoutRef.current) {
            clearTimeout(shakeTimeoutRef.current)
        }
    }, [])

    const gameOver = useCallback(() => {
        setGameState('gameOver')
        if (score > highScore) {
            setHighScore(score)
            if (typeof window !== 'undefined') {
                localStorage.setItem('dinoHighScore', score.toString())
            }
        }
    }, [score, highScore])

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.code) {
                case KEY_CODES.SPACE:
                case KEY_CODES.ARROW_UP:
                    e.preventDefault()
                    if (gameState === 'waiting' || gameState === 'gameOver') {
                        startGame()
                    } else {
                        jump()
                    }
                    break
                case KEY_CODES.ARROW_DOWN:
                    e.preventDefault()
                    duck(true)
                    break
            }
        }

        const handleKeyUp = (e) => {
            if (e.code === KEY_CODES.ARROW_DOWN) {
                duck(false)
            }
        }

        const handleClick = () => {
            if (gameState === 'waiting' || gameState === 'gameOver') {
                startGame()
            } else {
                jump()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        window.addEventListener('click', handleClick)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('click', handleClick)
        }
    }, [gameState, jump, duck, startGame])

    useEffect(() => {
        if (gameState !== 'playing') return

        gameLoopRef.current = setInterval(() => {
            setTRex(prev => {
                if (prev.jumping) {
                    const newJumpHeight = prev.jumpHeight + prev.jumpVelocity
                    const newJumpVelocity = prev.jumpVelocity - GAME_CONFIG.GRAVITY

                    if (newJumpHeight <= 0) {
                        return {
                            ...prev,
                            jumping: false,
                            jumpHeight: 0,
                            jumpVelocity: 0
                        }
                    }

                    return {
                        ...prev,
                        jumpHeight: newJumpHeight,
                        jumpVelocity: newJumpVelocity
                    }
                }
                return prev
            })

            setObstacles(prevObstacles => {
                const currentTime = Date.now()
                let newObstacles = prevObstacles
                    .map(obstacle => {
                        // 움직이는 장애물인 경우에만 상하 움직임 계산
                        const isMoving = obstacle.type === 'moving_pass' || obstacle.type === 'moving_pass1';
                        const isGhost = obstacle.type === 'ghost_pass' || obstacle.type === 'ghost_pass1';
                        
                        let verticalOffset = 0;
                        let isVisible = true;
                        
                        if (isMoving) {
                            const timeElapsed = (currentTime - obstacle.createdAt) / 1000;
                            verticalOffset = Math.sin(timeElapsed * 2) * GAME_CONFIG.OBSTACLE_VERTICAL_RANGE;
                        }
                        
                        if (isGhost) {
                            const timeElapsed = (currentTime - obstacle.createdAt) / 1000;
                            const blinkCycle = Math.sin(timeElapsed * GAME_CONFIG.GHOST_BLINK_SPEED);
                            isVisible = blinkCycle > (1 - GAME_CONFIG.GHOST_VISIBLE_TIME * 2);
                        }
                        
                        return {
                            ...obstacle,
                            x: obstacle.x - gameSpeed,
                            verticalOffset: verticalOffset,
                            isVisible: isVisible
                        }
                    })
                    .filter(obstacle => obstacle.x > -50)

                if (currentTime - lastObstacleRef.current >
                    GAME_CONFIG.OBSTACLE_MIN_GAP + Math.random() * 1000) {
                    
                    // 장애물 타입 확률 분배
                    const rand = Math.random();
                    let type;
                    
                    if (rand < 0.15) {
                        // 15% 확률로 움직이는 장애물
                        type = Math.random() < 0.5 ? 'moving_pass' : 'moving_pass1';
                    } else if (rand < 0.25) {
                        // 10% 확률로 고스트 장애물
                        type = Math.random() < 0.5 ? 'ghost_pass' : 'ghost_pass1';
                    } else {
                        // 75% 확률로 일반 장애물
                        type = Math.random() < 0.5 ? 'pass' : 'pass1';
                    }

                    newObstacles.push({
                        id: currentTime,
                        x: GAME_CONFIG.CANVAS_WIDTH,
                        type: type,
                        width: GAME_CONFIG.OBSTACLE_WIDTH,
                        height: GAME_CONFIG.OBSTACLE_HEIGHT,
                        createdAt: currentTime,
                        verticalOffset: 0,
                        isVisible: true
                    })

                    lastObstacleRef.current = currentTime
                }

                return newObstacles
            })

            setScore(prevScore => {
                const newScore = prevScore + 1
                
                // 속도 증가 로직
                if (newScore % GAME_CONFIG.SCORE_INCREMENT_INTERVAL === 0) {
                    setGameSpeed(prevSpeed =>
                        Math.min(prevSpeed + GAME_CONFIG.SPEED_INCREMENT, GAME_CONFIG.MAX_SPEED)
                    )
                }
                
                // 화면 흔들림 로직
                if (newScore > 0 && 
                    newScore % GAME_CONFIG.SHAKE_TRIGGER_SCORE === 0 && 
                    newScore !== lastShakeScore) {
                    
                    setLastShakeScore(newScore)
                    setIsShaking(true)
                    
                    // 일정 시간 후 흔들림 중지
                    shakeTimeoutRef.current = setTimeout(() => {
                        setIsShaking(false)
                    }, GAME_CONFIG.SHAKE_DURATION)
                }
                
                return newScore
            })
        }, 1000 / GAME_CONFIG.FPS)

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current)
            }
            if (shakeTimeoutRef.current) {
                clearTimeout(shakeTimeoutRef.current)
            }
        }
    }, [gameState, gameSpeed])

    useEffect(() => {
        if (gameState !== 'playing') return

        const tRexRect = {
            x: 25,
            y: GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT -
                GAME_CONFIG.TREX_HEIGHT - tRex.jumpHeight,
            width: GAME_CONFIG.TREX_WIDTH,
            height: tRex.ducking ? 26 : GAME_CONFIG.TREX_HEIGHT
        }

        const collision = obstacles.some(obstacle => {
            // 고스트 장애물이 보이지 않을 때는 충돌하지 않음
            const isGhost = obstacle.type === 'ghost_pass' || obstacle.type === 'ghost_pass1';
            if (isGhost && !obstacle.isVisible) return false;
            
            if ((obstacle.type === 'pass1' || obstacle.type === 'moving_pass1' || obstacle.type === 'ghost_pass1') && tRex.ducking) return false
            if ((obstacle.type === 'pass' || obstacle.type === 'moving_pass' || obstacle.type === 'ghost_pass') && tRex.jumping) return false

            const isHighObstacle = obstacle.type === 'pass1' || obstacle.type === 'moving_pass1' || obstacle.type === 'ghost_pass1';
            const baseBottom = isHighObstacle ? 30 : 0;
            const isMoving = obstacle.type === 'moving_pass' || obstacle.type === 'moving_pass1';
            const verticalOffset = isMoving ? (obstacle.verticalOffset || 0) : 0;
            
            const obstacleBottom = GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.GROUND_HEIGHT - 
                baseBottom - obstacle.height - verticalOffset;

            const obstacleRect = {
                x: obstacle.x,
                y: obstacleBottom,
                width: obstacle.width,
                height: obstacle.height
            }

            return (
                tRexRect.x < obstacleRect.x + obstacleRect.width - 4 &&
                tRexRect.x + tRexRect.width - 4 > obstacleRect.x &&
                tRexRect.y < obstacleRect.y + obstacleRect.height - 4 &&
                tRexRect.y + tRexRect.height - 4 > obstacleRect.y
            )
        })

        if (collision) {
            gameOver()
        }
    }, [obstacles, tRex, gameState, gameOver])

    return {
        gameState,
        score,
        highScore,
        tRex,
        obstacles,
        startGame,
        isShaking
    }
}

function DinoGame() {
    const { gameState, score, highScore, tRex, obstacles, startGame, isShaking } = useGame()

    return (
        <>
            <Header
                isTeamName="true"
                isCredit="true"
            />
            <GameContainer>
                <GameCanvas isShaking={isShaking}>
                    <ScoreDisplay>
                        <span className="current-score">
                            {score.toString().padStart(5, '0')}
                        </span>
                        <span className="high-score">
                            {highScore.toString().padStart(5, '0')}
                        </span>
                    </ScoreDisplay>

                    <TRex
                        isRunning={gameState === 'playing' && !tRex.jumping && !tRex.ducking}
                        isJumping={tRex.jumping}
                        isDucking={tRex.ducking}
                        jumpHeight={tRex.jumpHeight}
                    />

                    {obstacles.map(obstacle => (
                        <Obstacle
                            key={obstacle.id}
                            x={obstacle.x}
                            type={obstacle.type}
                            width={obstacle.width}
                            height={obstacle.height}
                            verticalOffset={obstacle.verticalOffset || 0}
                            isVisible={obstacle.isVisible}
                        />
                    ))}

                    <Ground isMoving={gameState === 'playing'} />

                    {gameState === 'gameOver' && <RestartButton onClick={startGame} />}
                    {gameState === 'waiting' && <StartButton onClick={startGame} />}
                </GameCanvas>
            </GameContainer>
        </>
    )
}

export default DinoGame