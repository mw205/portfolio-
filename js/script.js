const menuButton = document.querySelector('#menu-icon');
const menuIcon = menuButton?.querySelector('i');
const navbar = document.querySelector('#navbar');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const langToggle = document.getElementById('lang-toggle');
const html = document.documentElement;
const body = document.body;
const header = document.getElementById('header');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('header nav a');
const contactForm = document.getElementById('contact-form');
let typedInstance = null;

const translations = {
    en: {
        brand_role: 'Software Engineer',
        nav_home: 'Home',
        nav_about: 'About',
        nav_journey: 'Journey',
        nav_services: 'Services',
        nav_skills: 'Skills',
        nav_projects: 'Projects',
        nav_contact: 'Contact',
        header_cta: 'Book a Call',
        hero_eyebrow: 'Mobile, Web, and AI systems that ship',
        hero_title: 'Building ambitious digital products with clean execution.',
        hero_text: 'I’m Mohamed Waleed, a software engineer focused on Flutter, full-stack web platforms, and GenAI experiences. I design polished products with scalable architecture and strong delivery discipline.',
        hero_primary: 'View Projects',
        hero_secondary: 'Start a Conversation',
        hero_stat_1_title: '2024+',
        hero_stat_1_text: 'Freelance product delivery',
        hero_stat_2_title: 'Mobile + AI',
        hero_stat_2_text: 'Cross-functional engineering focus',
        hero_stat_3_text: 'Current specialization',
        hero_badge: 'Available for freelance and product work',
        hero_panel_1_label: 'Primary Stack',
        hero_panel_1_text: 'Flutter, Laravel, Vue, Python',
        hero_panel_2_label: 'Engineering Style',
        hero_panel_2_text: 'Fast delivery, clean structure, real product focus',
        about_eyebrow: 'About',
        about_title: 'An engineer who bridges product speed and technical depth.',
        about_heading: 'Full-stack and mobile systems with AI capability built in.',
        about_text: 'Versatile and results-driven Software Engineer with a strong foundation in Artificial Intelligence and hands-on expertise across Mobile, Full-Stack Web, and GenAI development. Adept at designing scalable architectures and delivering end-to-end applications from intuitive frontends to robust backend systems.',
        about_point_1: 'Cross-platform apps with strong UX and real-time workflows',
        about_point_2: 'Structured systems using SOLID principles and scalable patterns',
        about_point_3: 'Applied AI including RAG, image tooling, and LLM product features',
        about_point_4: 'Production-ready delivery across mobile, web, and AI products',
        about_cta: 'Connect on LinkedIn',
        journey_eyebrow: 'Journey',
        journey_title: 'Education and experience shaped around applied software delivery.',
        education_column: 'Education',
        education_1_title: 'Bachelor of Computer and Information Sciences (Artificial Intelligence Program)',
        education_1_text: 'Built a strong base in AI, algorithms, and software engineering fundamentals.',
        education_2_title: 'Open Source Applications Development',
        education_2_text: 'Advanced training focused on open-source technologies and enterprise application delivery.',
        experience_column: 'Experience',
        experience_1_title: 'Freelance Flutter Developer',
        experience_1_place: 'Independent',
        experience_1_item_1: '<strong>Mindly:</strong> Developed a Flutter-based EdTech app with anti-piracy safeguards and QR subscriptions.',
        experience_1_item_2: '<strong>FarmBot:</strong> Built an IoT agriculture dashboard with real-time sensor visibility.',
        experience_1_item_3: '<strong>CX Academy:</strong> Delivered a corporate e-learning platform with WebSocket chat and streaming.',
        experience_2_title: 'Flutter Developer Intern',
        experience_2_text: 'Contributed to the Green Car Wash app using MVVM, Bloc, Firebase, and Google Maps integration.',
        services_eyebrow: 'Services',
        services_title: 'High-value engineering support across product layers.',
        service_1_title: 'Mobile Product Development',
        service_1_text: 'Cross-platform Flutter applications with strong performance, maintainable state management, and production-ready polish.',
        service_1_link: 'Discuss mobile work',
        service_2_title: 'Full-Stack Web Systems',
        service_2_text: 'Backend and frontend delivery for dashboards, business platforms, APIs, and modern web interfaces.',
        service_2_link: 'Discuss web systems',
        service_3_title: 'GenAI Integration',
        service_3_text: 'RAG workflows, image tooling, and LLM-powered features integrated into real applications with practical product value.',
        service_3_link: 'Discuss AI features',
        skills_eyebrow: 'Skills',
        skills_title: 'A broad stack anchored by mobile engineering and applied AI.',
        skills_mobile: 'Mobile',
        skills_frontend: 'Frontend',
        skills_backend: 'Backend',
        skills_ai_tools: 'AI & Tools',
        projects_eyebrow: 'Projects',
        projects_title: 'Selected work across AI, IoT, education, and product platforms.',
        projects_note: 'A curated selection of shipped products and working prototypes, organized by stack and business use case.',
        portfolio_stat_1_title: '10+',
        portfolio_stat_1_text: 'Projects presented',
        portfolio_stat_2_title: '3 domains',
        portfolio_stat_2_text: 'Mobile, web, and AI',
        portfolio_stat_3_title: 'Repo-first',
        portfolio_stat_3_text: 'Readable code and structure',
        project_pill_modifai: 'Flutter + Firebase',
        project_modifai: 'AI-powered photo editor for prompt-based transformations and fast mobile creation workflows.',
        project_pill_healthcare: 'Healthcare EdTech',
        project_cogninue: 'Autism support app with guided cognition exercises, safety prompts, and parent visibility.',
        project_pill_mindly: 'Flutter + Firebase',
        project_mindly_title: 'Mindly',
        project_mindly: 'Protected EdTech platform with subscription control, QR access, and learning content delivery.',
        project_pill_doctor: 'Vue.js + DRF',
        project_doctor_title: 'Doctor Scheduling Management System',
        project_doctor: 'Clinic scheduling system for patient bookings, doctor availability, and daily coordination.',
        project_pill_iot: 'IoT Dashboard',
        project_farmbot: 'Agriculture monitoring dashboard that surfaces live soil and crop data from APIs.',
        project_pill_hotel: 'Laravel + Vue',
        project_hotel_title: 'Hotel System',
        project_hotel: 'Hospitality management platform for room operations, reservations, and service tracking.',
        project_pill_bookstore: 'Django',
        project_bookstore_title: 'Bookstore System',
        project_bookstore: 'Bookstore platform with catalog browsing, inventory handling, and order management.',
        project_pill_stride: 'Vue.js',
        project_stride_title: 'Stride',
        project_stride: 'Responsive footwear storefront focused on product discovery and smooth purchase flow.',
        project_pill_quizzy: 'JavaScript',
        project_quizzy_title: 'Quizzy',
        project_quizzy: 'Interactive quiz platform with progress tracking and student assessment flow.',
        project_pill_ai: 'AI Application',
        project_chatgpt_title: 'ChatGPT Clone',
        project_chatgpt: 'Conversational AI playground with dynamic chat and experimentation hooks.',
        project_pill_cafeteria: 'PHP Native',
        project_cafeteria_title: 'Cafeteria System',
        project_cafeteria: 'Native PHP cafeteria system for ordering, billing, and daily operations.',
        project_pill_rag: 'LangChain + Flask',
        project_rag_title: 'RAG System',
        project_rag: 'PDF question-answering workflow powered by retrieval-augmented generation.',
        project_view: 'View repository',
        project_status_featured: 'Featured',
        project_status_product: 'Product',
        project_status_system: 'System',
        project_status_realtime: 'Realtime',
        project_status_operations: 'Operations',
        project_status_catalog: 'Catalog',
        project_status_ecommerce: 'E-commerce',
        project_status_assessment: 'Assessment',
        project_status_sandbox: 'Sandbox',
        project_status_ai_search: 'AI search',
        contact_eyebrow: 'Contact',
        contact_title: 'Let’s build something useful, fast, and well-structured.',
        contact_text: 'If you need a mobile app, a product-focused full-stack build, or AI features integrated into an existing system, I’m open to discussing the scope.',
        contact_location: 'Mansoura, Egypt',
        form_name: 'Full Name',
        form_email: 'Email Address',
        form_project_type: 'Project Type',
        form_details: 'Tell me about the product, scope, or problem you want solved',
        form_submit: 'Send Message',
        footer_text: '&copy; 2026 Mohamed Waleed. All rights reserved.',
        contact_alert: 'Contact form delivery is not wired yet. Please reach out on LinkedIn, WhatsApp, or email.',
        typed_strings: ['Flutter Delivery', 'Full-Stack Systems', 'GenAI Products', 'Product Engineering']
    },
    ar: {
        brand_role: 'مهندس برمجيات (Software Engineer)',
        nav_home: 'الرئيسية',
        nav_about: 'عني',
        nav_journey: 'مسيرتي',
        nav_services: 'خدماتي',
        nav_skills: 'مهاراتي',
        nav_projects: 'مشاريعي',
        nav_contact: 'تواصل معي',
        header_cta: 'احجز مكالمة',
        hero_eyebrow: 'تطوير أنظمة Mobile, Web & AI جاهزة للإطلاق الفعلي (that ship)',
        hero_title: 'بناء منتجات رقمية (Digital Products) طموحة مع Clean Execution مميز.',
        hero_text: 'أنا محمد وليد، Software Engineer متخصص في الـ Flutter وتطوير الـ Full-Stack Web Platforms وتجارب الـ GenAI (الذكاء الاصطناعي التوليدي). أقوم بتصميم منتجات برمجية متكاملة بـ Scalable Architecture وجودة عالية مع التزام قوي بمواعيد التسليم.',
        hero_primary: 'عرض المشاريع (View Projects)',
        hero_secondary: 'تواصل معي (Start a Conversation)',
        hero_stat_1_title: '+2024',
        hero_stat_1_text: 'تقديم خدمات Freelance وتوصيل المنتجات البرمجية',
        hero_stat_2_title: 'هاتف + ذكاء اصطناعي',
        hero_stat_2_text: 'تركيز هندسي متعدد التخصصات (Cross-functional focus)',
        hero_stat_3_text: 'التخصص الحالي (Current specialization)',
        hero_badge: 'متاح للعمل الحر والمشاريع البرمجية (Available for freelance & product work)',
        hero_panel_1_label: 'الـ Primary Stack الأساسي',
        hero_panel_1_text: 'Flutter، Laravel، Vue، Python',
        hero_panel_2_label: 'أسلوب العمل الهندسي (Engineering Style)',
        hero_panel_2_text: 'تسليم سريع (Fast delivery)، هيكلة نظيفة (Clean Structure)، وتركيز حقيقي على المنتج',
        about_eyebrow: 'نبذة عني',
        about_title: 'مهندس يجمع بين سرعة تطوير المنتج (Product Speed) والعمق التقني (Technical Depth).',
        about_heading: 'تطوير أنظمة Full-stack وتطبيقات Mobile مع قدرات AI مدمجة (AI capability built-in).',
        about_text: 'مهندس برمجيات (Software Engineer) مرن وموجه نحو النتائج، لدي أساس قوي في الـ Artificial Intelligence وخبرة عملية في تطوير الـ Mobile و الـ Full-Stack Web والـ GenAI. بارع في تصميم الـ Scalable Architectures وتسليم تطبيقات متكاملة (End-to-End) من الواجهات الأمامية التفاعلية (Frontends) إلى الأنظمة الخلفية القوية (Backends).',
        about_point_1: 'تطوير تطبيقات Cross-platform مع تجربة مستخدم (UX) ممتازة و Real-time workflows',
        about_point_2: 'أنظمة مهيكلة باستخدام مبادئ SOLID وتصاميم برمجية قابلة للتوسع (Scalable Patterns)',
        about_point_3: 'تطبيقات AI عملية تشمل الـ RAG، أدوات الصور، وميزات الـ LLM في المنتجات',
        about_point_4: 'تسليم منتجات جاهزة للإنتاج (Production-ready) عبر الـ Mobile والـ Web والـ AI',
        about_cta: 'تواصل عبر LinkedIn',
        journey_eyebrow: 'المسيرة التقنية',
        journey_title: 'مسار تعليمي وخبرة عملية ترتكز على التطوير البرمجي الفعلي (Applied Software Delivery).',
        education_column: 'التعليم (Education)',
        education_1_title: 'بكالوريوس الحاسبات والمعلومات (برنامج الذكاء الاصطناعي)',
        education_1_text: 'تأسيس متين في الـ AI، الخوارزميات، وأساسيات هندسة البرمجيات.',
        education_2_title: 'تطوير تطبيقات المصادر المفتوحة (ITI - Open Source Applications Development)',
        education_2_text: 'منحة تدريبية متقدمة ركزت على تقنيات المصادر المفتوحة وتطوير تطبيقات الويب للمؤسسات.',
        experience_column: 'الخبرة (Experience)',
        experience_1_title: 'Freelance Flutter Developer',
        experience_1_place: 'عمل حر (Independent)',
        experience_1_item_1: '<strong>Mindly:</strong> تطوير تطبيق EdTech باستخدام Flutter مع توفير حماية ضد السرقة ونظام اشتراكات برمز QR.',
        experience_1_item_2: '<strong>FarmBot:</strong> بناء لوحة تحكم IoT زراعية لمراقبة بيانات الحساسات في الوقت الفعلي (Real-time).',
        experience_1_item_3: '<strong>CX Academy:</strong> تسليم منصة e-learning للمؤسسات تدعم البث المباشر والمحادثات المباشرة باستخدام WebSockets.',
        experience_2_title: 'Flutter Developer Intern',
        experience_2_text: 'المساهمة في تطوير تطبيق Green Car Wash باستخدام معماريات MVVM و Bloc و Firebase مع دمج خرائط Google Maps.',
        services_eyebrow: 'الخدمات البرمجية',
        services_title: 'دعم هندسي ذو قيمة عالية (High-value engineering support) عبر طبقات المنتج المختلفة.',
        service_1_title: 'تطوير تطبيقات الموبايل (Mobile Product Development)',
        service_1_text: 'بناء تطبيقات Flutter عابرة للمنصات (Android & iOS) بأداء عالٍ، إدارة حالة مستقرة (State Management)، ولمسات نهائية جاهزة للإنتاج.',
        service_1_link: 'ناقش مشاريع الموبايل',
        service_2_title: 'أنظمة الويب المتكاملة (Full-Stack Web Systems)',
        service_2_text: 'تسليم الـ Backend والـ Frontend للوحات التحكم (Dashboards)، منصات الأعمال، واجهات الـ APIs، وواجهات الويب الحديثة.',
        service_2_link: 'ناقش مشاريع الويب',
        service_3_title: 'دمج تقنيات الـ GenAI',
        service_3_text: 'بناء مسارات عمل الـ RAG، أدوات معالجة الصور، والميزات المدعومة بنماذج الـ LLM مع دمجها لتقديم قيمة حقيقية للمنتج.',
        service_3_link: 'ناقش ميزات الذكاء الاصطناعي',
        skills_eyebrow: 'المهارات التقنية',
        skills_title: 'مجموعة مهارات واسعة (Broad stack) ترتكز على هندسة تطبيقات الموبايل وتطبيقات الـ AI العملية.',
        skills_mobile: 'تطوير الموبايل (Mobile)',
        skills_frontend: 'الواجهات الأمامية (Frontend)',
        skills_backend: 'الأنظمة الخلفية (Backend)',
        skills_ai_tools: 'الذكاء الاصطناعي والأدوات (AI & Tools)',
        projects_eyebrow: 'أبرز المشاريع',
        projects_title: 'مشاريع مختارة في مجالات الـ AI، والـ IoT، والتعليم، ومنصات المنتجات الرقمية.',
        projects_note: 'مجموعة منتقاة بعناية (Curated selection) من المنتجات البرمجية التي تم إطلاقها أو النماذج الأولية، مرتبة حسب الـ Stack وحالات الاستخدام.',
        portfolio_stat_1_title: '10+',
        portfolio_stat_1_text: 'مشاريع مميزة معروضة (Projects)',
        portfolio_stat_2_title: '3 مجالات (Domains)',
        portfolio_stat_2_text: 'تطبيقات الموبايل، الويب، والـ AI',
        portfolio_stat_3_title: 'منهجية الـ Repo-First',
        portfolio_stat_3_text: 'كود منظم مع بنية واضحة سهلة القراءة',
        project_pill_modifai: 'Flutter + Firebase',
        project_modifai: 'محرر صور مدعوم بالذكاء الاصطناعي (AI-powered) لتعديل الصور بناءً على الأوامر النصية وتوفير تجربة سريعة على الموبايل.',
        project_pill_healthcare: 'EdTech للرعاية الصحية',
        project_cogninue: 'تطبيق لدعم أطفال التوحد مع تمارين إدراكية موجهة، وتنبيهات سلامة، ولوحة تحكم لمتابعة أولياء الأمور.',
        project_pill_mindly: 'Flutter + Firebase',
        project_mindly_title: 'Mindly',
        project_mindly: 'منصة EdTech محمية بميزات مكافحة القرصنة، مع نظام اشتراك يعتمد على الـ QR وكود التحكم في تسليم المحتوى.',
        project_pill_doctor: 'Vue.js + DRF',
        project_doctor_title: 'نظام إدارة مواعيد العيادات (Doctor Scheduling System)',
        project_doctor: 'نظام لحجز مواعيد المرضى بالعيادات، تتبع أوقات الأطباء، وتنسيق العمليات اليومية.',
        project_pill_iot: 'لوحة تحكم IoT',
        project_farmbot: 'لوحة تحكم زراعية ذكية لمراقبة بيانات التربة والمحاصيل لحظة بلحظة عبر واجهات الـ APIs.',
        project_pill_hotel: 'Laravel + Vue',
        project_hotel_title: 'نظام إدارة الفنادق (Hotel Management System)',
        project_hotel: 'منصة لإدارة الغرف وحجوزات النزلاء وتتبع سير الخدمات التشغيلية في الفندق.',
        project_pill_bookstore: 'Django',
        project_bookstore_title: 'نظام إدارة المكتبة (Bookstore System)',
        project_bookstore: 'منصة لبيع الكتب تتيح تصفح الكتالوج وإدارة المخزون ومعالجة الطلبات بكفاءة.',
        project_pill_stride: 'Vue.js',
        project_stride_title: 'Stride Store',
        project_stride: 'متجر أحذية متجاوب بالكامل يركز على تصفح المنتجات وسلاسة خطوات الشراء (Purchase flow).',
        project_pill_quizzy: 'JavaScript',
        project_quizzy_title: 'Quizzy',
        project_quizzy: 'منصة اختبارات تفاعلية مع تتبع مستوى تقدم الطلاب ومسار التقييم.',
        project_pill_ai: 'تطبيق ذكاء اصطناعي',
        project_chatgpt_title: 'ChatGPT Clone',
        project_chatgpt: 'بيئة تفاعلية للمحادثة بالذكاء الاصطناعي تدعم الحوار الديناميكي والتكامل البرمجي للتجربة.',
        project_pill_cafeteria: 'PHP Native',
        project_cafeteria_title: 'نظام الكافتيريا (Cafeteria System)',
        project_cafeteria: 'نظام كافتيريا متكامل بلغة PHP لإدارة الطلبات، الحسابات، والعمليات التشغيلية اليومية.',
        project_pill_rag: 'LangChain + Flask',
        project_rag_title: 'نظام RAG مخصص',
        project_rag: 'مسار عمل متكامل للأسئلة والأجوبة على ملفات PDF مدعوم بتقنية الـ Retrieval-Augmented Generation.',
        project_view: 'عرض المستودع (View repo)',
        project_status_featured: 'مميز (Featured)',
        project_status_product: 'منتج (Product)',
        project_status_system: 'نظام (System)',
        project_status_realtime: 'مباشر (Real-time)',
        project_status_operations: 'عمليات (Operations)',
        project_status_catalog: 'كتالوج (Catalog)',
        project_status_ecommerce: 'متجر (E-commerce)',
        project_status_assessment: 'تقييم (Assessment)',
        project_status_sandbox: 'تجريبي (Sandbox)',
        project_status_ai_search: 'بحث بالذكاء الاصطناعي (AI Search)',
        contact_eyebrow: 'تواصل معي',
        contact_title: 'دعنا نبني شيئاً مفيداً وسريعاً وبنية كود ممتازة (Well-structured).',
        contact_text: 'إذا كنت بحاجة لتطوير تطبيق موبايل، أو بناء منصة Full-stack كاملة تركز على المنتج، أو دمج ميزات الـ AI في نظامك الحالي؛ أنا متاح لمناقشة التفاصيل وتحديد الـ Scope.',
        contact_location: 'المنصورة، مصر (Mansoura, Egypt)',
        form_name: 'الاسم الكامل (Full Name)',
        form_email: 'البريد الإلكتروني (Email Address)',
        form_project_type: 'نوع المشروع أو الفكرة (Project Type)',
        form_details: 'أخبرني عن تفاصيل المنتج، الـ Scope، أو المشكلة التي تريد حلها...',
        form_submit: 'إرسال الرسالة (Send Message)',
        footer_text: '&copy; 2026 Mohamed Waleed. جميع الحقوق محفوظة.',
        contact_alert: 'نموذج التواصل غير مفعل حالياً. يرجى التواصل مباشرة عبر WhatsApp أو البريد الإلكتروني أو LinkedIn.',
        typed_strings: ['تطوير تطبيقات Flutter (Mobile Apps)', 'بناء أنظمة Full-Stack Web', 'دمج تقنيات الذكاء الاصطناعي (GenAI)', 'هندسة المنتجات الرقمية (Product Engineering)']
    }
};

