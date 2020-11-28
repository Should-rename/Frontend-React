import * as $ from 'jquery'

//аналитика: считаем клики по документу
function createAnalytics(): object {
    let counter = 0;
    let destroyed: boolean = false;

    const listener = (): number => counter++

    $(document).on('click', listener)

    return {
        //аналитика прекращает своё действие
        destroy() {
            $(document).off('click', listener)
            destroyed = true
        },

        getClicks() {
            if (destroyed) {
                return `Analytics is destroyed. Total clicks = ${counter}`
            }
            return counter
        }
    }
}

window['analytics'] = createAnalytics()