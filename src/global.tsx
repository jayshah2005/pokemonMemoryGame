import kantoMap from "./assets/images/regions/kantoMap.png"
import johtoMap from "./assets/images/regions/johtoMap.png"
import hoennMap from "./assets/images/regions/hoennMap.png"
import sinnohMap from "./assets/images/regions/sinnohMap.png"
import unovaMap from "./assets/images/regions/unovaMap.png"
import kalosMap from "./assets/images/regions/kalosMap.png"
import alolaMap from "./assets/images/regions/alolaMap.png"
import galarMap from "./assets/images/regions/galarMap.png"
import hisuiMap from "./assets/images/regions/hisuiMap.png"
import paldeaMap from "./assets/images/regions/paldeaMap.png"

const regions: { [key: string]: { map: string, id: number } } = {
    Kanto: {
        map: kantoMap,
        id: 1
    },
    Johto: {
        map: johtoMap,
        id: 2
    },
    Hoenn: {
        map: hoennMap,
        id: 3
    },
    Sinnoh: {
        map: sinnohMap,
        id: 4
    },
    Unova: {
        map: unovaMap,
        id: 5
    },
    Kalos: {
        map: kalosMap,
        id: 6
    },
    Alola: {
        map: alolaMap,
        id: 7
    },
    Galar: {
        map: galarMap,
        id: 8
    },
    Hisui: {
        map: hisuiMap,
        id: 9
    },
    Paldea: {
        map: paldeaMap,
        id: 10
    }
};

enum CurrentPage {
    START_SCREEN,
    REGION_SCREEN,
    GAME_SCREEN,
    END_SCREEN
}

enum GameStaus {
    NOT_DETERMINED,
    WON,
    LOST
}

export { CurrentPage, GameStaus, regions };