export interface Island {
    id: string;
    name: string;
    nameJp: string;
    coordinates: [number, number];
    group: string;
    description?: string;
    zoom?: number;
}

export const islands: Island[] = [
    {
        id: "aogashima",
        name: "Aogashima",
        nameJp: "青ヶ島",
        coordinates: [32.4574, 139.7637],
        group: "Izu Islands",
        description: "Volcanic island with a village inside the crater",
        zoom: 14
    },
    {
        id: "yakushima",
        name: "Yakushima",
        nameJp: "屋久島",
        coordinates: [30.3586, 130.5286],
        group: "Osumi Islands",
        description: "Ancient cedar forests and inspiration for Princess Mononoke",
        zoom: 11
    },
    {
        id: "gunkanjima",
        name: "Gunkanjima",
        nameJp: "軍艦島",
        coordinates: [32.6278, 129.7385],
        group: "Nagasaki Islands",
        description: "Abandoned concrete island, former coal mining facility",
        zoom: 16
    },
    {
        id: "tashirojima",
        name: "Tashirojima",
        nameJp: "田代島",
        coordinates: [38.3008, 141.4239],
        group: "Miyagi Islands",
        description: "Famous cat island with more cats than people",
        zoom: 14
    },
    {
        id: "naoshima",
        name: "Naoshima",
        nameJp: "直島",
        coordinates: [34.4603, 133.9956],
        group: "Art Islands",
        description: "Contemporary art island with famous pumpkin sculpture",
        zoom: 13
    },
    {
        id: "iriomote",
        name: "Iriomote",
        nameJp: "西表島",
        coordinates: [24.4167, 123.7994],
        group: "Yaeyama Islands",
        description: "Jungle island home to the rare Iriomote wildcat",
        zoom: 11
    },
    {
        id: "sado",
        name: "Sado",
        nameJp: "佐渡島",
        coordinates: [38.0157, 138.3687],
        group: "Niigata Islands",
        description: "Historic gold mines and traditional performing arts",
        zoom: 11
    },
    {
        id: "ojika",
        name: "Ojika",
        nameJp: "小値賀島",
        coordinates: [33.1917, 129.0550],
        group: "Goto Islands",
        description: "Preserved traditional Japanese landscape and architecture",
        zoom: 13
    },
    {
        id: "miyajima",
        name: "Miyajima",
        nameJp: "宮島",
        coordinates: [34.2963, 132.3196],
        group: "Inland Sea Islands",
        description: "Famous for its floating torii gate and wild deer",
        zoom: 14
    },
    {
        id: "shimojishima",
        name: "Shimojishima",
        nameJp: "下地島",
        coordinates: [24.8270, 125.1394],
        group: "Miyako Islands",
        description: "Known for its perfect circular airport and blue caves",
        zoom: 13
    },
    {
        id: "hachijojima",
        name: "Hachijojima",
        nameJp: "八丈島",
        coordinates: [33.1147, 139.7967],
        group: "Izu Islands",
        description: "Tropical paradise with hot springs and diving spots",
        zoom: 12
    },
    {
        id: "koshikijima",
        name: "Koshikijima",
        nameJp: "甑島",
        coordinates: [31.8353, 129.8853],
        group: "Kagoshima Islands",
        description: "Three connected islands with dramatic coastal scenery",
        zoom: 12
    },
    {
        id: "ogijima",
        name: "Ogijima",
        nameJp: "男木島",
        coordinates: [34.4147, 134.0094],
        group: "Art Islands",
        description: "Small artistic island with maze-like village streets",
        zoom: 15
    },
    {
        id: "zamami",
        name: "Zamami",
        nameJp: "座間味島",
        coordinates: [26.2280, 127.3030],
        group: "Kerama Islands",
        description: "Famous for whale watching and pristine beaches",
        zoom: 13
    },
    {
        id: "okinoshima",
        name: "Okinoshima",
        nameJp: "沖ノ島",
        coordinates: [34.1833, 130.0667],
        group: "Sacred Islands",
        description: "Sacred island where women are forbidden to enter",
        zoom: 14
    },
    {
        id: "ainoshima",
        name: "Ainoshima",
        nameJp: "相島",
        coordinates: [33.7833, 130.4167],
        group: "Fukuoka Islands",
        description: "Known for its cat population and ancient tombs",
        zoom: 14
    },
    {
        id: "mikurajima",
        name: "Mikurajima",
        nameJp: "御蔵島",
        coordinates: [33.8794, 139.6122],
        group: "Izu Islands",
        description: "Famous for swimming with wild dolphins",
        zoom: 13
    },
    {
        id: "taketomi",
        name: "Taketomi",
        nameJp: "竹富島",
        coordinates: [24.3256, 124.0887],
        group: "Yaeyama Islands",
        description: "Traditional Ryukyu village with star sand beaches",
        zoom: 14
    },
    {
        id: "megijima",
        name: "Megijima",
        nameJp: "女木島",
        coordinates: [34.3889, 134.0139],
        group: "Art Islands",
        description: "Home to legendary ogre caves and art installations",
        zoom: 14
    },
    {
        id: "kuroshima",
        name: "Kuroshima",
        nameJp: "黒島",
        coordinates: [24.2431, 123.9994],
        group: "Yaeyama Islands",
        description: "Flat coral island known for grazing water buffalo",
        zoom: 13
    }
]; 