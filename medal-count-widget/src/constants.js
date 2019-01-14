export const MEDAL_LIST_ENDPOINT =
    "https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json";
export const FLAG_ORDER = [
    "AUT",
    "BLR",
    "CAN",
    "CHN",
    "FRA",
    "GER",
    "ITA",
    "NED",
    "NOR",
    "RUS",
    "SUI",
    "SWE",
    "USA"
];

/**
 * Sort medals by gold, using silver as tiebreaker
 * @param  {Object} a - First input for sort function
 * @param  {Object} b - Second input for sort function
 */
export const goldSort = (a, b) =>
    b.gold - a.gold === 0 ? b.silver - a.silver : b.gold - a.gold;

/**
 * Sort medals by silver, using gold as tiebreaker
 * @param  {Object} a - First input for sort function
 * @param  {Object} b - Second input for sort function
 */
export const silverSort = (a, b) =>
    b.silver - a.silver === 0 ? b.gold - a.gold : b.silver - a.silver;

/**
 * Sort medals by bronze, using gold as tiebreaker
 * @param  {Object} a - First input for sort function
 * @param  {Object} b - Second input for sort function
 */
export const bronzeSort = (a, b) =>
    b.bronze - a.bronze === 0 ? b.gold - a.gold : b.bronze - a.bronze;

/**
 * Sort medals by total, using gold as tiebreaker
 * @param  {Object} a - First input for sort function
 * @param  {Object} b - Second input for sort function
 */
export const totalSort = (a, b) =>
    b.total - a.total === 0 ? b.gold - a.gold : b.total - a.total;

export const sortMethods = {
    gold: goldSort,
    silver: silverSort,
    bronze: bronzeSort,
    total: totalSort
};
