const GRID_SIZE = 40

export const GRID = {
    random() {
        return {
            x: Math.floor(Math.random() * GRID_SIZE) + 1,
            y: Math.floor(Math.random() * GRID_SIZE) + 1
        }
    },
    touch(position) {
        return (
            position.x < 1 || position.x > GRID_SIZE ||
            position.y < 1 || position.y > GRID_SIZE
        )
    }
}