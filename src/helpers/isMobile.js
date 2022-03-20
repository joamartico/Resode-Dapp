import { isPlatform } from "@ionic/react";

export const isMobile  = window.innerWidth < 800;

export const isIos = () => isPlatform('ios');