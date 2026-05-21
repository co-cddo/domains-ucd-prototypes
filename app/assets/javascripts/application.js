window.GOVUKPrototypeKit.documentReady(() => {
  const outcomeOptions = {
    A: ['A1.a', 'A1.c', 'A2.b', 'A3.a', 'A4.a'],
    B: ['B1.a', 'B2.d', 'B3.b', 'B4.b', 'B5.c', 'B6.a'],
    C: ['C1.a', 'C1.b', 'C1.c', 'C1.d', 'C1.e', 'C2.a'],
    D: ['D1.b', 'D2.a']
  };

  function populateOutcomeFilter() {
    const objectiveSelect = document.getElementById('objective-filter');
    const outcomeSelect = document.getElementById('outcome-filter');

    if (!objectiveSelect || !outcomeSelect) return;

    const selectedObjective = objectiveSelect.value;
    const currentOutcome = outcomeSelect.value;

    outcomeSelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All outcomes';
    outcomeSelect.appendChild(defaultOption);

    if (selectedObjective && outcomeOptions[selectedObjective]) {
      outcomeOptions[selectedObjective].forEach(function (outcome) {
        const option = document.createElement('option');
        option.value = outcome;
        option.textContent = outcome;
        outcomeSelect.appendChild(option);
      });
    } else {
      Object.keys(outcomeOptions).forEach(function (objective) {
        outcomeOptions[objective].forEach(function (outcome) {
          const option = document.createElement('option');
          option.value = outcome;
          option.textContent = outcome;
          outcomeSelect.appendChild(option);
        });
      });
    }

    if ([...outcomeSelect.options].some(option => option.value === currentOutcome)) {
      outcomeSelect.value = currentOutcome;
    } else {
      outcomeSelect.value = '';
    }
  }

  window.applyTipFilters = function () {
    const rows = document.querySelectorAll('.tip-queue-row');
    const resultsCount = document.getElementById('tip-results-count');
    const objectiveSelect = document.getElementById('objective-filter');
    const outcomeSelect = document.getElementById('outcome-filter');
    const statusSelect = document.getElementById('status-filter');

    const selectedObjective = objectiveSelect ? objectiveSelect.value : '';
    const selectedOutcome = outcomeSelect ? outcomeSelect.value : '';
    const selectedStatus = statusSelect ? statusSelect.value : '';

    let visibleCount = 0;

    Array.prototype.forEach.call(rows, function (row) {
      const rowObjective = row.getAttribute('data-objective');
      const rowOutcome = row.getAttribute('data-outcome');
      const rowStatus = row.getAttribute('data-status');

      let visible = true;

      if (selectedObjective && rowObjective !== selectedObjective) {
        visible = false;
      }

      if (selectedOutcome && rowOutcome !== selectedOutcome) {
        visible = false;
      }

      if (selectedStatus && rowStatus !== selectedStatus) {
        visible = false;
      }

      row.style.display = visible ? '' : 'none';

      if (visible) {
        visibleCount += 1;
      }
    });

    if (resultsCount) {
      resultsCount.textContent = 'Showing ' + visibleCount + ' of 125 recommendations';
    }
  };

  window.clearTipFilters = function () {
    const objectiveSelect = document.getElementById('objective-filter');
    const outcomeSelect = document.getElementById('outcome-filter');
    const statusSelect = document.getElementById('status-filter');

    if (objectiveSelect) {
      objectiveSelect.value = '';
    }

    populateOutcomeFilter();

    if (outcomeSelect) {
      outcomeSelect.value = '';
    }

    if (statusSelect) {
      statusSelect.value = '';
    }

    window.applyTipFilters();
  };

  const objectiveSelect = document.getElementById('objective-filter');
  if (objectiveSelect) {
    objectiveSelect.addEventListener('change', function () {
      populateOutcomeFilter();
    });
  }

  populateOutcomeFilter();
});