const setThemeIcon = () => {
    if (!themeIcon) return;
    themeIcon.className = html.classList.contains('dark') ? 'bx bx-sun' : 'bx bx-moon';
};

const closeMenu = () => {
    navbar?.classList.remove('open');
    body.classList.remove('menu-open');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    if (menuIcon) menuIcon.className = 'bx bx-menu';
};

const applyTranslations = (lang) => {
    const dictionary = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        if (!dictionary[key]) return;
        element.innerHTML = dictionary[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        if (!dictionary[key]) return;
        element.setAttribute('placeholder', dictionary[key]);
        element.setAttribute('aria-label', dictionary[key]);
    });
};

const updateTypedText = (lang) => {
    if (typedInstance) {
        typedInstance.destroy();
        typedInstance = null;
    }

    if (typeof Typed === 'undefined') return;

    typedInstance = new Typed('.multiple-text', {
        strings: translations[lang].typed_strings,
        typeSpeed: lang === 'ar' ? 55 : 70,
        backSpeed: lang === 'ar' ? 35 : 45,
        backDelay: 1400,
        loop: true,
    });
};

const applyLanguage = (lang) => {
    const isArabic = lang === 'ar';
    html.lang = lang;
    html.dir = isArabic ? 'rtl' : 'ltr';
    body.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    applyTranslations(lang);
    updateTypedText(lang);
    if (langToggle) langToggle.textContent = isArabic ? 'EN' : 'AR';
    localStorage.setItem('language', lang);
};

