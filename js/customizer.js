/**
 * Interactive Profile Customizer
 * Allows Arnav to easily preview & customize his college name, cricket role,
 * and tournament details live on the page, with persistent localStorage storage.
 */

const DEFAULT_PROFILE = {
  collegeName: '[Add College Name]',
  cricketRole: 'Top-Order Batsman / Athlete',
  cricketAssociation: 'Madhya Pradesh Cricket Association (MPCA)',
  cricketTournament: 'State Level Fixtures & Selection Trials',
  email: 'arnav.kastya@example.com',
  linkedin: 'https://linkedin.com/in/arnavkastya'
};

class ProfileCustomizer {
  constructor() {
    this.storageKey = 'arnav_portfolio_custom_data_v1';
    this.data = this.loadData();
    this.initElements();
    this.applyDataToDOM();
    this.bindEvents();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? { ...DEFAULT_PROFILE, ...JSON.parse(stored) } : { ...DEFAULT_PROFILE };
    } catch (e) {
      return { ...DEFAULT_PROFILE };
    }
  }

  saveData(newData) {
    this.data = { ...this.data, ...newData };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
    this.applyDataToDOM();
  }

  resetData() {
    this.data = { ...DEFAULT_PROFILE };
    try {
      localStorage.removeItem(this.storageKey);
    } catch (e) {}
    this.applyDataToDOM();
    this.syncFormFields();
  }

  initElements() {
    this.drawer = document.getElementById('customizeDrawer');
    this.trigger = document.getElementById('customizeTrigger');
    this.closeBtn = document.getElementById('customizeClose');
    this.form = document.getElementById('customizeForm');
    this.resetBtn = document.getElementById('customizeReset');
    
    // Form fields
    this.inputCollege = document.getElementById('customCollegeName');
    this.inputRole = document.getElementById('customCricketRole');
    this.inputAssoc = document.getElementById('customCricketAssoc');
    this.inputTourney = document.getElementById('customCricketTourney');
    this.inputEmail = document.getElementById('customEmail');

    this.syncFormFields();
  }

  syncFormFields() {
    if (this.inputCollege) this.inputCollege.value = this.data.collegeName;
    if (this.inputRole) this.inputRole.value = this.data.cricketRole;
    if (this.inputAssoc) this.inputAssoc.value = this.data.cricketAssociation;
    if (this.inputTourney) this.inputTourney.value = this.data.cricketTournament;
    if (this.inputEmail) this.inputEmail.value = this.data.email;
  }

  applyDataToDOM() {
    // Update College Name
    document.querySelectorAll('[data-bind="collegeName"]').forEach((el) => {
      el.textContent = this.data.collegeName;
    });

    // Update Cricket Role
    document.querySelectorAll('[data-bind="cricketRole"]').forEach((el) => {
      el.textContent = this.data.cricketRole;
    });

    // Update Cricket Association
    document.querySelectorAll('[data-bind="cricketAssociation"]').forEach((el) => {
      el.textContent = this.data.cricketAssociation;
    });

    // Update Tournament details
    document.querySelectorAll('[data-bind="cricketTournament"]').forEach((el) => {
      el.textContent = this.data.cricketTournament;
    });

    // Update Email
    document.querySelectorAll('[data-bind="email"]').forEach((el) => {
      el.textContent = this.data.email;
      if (el.tagName === 'A') {
        el.setAttribute('href', `mailto:${this.data.email}`);
      }
    });
  }

  bindEvents() {
    if (this.trigger) {
      this.trigger.addEventListener('click', () => {
        this.openDrawer();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.closeDrawer();
      });
    }

    // Close on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawer?.classList.contains('open')) {
        this.closeDrawer();
      }
    });

    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveData({
          collegeName: this.inputCollege?.value.trim() || DEFAULT_PROFILE.collegeName,
          cricketRole: this.inputRole?.value.trim() || DEFAULT_PROFILE.cricketRole,
          cricketAssociation: this.inputAssoc?.value.trim() || DEFAULT_PROFILE.cricketAssociation,
          cricketTournament: this.inputTourney?.value.trim() || DEFAULT_PROFILE.cricketTournament,
          email: this.inputEmail?.value.trim() || DEFAULT_PROFILE.email
        });
        
        window.showToast?.('Portfolio details updated successfully!');
        this.closeDrawer();
      });
    }

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.resetData();
        window.showToast?.('Reset to standard portfolio defaults.');
      });
    }
  }

  openDrawer() {
    this.syncFormFields();
    this.drawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    this.drawer?.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.profileCustomizer = new ProfileCustomizer();
});
