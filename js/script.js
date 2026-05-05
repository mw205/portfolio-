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
        nav_journey: 'مسيرتي',
        nav_services: 'خدماتي',
        nav_skills: 'مهاراتي',
        nav_projects: 'مشاريعي',
        nav_contact: 'تواصل معي',
        header_cta: 'احجز مكالمة',
        hero_eyebrow: 'أنظمة هاتف محمول وويب وذكاء اصطناعي احترافية',
        hero_title: 'بناء منتجات رقمية طموحة بتنفيذ هندسي متقن.',
        hero_text: 'أنا محمد وليد، مهندس برمجيات متخصص في تطوير تطبيقات الهاتف المحمول باستخدام Flutter، وتطوير الويب المتكامل (Full-Stack)، وحلول الذكاء الاصطناعي التوليدي. أركز على تصميم منتجات برمجية عالية الجودة، تتسم بمعمارية قابلة للتوسع وأداء فائق.',
        hero_primary: 'عرض المشاريع',
        hero_secondary: 'ابدأ المحادثة',
        hero_stat_1_title: '+2024',
        hero_stat_1_text: 'خبرة في العمل الحر وتطوير المنتجات',
        hero_stat_2_title: 'هاتف + ذكاء اصطناعي',
        hero_stat_2_text: 'تركيز هندسي متعدد التخصصات',
        hero_stat_3_text: 'التخصص التقني الحالي',
        hero_badge: 'متاح للتعاقد والمشاريع البرمجية',
        hero_panel_1_label: 'التقنيات الأساسية',
        hero_panel_1_text: 'Flutter, Laravel, Vue, Python',
        hero_panel_2_label: 'فلسفة العمل',
        hero_panel_2_text: 'سرعة في التسليم، هيكلة برمجية نظيفة، وتركيز على القيمة الفعلية للمنتج',
        about_eyebrow: 'نبذة عني',
        about_title: 'مهندس يجمع بين كفاءة التنفيذ والعمق التقني.',
        about_heading: 'تطوير أنظمة ويب وتطبيقات هاتف محمول مدعومة بالذكاء الاصطناعي.',
        about_text: 'مهندس برمجيات عملي وموجه نحو النتائج، أمتلك خلفية أكاديمية قوية في الذكاء الاصطناعي وخبرة تطبيقية واسعة في تطوير تطبيقات الهاتف المحمول والويب والذكاء الاصطناعي التوليدي. بارع في تصميم المعماريات البرمجية القابلة للتوسع وتسليم الحلول التقنية المتكاملة من البداية وحتى الإطلاق.',
        about_point_1: 'تطبيقات عابرة للمنصات بتجربة مستخدم متميزة',
        about_point_2: 'أنظمة مهيكلة وفق مبادئ SOLID وأنماط تصميم قابلة للتوسع',
        about_point_3: 'تطبيقات ذكاء اصطناعي تشمل RAG، معالجة الصور، ودمج نماذج اللغة الكبيرة',
        about_point_4: 'تسليم برمجيات جاهزة للإنتاج بمعايير جودة عالمية',
        about_cta: 'تواصل عبر LinkedIn',
        journey_eyebrow: 'المسيرة التقنية',
        journey_title: 'تعليم وخبرة عملية ترتكز على التطبيق البرمجي الفعلي.',
        education_column: 'التعليم الأكاديمي',
        education_1_title: 'بكالوريوس حاسبات ومعلومات - برنامج الذكاء الاصطناعي',
        education_1_text: 'تأسيس متين في علوم الذكاء الاصطناعي، الخوارزميات، وأساسيات هندسة البرمجيات.',
        education_2_title: 'تطوير تطبيقات المصادر المفتوحة (ITI)',
        education_2_text: 'برنامج تدريبي متقدم ركز على تقنيات المصادر المفتوحة وتطوير الأنظمة المؤسسية.',
        experience_column: 'الخبرة المهنية',
        experience_1_title: 'مطور Flutter مستقل',
        experience_1_place: 'عمل حر',
        experience_1_item_1: '<strong>Mindly:</strong> تطوير تطبيق تعليمي يعتمد على Flutter مع تطبيق تدابير أمنية متقدمة ونظام اشتراك ذكي.',
        experience_1_item_2: '<strong>FarmBot:</strong> بناء لوحة تحكم زراعية ذكية (IoT) لمراقبة بيانات التربة والمحاصيل في الوقت الفعلي.',
        experience_1_item_3: '<strong>CX Academy:</strong> تنفيذ منصة تعليمية مؤسسية تدعم البث المباشر والمحادثات الفورية.',
        experience_2_title: 'مطور Flutter متدرب',
        experience_2_text: 'المساهمة في تطوير تطبيق "Green Car Wash" باستخدام معمارية MVVM وBloc ودمج خدمات Google Maps.',
        services_eyebrow: 'الخدمات البرمجية',
        services_title: 'دعم هندسي احترافي لجميع طبقات المنتج الرقمي.',
        service_1_title: 'تطوير تطبيقات الهاتف المحمول',
        service_1_text: 'بناء تطبيقات Flutter عابرة للمنصات (Android & iOS) بأداء عالٍ ومعايير برمجية عالمية.',
        service_1_link: 'ناقش مشروعك القادم',
        service_2_title: 'تطوير الويب المتكامل (Full-Stack)',
        service_2_text: 'تطوير المنصات الرقمية، لوحات التحكم، واجهات البرمجة (APIs)، والواجهات الأمامية الحديثة.',
        service_2_link: 'اطلب استشارة تقنية',
        service_3_title: 'دمج تقنيات الذكاء الاصطناعي',
        service_3_text: 'تطبيق حلول RAG، معالجة الصور، ودمج نماذج اللغة الكبيرة (LLM) لتعزيز ذكاء المنتجات.',
        service_3_link: 'استكشف حلول الذكاء الاصطناعي',
        skills_eyebrow: 'المهارات التقنية',
        skills_title: 'مجموعة مهارات واسعة ترتكز على تطوير تطبيقات الهاتف والذكاء الاصطناعي.',
        skills_mobile: 'تطبيقات الهاتف المحمول',
        skills_frontend: 'الواجهات الأمامية',
        skills_backend: 'الأنظمة الخلفية',
        skills_ai_tools: 'الذكاء الاصطناعي والأدوات',
        projects_eyebrow: 'أبرز المشاريع',
        projects_title: 'نماذج من أعمالي في مجالات الذكاء الاصطناعي، الويب، وتطبيقات الهاتف.',
        project_modifai: 'محرر صور مدعوم بالذكاء الاصطناعي يعتمد على الأوامر النصية لتعديل الصور باحترافية.',
        project_pill_healthcare: 'التقنية التعليمية والصحية',
        project_cogninue: 'تطبيق تفاعلي للأطفال المصابين بالتوحد يركز على الإدراك الخطري مع لوحة متابعة للأهل.',
        project_doctor_title: 'نظام إدارة مواعيد الأطباء',
        project_doctor: 'منصة طبية متكاملة لحجز المواعيد ومتابعة توافر الأطباء بشكل دقيق.',
        project_pill_iot: 'إنترنت الأشياء (IoT)',
        project_farmbot: 'لوحة تحكم زراعية ذكية لمراقبة حالة التربة والمحاصيل عبر واجهات البرمجة.',
        project_hotel_title: 'نظام إدارة الفنادق',
        project_hotel: 'منصة متكاملة لإدارة العمليات الفندقية، الحجوزات، والخدمات التشغيلية.',
        project_bookstore_title: 'نظام إدارة المكتبات',
        project_bookstore: 'متجر إلكتروني للكتب مع نظام متطور لإدارة المخزون والطلبات.',
        project_stride_title: 'Stride',
        project_stride: 'واجهة تجارة إلكترونية متطورة للأحذية تركز على سهولة التصفح وزيادة المبيعات.',
        project_quizzy_title: 'Quizzy',
        project_quizzy: 'منصة تعليمية تقدم اختبارات تفاعلية ونظاماً دقيقاً لمتابعة أداء الطلاب.',
        project_pill_ai: 'تطبيقات الذكاء الاصطناعي',
        project_chatgpt_title: 'ChatGPT Clone',
        project_chatgpt: 'تطبيق محادثة ذكي يدعم الحوار الديناميكي وتوليد الصور من النصوص.',
        project_rag_title: 'نظام RAG المتطور',
        project_rag: 'نظام متقدم للمحادثة مع ملفات PDF واستخراج المعلومات باستخدام الذكاء الاصطناعي.',
        contact_eyebrow: 'تواصل معي',
        contact_title: 'لنعمل معاً على بناء منتجات رقمية مبتكرة وعالية الجودة.',
        contact_text: 'سواء كنت بحاجة إلى تطبيق هاتف، منصة ويب متكاملة، أو دمج تقنيات الذكاء الاصطناعي، أنا متاح لمناقشة مشروعك.',
        contact_location: 'المنصورة، مصر',
        form_name: 'الاسم الكامل',
        form_email: 'البريد الإلكتروني',
        form_project_type: 'نوع المشروع',
        form_details: 'يرجى تقديم تفاصيل حول المنتج أو المشكلة التي ترغب في حلها',
        form_submit: 'إرسال الرسالة',
        footer_text: '&copy; 2026 محمد وليد. جميع الحقوق محفوظة.',
        contact_alert: 'نموذج التواصل قيد التفعيل؛ حالياً يرجى التواصل عبر LinkedIn أو WhatsApp أو البريد الإلكتروني.',
        typed_strings: ['مهندس تطبيقات Flutter', 'تطوير أنظمة Full-Stack', 'متخصص ذكاء اصطناعي', 'هندسة منتجات رقمية']
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
