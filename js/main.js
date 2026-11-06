/* CicloBairro - interacoes simples para a atividade */
(() => {
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const menuButton = $('#menu-toggle');
  const nav = $('#main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('open', !isOpen);
      menuButton.textContent = isOpen ? 'Menu' : 'Fechar menu';
    });
  }
  const contrastButton = $('#contrast-toggle');
  const savedContrast = localStorage.getItem('ciclobairro-contraste') === 'alto';
  document.body.classList.toggle('high-contrast', savedContrast);
  if (contrastButton) {
    contrastButton.setAttribute('aria-pressed', String(savedContrast));
    contrastButton.addEventListener('click', () => {
      const active = document.body.classList.toggle('high-contrast');
      localStorage.setItem('ciclobairro-contraste', active ? 'alto' : 'normal');
      contrastButton.setAttribute('aria-pressed', String(active));
      contrastButton.textContent = active ? 'Contraste normal' : 'Alto contraste';
    });
    contrastButton.textContent = savedContrast ? 'Contraste normal' : 'Alto contraste';
  }
  const sizeButtons = $$('[data-text-size]');
  sizeButtons.forEach(button => button.addEventListener('click', () => {
    document.body.classList.remove('text-large', 'text-larger');
    const size = button.dataset.textSize;
    if (size === 'large') document.body.classList.add('text-large');
    if (size === 'larger') document.body.classList.add('text-larger');
    localStorage.setItem('ciclobairro-texto', size);
  }));
  const savedSize = localStorage.getItem('ciclobairro-texto');
  if (savedSize === 'large') document.body.classList.add('text-large');
  if (savedSize === 'larger') document.body.classList.add('text-larger');
  const newsSearch = $('#news-search');
  const newsCategory = $('#news-category');
  const newsCards = $$('.news-card');
  const newsCount = $('#news-count');
  function filterNews() {
    const term = (newsSearch?.value || '').trim().toLocaleLowerCase('pt-BR');
    const category = newsCategory?.value || 'todas';
    let visible = 0;
    newsCards.forEach(card => {
      const matchesText = card.textContent.toLocaleLowerCase('pt-BR').includes(term);
      const matchesCategory = category === 'todas' || card.dataset.category === category;
      const show = matchesText && matchesCategory;
      card.hidden = !show;
      if (show) visible++;
    });
    if (newsCount) newsCount.textContent = `${visible} conteudo(s) encontrado(s).`;
  }
  newsSearch?.addEventListener('input', filterNews);
  newsCategory?.addEventListener('change', filterNews);
  const form = $('#volunteer-form');
  if (form) {
    const storageKey = 'ciclobairro-rascunho-contato';
    const status = $('#form-status');
    const fields = $$('input, select, textarea', form).filter(field => field.name);
    const errorFor = field => `#${field.id}-error`;
    try {
      const draft = JSON.parse(localStorage.getItem(storageKey) || '{}');
      fields.forEach(field => {
        if (draft[field.name] !== undefined && field.type !== 'checkbox') field.value = draft[field.name];
      });
    } catch (error) {
      console.warn('Nao foi possivel recuperar o rascunho.', error);
    }
    function saveDraft() {
      const draft = {};
      fields.forEach(field => { draft[field.name] = field.value; });
      try { localStorage.setItem(storageKey, JSON.stringify(draft)); }
      catch (error) { console.warn('Nao foi possivel salvar o rascunho.', error); }
    }
    function validateField(field) {
      const error = $(errorFor(field));
      if (!error) return field.checkValidity();
      let message = '';
      if (field.validity.valueMissing) message = 'Preencha este campo.';
      else if (field.validity.typeMismatch) message = 'Informe um formato valido.';
      else if (field.validity.patternMismatch) message = field.dataset.patternMessage || 'Confira o formato informado.';
      else if (field.validity.rangeUnderflow || field.validity.rangeOverflow) message = 'Informe um valor dentro do intervalo permitido.';
      else if (field.validity.tooShort) message = `Digite pelo menos ${field.minLength} caracteres.`;
      error.textContent = message;
      field.setAttribute('aria-invalid', String(!field.checkValidity()));
      return field.checkValidity();
    }
    fields.forEach(field => {
      field.addEventListener('input', () => { validateField(field); saveDraft(); });
      field.addEventListener('change', () => { validateField(field); saveDraft(); });
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const results = fields.map(validateField);
      const firstInvalid = fields.find(field => !field.checkValidity());
      if (results.some(result => !result)) {
        status.className = 'form-status error';
        status.textContent = 'Revise os campos destacados. Nenhum dado foi enviado a um servidor.';
        firstInvalid?.focus();
        return;
      }
      saveDraft();
      status.className = 'form-status success';
      status.textContent = 'Formulario validado! Esta e uma demonstracao academica: os dados ficam apenas neste navegador e nao sao enviados a uma equipe real.';
      status.focus();
    });
    $('#clear-draft')?.addEventListener('click', () => {
      form.reset();
      localStorage.removeItem(storageKey);
      fields.forEach(field => { field.removeAttribute('aria-invalid'); const error = $(errorFor(field)); if (error) error.textContent = ''; });
      status.className = 'form-status';
      status.textContent = '';
      $('#nome')?.focus();
    });
  }
})();