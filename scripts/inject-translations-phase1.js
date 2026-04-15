#!/usr/bin/env node
/**
 * Phase 1A+1B+1C: Menu Categories, Allergens, Additives, Menu Notes
 * Injects professional-grade translations across all 23 non-DE/EN locales.
 */
const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'locales');

// ============================================================================
// PHASE 1A: MENU CATEGORIES (11 keys × 23 languages)
// ============================================================================
const menuCategories = {
  fr: {
    'category.suppen': 'Soupes', 'category.vorspeisen': 'Entrées', 'category.salate': 'Salades',
    'category.pasta': 'Pâtes', 'category.ueberbackenes': 'Gratins', 'category.hausgemacht': 'Pâtes maison',
    'category.schnitzel': 'Escalopes panées', 'category.fleisch': 'Plats de viande',
    'category.kinder': 'Menu enfant', 'category.pizza': 'Pizza', 'category.familienpizza': 'Pizza familiale',
    'category_label.suppen': 'Soupes', 'category_label.vorspeisen': 'Entrées', 'category_label.salate': 'Salades',
    'category_label.pasta': 'Pâtes', 'category_label.ueberbackenes': 'Gratins', 'category_label.hausgemacht': 'Pâtes maison',
    'category_label.schnitzel': 'Escalopes panées', 'category_label.fleisch': 'Plats de viande',
    'category_label.kinder': 'Menu enfant', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Pizza familiale',
  },
  es: {
    'category.suppen': 'Sopas', 'category.vorspeisen': 'Entrantes', 'category.salate': 'Ensaladas',
    'category.pasta': 'Pasta', 'category.ueberbackenes': 'Gratinados', 'category.hausgemacht': 'Pasta casera',
    'category.schnitzel': 'Escalopes', 'category.fleisch': 'Platos de carne',
    'category.kinder': 'Menú infantil', 'category.pizza': 'Pizza', 'category.familienpizza': 'Pizza familiar',
    'category_label.suppen': 'Sopas', 'category_label.vorspeisen': 'Entrantes', 'category_label.salate': 'Ensaladas',
    'category_label.pasta': 'Pasta', 'category_label.ueberbackenes': 'Gratinados', 'category_label.hausgemacht': 'Pasta casera',
    'category_label.schnitzel': 'Escalopes', 'category_label.fleisch': 'Platos de carne',
    'category_label.kinder': 'Menú infantil', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Pizza familiar',
  },
  pt: {
    'category.suppen': 'Sopas', 'category.vorspeisen': 'Entradas', 'category.salate': 'Saladas',
    'category.pasta': 'Massa', 'category.ueberbackenes': 'Gratinados', 'category.hausgemacht': 'Massa caseira',
    'category.schnitzel': 'Schnitzels', 'category.fleisch': 'Pratos de carne',
    'category.kinder': 'Menu infantil', 'category.pizza': 'Pizza', 'category.familienpizza': 'Pizza familiar',
    'category_label.suppen': 'Sopas', 'category_label.vorspeisen': 'Entradas', 'category_label.salate': 'Saladas',
    'category_label.pasta': 'Massa', 'category_label.ueberbackenes': 'Gratinados', 'category_label.hausgemacht': 'Massa caseira',
    'category_label.schnitzel': 'Schnitzels', 'category_label.fleisch': 'Pratos de carne',
    'category_label.kinder': 'Menu infantil', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Pizza familiar',
  },
  it: {
    'category.suppen': 'Zuppe', 'category.vorspeisen': 'Antipasti', 'category.salate': 'Insalate',
    'category.pasta': 'Pasta', 'category.ueberbackenes': 'Gratinati al forno', 'category.hausgemacht': 'Pasta fatta in casa',
    'category.schnitzel': 'Cotolette', 'category.fleisch': 'Piatti di carne',
    'category.kinder': 'Menu bambini', 'category.pizza': 'Pizza', 'category.familienpizza': 'Pizza famiglia',
    'category_label.suppen': 'Zuppe', 'category_label.vorspeisen': 'Antipasti', 'category_label.salate': 'Insalate',
    'category_label.pasta': 'Pasta', 'category_label.ueberbackenes': 'Gratinati al forno', 'category_label.hausgemacht': 'Pasta fatta in casa',
    'category_label.schnitzel': 'Cotolette', 'category_label.fleisch': 'Piatti di carne',
    'category_label.kinder': 'Menu bambini', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Pizza famiglia',
  },
  ro: {
    'category.suppen': 'Supe', 'category.vorspeisen': 'Aperitive', 'category.salate': 'Salate',
    'category.pasta': 'Paste', 'category.ueberbackenes': 'Gratinate', 'category.hausgemacht': 'Paste de casă',
    'category.schnitzel': 'Șnițele', 'category.fleisch': 'Preparate din carne',
    'category.kinder': 'Meniu copii', 'category.pizza': 'Pizza', 'category.familienpizza': 'Pizza de familie',
    'category_label.suppen': 'Supe', 'category_label.vorspeisen': 'Aperitive', 'category_label.salate': 'Salate',
    'category_label.pasta': 'Paste', 'category_label.ueberbackenes': 'Gratinate', 'category_label.hausgemacht': 'Paste de casă',
    'category_label.schnitzel': 'Șnițele', 'category_label.fleisch': 'Preparate din carne',
    'category_label.kinder': 'Meniu copii', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Pizza de familie',
  },
  nl: {
    'category.suppen': 'Soepen', 'category.vorspeisen': 'Voorgerechten', 'category.salate': 'Salades',
    'category.pasta': 'Pasta', 'category.ueberbackenes': 'Ovenschotels', 'category.hausgemacht': 'Huisgemaakte pasta',
    'category.schnitzel': 'Schnitzels', 'category.fleisch': 'Vleesgerechten',
    'category.kinder': 'Kindermenu', 'category.pizza': 'Pizza', 'category.familienpizza': 'Familiepizza',
    'category_label.suppen': 'Soepen', 'category_label.vorspeisen': 'Voorgerechten', 'category_label.salate': 'Salades',
    'category_label.pasta': 'Pasta', 'category_label.ueberbackenes': 'Ovenschotels', 'category_label.hausgemacht': 'Huisgemaakte pasta',
    'category_label.schnitzel': 'Schnitzels', 'category_label.fleisch': 'Vleesgerechten',
    'category_label.kinder': 'Kindermenu', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Familiepizza',
  },
  sv: {
    'category.suppen': 'Soppor', 'category.vorspeisen': 'Förrätter', 'category.salate': 'Sallader',
    'category.pasta': 'Pasta', 'category.ueberbackenes': 'Gratänger', 'category.hausgemacht': 'Hemlagad pasta',
    'category.schnitzel': 'Schnitzel', 'category.fleisch': 'Kötträtter',
    'category.kinder': 'Barnmeny', 'category.pizza': 'Pizza', 'category.familienpizza': 'Familjepizza',
    'category_label.suppen': 'Soppor', 'category_label.vorspeisen': 'Förrätter', 'category_label.salate': 'Sallader',
    'category_label.pasta': 'Pasta', 'category_label.ueberbackenes': 'Gratänger', 'category_label.hausgemacht': 'Hemlagad pasta',
    'category_label.schnitzel': 'Schnitzel', 'category_label.fleisch': 'Kötträtter',
    'category_label.kinder': 'Barnmeny', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Familjepizza',
  },
  no: {
    'category.suppen': 'Supper', 'category.vorspeisen': 'Forretter', 'category.salate': 'Salater',
    'category.pasta': 'Pasta', 'category.ueberbackenes': 'Gratenger', 'category.hausgemacht': 'Hjemmelaget pasta',
    'category.schnitzel': 'Schnitzel', 'category.fleisch': 'Kjøttretter',
    'category.kinder': 'Barnemeny', 'category.pizza': 'Pizza', 'category.familienpizza': 'Familiepizza',
    'category_label.suppen': 'Supper', 'category_label.vorspeisen': 'Forretter', 'category_label.salate': 'Salater',
    'category_label.pasta': 'Pasta', 'category_label.ueberbackenes': 'Gratenger', 'category_label.hausgemacht': 'Hjemmelaget pasta',
    'category_label.schnitzel': 'Schnitzel', 'category_label.fleisch': 'Kjøttretter',
    'category_label.kinder': 'Barnemeny', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Familiepizza',
  },
  da: {
    'category.suppen': 'Supper', 'category.vorspeisen': 'Forretter', 'category.salate': 'Salater',
    'category.pasta': 'Pasta', 'category.ueberbackenes': 'Gratiner', 'category.hausgemacht': 'Hjemmelavet pasta',
    'category.schnitzel': 'Schnitzel', 'category.fleisch': 'Kødretter',
    'category.kinder': 'Børnemenu', 'category.pizza': 'Pizza', 'category.familienpizza': 'Familiepizza',
    'category_label.suppen': 'Supper', 'category_label.vorspeisen': 'Forretter', 'category_label.salate': 'Salater',
    'category_label.pasta': 'Pasta', 'category_label.ueberbackenes': 'Gratiner', 'category_label.hausgemacht': 'Hjemmelavet pasta',
    'category_label.schnitzel': 'Schnitzel', 'category_label.fleisch': 'Kødretter',
    'category_label.kinder': 'Børnemenu', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Familiepizza',
  },
  fi: {
    'category.suppen': 'Keitot', 'category.vorspeisen': 'Alkupalat', 'category.salate': 'Salaatit',
    'category.pasta': 'Pasta', 'category.ueberbackenes': 'Uuniruoat', 'category.hausgemacht': 'Kotitekoinen pasta',
    'category.schnitzel': 'Leikkeet', 'category.fleisch': 'Liharuoat',
    'category.kinder': 'Lasten menu', 'category.pizza': 'Pizza', 'category.familienpizza': 'Perhepizza',
    'category_label.suppen': 'Keitot', 'category_label.vorspeisen': 'Alkupalat', 'category_label.salate': 'Salaatit',
    'category_label.pasta': 'Pasta', 'category_label.ueberbackenes': 'Uuniruoat', 'category_label.hausgemacht': 'Kotitekoinen pasta',
    'category_label.schnitzel': 'Leikkeet', 'category_label.fleisch': 'Liharuoat',
    'category_label.kinder': 'Lasten menu', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Perhepizza',
  },
  pl: {
    'category.suppen': 'Zupy', 'category.vorspeisen': 'Przystawki', 'category.salate': 'Sałatki',
    'category.pasta': 'Makaron', 'category.ueberbackenes': 'Zapiekanki', 'category.hausgemacht': 'Makaron domowy',
    'category.schnitzel': 'Sznycel', 'category.fleisch': 'Dania mięsne',
    'category.kinder': 'Menu dziecięce', 'category.pizza': 'Pizza', 'category.familienpizza': 'Pizza rodzinna',
    'category_label.suppen': 'Zupy', 'category_label.vorspeisen': 'Przystawki', 'category_label.salate': 'Sałatki',
    'category_label.pasta': 'Makaron', 'category_label.ueberbackenes': 'Zapiekanki', 'category_label.hausgemacht': 'Makaron domowy',
    'category_label.schnitzel': 'Sznycel', 'category_label.fleisch': 'Dania mięsne',
    'category_label.kinder': 'Menu dziecięce', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Pizza rodzinna',
  },
  cs: {
    'category.suppen': 'Polévky', 'category.vorspeisen': 'Předkrmy', 'category.salate': 'Saláty',
    'category.pasta': 'Těstoviny', 'category.ueberbackenes': 'Zapečená jídla', 'category.hausgemacht': 'Domácí těstoviny',
    'category.schnitzel': 'Řízky', 'category.fleisch': 'Masová jídla',
    'category.kinder': 'Dětské menu', 'category.pizza': 'Pizza', 'category.familienpizza': 'Rodinná pizza',
    'category_label.suppen': 'Polévky', 'category_label.vorspeisen': 'Předkrmy', 'category_label.salate': 'Saláty',
    'category_label.pasta': 'Těstoviny', 'category_label.ueberbackenes': 'Zapečená jídla', 'category_label.hausgemacht': 'Domácí těstoviny',
    'category_label.schnitzel': 'Řízky', 'category_label.fleisch': 'Masová jídla',
    'category_label.kinder': 'Dětské menu', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Rodinná pizza',
  },
  hr: {
    'category.suppen': 'Juhe', 'category.vorspeisen': 'Predjela', 'category.salate': 'Salate',
    'category.pasta': 'Tjestenina', 'category.ueberbackenes': 'Gratinirani', 'category.hausgemacht': 'Domaća tjestenina',
    'category.schnitzel': 'Šnicle', 'category.fleisch': 'Mesna jela',
    'category.kinder': 'Dječji meni', 'category.pizza': 'Pizza', 'category.familienpizza': 'Obiteljska pizza',
    'category_label.suppen': 'Juhe', 'category_label.vorspeisen': 'Predjela', 'category_label.salate': 'Salate',
    'category_label.pasta': 'Tjestenina', 'category_label.ueberbackenes': 'Gratinirani', 'category_label.hausgemacht': 'Domaća tjestenina',
    'category_label.schnitzel': 'Šnicle', 'category_label.fleisch': 'Mesna jela',
    'category_label.kinder': 'Dječji meni', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Obiteljska pizza',
  },
  uk: {
    'category.suppen': 'Супи', 'category.vorspeisen': 'Закуски', 'category.salate': 'Салати',
    'category.pasta': 'Паста', 'category.ueberbackenes': 'Запечені страви', 'category.hausgemacht': 'Домашня паста',
    'category.schnitzel': 'Шніцелі', 'category.fleisch': "М'ясні страви",
    'category.kinder': 'Дитяче меню', 'category.pizza': 'Піца', 'category.familienpizza': 'Сімейна піца',
    'category_label.suppen': 'Супи', 'category_label.vorspeisen': 'Закуски', 'category_label.salate': 'Салати',
    'category_label.pasta': 'Паста', 'category_label.ueberbackenes': 'Запечені страви', 'category_label.hausgemacht': 'Домашня паста',
    'category_label.schnitzel': 'Шніцелі', 'category_label.fleisch': "М'ясні страви",
    'category_label.kinder': 'Дитяче меню', 'category_label.pizza': 'Піца', 'category_label.familienpizza': 'Сімейна піца',
  },
  ru: {
    'category.suppen': 'Супы', 'category.vorspeisen': 'Закуски', 'category.salate': 'Салаты',
    'category.pasta': 'Паста', 'category.ueberbackenes': 'Запечённые блюда', 'category.hausgemacht': 'Домашняя паста',
    'category.schnitzel': 'Шницели', 'category.fleisch': 'Мясные блюда',
    'category.kinder': 'Детское меню', 'category.pizza': 'Пицца', 'category.familienpizza': 'Семейная пицца',
    'category_label.suppen': 'Супы', 'category_label.vorspeisen': 'Закуски', 'category_label.salate': 'Салаты',
    'category_label.pasta': 'Паста', 'category_label.ueberbackenes': 'Запечённые блюда', 'category_label.hausgemacht': 'Домашняя паста',
    'category_label.schnitzel': 'Шницели', 'category_label.fleisch': 'Мясные блюда',
    'category_label.kinder': 'Детское меню', 'category_label.pizza': 'Пицца', 'category_label.familienpizza': 'Семейная пицца',
  },
  tr: {
    'category.suppen': 'Çorbalar', 'category.vorspeisen': 'Başlangıçlar', 'category.salate': 'Salatalar',
    'category.pasta': 'Makarna', 'category.ueberbackenes': 'Fırın Yemekleri', 'category.hausgemacht': 'Ev Yapımı Makarna',
    'category.schnitzel': 'Şnitzel Çeşitleri', 'category.fleisch': 'Et Yemekleri',
    'category.kinder': 'Çocuk Menüsü', 'category.pizza': 'Pizza', 'category.familienpizza': 'Aile Pizzası',
    'category_label.suppen': 'Çorbalar', 'category_label.vorspeisen': 'Başlangıçlar', 'category_label.salate': 'Salatalar',
    'category_label.pasta': 'Makarna', 'category_label.ueberbackenes': 'Fırın Yemekleri', 'category_label.hausgemacht': 'Ev Yapımı Makarna',
    'category_label.schnitzel': 'Şnitzel Çeşitleri', 'category_label.fleisch': 'Et Yemekleri',
    'category_label.kinder': 'Çocuk Menüsü', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Aile Pizzası',
  },
  ar: {
    'category.suppen': 'شوربات', 'category.vorspeisen': 'مقبلات', 'category.salate': 'سلطات',
    'category.pasta': 'باستا', 'category.ueberbackenes': 'أطباق الفرن', 'category.hausgemacht': 'باستا منزلية',
    'category.schnitzel': 'شنيتسل', 'category.fleisch': 'أطباق اللحوم',
    'category.kinder': 'قائمة الأطفال', 'category.pizza': 'بيتزا', 'category.familienpizza': 'بيتزا عائلية',
    'category_label.suppen': 'شوربات', 'category_label.vorspeisen': 'مقبلات', 'category_label.salate': 'سلطات',
    'category_label.pasta': 'باستا', 'category_label.ueberbackenes': 'أطباق الفرن', 'category_label.hausgemacht': 'باستا منزلية',
    'category_label.schnitzel': 'شنيتسل', 'category_label.fleisch': 'أطباق اللحوم',
    'category_label.kinder': 'قائمة الأطفال', 'category_label.pizza': 'بيتزا', 'category_label.familienpizza': 'بيتزا عائلية',
  },
  ja: {
    'category.suppen': 'スープ', 'category.vorspeisen': '前菜', 'category.salate': 'サラダ',
    'category.pasta': 'パスタ', 'category.ueberbackenes': 'オーブン焼き', 'category.hausgemacht': '手打ちパスタ',
    'category.schnitzel': 'シュニッツェル', 'category.fleisch': '肉料理',
    'category.kinder': 'お子様メニュー', 'category.pizza': 'ピッツァ', 'category.familienpizza': 'ファミリーピッツァ',
    'category_label.suppen': 'スープ', 'category_label.vorspeisen': '前菜', 'category_label.salate': 'サラダ',
    'category_label.pasta': 'パスタ', 'category_label.ueberbackenes': 'オーブン焼き', 'category_label.hausgemacht': '手打ちパスタ',
    'category_label.schnitzel': 'シュニッツェル', 'category_label.fleisch': '肉料理',
    'category_label.kinder': 'お子様メニュー', 'category_label.pizza': 'ピッツァ', 'category_label.familienpizza': 'ファミリーピッツァ',
  },
  zh: {
    'category.suppen': '汤类', 'category.vorspeisen': '开胃菜', 'category.salate': '沙拉',
    'category.pasta': '意面', 'category.ueberbackenes': '焗烤菜品', 'category.hausgemacht': '手工意面',
    'category.schnitzel': '炸肉排', 'category.fleisch': '肉类菜品',
    'category.kinder': '儿童菜单', 'category.pizza': '比萨', 'category.familienpizza': '家庭比萨',
    'category_label.suppen': '汤类', 'category_label.vorspeisen': '开胃菜', 'category_label.salate': '沙拉',
    'category_label.pasta': '意面', 'category_label.ueberbackenes': '焗烤菜品', 'category_label.hausgemacht': '手工意面',
    'category_label.schnitzel': '炸肉排', 'category_label.fleisch': '肉类菜品',
    'category_label.kinder': '儿童菜单', 'category_label.pizza': '比萨', 'category_label.familienpizza': '家庭比萨',
  },
  ko: {
    'category.suppen': '수프', 'category.vorspeisen': '전채요리', 'category.salate': '샐러드',
    'category.pasta': '파스타', 'category.ueberbackenes': '오븐요리', 'category.hausgemacht': '수제 파스타',
    'category.schnitzel': '슈니첼', 'category.fleisch': '육류요리',
    'category.kinder': '어린이 메뉴', 'category.pizza': '피자', 'category.familienpizza': '패밀리 피자',
    'category_label.suppen': '수프', 'category_label.vorspeisen': '전채요리', 'category_label.salate': '샐러드',
    'category_label.pasta': '파스타', 'category_label.ueberbackenes': '오븐요리', 'category_label.hausgemacht': '수제 파스타',
    'category_label.schnitzel': '슈니첼', 'category_label.fleisch': '육류요리',
    'category_label.kinder': '어린이 메뉴', 'category_label.pizza': '피자', 'category_label.familienpizza': '패밀리 피자',
  },
  hi: {
    'category.suppen': 'सूप', 'category.vorspeisen': 'स्टार्टर', 'category.salate': 'सलाद',
    'category.pasta': 'पास्ता', 'category.ueberbackenes': 'ओवन व्यंजन', 'category.hausgemacht': 'घर की बनी पास्ता',
    'category.schnitzel': 'श्नित्ज़ेल', 'category.fleisch': 'मांस व्यंजन',
    'category.kinder': 'बच्चों का मेनू', 'category.pizza': 'पिज़्ज़ा', 'category.familienpizza': 'फ़ैमिली पिज़्ज़ा',
    'category_label.suppen': 'सूप', 'category_label.vorspeisen': 'स्टार्टर', 'category_label.salate': 'सलाद',
    'category_label.pasta': 'पास्ता', 'category_label.ueberbackenes': 'ओवन व्यंजन', 'category_label.hausgemacht': 'घर की बनी पास्ता',
    'category_label.schnitzel': 'श्नित्ज़ेल', 'category_label.fleisch': 'मांस व्यंजन',
    'category_label.kinder': 'बच्चों का मेनू', 'category_label.pizza': 'पिज़्ज़ा', 'category_label.familienpizza': 'फ़ैमिली पिज़्ज़ा',
  },
  el: {
    'category.suppen': 'Σούπες', 'category.vorspeisen': 'Ορεκτικά', 'category.salate': 'Σαλάτες',
    'category.pasta': 'Ζυμαρικά', 'category.ueberbackenes': 'Γκρατέν', 'category.hausgemacht': 'Σπιτικά ζυμαρικά',
    'category.schnitzel': 'Σνίτσελ', 'category.fleisch': 'Κρεατικά',
    'category.kinder': 'Παιδικό μενού', 'category.pizza': 'Πίτσα', 'category.familienpizza': 'Οικογενειακή πίτσα',
    'category_label.suppen': 'Σούπες', 'category_label.vorspeisen': 'Ορεκτικά', 'category_label.salate': 'Σαλάτες',
    'category_label.pasta': 'Ζυμαρικά', 'category_label.ueberbackenes': 'Γκρατέν', 'category_label.hausgemacht': 'Σπιτικά ζυμαρικά',
    'category_label.schnitzel': 'Σνίτσελ', 'category_label.fleisch': 'Κρεατικά',
    'category_label.kinder': 'Παιδικό μενού', 'category_label.pizza': 'Πίτσα', 'category_label.familienpizza': 'Οικογενειακή πίτσα',
  },
  hu: {
    'category.suppen': 'Levesek', 'category.vorspeisen': 'Előételek', 'category.salate': 'Saláták',
    'category.pasta': 'Tészta', 'category.ueberbackenes': 'Sült ételek', 'category.hausgemacht': 'Házi tészta',
    'category.schnitzel': 'Rántott szelet', 'category.fleisch': 'Húsételek',
    'category.kinder': 'Gyermekmenü', 'category.pizza': 'Pizza', 'category.familienpizza': 'Családi pizza',
    'category_label.suppen': 'Levesek', 'category_label.vorspeisen': 'Előételek', 'category_label.salate': 'Saláták',
    'category_label.pasta': 'Tészta', 'category_label.ueberbackenes': 'Sült ételek', 'category_label.hausgemacht': 'Házi tészta',
    'category_label.schnitzel': 'Rántott szelet', 'category_label.fleisch': 'Húsételek',
    'category_label.kinder': 'Gyermekmenü', 'category_label.pizza': 'Pizza', 'category_label.familienpizza': 'Családi pizza',
  },
};

