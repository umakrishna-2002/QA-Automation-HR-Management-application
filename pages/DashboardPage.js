class DashboardPage {
  constructor(page) {
    this.page = page;

    this.addEmployeeBtn = page.getByRole('button', { name: /add employee/i });
    this.nameInput = page.getByLabel(/full name/i);
    this.deptInput = page.getByLabel(/department/i);
    this.roleInput = page.getByLabel(/role/i);
    this.salaryInput = page.getByLabel(/salary/i);
    this.saveBtn = page.getByRole('button', { name: /save/i });
    this.reportsLink = page.getByRole('link', { name: /reports/i });
  }

  async navigate() {
    await this.page.goto('/dashboard.html');
  }

  async addEmployee(name, dept, role, salary) {
    await this.addEmployeeBtn.click();
    await this.nameInput.fill(name);
    await this.deptInput.fill(dept);
    await this.roleInput.fill(role);
    await this.salaryInput.fill(String(salary));
    await this.saveBtn.click();
  }

  async deleteEmployee(name) {
    // Target the specific row (e.g., .last() if newly added) to satisfy Playwright strict mode
    const row = this.page.getByRole('row').filter({ hasText: name }).last();

    // Handle potential window.confirm dialogs if the frontend pops up a confirmation prompt
    this.page.once('dialog', dialog => dialog.accept());

    await row.getByRole('button', { name: /delete/i }).click();
  }

  async goToReports() {
    await this.reportsLink.click();
  }
}

module.exports = { DashboardPage };
