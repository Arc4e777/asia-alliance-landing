// ================================
// App bootstrap
// ================================
document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initAccordion();
    initSlider();
    initFancybox();
    initCarForm();
    initScrollAnimations();
});

// ================================
// Counters (on visible)
// ================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const animated = new WeakSet();
    const DURATION = 1000;

    const animate = (counter) => {
        const target = parseInt(counter.textContent, 10) || 0;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / DURATION, 1);
            counter.textContent = Math.floor(progress * target);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !animated.has(entry.target)) {
                    animate(entry.target);
                    animated.add(entry.target);
                }
            });
        },
        {threshold: 0.3}
    );

    counters.forEach((counter) => observer.observe(counter));
}

// ================================
// Accordion
// ================================
function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    if (!items.length) return;

    items.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            items.forEach((other) => {
                if (other !== item) closeAccordion(other);
            });

            item.classList.contains('active')
                ? closeAccordion(item)
                : openAccordion(item);
        });

        // Open first item
        if (index === 0) openAccordion(item);
    });

    function openAccordion(item) {
        const content = item.querySelector('.accordion-content');
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    function closeAccordion(item) {
        const content = item.querySelector('.accordion-content');
        item.classList.remove('active');
        content.style.maxHeight = null;
    }
}

// ================================
// Slider (Splide)
// ================================
function initSlider() {
    const slider = document.querySelector('.splide');
    if (!slider || typeof Splide === 'undefined') return;

    new Splide(slider, {
        type: 'loop',
        pagination: false,
        arrows: true,
        fixedWidth: '76rem',
        fixedHeight: '52rem',
        gap: '10rem',
        focus: 'center',
        breakpoints: {
            768: {
                padding: {left: '2rem', right: '2rem'},
                gap: '2rem',
                pagination: true,
                arrows: false,
                fixedWidth: null,
                fixedHeight: null,
            },
        },
    }).mount();
}

// ================================
// Fancybox
// ================================
function initFancybox() {
    if (typeof Fancybox === 'undefined') return;
    Fancybox.bind('[data-fancybox]', {});
}

// ================================
// Car form
// ================================
function initCarForm() {
    document
        .querySelectorAll('.car-request-form')
        .forEach(form => new CarForm(form));
}

const carData = {
    brands: [
        {id: 'hyundai', name: 'Hyundai'},
        {id: 'kia', name: 'Kia'},
        {id: 'toyota', name: 'Toyota'},
        {id: 'honda', name: 'Honda'},
        {id: 'nissan', name: 'Nissan'},
        {id: 'mazda', name: 'Mazda'},
        {id: 'bmw', name: 'BMW'},
        {id: 'mercedes', name: 'Mercedes-Benz'},
        {id: 'audi', name: 'Audi'},
        {id: 'lexus', name: 'Lexus'},
    ],
    models: {
        hyundai: ['Solaris', 'Creta', 'Tucson', 'Santa Fe', 'Elantra', 'Sonata', 'Palisade'],
        kia: ['Rio', 'Cerato', 'Seltos', 'Sportage', 'Sorento', 'K5', 'Stinger'],
        toyota: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Highlander', 'Prius', 'Hilux'],
        honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Odyssey'],
        nissan: ['Qashqai', 'X-Trail', 'Murano', 'Patrol', 'Almera', 'Terrano'],
        mazda: ['CX-5', 'CX-9', '6', '3', 'CX-30'],
        bmw: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7'],
        mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC', 'GLA'],
        audi: ['A4', 'A6', 'A8', 'Q5', 'Q7', 'Q3'],
        lexus: ['RX', 'NX', 'LX', 'ES', 'IS', 'UX'],
    },
};

class CarForm {
    constructor(form) {
        this.form = form;
        this.brand = form.querySelector('.car-brand');
        this.model = form.querySelector('.car-model');

        if (!this.brand || !this.model) return;

        this.createHiddenFields();
        this.populateBrands();
        this.bindEvents();
    }

    bindEvents() {
        this.brand.addEventListener('change', () => {
            this.populateModels(this.brand.value);
            this.updateHidden();
        });

        this.model.addEventListener('change', () => {
            this.updateHidden();
        });
    }

    populateBrands() {
        carData.brands.forEach(({id, name}) => {
            this.brand.add(new Option(name, id));
        });
    }

    populateModels(brandId) {
        this.model.innerHTML =
            '<option value="" disabled selected>Модель</option>';

        this.model.disabled = !brandId;
        if (!brandId) return;

        (carData.models[brandId] || []).forEach(model => {
            this.model.add(new Option(model, model));
        });
    }

    createHiddenFields() {
        this.brandHidden = this.createHidden('car_brand_name');
        this.modelHidden = this.createHidden('car_model_name');
    }

    createHidden(name) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        this.form.appendChild(input);
        return input;
    }

    updateHidden() {
        this.brandHidden.value =
            this.brand.selectedOptions[0]?.text || '';

        this.modelHidden.value =
            this.model.selectedOptions[0]?.text || '';
    }
}

function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .fade-in-zoom'
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        {threshold: 0.2}
    );

    elements.forEach(el => observer.observe(el));
}