// ============================================================================
// PHASE 1B: ALLERGENS (14 keys × 23 languages) - EU Regulation 1169/2011
// ============================================================================
const allergens = {
  fr: { 'allergen.A': 'Céréales contenant du gluten', 'allergen.B': 'Crustacés', 'allergen.C': 'Œufs', 'allergen.D': 'Poissons', 'allergen.E': 'Arachides', 'allergen.F': 'Soja', 'allergen.G': 'Lait', 'allergen.H': 'Fruits à coque', 'allergen.I': 'Céleri', 'allergen.K': 'Moutarde', 'allergen.M': 'Sésame', 'allergen.O': 'Sulfites', 'allergen.P': 'Lupins', 'allergen.title': 'Allergènes', 'allergen.notice': 'Veuillez informer notre personnel de vos allergies.' },
  es: { 'allergen.A': 'Cereales con gluten', 'allergen.B': 'Crustáceos', 'allergen.C': 'Huevos', 'allergen.D': 'Pescado', 'allergen.E': 'Cacahuetes', 'allergen.F': 'Soja', 'allergen.G': 'Leche', 'allergen.H': 'Frutos de cáscara', 'allergen.I': 'Apio', 'allergen.K': 'Mostaza', 'allergen.M': 'Sésamo', 'allergen.O': 'Sulfitos', 'allergen.P': 'Altramuces', 'allergen.title': 'Alérgenos', 'allergen.notice': 'Por favor, informe a nuestro personal de sus alergias.' },
  pt: { 'allergen.A': 'Cereais com glúten', 'allergen.B': 'Crustáceos', 'allergen.C': 'Ovos', 'allergen.D': 'Peixe', 'allergen.E': 'Amendoins', 'allergen.F': 'Soja', 'allergen.G': 'Leite', 'allergen.H': 'Frutos de casca rija', 'allergen.I': 'Aipo', 'allergen.K': 'Mostarda', 'allergen.M': 'Sésamo', 'allergen.O': 'Sulfitos', 'allergen.P': 'Tremoços', 'allergen.title': 'Alergénios', 'allergen.notice': 'Por favor, informe a equipa sobre as suas alergias.' },
  it: { 'allergen.A': 'Cereali contenenti glutine', 'allergen.B': 'Crostacei', 'allergen.C': 'Uova', 'allergen.D': 'Pesce', 'allergen.E': 'Arachidi', 'allergen.F': 'Soia', 'allergen.G': 'Latte', 'allergen.H': 'Frutta a guscio', 'allergen.I': 'Sedano', 'allergen.K': 'Senape', 'allergen.M': 'Sesamo', 'allergen.O': 'Solfiti', 'allergen.P': 'Lupini', 'allergen.title': 'Allergeni', 'allergen.notice': 'Si prega di informare il personale delle proprie allergie.' },
  ro: { 'allergen.A': 'Cereale cu gluten', 'allergen.B': 'Crustacee', 'allergen.C': 'Ouă', 'allergen.D': 'Pește', 'allergen.E': 'Arahide', 'allergen.F': 'Soia', 'allergen.G': 'Lapte', 'allergen.H': 'Fructe cu coajă', 'allergen.I': 'Țelină', 'allergen.K': 'Muștar', 'allergen.M': 'Susan', 'allergen.O': 'Sulfiți', 'allergen.P': 'Lupin', 'allergen.title': 'Alergeni', 'allergen.notice': 'Vă rugăm să informați personalul despre alergiile dumneavoastră.' },
  nl: { 'allergen.A': 'Glutenbevattende granen', 'allergen.B': 'Schaaldieren', 'allergen.C': 'Eieren', 'allergen.D': 'Vis', 'allergen.E': 'Pinda\'s', 'allergen.F': 'Soja', 'allergen.G': 'Melk', 'allergen.H': 'Noten', 'allergen.I': 'Selderij', 'allergen.K': 'Mosterd', 'allergen.M': 'Sesamzaad', 'allergen.O': 'Sulfieten', 'allergen.P': 'Lupine', 'allergen.title': 'Allergenen', 'allergen.notice': 'Gelieve ons personeel te informeren over uw allergieën.' },
  sv: { 'allergen.A': 'Gluteninnehållande spannmål', 'allergen.B': 'Kräftdjur', 'allergen.C': 'Ägg', 'allergen.D': 'Fisk', 'allergen.E': 'Jordnötter', 'allergen.F': 'Soja', 'allergen.G': 'Mjölk', 'allergen.H': 'Nötter', 'allergen.I': 'Selleri', 'allergen.K': 'Senap', 'allergen.M': 'Sesam', 'allergen.O': 'Sulfiter', 'allergen.P': 'Lupin', 'allergen.title': 'Allergener', 'allergen.notice': 'Vänligen informera vår personal om dina allergier.' },
  no: { 'allergen.A': 'Glutenholdig korn', 'allergen.B': 'Krepsdyr', 'allergen.C': 'Egg', 'allergen.D': 'Fisk', 'allergen.E': 'Peanøtter', 'allergen.F': 'Soya', 'allergen.G': 'Melk', 'allergen.H': 'Nøtter', 'allergen.I': 'Selleri', 'allergen.K': 'Sennep', 'allergen.M': 'Sesam', 'allergen.O': 'Sulfitter', 'allergen.P': 'Lupin', 'allergen.title': 'Allergener', 'allergen.notice': 'Vennligst informer personalet om dine allergier.' },
  da: { 'allergen.A': 'Glutenholdige kornsorter', 'allergen.B': 'Krebsdyr', 'allergen.C': 'Æg', 'allergen.D': 'Fisk', 'allergen.E': 'Jordnødder', 'allergen.F': 'Soja', 'allergen.G': 'Mælk', 'allergen.H': 'Nødder', 'allergen.I': 'Selleri', 'allergen.K': 'Sennep', 'allergen.M': 'Sesam', 'allergen.O': 'Sulfitter', 'allergen.P': 'Lupin', 'allergen.title': 'Allergener', 'allergen.notice': 'Informér venligst vores personale om dine allergier.' },
  fi: { 'allergen.A': 'Gluteenia sisältävät viljat', 'allergen.B': 'Äyriäiset', 'allergen.C': 'Kananmunat', 'allergen.D': 'Kala', 'allergen.E': 'Maapähkinät', 'allergen.F': 'Soija', 'allergen.G': 'Maito', 'allergen.H': 'Pähkinät', 'allergen.I': 'Selleri', 'allergen.K': 'Sinappi', 'allergen.M': 'Seesami', 'allergen.O': 'Sulfiitit', 'allergen.P': 'Lupiini', 'allergen.title': 'Allergeenit', 'allergen.notice': 'Ilmoitathan henkilökunnallemme allergioistasi.' },
  pl: { 'allergen.A': 'Zboża zawierające gluten', 'allergen.B': 'Skorupiaki', 'allergen.C': 'Jaja', 'allergen.D': 'Ryby', 'allergen.E': 'Orzeszki ziemne', 'allergen.F': 'Soja', 'allergen.G': 'Mleko', 'allergen.H': 'Orzechy', 'allergen.I': 'Seler', 'allergen.K': 'Gorczyca', 'allergen.M': 'Sezam', 'allergen.O': 'Siarczyny', 'allergen.P': 'Łubin', 'allergen.title': 'Alergeny', 'allergen.notice': 'Prosimy o poinformowanie naszego personelu o alergiach.' },
  cs: { 'allergen.A': 'Obiloviny obsahující lepek', 'allergen.B': 'Korýši', 'allergen.C': 'Vejce', 'allergen.D': 'Ryby', 'allergen.E': 'Arašídy', 'allergen.F': 'Sója', 'allergen.G': 'Mléko', 'allergen.H': 'Skořápkové plody', 'allergen.I': 'Celer', 'allergen.K': 'Hořčice', 'allergen.M': 'Sezam', 'allergen.O': 'Oxid siřičitý', 'allergen.P': 'Vlčí bob', 'allergen.title': 'Alergeny', 'allergen.notice': 'Prosím informujte náš personál o vašich alergiích.' },
  hr: { 'allergen.A': 'Žitarice s glutenom', 'allergen.B': 'Rakovi', 'allergen.C': 'Jaja', 'allergen.D': 'Riba', 'allergen.E': 'Kikiriki', 'allergen.F': 'Soja', 'allergen.G': 'Mlijeko', 'allergen.H': 'Orašasti plodovi', 'allergen.I': 'Celer', 'allergen.K': 'Gorušica', 'allergen.M': 'Sezam', 'allergen.O': 'Sulfiti', 'allergen.P': 'Lupina', 'allergen.title': 'Alergeni', 'allergen.notice': 'Molimo obavijestite naše osoblje o vašim alergijama.' },
  uk: { 'allergen.A': 'Злаки, що містять глютен', 'allergen.B': 'Ракоподібні', 'allergen.C': 'Яйця', 'allergen.D': 'Риба', 'allergen.E': 'Арахіс', 'allergen.F': 'Соя', 'allergen.G': 'Молоко', 'allergen.H': 'Горіхи', 'allergen.I': 'Селера', 'allergen.K': 'Гірчиця', 'allergen.M': 'Кунжут', 'allergen.O': 'Сульфіти', 'allergen.P': 'Люпин', 'allergen.title': 'Алергени', 'allergen.notice': 'Будь ласка, повідомте наш персонал про ваші алергії.' },
  ru: { 'allergen.A': 'Злаки, содержащие глютен', 'allergen.B': 'Ракообразные', 'allergen.C': 'Яйца', 'allergen.D': 'Рыба', 'allergen.E': 'Арахис', 'allergen.F': 'Соя', 'allergen.G': 'Молоко', 'allergen.H': 'Орехи', 'allergen.I': 'Сельдерей', 'allergen.K': 'Горчица', 'allergen.M': 'Кунжут', 'allergen.O': 'Сульфиты', 'allergen.P': 'Люпин', 'allergen.title': 'Аллергены', 'allergen.notice': 'Пожалуйста, сообщите нашему персоналу о ваших аллергиях.' },
  tr: { 'allergen.A': 'Glüten içeren tahıllar', 'allergen.B': 'Kabuklular', 'allergen.C': 'Yumurta', 'allergen.D': 'Balık', 'allergen.E': 'Yer fıstığı', 'allergen.F': 'Soya', 'allergen.G': 'Süt', 'allergen.H': 'Kabuklu yemişler', 'allergen.I': 'Kereviz', 'allergen.K': 'Hardal', 'allergen.M': 'Susam', 'allergen.O': 'Sülfitler', 'allergen.P': 'Acı bakla', 'allergen.title': 'Alerjenler', 'allergen.notice': 'Lütfen personelimiize alerjileriniz hakkında bilgi verin.' },
  ar: { 'allergen.A': 'حبوب تحتوي على الغلوتين', 'allergen.B': 'قشريات', 'allergen.C': 'بيض', 'allergen.D': 'أسماك', 'allergen.E': 'فول سوداني', 'allergen.F': 'صويا', 'allergen.G': 'حليب', 'allergen.H': 'مكسرات', 'allergen.I': 'كرفس', 'allergen.K': 'خردل', 'allergen.M': 'سمسم', 'allergen.O': 'كبريتيت', 'allergen.P': 'ترمس', 'allergen.title': 'مسببات الحساسية', 'allergen.notice': 'يرجى إبلاغ موظفينا عن حساسياتكم.' },
  ja: { 'allergen.A': 'グルテン含有穀物', 'allergen.B': '甲殻類', 'allergen.C': '卵', 'allergen.D': '魚', 'allergen.E': 'ピーナッツ', 'allergen.F': '大豆', 'allergen.G': '乳', 'allergen.H': 'ナッツ類', 'allergen.I': 'セロリ', 'allergen.K': 'マスタード', 'allergen.M': 'ゴマ', 'allergen.O': '亜硫酸塩', 'allergen.P': 'ルピナス', 'allergen.title': 'アレルゲン', 'allergen.notice': 'アレルギーについてはスタッフにお知らせください。' },
  zh: { 'allergen.A': '含麸质谷物', 'allergen.B': '甲壳类', 'allergen.C': '鸡蛋', 'allergen.D': '鱼类', 'allergen.E': '花生', 'allergen.F': '大豆', 'allergen.G': '牛奶', 'allergen.H': '坚果', 'allergen.I': '芹菜', 'allergen.K': '芥末', 'allergen.M': '芝麻', 'allergen.O': '亚硫酸盐', 'allergen.P': '羽扇豆', 'allergen.title': '过敏原', 'allergen.notice': '请告知我们的工作人员您的过敏情况。' },
  ko: { 'allergen.A': '글루텐 함유 곡물', 'allergen.B': '갑각류', 'allergen.C': '달걀', 'allergen.D': '생선', 'allergen.E': '땅콩', 'allergen.F': '대두', 'allergen.G': '우유', 'allergen.H': '견과류', 'allergen.I': '셀러리', 'allergen.K': '겨자', 'allergen.M': '참깨', 'allergen.O': '아황산염', 'allergen.P': '루핀', 'allergen.title': '알레르겐', 'allergen.notice': '알레르기에 대해 직원에게 알려주세요.' },
  hi: { 'allergen.A': 'ग्लूटेन वाले अनाज', 'allergen.B': 'क्रस्टेशियन', 'allergen.C': 'अंडे', 'allergen.D': 'मछली', 'allergen.E': 'मूंगफली', 'allergen.F': 'सोया', 'allergen.G': 'दूध', 'allergen.H': 'मेवे', 'allergen.I': 'अजवाइन', 'allergen.K': 'सरसों', 'allergen.M': 'तिल', 'allergen.O': 'सल्फाइट्स', 'allergen.P': 'ल्यूपिन', 'allergen.title': 'एलर्जी कारक', 'allergen.notice': 'कृपया हमारे कर्मचारियों को अपनी एलर्जी के बारे में सूचित करें।' },
  el: { 'allergen.A': 'Δημητριακά με γλουτένη', 'allergen.B': 'Καρκινοειδή', 'allergen.C': 'Αβγά', 'allergen.D': 'Ψάρι', 'allergen.E': 'Φιστίκια', 'allergen.F': 'Σόγια', 'allergen.G': 'Γάλα', 'allergen.H': 'Ξηροί καρποί', 'allergen.I': 'Σέλινο', 'allergen.K': 'Μουστάρδα', 'allergen.M': 'Σουσάμι', 'allergen.O': 'Θειώδη', 'allergen.P': 'Λούπινα', 'allergen.title': 'Αλλεργιογόνα', 'allergen.notice': 'Παρακαλούμε ενημερώστε το προσωπικό μας για τις αλλεργίες σας.' },
  hu: { 'allergen.A': 'Gluténtartalmú gabonafélék', 'allergen.B': 'Rákfélék', 'allergen.C': 'Tojás', 'allergen.D': 'Hal', 'allergen.E': 'Földimogyoró', 'allergen.F': 'Szója', 'allergen.G': 'Tej', 'allergen.H': 'Diófélék', 'allergen.I': 'Zeller', 'allergen.K': 'Mustár', 'allergen.M': 'Szezám', 'allergen.O': 'Szulfitok', 'allergen.P': 'Csillagfürt', 'allergen.title': 'Allergének', 'allergen.notice': 'Kérjük, tájékoztassa személyzetünket az allergiáiról.' },
};

