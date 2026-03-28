const ROW_MARKER = 'data-mit-available-row';
const TOTAL_MARKER = 'data-mit-total';

function isLoadTable(table) {
  const firstRow = table.querySelector('tr');
  if (!firstRow) return false;
  const firstCell = firstRow.cells[0];
  return firstCell && firstCell.textContent.trim() === 'Cabin';
}

function getRowByLabel(table, label) {
  for (const row of table.querySelectorAll('tr')) {
    if (row.cells[0] && row.cells[0].textContent.trim() === label) {
      return row;
    }
  }
  return null;
}

function getValues(row) {
  const values = [];
  for (let i = 1; i < row.cells.length; i++) {
    const text = row.cells[i].textContent.trim().replace(/\D/g, '');
    values.push(text === '' ? null : parseInt(text, 10));
  }
  return values;
}

function setCellValue(cell, value) {
  const inner = cell.querySelector('div');
  if (inner) {
    inner.textContent = value;
  } else {
    cell.textContent = value;
  }
}

function processTable(table) {
  if (table.querySelector(`[${ROW_MARKER}]`)) return;
  if (!isLoadTable(table)) return;

  const capacityRow = getRowByLabel(table, 'Capacity');
  const confirmedRow = getRowByLabel(table, 'Confirmed');
  if (!capacityRow || !confirmedRow) return;

  const capacityVals = getValues(capacityRow);
  const confirmedVals = getValues(confirmedRow);

  const newRow = confirmedRow.cloneNode(true);
  newRow.setAttribute(ROW_MARKER, 'true');
  newRow.classList.add('mit-available-row');
  newRow.cells[0].textContent = 'Available';

  let total = 0;
  for (let i = 0; i < capacityVals.length; i++) {
    const cell = newRow.cells[i + 1];
    if (!cell) continue;
    const cap = capacityVals[i];
    const conf = confirmedVals[i];
    if (cap !== null && conf !== null) {
      const available = cap - conf;
      setCellValue(cell, available);
      total += available;
    } else {
      setCellValue(cell, '—');
    }
  }

  confirmedRow.after(newRow);

  // Add total available summary after the table container
  const tableContainer = table.closest('div.mb-3') || table.parentElement;
  if (!tableContainer.querySelector(`[${TOTAL_MARKER}]`)) {
    const totalEl = document.createElement('div');
    totalEl.setAttribute(TOTAL_MARKER, 'true');
    totalEl.className = 'mit-total-available';
    totalEl.textContent = `Total available: ${total}`;
    tableContainer.appendChild(totalEl);
  }
}

function processAllTables() {
  document.querySelectorAll('table').forEach(processTable);
}

// Run once for anything already in the DOM
processAllTables();

// Watch for the modal opening (table is injected dynamically)
let debounceTimer = null;
const observer = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(processAllTables, 200);
});

observer.observe(document.body, { childList: true, subtree: true });
