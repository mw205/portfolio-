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
        project_modifai: 'AI-powered photo editing with prompt-based transformations built for mobile workflows.',
        project_pill_healthcare: 'Healthcare EdTech',
        project_cogninue: 'Interactive autism support app with danger cognition activities and parental oversight.',
        project_doctor_title: 'Doctor Scheduling Management System',
        project_doctor: 'Healthcare scheduling platform for appointment booking and physician availability tracking.',
        project_pill_iot: 'IoT Dashboard',
        project_farmbot: 'Real-time agriculture monitoring dashboard for soil and crop intelligence via APIs.',
        project_hotel_title: 'Hotel System',
        project_hotel: 'Hospitality management platform designed for room operations and reservation workflows.',
        project_bookstore_title: 'Bookstore System',
        project_bookstore: 'E-commerce bookstore with digital inventory flow and secure order management.',
        project_stride_title: 'Stride',
        project_stride: 'Responsive footwear e-commerce frontend focused on clean browsing and conversion flow.',
        project_quizzy_title: 'Quizzy',
        project_quizzy: 'Educational platform with interactive quizzes and student performance tracking.',
        project_pill_ai: 'AI Application',
        project_chatgpt_title: 'ChatGPT Clone',
        project_chatgpt: 'AI chat application with dynamic conversations and text-to-image generation support.',
        project_rag_title: 'RAG System',
        project_rag: 'Document chat workflow for PDFs using retrieval-augmented generation and search.',
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
        brand_role: 'مهندس برمجيات',
        nav_home: 'الرئيسية',
        nav_about: 'عني',
        nav_journey: 'المسيرة',
        nav_services: 'الخدمات',
        nav_skills: 'المهارات',
        nav_projects: 'المشاريع',
        nav_contact: 'تواصل',
        header_cta: 'احجز مكالمة',
        hero_eyebrow: 'أنظمة موبايل وويب وذكاء اصطناعي جاهزة للإطلاق',
        hero_title: 'بناء منتجات رقمية طموحة بتنفيذ نظيف واحترافي.',
        hero_text: 'أنا محمد وليد، مهندس برمجيات أركز على Flutter ومنصات الويب المتكاملة وتجارب الذكاء الاصطناعي التوليدي. أصمم منتجات متقنة بهندسة قابلة للتوسع وتنفيذ قوي.',
        hero_primary: 'عرض المشاريع',
        hero_secondary: 'ابدأ المحادثة',
        hero_stat_1_title: '+2024',
        hero_stat_1_text: 'تنفيذ منتجات وخدمات بشكل حر',
        hero_stat_2_title: 'موبايل + ذكاء اصطناعي',
        hero_stat_2_text: 'تركيز هندسي متعدد التخصصات',
        hero_stat_3_text: 'التخصص الحالي',
        hero_badge: 'متاح للأعمال الحرة وتنفيذ المنتجات',
        hero_panel_1_label: 'التقنيات الأساسية',
        hero_panel_1_text: 'Flutter وLaravel وVue وPython',
        hero_panel_2_label: 'أسلوب العمل',
        hero_panel_2_text: 'سرعة في التنفيذ وهيكلة نظيفة وتركيز على المنتج الحقيقي',
        about_eyebrow: 'عني',
        about_title: 'مهندس يجمع بين سرعة تنفيذ المنتج والعمق التقني.',
        about_heading: 'أنظمة متكاملة وتطبيقات موبايل مع قدرات ذكاء اصطناعي مدمجة.',
        about_text: 'مهندس برمجيات عملي وموجّه للنتائج، أمتلك أساساً قوياً في الذكاء الاصطناعي وخبرة تطبيقية في تطوير الموبايل والويب المتكامل وحلول الذكاء الاصطناعي التوليدي. أركز على تصميم معماريات قابلة للتوسع وتسليم منتجات متكاملة من الواجهة إلى الخلفية.',
        about_point_1: 'تطبيقات متعددة المنصات مع تجربة استخدام قوية وتدفقات لحظية',
        about_point_2: 'أنظمة منظمة تعتمد على مبادئ SOLID وأنماط قابلة للتوسع',
        about_point_3: 'تطبيقات ذكاء اصطناعي تشمل RAG وأدوات الصور وخصائص LLM',
        about_point_4: 'تسليم جاهز للإنتاج عبر الموبايل والويب ومنتجات الذكاء الاصطناعي',
        about_cta: 'تواصل عبر لينكدإن',
        journey_eyebrow: 'المسيرة',
        journey_title: 'تعليم وخبرة عملية مبنيان حول تسليم برمجي تطبيقي.',
        education_column: 'التعليم',
        education_1_title: 'بكالوريوس حاسبات ومعلومات - برنامج الذكاء الاصطناعي',
        education_1_text: 'أساس قوي في الذكاء الاصطناعي والخوارزميات ومبادئ هندسة البرمجيات.',
        education_2_title: 'تطوير تطبيقات المصادر المفتوحة',
        education_2_text: 'تدريب متقدم يركز على تقنيات المصادر المفتوحة وتطوير التطبيقات المؤسسية.',
        experience_column: 'الخبرة',
        experience_1_title: 'مطور Flutter حر',
        experience_1_place: 'عمل حر',
        experience_1_item_1: '<strong>Mindly:</strong> تطوير تطبيق تعليمي باستخدام Flutter مع حماية من القرصنة ونظام اشتراك عبر QR.',
        experience_1_item_2: '<strong>FarmBot:</strong> بناء لوحة زراعية تعتمد على إنترنت الأشياء مع عرض لحظي لبيانات الحساسات.',
        experience_1_item_3: '<strong>CX Academy:</strong> تنفيذ منصة تعلم مؤسسية مع محادثة WebSocket وبث فيديو.',
        experience_2_title: 'متدرب Flutter Developer',
        experience_2_text: 'المساهمة في تطبيق Green Car Wash باستخدام MVVM وBloc وFirebase وGoogle Maps.',
        services_eyebrow: 'الخدمات',
        services_title: 'دعم هندسي عالي القيمة عبر طبقات المنتج المختلفة.',
        service_1_title: 'تطوير منتجات الموبايل',
        service_1_text: 'تطبيقات Flutter متعددة المنصات بأداء قوي وإدارة حالة قابلة للصيانة ولمسة جاهزة للإنتاج.',
        service_1_link: 'ناقش مشروع موبايل',
        service_2_title: 'أنظمة ويب متكاملة',
        service_2_text: 'تنفيذ الواجهات والخلفيات للمنصات ولوحات التحكم والواجهات الحديثة وواجهات البرمجة.',
        service_2_link: 'ناقش نظام ويب',
        service_3_title: 'دمج الذكاء الاصطناعي التوليدي',
        service_3_text: 'أنظمة RAG وأدوات الصور وخصائص LLM مدمجة في تطبيقات حقيقية بقيمة عملية واضحة.',
        service_3_link: 'ناقش خصائص الذكاء الاصطناعي',
        skills_eyebrow: 'المهارات',
        skills_title: 'مجموعة مهارات واسعة ترتكز على هندسة الموبايل والذكاء الاصطناعي التطبيقي.',
        skills_mobile: 'الموبايل',
        skills_frontend: "Frontend",
        skills_backend: 'Backend',
        skills_ai_tools: 'الذكاء الاصطناعي والأدوات',
        projects_eyebrow: 'المشاريع',
        projects_title: 'أعمال مختارة عبر الذكاء الاصطناعي وإنترنت الأشياء والتعليم والمنصات الرقمية.',
        project_modifai: 'محرر صور مدعوم بالذكاء الاصطناعي يعتمد على الأوامر النصية ومصمم لتجارب الموبايل.',
        project_pill_healthcare: 'تعليم وتقنية صحية',
        project_cogninue: 'تطبيق تفاعلي لدعم الأطفال المصابين بالتوحد مع أنشطة للإدراك الخطري ولوحة متابعة للأهل.',
        project_doctor_title: 'نظام إدارة مواعيد الأطباء',
        project_doctor: 'منصة صحية لإدارة الحجز ومتابعة توافر الأطباء بشكل منظم.',
        project_pill_iot: 'لوحة إنترنت الأشياء',
        project_farmbot: 'لوحة متابعة زراعية لحظية لبيانات التربة والمحاصيل عبر واجهات برمجة التطبيقات.',
        project_hotel_title: 'نظام فندقي',
        project_hotel: 'منصة لإدارة عمليات الفنادق والحجوزات وتنظيم العمل التشغيلي.',
        project_bookstore_title: 'نظام مكتبة',
        project_bookstore: 'متجر إلكتروني للكتب مع إدارة للمخزون الرقمي وطلبات شراء آمنة.',
        project_stride_title: 'Stride',
        project_stride: 'واجهة تجارة إلكترونية للأحذية بتجربة تصفح واضحة ومهيأة للتحويل.',
        project_quizzy_title: 'Quizzy',
        project_quizzy: 'منصة تعليمية تحتوي على اختبارات تفاعلية ومتابعة لأداء الطلاب.',
        project_pill_ai: 'تطبيق ذكاء اصطناعي',
        project_chatgpt_title: 'نسخة ChatGPT',
        project_chatgpt: 'تطبيق محادثة ذكي يدعم الحوار الديناميكي وتوليد الصور من النص.',
        project_rag_title: 'نظام RAG',
        project_rag: 'نظام محادثة مع ملفات PDF باستخدام الاسترجاع المعزز بالتوليد والبحث.',
        contact_eyebrow: 'تواصل',
        contact_title: 'لنُنجز شيئاً مفيداً وسريعاً ومنظماً بشكل جيد.',
        contact_text: 'إذا كنت تحتاج إلى تطبيق موبايل أو نظام ويب متكامل أو خصائص ذكاء اصطناعي داخل منتج قائم، يمكننا مناقشة النطاق المناسب.',
        contact_location: 'المنصورة، مصر',
        form_name: 'الاسم الكامل',
        form_email: 'البريد الإلكتروني',
        form_project_type: 'نوع المشروع',
        form_details: 'اكتب نبذة عن المنتج أو النطاق أو المشكلة التي تريد حلها',
        form_submit: 'إرسال الرسالة',
        footer_text: '&copy; 2026 محمد وليد. جميع الحقوق محفوظة.',
        contact_alert: 'نموذج التواصل غير موصول حالياً. تواصل عبر لينكدإن أو واتساب أو البريد الإلكتروني.',
        typed_strings: ['تطوير Flutter', 'أنظمة متكاملة', 'منتجات ذكاء اصطناعي', 'هندسة منتجات']
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