// ============================================================================
// PHASE 1C: ADDITIVES (11 keys × 23 languages)
// ============================================================================
const additives = {
  fr: { 'additive.1': 'Colorants', 'additive.2': 'Conservateurs', 'additive.3': 'Antioxydants', 'additive.4': 'Exhausteurs de goût', 'additive.5': 'Sulfuré', 'additive.6': 'Noirci', 'additive.7': 'Ciré', 'additive.8': 'Phosphaté', 'additive.9': 'Édulcorants', 'additive.10': 'Contient une source de phénylalanine', 'additive.11': 'Caféiné' },
  es: { 'additive.1': 'Colorantes', 'additive.2': 'Conservantes', 'additive.3': 'Antioxidantes', 'additive.4': 'Potenciadores del sabor', 'additive.5': 'Sulfurado', 'additive.6': 'Ennegrecido', 'additive.7': 'Encerado', 'additive.8': 'Fosfatado', 'additive.9': 'Edulcorantes', 'additive.10': 'Contiene una fuente de fenilalanina', 'additive.11': 'Con cafeína' },
  pt: { 'additive.1': 'Corantes', 'additive.2': 'Conservantes', 'additive.3': 'Antioxidantes', 'additive.4': 'Intensificadores de sabor', 'additive.5': 'Sulfurado', 'additive.6': 'Enegrecido', 'additive.7': 'Encerado', 'additive.8': 'Fosfatado', 'additive.9': 'Adoçantes', 'additive.10': 'Contém uma fonte de fenilalanina', 'additive.11': 'Com cafeína' },
  it: { 'additive.1': 'Coloranti', 'additive.2': 'Conservanti', 'additive.3': 'Antiossidanti', 'additive.4': 'Esaltatori di sapidità', 'additive.5': 'Solforato', 'additive.6': 'Annerito', 'additive.7': 'Cerato', 'additive.8': 'Fosfatato', 'additive.9': 'Dolcificanti', 'additive.10': 'Contiene una fonte di fenilalanina', 'additive.11': 'Con caffeina' },
  ro: { 'additive.1': 'Coloranți', 'additive.2': 'Conservanți', 'additive.3': 'Antioxidanți', 'additive.4': 'Potențiatori de aromă', 'additive.5': 'Sulfurat', 'additive.6': 'Înnegrit', 'additive.7': 'Cerut', 'additive.8': 'Fosfatat', 'additive.9': 'Îndulcitori', 'additive.10': 'Conține o sursă de fenilalanină', 'additive.11': 'Cu cofeină' },
  nl: { 'additive.1': 'Kleurstoffen', 'additive.2': 'Conserveermiddelen', 'additive.3': 'Antioxidanten', 'additive.4': 'Smaakversterkers', 'additive.5': 'Gezwaveld', 'additive.6': 'Gezwart', 'additive.7': 'Gewaxt', 'additive.8': 'Gefosfateerd', 'additive.9': 'Zoetstoffen', 'additive.10': 'Bevat een bron van fenylalanine', 'additive.11': 'Met cafeïne' },
  sv: { 'additive.1': 'Färgämnen', 'additive.2': 'Konserveringsmedel', 'additive.3': 'Antioxidanter', 'additive.4': 'Smakförstärkare', 'additive.5': 'Svavlad', 'additive.6': 'Svärtad', 'additive.7': 'Vaxad', 'additive.8': 'Fosfaterad', 'additive.9': 'Sötningsmedel', 'additive.10': 'Innehåller en källa till fenylalanin', 'additive.11': 'Med koffein' },
  no: { 'additive.1': 'Fargestoffer', 'additive.2': 'Konserveringsmidler', 'additive.3': 'Antioksidanter', 'additive.4': 'Smaksforsterkere', 'additive.5': 'Svovlet', 'additive.6': 'Svertet', 'additive.7': 'Vokset', 'additive.8': 'Fosfatert', 'additive.9': 'Søtstoffer', 'additive.10': 'Inneholder en kilde til fenylalanin', 'additive.11': 'Med koffein' },
  da: { 'additive.1': 'Farvestoffer', 'additive.2': 'Konserveringsmidler', 'additive.3': 'Antioxidanter', 'additive.4': 'Smagsforstærkere', 'additive.5': 'Svovlet', 'additive.6': 'Sværtet', 'additive.7': 'Vokset', 'additive.8': 'Fosfateret', 'additive.9': 'Sødestoffer', 'additive.10': 'Indeholder en kilde til phenylalanin', 'additive.11': 'Med koffein' },
  fi: { 'additive.1': 'Väriaineet', 'additive.2': 'Säilöntäaineet', 'additive.3': 'Hapettumisenestoaineet', 'additive.4': 'Arominvahventeet', 'additive.5': 'Rikitetty', 'additive.6': 'Mustutettu', 'additive.7': 'Vahattu', 'additive.8': 'Fosfatoitu', 'additive.9': 'Makeutusaineet', 'additive.10': 'Sisältää fenyylialaniinin lähteen', 'additive.11': 'Kofeiinilla' },
  pl: { 'additive.1': 'Barwniki', 'additive.2': 'Konserwanty', 'additive.3': 'Przeciwutleniacze', 'additive.4': 'Wzmacniacze smaku', 'additive.5': 'Siarkowane', 'additive.6': 'Czerniowane', 'additive.7': 'Woskowane', 'additive.8': 'Fosforanowane', 'additive.9': 'Substancje słodzące', 'additive.10': 'Zawiera źródło fenyloalaniny', 'additive.11': 'Z kofeiną' },
  cs: { 'additive.1': 'Barviva', 'additive.2': 'Konzervační látky', 'additive.3': 'Antioxidanty', 'additive.4': 'Zvýrazňovače chuti', 'additive.5': 'Sířené', 'additive.6': 'Černěné', 'additive.7': 'Voskované', 'additive.8': 'Fosfátované', 'additive.9': 'Sladidla', 'additive.10': 'Obsahuje zdroj fenylalaninu', 'additive.11': 'S kofeinem' },
  hr: { 'additive.1': 'Bojila', 'additive.2': 'Konzervansi', 'additive.3': 'Antioksidansi', 'additive.4': 'Pojačivači okusa', 'additive.5': 'Sumporno', 'additive.6': 'Pocrnjeno', 'additive.7': 'Voštano', 'additive.8': 'Fosfatizirano', 'additive.9': 'Zaslađivači', 'additive.10': 'Sadrži izvor fenilalanina', 'additive.11': 'S kofeinom' },
  uk: { 'additive.1': 'Барвники', 'additive.2': 'Консерванти', 'additive.3': 'Антиоксиданти', 'additive.4': 'Підсилювачі смаку', 'additive.5': 'Сульфітовано', 'additive.6': 'Почорніло', 'additive.7': 'Воскове', 'additive.8': 'Фосфатовано', 'additive.9': 'Підсолоджувачі', 'additive.10': 'Містить джерело фенілаланіну', 'additive.11': 'З кофеїном' },
  ru: { 'additive.1': 'Красители', 'additive.2': 'Консерванты', 'additive.3': 'Антиоксиданты', 'additive.4': 'Усилители вкуса', 'additive.5': 'Сульфитировано', 'additive.6': 'Почернено', 'additive.7': 'Вощёно', 'additive.8': 'Фосфатировано', 'additive.9': 'Подсластители', 'additive.10': 'Содержит источник фенилаланина', 'additive.11': 'С кофеином' },
  tr: { 'additive.1': 'Renklendiriciler', 'additive.2': 'Koruyucular', 'additive.3': 'Antioksidanlar', 'additive.4': 'Lezzet artırıcılar', 'additive.5': 'Kükürtlenmiş', 'additive.6': 'Karartılmış', 'additive.7': 'Mumlanmış', 'additive.8': 'Fosfatlı', 'additive.9': 'Tatlandırıcılar', 'additive.10': 'Fenilalanin kaynağı içerir', 'additive.11': 'Kafeinli' },
  ar: { 'additive.1': 'ملونات', 'additive.2': 'مواد حافظة', 'additive.3': 'مضادات أكسدة', 'additive.4': 'محسنات نكهة', 'additive.5': 'مكبرت', 'additive.6': 'مسوّد', 'additive.7': 'مشمع', 'additive.8': 'مفسفر', 'additive.9': 'محليات', 'additive.10': 'يحتوي على مصدر فينيل ألانين', 'additive.11': 'يحتوي على كافيين' },
  ja: { 'additive.1': '着色料', 'additive.2': '保存料', 'additive.3': '酸化防止剤', 'additive.4': '調味料', 'additive.5': '硫黄処理済', 'additive.6': '黒色処理済', 'additive.7': 'ワックス処理済', 'additive.8': 'リン酸処理済', 'additive.9': '甘味料', 'additive.10': 'フェニルアラニン源を含む', 'additive.11': 'カフェイン含有' },
  zh: { 'additive.1': '色素', 'additive.2': '防腐剂', 'additive.3': '抗氧化剂', 'additive.4': '增味剂', 'additive.5': '硫化处理', 'additive.6': '黑化处理', 'additive.7': '打蜡处理', 'additive.8': '磷酸化处理', 'additive.9': '甜味剂', 'additive.10': '含苯丙氨酸来源', 'additive.11': '含咖啡因' },
  ko: { 'additive.1': '색소', 'additive.2': '방부제', 'additive.3': '산화방지제', 'additive.4': '향미증진제', 'additive.5': '황화처리', 'additive.6': '흑색처리', 'additive.7': '왁스처리', 'additive.8': '인산처리', 'additive.9': '감미료', 'additive.10': '페닐알라닌 함유 원료 포함', 'additive.11': '카페인 함유' },
  hi: { 'additive.1': 'रंगद्रव्य', 'additive.2': 'परिरक्षक', 'additive.3': 'एंटीऑक्सीडेंट', 'additive.4': 'स्वाद बढ़ाने वाले', 'additive.5': 'सल्फेटेड', 'additive.6': 'काला किया हुआ', 'additive.7': 'मोम लगा हुआ', 'additive.8': 'फॉस्फेटेड', 'additive.9': 'मीठा करने वाले', 'additive.10': 'फेनिलएलेनिन का स्रोत शामिल', 'additive.11': 'कैफीन युक्त' },
  el: { 'additive.1': 'Χρωστικές', 'additive.2': 'Συντηρητικά', 'additive.3': 'Αντιοξειδωτικά', 'additive.4': 'Ενισχυτικά γεύσης', 'additive.5': 'Θειωμένο', 'additive.6': 'Μαυρισμένο', 'additive.7': 'Κερωμένο', 'additive.8': 'Φωσφορικά', 'additive.9': 'Γλυκαντικά', 'additive.10': 'Περιέχει πηγή φαινυλαλανίνης', 'additive.11': 'Με καφεΐνη' },
  hu: { 'additive.1': 'Színezékek', 'additive.2': 'Tartósítószerek', 'additive.3': 'Antioxidánsok', 'additive.4': 'Ízfokozók', 'additive.5': 'Kénezett', 'additive.6': 'Feketített', 'additive.7': 'Viaszolt', 'additive.8': 'Foszfátozott', 'additive.9': 'Édesítőszerek', 'additive.10': 'Fenilalanin forrást tartalmaz', 'additive.11': 'Koffeines' },
};