const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.toggle('dark', savedTheme ? savedTheme === 'dark' : prefersDark);
    setThemeIcon();
};

const initializeLanguage = () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    applyLanguage(savedLanguage);
};

themeToggle?.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    setThemeIcon();
});

langToggle?.addEventListener('click', () => {
    const nextLanguage = html.lang === 'ar' ? 'en' : 'ar';
    applyLanguage(nextLanguage);
});

menuButton?.addEventListener('click', () => {
    const isOpen = navbar?.classList.toggle('open');
    body.classList.toggle('menu-open', Boolean(isOpen));
    menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
    if (menuIcon) menuIcon.className = isOpen ? 'bx bx-x' : 'bx bx-menu';
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) closeMenu();
    });
});

const updateActiveSection = () => {
    const scrollY = window.scrollY + 180;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });

    header?.classList.toggle('scrolled', window.scrollY > 12);
};

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
});

if (typeof ScrollReveal !== 'undefined') {
    const reveal = ScrollReveal({
        distance: '38px',
        duration: 850,
        delay: 100,
        easing: 'ease',
        reset: false,
    });

    reveal.reveal('.hero-copy, .section-heading, .section-intro', { origin: 'top' });
    reveal.reveal('.hero-visual, .service-card, .skill-card, .project-card, .timeline-card, .contact-form', { origin: 'bottom', interval: 90 });
    reveal.reveal('.about-card, .contact-copy', { origin: 'left' });
    reveal.reveal('.about-copy', { origin: 'right' });
}

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const currentLanguage = html.lang === 'ar' ? 'ar' : 'en';
    alert(translations[currentLanguage].contact_alert);
});

initializeTheme();
initializeLanguage();
updateActiveSection();
