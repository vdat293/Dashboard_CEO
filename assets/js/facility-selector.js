/**
 * FACILITY SELECTOR COMPONENT
 * Component để chọn cơ sở/khu vực xem dữ liệu
 */

class FacilitySelector {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error('Facility selector container not found:', containerId);
      return;
    }

    this.currentSelection = FacilityManager.getSelected();
    this.render();
    this.attachEventListeners();
  }

  render() {
    const html = `
      <div class="facility-selector-wrapper">
        <div class="d-flex align-items-center">
          <label class="mb-0 mr-2 font-weight-bold">
            <i class="bi bi-building"></i> Cơ sở:
          </label>
          <div class="dropdown">
            <button class="btn btn-sm btn-outline-primary dropdown-toggle" type="button"
                    id="facilityDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span id="selectedFacilityName">${this.currentSelection.name}</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="facilityDropdown" style="max-height: 400px; overflow-y: auto;">
              ${this.renderDropdownContent()}
            </div>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  renderDropdownContent() {
    let html = `
      <a class="dropdown-item ${this.currentSelection.type === 'all' ? 'active' : ''}"
         href="#" data-type="all" data-code="" data-name="Tất cả cơ sở">
        <i class="bi bi-globe"></i> <strong>Tất cả cơ sở</strong>
      </a>
      <div class="dropdown-divider"></div>
    `;

    // Render từng khu vực và cơ sở
    for (const [regionName, facilities] of Object.entries(facilitiesByRegion)) {
      const isRegionActive = this.currentSelection.type === 'region' && this.currentSelection.name === regionName;

      html += `
        <a class="dropdown-item ${isRegionActive ? 'active' : ''}"
           href="#" data-type="region" data-code="" data-name="${regionName}">
          <i class="bi bi-geo-alt-fill"></i> <strong>${regionName}</strong>
        </a>
      `;

      // Render các cơ sở trong khu vực
      facilities.forEach(facility => {
        const isFacilityActive = this.currentSelection.type === 'facility' && this.currentSelection.code === facility.code;
        html += `
          <a class="dropdown-item pl-4 ${isFacilityActive ? 'active' : ''}"
             href="#" data-type="facility" data-code="${facility.code}" data-name="${facility.name}" data-region="${regionName}">
            <i class="bi bi-shop"></i> ${facility.name}
          </a>
        `;
      });

      html += '<div class="dropdown-divider"></div>';
    }

    return html;
  }

  attachEventListeners() {
    const dropdownItems = this.container.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        const type = e.currentTarget.getAttribute('data-type');
        const code = e.currentTarget.getAttribute('data-code') || null;
        const name = e.currentTarget.getAttribute('data-name');
        const region = e.currentTarget.getAttribute('data-region') || null;

        // Lưu lựa chọn
        FacilityManager.setSelected(type, code, name, region);

        // Cập nhật UI
        this.currentSelection = { type, code, name, region };

        // Cập nhật text hiển thị
        const selectedNameElement = document.getElementById('selectedFacilityName');
        if (selectedNameElement) {
          selectedNameElement.textContent = name;
        }

        // Trigger custom event để các page có thể lắng nghe và cập nhật
        const event = new CustomEvent('facilityChanged', {
          detail: { type, code, name, region }
        });
        window.dispatchEvent(event);

        // Reload trang để cập nhật dữ liệu
        // Có thể thay thế bằng cập nhật dynamic nếu muốn
        setTimeout(() => {
          window.location.reload();
        }, 300);
      });
    });
  }

  // Static method để khởi tạo selector trên tất cả các trang
  static init(containerId = 'facilitySelector') {
    return new FacilitySelector(containerId);
  }
}

// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Tự động khởi tạo nếu có container
  const container = document.getElementById('facilitySelector');
  if (container) {
    FacilitySelector.init();
  }
});
