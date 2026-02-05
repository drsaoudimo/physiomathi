import { Theorem, Language } from './types';

export const THEOREMS: Theorem[] = [
  {
    id: "thm_4",
    title: {
      fr: "Théorème 4: Consistance Multi-Échelle",
      ar: "المبرهنة 4: التعدد المستوي (Multiscale Consistency)"
    },
    description: {
      fr: "Tout modèle doit préserver la cohérence dynamique de la cellule vers l'organe.",
      ar: "يجب أن يحافظ النموذج على الاتساق الديناميكي من الخلية إلى العضو."
    },
    formalCheck: "Check if micro-variables (insulin) align with macro-dynamics (glucose/BP). Look for uncoupled dynamics."
  },
  {
    id: "thm_5",
    title: {
      fr: "Théorème 5: Irréductibilité Linéaire",
      ar: "المبرهنة 5: عدم القابلية للاختزال الخطي"
    },
    description: {
      fr: "Le corps n'est pas la somme de ses organes (Σ Organes ≠ Corps).",
      ar: "لا يمكن اختزال النظام إلى مجموع أنظمة مستقلة خطيًا."
    },
    formalCheck: "Identify non-linear feedback loops where x_dot depends on cross-organ variables (e.g., Kidney affecting Heart)."
  },
  {
    id: "thm_6",
    title: {
      fr: "Théorème 6: Attracteur Pathologique",
      ar: "المبرهنة 6: الجاذب المرضي (Pathological Attractor)"
    },
    description: {
      fr: "La maladie chronique est un attracteur stable dans l'espace des phases.",
      ar: "كل مرض مزمن يقابل جاذبًا ديناميكيًا مستقرًا في فضاء الحالات."
    },
    formalCheck: "Analyze phase space. Is the system stuck in a stable state that is NOT homeostasis? (e.g., stable hyperglycemia)."
  },
  {
    id: "thm_8",
    title: {
      fr: "Théorème 8: Rupture Topologique",
      ar: "المبرهنة 8: التغير الطوبولوجي للمرض"
    },
    description: {
      fr: "La maladie introduit des 'trous' ou des boucles dans l'espace des états.",
      ar: "الانتقال للمرض يغير طوبولوجيا الفضاء (ظهور ثقوب أو حلقات)."
    },
    formalCheck: "Detect if the system trajectory has formed a closed loop (limit cycle) or hit a barrier avoiding a healthy region."
  },
  {
    id: "thm_10",
    title: {
      fr: "Théorème 10: Thérapie comme Contrôle Optimal",
      ar: "المبرهنة 10: العلاج كتحكم أمثل"
    },
    description: {
      fr: "Le traitement est un problème de minimisation de coût sur l'espace d'état.",
      ar: "العلاج هو حل مسألة تحكم لتقليل الانحراف بأقل تكلفة طاقة."
    },
    formalCheck: "Evaluate if current interventions are moving X(t) toward X* efficiently or oscillating wildly."
  }
];

export const UI_TEXT = {
  fr: {
    appTitle: "PhysioMath",
    appSubtitle: "MOTEUR IN SILICO v2.0 (PFTC)",
    mineUnknown: "MINER THÉORIES INCONNUES",
    generateArticle: "GÉNÉRER ARTICLE SCIENTIFIQUE",
    researcherMode: "MODE CHERCHEUR",
    topicPlaceholder: "Sujet ou focalisation (optionnel)...",
    articleTopicLabel: "Sujet de l'article...",
    processing: "TRAITEMENT...",
    close: "Fermer",
    clinicalReport: "Rapport Clinique Formel",
    theoreticalReport: "Exploration Théorique Inconnue",
    scientificArticle: "Article Scientifique",
    errorTitle: "Erreur Système",
    errorApiKey: "Clé API manquante. Veuillez configurer l'environnement.",
    errorConnection: "Échec de connexion au noyau IA. Vérifiez votre réseau.",
    errorGeneration: "La génération du contenu a échoué.",
    neuroCore: "NEURO-CORE",
    orSeparator: "OU",
    generatorVersion: "GÉNÉRATEUR THÉORIQUE V2.1",
    authorName: "Dr Saoudi Mohamed EPH Ain-El-Kebira",
    authorNameAr: "دكتور سعودي محمد - مستشفى العين الكبيرة",
    generateButton: "Générer",
    articleDesc: "Génère un article formel incluant les théorèmes PFTC 4, 5, 6, 8, 10."
  },
  ar: {
    appTitle: "فيزيو-ماث",
    appSubtitle: "محرك محاكاة رقمي v2.0 (PFTC)",
    mineUnknown: "تنقيب نظريات مجهولة",
    generateArticle: "توليد مقال علمي",
    researcherMode: "وضع الباحث",
    topicPlaceholder: "الموضوع أو التركيز (اختياري)...",
    articleTopicLabel: "موضوع المقال...",
    processing: "جاري المعالجة...",
    close: "إغلاق",
    clinicalReport: "تقرير سريري صوري",
    theoreticalReport: "استكشاف نظري مجهول",
    scientificArticle: "مقال علمي",
    errorTitle: "خطأ في النظام",
    errorApiKey: "مفتاح API مفقود. يرجى ضبط البيئة.",
    errorConnection: "فشل الاتصال بنواة الذكاء الاصطناعي. تحقق من الشبكة.",
    errorGeneration: "فشل توليد المحتوى.",
    neuroCore: "النواة العصبية",
    orSeparator: "أو",
    generatorVersion: "المولد النظري الإصدار 2.1",
    authorName: "Dr Saoudi Mohamed EPH Ain-El-Kebira",
    authorNameAr: "دكتور سعودي محمد - مستشفى العين الكبيرة",
    generateButton: "توليد",
    articleDesc: "يولد مقالاً رسمياً يتضمن مبرهنات PFTC 4, 5, 6, 8, 10."
  }
};
