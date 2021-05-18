const startMusicPlayer = new Audio('./../sounds/start.wav')
const snackSFXPlayer = new Audio('./../sounds/snack01.mp3')
const foodSFXPlayer = new Audio('./../sounds/food-eat.wav')
const bgMusicPlayer = new Audio('./../sounds/background.mp3')
const gameOverPlayer = new Audio('./../sounds/gameover.mp3')

startMusicPlayer.volume = 0.7
snackSFXPlayer.volume = 0.2
foodSFXPlayer.volume = 0.8
bgMusicPlayer.volume = 0.5
export const Sounds = {
    startMusic(status) {
        this.musicFunctions(status, startMusicPlayer)
    },
    snackSFX(status) {
        this.musicFunctions(status, snackSFXPlayer)
    },
    foodSFX(status) {
        this.musicFunctions(status, foodSFXPlayer)
    },
    bgMusic(status) {
        this.musicFunctions(status, bgMusicPlayer)
    },
    gameOver(status) {
        this.musicFunctions(status, gameOverPlayer)
    },
    musicFunctions(status, player) {
        switch (status) {
            case 'play':
                player.currentTime = 0
                player.play()
                break;
            
            case 'pause':
                player.pause()
                break;
            
            case 'reset':
                player.reset()
                break;
            
            case 'stop':
                player.stop()
                break;
        
            default:
                break;
        }
    }
}