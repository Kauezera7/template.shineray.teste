const productsData = [
    {
        id: 1,
        slug: "urban-150-efi",
        name: "Shineray Urban 150 EFI",
        price: "R$ 13.990,00",
        color: "preto",
        mainImage: "img/URBAN-150-EFI.webp",
        thumbnails: ["img/URBAN-150-EFI.webp", "img/Storm.webp", "img/Denver.webp"],
        specifications: {
            "Cilindrada": "150 cc",
            "Potência": "12.9 cv",
            "Câmbio": "Automático CVT",
            "Partida": "Elétrica e Pedal",
            "Tanque": "5,5 Litros",
            "Freios": "Disco Hidráulico (Dianteiro e Traseiro)",
            "Rodas": "Liga Leve Aro 13"
        }
    },
    {
        id: 2,
        slug: "storm-125",
        name: "Shineray Storm",
        price: "R$ 11.490,00",
        color: "vermelho",
        mainImage: "img/Storm.webp",
        thumbnails: ["img/Storm.webp", "img/URBAN-150-EFI.webp"],
        specifications: {
            "Cilindrada": "125 cc",
            "Potência": "10 cv",
            "Câmbio": "4 Marchas",
            "Partida": "Elétrica e Pedal",
            "Tanque": "4,5 Litros",
            "Freios": "Disco (Dianteiro) / Tambor (Traseiro)",
            "Rodas": "Raiada (Aro 17/14)"
        }
    },
    {
        id: 3,
        slug: "denver-125",
        name: "Shineray Denver",
        price: "R$ 9.990,00",
        color: "azul",
        mainImage: "img/Denver.webp",
        thumbnails: ["img/Denver.webp", "img/URBAN-150-EFI.webp", "img/Storm.webp"],
        specifications: {
            "Cilindrada": "125 cc",
            "Potência": "9.5 cv",
            "Câmbio": "4 Marchas",
            "Partida": "Elétrica e Pedal",
            "Tanque": "4 Litros",
            "Freios": "Disco (Dianteiro) / Tambor (Traseiro)",
            "Rodas": "Liga Leve (Aro 17/14)"
        }
    },
    {
        id: 4,
        slug: "shi-250f",
        name: "Shineray SHI 250F",
        price: "R$ 15.990,00",
        color: "preto",
        mainImage: "img/250F.webp",
        thumbnails: ["img/250F.webp", "img/Storm.webp", "img/Denver.webp"],
        specifications: {
            "Cilindrada": "250 cc",
            "Potência": "24 cv",
            "Câmbio": "6 Marchas",
            "Partida": "Elétrica",
            "Tanque": "12 Litros",
            "Freios": "Disco Wave Hidráulico (Ambos)",
            "Rodas": "Raiada Off-Road (Aro 21/18)"
        }
    },
    {
        id: 5,
        slug: "urban-150-special",
        name: "Urban 150 Special",
        price: "R$ 14.490,00",
        color: "vermelho",
        mainImage: "img/URBAN-150-EFI.webp",
        thumbnails: ["img/URBAN-150-EFI.webp", "img/250F.webp"],
        specifications: {
            "Cilindrada": "150 cc",
            "Potência": "13 cv",
            "Câmbio": "Automático CVT",
            "Partida": "Elétrica",
            "Tanque": "6 Litros",
            "Freios": "Disco ABS (Dianteiro) / Disco (Traseiro)",
            "Rodas": "Liga Leve Aro 13"
        }
    },
    {
        id: 6,
        slug: "storm-power-150",
        name: "Storm Power",
        price: "R$ 12.000,00",
        color: "cinza",
        mainImage: "img/Storm.webp",
        thumbnails: ["img/Storm.webp"],
        specifications: {
            "Cilindrada": "150 cc",
            "Potência": "12 cv",
            "Câmbio": "5 Marchas",
            "Partida": "Elétrica e Pedal",
            "Tanque": "5 Litros",
            "Freios": "Disco (Dianteiro) / Tambor (Traseiro)",
            "Rodas": "Liga Leve Aro 18"
        }
    },
    {
        id: 7,
        slug: "denver-sport-125",
        name: "Denver Sport",
        price: "R$ 10.500,00",
        color: "azul",
        mainImage: "img/Denver.webp",
        thumbnails: ["img/Denver.webp", "img/URBAN-150-EFI.webp"],
        specifications: {
            "Cilindrada": "125 cc",
            "Potência": "10 cv",
            "Câmbio": "4 Marchas Rotativo",
            "Partida": "Elétrica e Pedal",
            "Tanque": "4 Litros",
            "Freios": "Disco (Dianteiro) / Tambor (Traseiro)",
            "Rodas": "Liga Leve (Aro 17/14)"
        }
    },
    {
        id: 8,
        slug: "shi-250f-pro",
        name: "SHI 250F Pro",
        price: "R$ 16.990,00",
        color: "cinza",
        mainImage: "img/250F.webp",
        thumbnails: ["img/250F.webp", "img/Storm.webp"],
        specifications: {
            "Cilindrada": "250 cc",
            "Potência": "26 cv",
            "Câmbio": "6 Marchas",
            "Partida": "Elétrica",
            "Tanque": "12,5 Litros",
            "Freios": "Disco Wave Duplo (Dianteiro)",
            "Rodas": "Alumínio (Aro 21/18)"
        }
    },
    {
        id: 9,
        slug: "urban-edition-150",
        name: "Urban Edition",
        price: "R$ 14.990,00",
        color: "preto",
        mainImage: "img/URBAN-150-EFI.webp",
        thumbnails: ["img/URBAN-150-EFI.webp", "img/Denver.webp"],
        specifications: {
            "Cilindrada": "150 cc",
            "Potência": "13.5 cv",
            "Câmbio": "Automático CVT",
            "Partida": "Elétrica",
            "Tanque": "6 Litros",
            "Freios": "Disco ABS (Ambos)",
            "Rodas": "Liga Leve Preta Aro 13"
        }
    },
    {
        id: 10,
        slug: "urban-150-efi",
        name: "Shineray Urban 150 EFI",
        price: "R$ 13.990,00",
        color: "preto",
        mainImage: "img/URBAN-150-EFI.webp",
        thumbnails: ["img/URBAN-150-EFI.webp", "img/Storm.webp", "img/Denver.webp"],
        specifications: {
            "Cilindrada": "150 cc",
            "Potência": "12.9 cv",
            "Câmbio": "Automático CVT",
            "Partida": "Elétrica e Pedal",
            "Tanque": "5,5 Litros",
            "Freios": "Disco Hidráulico (Dianteiro e Traseiro)",
            "Rodas": "Liga Leve Aro 13"
        }
    }
];