// ============================================================================
// PHASE 1C-extra: MENU NOTES (4 keys × 23 languages)
// ============================================================================
const menuNotes = {
  fr: { 'note.salate': 'Tous les plats avec pain et beurre', 'note.schnitzel': 'Tous les schnitzels avec frites et salade', 'note.fleisch': 'Tous les plats de viande avec accompagnement au choix', 'note.pizza': 'Supplément pour chaque garniture supplémentaire : 1,50 €', 'nav_label': 'Catégories de la carte' },
  es: { 'note.salate': 'Todos los platos con pan y mantequilla', 'note.schnitzel': 'Todos los escalopes con patatas fritas y ensalada', 'note.fleisch': 'Todos los platos de carne con guarnición a elegir', 'note.pizza': 'Suplemento por cada ingrediente adicional: 1,50 €', 'nav_label': 'Categorías del menú' },
  pt: { 'note.salate': 'Todos os pratos com pão e manteiga', 'note.schnitzel': 'Todos os schnitzels com batatas fritas e salada', 'note.fleisch': 'Todos os pratos de carne com acompanhamento à escolha', 'note.pizza': 'Suplemento por cada ingrediente extra: 1,50 €', 'nav_label': 'Categorias do menu' },
  it: { 'note.salate': 'Tutti i piatti con pane e burro', 'note.schnitzel': 'Tutte le cotolette con patatine fritte e insalata', 'note.fleisch': 'Tutti i piatti di carne con contorno a scelta', 'note.pizza': 'Supplemento per ogni ingrediente extra: 1,50 €', 'nav_label': 'Categorie del menu' },
  ro: { 'note.salate': 'Toate felurile cu pâine și unt', 'note.schnitzel': 'Toate șnițelele cu cartofi prăjiți și salată', 'note.fleisch': 'Toate preparatele de carne cu garnitură la alegere', 'note.pizza': 'Supliment pentru fiecare topping suplimentar: 1,50 €', 'nav_label': 'Categorii de meniu' },
  nl: { 'note.salate': 'Alle gerechten met brood en boter', 'note.schnitzel': 'Alle schnitzels met friet en salade', 'note.fleisch': 'Alle vleesgerechten met bijgerecht naar keuze', 'note.pizza': 'Toeslag voor elke extra topping: 1,50 €', 'nav_label': 'Menucategorieën' },
  sv: { 'note.salate': 'Alla rätter med bröd och smör', 'note.schnitzel': 'Alla schnitzel med pommes frites och sallad', 'note.fleisch': 'Alla kötträtter med valfritt tillbehör', 'note.pizza': 'Tillägg per extra topping: 1,50 €', 'nav_label': 'Menykategorier' },
  no: { 'note.salate': 'Alle retter med brød og smør', 'note.schnitzel': 'Alle schnitzel med pommes frites og salat', 'note.fleisch': 'Alle kjøttretter med valgfritt tilbehør', 'note.pizza': 'Tillegg per ekstra topping: 1,50 €', 'nav_label': 'Menykategorier' },
  da: { 'note.salate': 'Alle retter med brød og smør', 'note.schnitzel': 'Alle schnitzel med pommes frites og salat', 'note.fleisch': 'Alle kødretter med valgfrit tilbehør', 'note.pizza': 'Tillæg per ekstra topping: 1,50 €', 'nav_label': 'Menukategorier' },
  fi: { 'note.salate': 'Kaikki annokset leivän ja voin kera', 'note.schnitzel': 'Kaikki leikkeet ranskalaisilla ja salaatilla', 'note.fleisch': 'Kaikki liharuoat valinnaisella lisukkeella', 'note.pizza': 'Lisämaksu jokaisesta lisätäytteestä: 1,50 €', 'nav_label': 'Ruokalistan kategoriat' },
  pl: { 'note.salate': 'Wszystkie dania z chlebem i masłem', 'note.schnitzel': 'Wszystkie sznycle z frytkami i sałatką', 'note.fleisch': 'Wszystkie dania mięsne z dodatkiem do wyboru', 'note.pizza': 'Dopłata za każdy dodatkowy składnik: 1,50 €', 'nav_label': 'Kategorie menu' },
  cs: { 'note.salate': 'Všechna jídla s chlebem a máslem', 'note.schnitzel': 'Všechny řízky s hranolky a salátem', 'note.fleisch': 'Všechna masová jídla s přílohou dle výběru', 'note.pizza': 'Příplatek za každou další přísadu: 1,50 €', 'nav_label': 'Kategorie jídelního lístku' },
  hr: { 'note.salate': 'Sva jela s kruhom i maslacem', 'note.schnitzel': 'Sve šnicle s pomfritom i salatom', 'note.fleisch': 'Sva mesna jela s prilogom po izboru', 'note.pizza': 'Doplata za svaki dodatni prilog: 1,50 €', 'nav_label': 'Kategorije jelovnika' },
  uk: { 'note.salate': 'Усі страви з хлібом та маслом', 'note.schnitzel': 'Усі шніцелі з картоплею фрі та салатом', 'note.fleisch': "Усі м'ясні страви з гарніром на вибір", 'note.pizza': 'Доплата за кожну додаткову начинку: 1,50 €', 'nav_label': 'Категорії меню' },
  ru: { 'note.salate': 'Все блюда с хлебом и маслом', 'note.schnitzel': 'Все шницели с картофелем фри и салатом', 'note.fleisch': 'Все мясные блюда с гарниром на выбор', 'note.pizza': 'Доплата за каждый дополнительный топпинг: 1,50 €', 'nav_label': 'Категории меню' },
  tr: { 'note.salate': 'Tüm yemekler ekmek ve tereyağı ile', 'note.schnitzel': 'Tüm şnitzeller patates kızartması ve salata ile', 'note.fleisch': 'Tüm et yemekleri seçiminize göre garnitür ile', 'note.pizza': 'Her ekstra malzeme için ek ücret: 1,50 €', 'nav_label': 'Menü kategorileri' },
  ar: { 'note.salate': 'جميع الأطباق مع خبز وزبدة', 'note.schnitzel': 'جميع الشنيتسل مع بطاطس مقلية وسلطة', 'note.fleisch': 'جميع أطباق اللحوم مع مرافق حسب الاختيار', 'note.pizza': 'رسوم إضافية لكل إضافة: ١٫٥٠ يورو', 'nav_label': 'فئات القائمة' },
  ja: { 'note.salate': 'すべての料理にパンとバター付き', 'note.schnitzel': 'すべてのシュニッツェルにフライドポテトとサラダ付き', 'note.fleisch': 'すべての肉料理にお好みの付け合わせ付き', 'note.pizza': '追加トッピング1つにつき1.50€', 'nav_label': 'メニューカテゴリー' },
  zh: { 'note.salate': '所有菜品附面包和黄油', 'note.schnitzel': '所有炸肉排附薯条和沙拉', 'note.fleisch': '所有肉类菜品附可选配菜', 'note.pizza': '每个额外配料加收1.50€', 'nav_label': '菜单分类' },
  ko: { 'note.salate': '모든 요리에 빵과 버터 포함', 'note.schnitzel': '모든 슈니첼에 감자튀김과 샐러드 포함', 'note.fleisch': '모든 육류요리에 선택 가능한 사이드 포함', 'note.pizza': '추가 토핑당 1.50€', 'nav_label': '메뉴 카테고리' },
  hi: { 'note.salate': 'सभी व्यंजन ब्रेड और बटर के साथ', 'note.schnitzel': 'सभी श्नित्ज़ेल फ्रेंच फ्राइज़ और सलाद के साथ', 'note.fleisch': 'सभी मांस व्यंजन चुनी हुई साइड डिश के साथ', 'note.pizza': 'प्रत्येक अतिरिक्त टॉपिंग के लिए 1.50€ अधिभार', 'nav_label': 'मेनू श्रेणियाँ' },
  el: { 'note.salate': 'Όλα τα πιάτα με ψωμί και βούτυρο', 'note.schnitzel': 'Όλα τα σνίτσελ με πατάτες τηγανιτές και σαλάτα', 'note.fleisch': 'Όλα τα κρεατικά με συνοδευτικό της επιλογής σας', 'note.pizza': 'Επιπλέον χρέωση ανά topping: 1,50 €', 'nav_label': 'Κατηγορίες μενού' },
  hu: { 'note.salate': 'Minden étel kenyérrel és vajjal', 'note.schnitzel': 'Minden rántott szelet sült krumplival és salátával', 'note.fleisch': 'Minden húsétel választható körettel', 'note.pizza': 'Felár minden extra feltétért: 1,50 €', 'nav_label': 'Étlap kategóriák' },
};

