import images from "@/constants/images";

export const commonPlants = [
    {
        id: "1",
        name: "Tomate",
        scientificName: "Solanum lycopersicum",
        imageUrl: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9tYXRlfGVufDB8fDB8fHww",
    },
    {
        id: "2",
        name: "Pomme de terre",
        scientificName: "'Tache brune",
        imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1000",

    },
    {
        id: "3",
        name: "Mais",
        scientificName: "Rosa",
        imageUrl: "https://plus.unsplash.com/premium_photo-1667047165840-803e47970128?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFpc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: "4",
        name: "Manioc",
        scientificName: "Solanum tuberosum",
        imageUrl: "https://plus.unsplash.com/premium_photo-1725467479101-556af13a7220?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "5",
        name: "Manioc",
        scientificName: "Cucumis sativus",
        imageUrl: "https://unsplash.com/photos/a-pile-of-cut-up-wood-sitting-on-top-of-leaves-eovOCWSB9oM",
    },
];

export const commonDiseases = [
    {
        id: "1",
        name: "Mildiou",
        affectedPlants: ["Tomate", "Pomme de terre"],
        symptoms: "Taches sombres et imbibées d'eau sur les feuilles, qui s'agrandissent rapidement pour former des zones brun-violet à l’aspect huileux.",
    },
    {
        id: "2",
        name: "Oïdium",
        affectedPlants: ["Concombre", "Courge", "Rose"],
        symptoms: "Taches poudreuses blanches sur les feuilles et les tiges, finissant par recouvrir toute la surface.",
    },
    {
        id: "3",
        name: "Tavelure du pommier",
        affectedPlants: ["Pommier"],
        symptoms: "Taches allant du vert olive au brun sur les feuilles et lésions croûteuses sombres sur les fruits.",
    },
    {
        id: "4",
        name: "Tache noire",
        affectedPlants: ["Rose"],
        symptoms: "Taches noires à bords irréguliers sur les feuilles, provoquant souvent un jaunissement et la chute des feuilles.",
    },
    {
        id: "5",
        name: "Rouille des feuilles",
        affectedPlants: ["Blé", "Café", "Haricot"],
        symptoms: "Petites pustules de couleur rouille-orange à brun-rouge sur la surface des feuilles.",
    }
];
