import kantoMap from "./assets/images/regions/kantoMap.png"
import johtoMap from "./assets/images/regions/johtoMap.png"
import hoennMap from "./assets/images/regions/hoennMap.png"
import sinnohMap from "./assets/images/regions/sinnohMap.png"
import unovaMap from "./assets/images/regions/unovaMap.png"
import kalosMap from "./assets/images/regions/kalosMap.png"
import alohaMap from "./assets/images/regions/alohaMap.png"
import galarMap from "./assets/images/regions/galarMap.png"

const regions: { [key: string]: string } = {
    "Kanto": kantoMap,
    "Johto": johtoMap,
    "Hoenn": hoennMap,
    "Sinnoh": sinnohMap,
    "Unova": unovaMap,
    "Kalos": kalosMap,
    "Aloha": alohaMap,
    "Galar": galarMap
};

enum CurrentPage {
    START_SCREEN,
    REGION_SCREEN,
    GAME_SCREEN,
    END_SCREEN
}

export { CurrentPage, regions };