// ============================================================================
// EXECUTION
// ============================================================================
function injectIntoNamespace(locale, namespace, translations) {
  const filePath = path.join(LOCALES_DIR, locale, `${namespace}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ File not found: ${filePath}`);
    return 0;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let count = 0;
  for (const [key, val] of Object.entries(translations)) {
    data[key] = val; // Always overwrite, since DE-identical values need replacing
    count++;
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  return count;
}

let totalInjected = 0;
const locales = Object.keys(menuCategories);

for (const locale of locales) {
  let localeCount = 0;
  
  // Menu categories
  if (menuCategories[locale]) {
    localeCount += injectIntoNamespace(locale, 'menu', menuCategories[locale]);
  }
  
  // Allergens
  if (allergens[locale]) {
    localeCount += injectIntoNamespace(locale, 'menu', allergens[locale]);
  }
  
  // Additives
  if (additives[locale]) {
    localeCount += injectIntoNamespace(locale, 'menu', additives[locale]);
  }
  
  // Menu notes
  if (menuNotes[locale]) {
    localeCount += injectIntoNamespace(locale, 'menu', menuNotes[locale]);
  }
  
  totalInjected += localeCount;
  console.log(`✅ ${locale.toUpperCase()}: ${localeCount} keys injected into menu.json`);
}

console.log(`\n🎯 TOTAL: ${totalInjected} translations injected across ${locales.length} locales`);
