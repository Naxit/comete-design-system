import { useTheme } from "../styles/useTheme/useTheme";
import { useMediaQuery } from "@mui/material";

/**
 * @title Hook personnalisé pour gérer les breakpoints responsifs de l'application
 * @returns {Object} Un objet contenant chaque breakpoint à utiliser comme des valeurs booléennes
 */
export const useBreakpoints = () => {
  /**
   * @description Récupération des breakpoints du thème
   * @returns {Object} breakpoints - Un objet contenant tous les breakpoints du thème
   */
  const { theme } = useTheme();
  const { breakpoints } = theme;

  /**
   * @description small smartphones and smartwatches (0-359px)
   * @info breakpoints.down('sr') génère : '@media (max-width: 359px)'
   * @info breakpoints.up('sr') génère : '@media (min-width: 360px)'
   * @returns {boolean} isSmallMobile - vrai si écran plus petit ou égal à 359px
   * @returns {boolean} upSmallMobile - vrai si écran plus grand ou égal à 360px
   */
  // const isSmallMobile = useMediaQuery(breakpoints.down("sr"));
  // const upSmallMobile = useMediaQuery(breakpoints.up("sr"));

  /**
   * @description regular smartphones (360-479px)
   * @info breakpoints.down('sd') génère : '@media (max-width: 479px)'
   * @info breakpoints.up('sd') génère : '@media (min-width: 360px)'
   * @returns {boolean} isRegularMobile - vrai si écran plus petit ou égal à 479px
   * @returns {boolean} upRegularMobile - vrai si écran plus grand ou égal à 360px
   */
  // const isRegularMobile = useMediaQuery(breakpoints.down("sd"));
  // const upRegularMobile = useMediaQuery(breakpoints.up("sd"));

  /**
   * @description large smartphones/phablets (480-767px)
   * @info breakpoints.down('sm') génère : '@media (max-width: 767px)'
   * @info breakpoints.up('sm') génère : '@media (min-width: 480px)'
   * @returns {boolean} isLargeMobile - vrai si écran plus petit ou égal à 767px
   * @returns {boolean} upLargeMobile - vrai si écran plus grand ou égal à 480px
   */
  const isLargeMobile = useMediaQuery(breakpoints.down("sm"));
  const upLargeMobile = useMediaQuery(breakpoints.up("sm"));

  /**
   * @description tablets (768-1023px)
   * @info breakpoints.down('md') génère : '@media (max-width: 1023px)'
   * @info breakpoints.up('md') génère : '@media (min-width: 768px)'
   * @returns {boolean} isTablet - vrai si écran plus petit ou égal à 1023px
   * @returns {boolean} upTablet - vrai si écran plus grand ou égal à 768px
   */
  const isTablet = useMediaQuery(breakpoints.down("md"));
  const upTablet = useMediaQuery(breakpoints.up("md"));

  /**
   * @description small laptops (1024-1279px)
   * @info breakpoints.down('lg') génère : '@media (max-width: 1279px)'
   * @info breakpoints.up('lg') génère : '@media (min-width: 1024px)'
   * @returns {boolean} isSmallLaptop - vrai si écran plus petit ou égal à 1279px
   * @returns {boolean} upSmallLaptop - vrai si écran plus grand ou égal à 1024px
   */
  const isSmallLaptop = useMediaQuery(breakpoints.down("lg"));
  const upSmallLaptop = useMediaQuery(breakpoints.up("lg"));

  /**
   * @description large laptops and small desktops (1280-1919px)
   * @info breakpoints.down('xl') génère : '@media (max-width: 1919px)'
   * @info breakpoints.up('xl') génère : '@media (min-width: 1280px)'
   * @returns {boolean} isLargeLaptop - vrai si écran plus petit ou égal à 1919px
   * @returns {boolean} upLargeLaptop - vrai si écran plus grand ou égal à 1280px
   */
  const isLargeLaptop = useMediaQuery(breakpoints.down("xl"));
  const upLargeLaptop = useMediaQuery(breakpoints.up("xl"));

  /**
   * @description large desktops (1920px et plus)
   * @info breakpoints.down('gt') génère : '@media (max-width: 1919px)'
   * @info breakpoints.up('gt') génère : '@media (min-width: 1920px)'
   * @returns {boolean} isGiantDesktop - vrai si écran plus petit ou égal à 1919px
   * @returns {boolean} upGiantDesktop - vrai si écran plus grand ou égal à 1920px
   */
  // const isGiantDesktop = useMediaQuery(breakpoints.down("gt"));
  // const upGiantDesktop = useMediaQuery(breakpoints.up("gt"));

  return {
    // isSmallMobile,
    // isRegularMobile,
    isLargeMobile,
    isTablet,
    isSmallLaptop,
    isLargeLaptop,
    // isGiantDesktop,
    // upSmallMobile,
    // upRegularMobile,
    upLargeMobile,
    upTablet,
    upSmallLaptop,
    upLargeLaptop,
    // upGiantDesktop,
  };
};
